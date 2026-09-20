/**
 * Moves the existing activity nodes into the scene, so there is one set of
 * controls and one state in both page and fullscreen views.
 */
export function registerImmersiveScene(root: HTMLElement) {
  const button = root.querySelector<HTMLButtonElement>('[data-world-fullscreen]')!;
  const bar = root.querySelector<HTMLElement>('[data-immersive-bar]')!;
  const panel = root.querySelector<HTMLElement>('[data-immersive-console]')!;
  const content = root.querySelector<HTMLElement>('[data-immersive-content]')!;
  const status = root.querySelector<HTMLElement>('[data-immersive-input-status]')!;
  const lookButton = root.querySelector<HTMLButtonElement>('[data-immersive-look]')!;
  const owner = root.closest<HTMLElement>('[data-training-week], [data-mission], [data-demo-id]');
  const taskButton = root.querySelector<HTMLButtonElement>('[data-immersive-task]')!;
  const heading = root.querySelector<HTMLElement>('[data-immersive-objective]')!;
  let objectiveObserver: MutationObserver | undefined;
  let expanded = false, native = false, hadLock = false, releasingForControls = false;
  let wantsLook = false, lookRequest = 0;
  let moved: {node: HTMLElement; marker: Comment}[] = [];
  let inert: {element: HTMLElement; previous: boolean}[] = [];
  let raised: {node: HTMLElement; style: string | null}[] = [];
  let folded: {node: HTMLDetailsElement; open: boolean}[] = [];
  let oldOverflow = '', previousFocus: HTMLElement | null = null;
  const canvas = () => root.querySelector<HTMLCanvasElement>('canvas');
  const finePointer = () => matchMedia('(pointer: fine)').matches;
  function message(text: string) { status.textContent = text; }
  function showCursorMode(looking: boolean, fallback = false) {
    lookButton.setAttribute('aria-pressed', String(looking));
    lookButton.textContent = looking ? 'Free cursor (X)' : 'Lock cursor (X)';
    message(!finePointer()
      ? 'Drag to turn · Zoom + / − · Scroll the task panel for controls.'
      : !looking
        ? 'Cursor free · Drag to turn · X locks cursor · Scroll scene to zoom · Esc exits.'
        : fallback
          ? 'Mouse-look over scene · X returns to drag · Cursor remains available · Esc exits.'
          : 'Cursor locked · Move mouse to turn · X or Tab frees cursor · Esc exits.');
  }
  function releaseCursor() {
    wantsLook = false; lookRequest++;
    root.dataset.worldMouseLook = 'false';
    if (document.pointerLockElement === canvas()) {
      releasingForControls = true;
      document.exitPointerLock();
    }
    showCursorMode(false);
  }
  function showControls(focus = true) {
    releaseCursor();
    if (focus) panel.focus({preventScroll: true});
  }
  function fallbackLook(request: number) {
    if (!expanded || !wantsLook || request !== lookRequest) return;
    root.dataset.worldMouseLook = 'true';
    showCursorMode(true, true);
  }
  function startLook() {
    const target = canvas();
    if (!expanded || !target || !finePointer()) { showControls(); return; }
    wantsLook = true;
    const requestId = ++lookRequest;
    root.dataset.worldMouseLook = 'true';
    showCursorMode(true);
    target.focus({preventScroll: true});
    try {
      if (target.requestPointerLock) {
        const request = target.requestPointerLock() as Promise<void> | undefined;
        request?.catch(() => fallbackLook(requestId));
      } else fallbackLook(requestId);
    } catch { fallbackLook(requestId); }
  }
  function toggleLook() {
    if (wantsLook || document.pointerLockElement === canvas()) showControls();
    else startLook();
  }
  function updateObjective() {
    const title = owner?.querySelector<HTMLElement>('[data-mission-next-title], [data-lab-step][aria-current=step] strong, [data-demo-caption-title]')?.textContent?.trim();
    const label = title ? 'CURRENT OBJECTIVE · '+title : 'MISSION · Practical activity and after-action record';
    if (heading.textContent !== label) heading.textContent = label;
  }
  function taskControls() {
    showControls(false);
    // Match the persistent objective, including its required role and room.
    const next = owner?.querySelector<HTMLButtonElement>('[data-mission-next]');
    if (next && !next.hidden && !next.disabled) next.click();
    const target = owner?.querySelector<HTMLElement>('[data-zone-panel]:not([hidden]), [data-training-controls], [data-demo-form]:not([hidden]), .demo-transport');
    if (target) { target.tabIndex = -1; target.focus({preventScroll:true}); target.scrollIntoView({block:'start', behavior:'auto'}); }
  }
  function windowFallback() {
    if (!expanded) return;
    // A popover enters the browser's top layer without moving DOM/state out of
    // the activity owner. This prevents the site's sticky header covering Exit.
    try {
      root.setAttribute('popover', 'manual');
      root.showPopover();
    } catch {
      root.removeAttribute('popover');
      let branch = root.parentElement;
      while (branch && branch !== document.body) {
        raised.push({node: branch, style: branch.getAttribute('style')});
        Object.assign(branch.style, {position:'relative', zIndex:'2147483647', transform:'none', filter:'none', perspective:'none', contain:'none', isolation:'auto'});
        branch = branch.parentElement;
      }
    }
  }
  function restore() {
    if (!expanded) return;
    expanded = false;
    objectiveObserver?.disconnect(); objectiveObserver = undefined;
    if (root.hasAttribute('popover')) {
      try { root.hidePopover(); } catch { /* Already dismissed by the browser. */ }
      root.removeAttribute('popover');
    }
    raised.forEach(({node, style}) => { if (style === null) node.removeAttribute('style'); else node.setAttribute('style', style); });
    raised = [];
    root.dataset.immersive = 'false';
    wantsLook = false; lookRequest++;
    root.dataset.worldMouseLook = 'false';
    if (document.pointerLockElement === canvas()) document.exitPointerLock();
    hadLock = false; releasingForControls = false;
    for (const {node, marker} of moved) marker.replaceWith(node);
    moved = [];
    folded.forEach(({node, open}) => { node.open = open; });
    folded = [];
    content.replaceChildren();
    inert.forEach(({element, previous}) => { element.inert = previous; });
    inert = [];
    document.body.style.overflow = oldOverflow;
    bar.hidden = panel.hidden = true;
    root.removeAttribute('role');
    root.removeAttribute('aria-modal');
    (previousFocus?.isConnected ? previousFocus : button).focus({preventScroll: true});
  }
  function close() {
    const exitNative = document.fullscreenElement === root;
    restore();
    native = false;
    if (exitNative) void document.exitFullscreen().catch(() => {});
  }
  function open() {
    if (expanded) return;
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : button;
    expanded = true;
    oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    root.dataset.immersive = 'true';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    bar.hidden = panel.hidden = false;
    const nodes = owner ? [...owner.querySelectorAll<HTMLElement>('[data-immersive-panel]')].filter(node => !node.parentElement?.closest('[data-immersive-panel]')) : [];
    // Lab passports live beside the lab, but export/restore must remain usable here.
    if (owner?.matches('[data-training-week]')) {
      const passport = document.querySelector<HTMLElement>('.passport-tools');
      if (passport && !nodes.some(node => node.contains(passport))) nodes.push(passport);
    }
    if (owner?.matches('[data-training-week]')) nodes.sort((a,b) => Number(b.dataset.immersivePanel === 'lab') - Number(a.dataset.immersivePanel === 'lab'));
    for (const node of nodes) {
      const marker = document.createComment('activity returns here after fullscreen');
      node.before(marker); content.append(node); moved.push({node, marker});
    }
    // The next action stays prominent; complete instructions remain expandable.
    folded = [...content.querySelectorAll<HTMLDetailsElement>('.learner-checklist, .learner-vocabulary, .training-learn')]
      .map(node => ({node, open: node.open}));
    folded.forEach(({node}) => { node.open = false; });
    if (!nodes.length) {
      const guidance = document.createElement('p');
      guidance.textContent = 'Explore with W A S D or the arrow keys. Choose an instrument from the Equipment menu, then inspect it to read its details. Open the corresponding weekly lab to practise its skill and save your work.';
      content.append(guidance);
    }
    taskButton.hidden = !owner;
    lookButton.hidden = !finePointer();
    updateObjective();
    objectiveObserver = new MutationObserver(updateObjective);
    for (const source of content.querySelectorAll('[data-lab-next], [data-mission-next-title], [data-demo-caption-title]'))
      objectiveObserver.observe(source, {childList:true, characterData:true, subtree:true});
    // Keep keyboard focus in the mission without making any ancestor inert.
    let branch: HTMLElement = root;
    while (branch.parentElement) {
      for (const sibling of branch.parentElement.children) {
        if (sibling !== branch && sibling instanceof HTMLElement) {
          inert.push({element: sibling, previous: sibling.inert});
          sibling.inert = true;
        }
      }
      branch = branch.parentElement;
      if (branch === document.body) break;
    }
    // Enter with the cursor free. Mouse capture requires its own explicit X/button action.
    showControls();
    if (root.requestFullscreen && document.fullscreenEnabled) {
      try {
        void root.requestFullscreen().then(() => {
          if (!expanded) { void document.exitFullscreen().catch(() => {}); return; }
          native = true;
        }).catch(() => { native = false; windowFallback(); });
      } catch { native = false; windowFallback(); }
    } else windowFallback();
  }
  button.addEventListener('click', open);
  root.querySelector('[data-immersive-exit]')!.addEventListener('click', close);
  root.querySelector('[data-immersive-controls]')!.addEventListener('click', () => { showControls(); panel.scrollTop = 0; });
  taskButton.addEventListener('click', taskControls);
  lookButton.addEventListener('click', toggleLook);
  panel.addEventListener('pointerdown', () => { if (expanded) releaseCursor(); });
  root.addEventListener('mastermind:world-disposed', close);
  document.addEventListener('pointerlockchange', () => {
    const locked = document.pointerLockElement === canvas() && !!canvas();
    if (locked && (!expanded || !wantsLook)) {
      // A delayed lock request must not capture the cursor after it was released.
      releasingForControls = true;
      document.exitPointerLock();
      return;
    }
    if (locked && expanded) {
      hadLock = true; releasingForControls = false;
      root.dataset.worldMouseLook = 'true';
      showCursorMode(true);
    } else if (hadLock) {
      hadLock = false;
      if (releasingForControls) releasingForControls = false;
      else if (expanded) close(); // Browser Escape releases pointer lock first.
    }
  });
  document.addEventListener('pointerlockerror', () => { if (expanded && wantsLook) fallbackLook(lookRequest); });
  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement === root) native = true;
    else if (native && expanded) { native = false; restore(); }
  });
  document.addEventListener('keydown', (event) => {
    if (!expanded || root.querySelector('dialog[open]')) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    else if (event.key.toLowerCase() === 'x' && !event.repeat && !event.ctrlKey && !event.metaKey && !event.altKey
      && !(event.target instanceof HTMLElement && event.target.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"]),[role="textbox"]'))) {
      event.preventDefault(); toggleLook();
    }
    else if (event.key === 'Tab' && root.dataset.worldMouseLook === 'true' && (document.pointerLockElement === canvas() || document.activeElement === canvas())) {
      event.preventDefault(); showControls();
    } else if (event.key === 'Tab') {
      const controls = [...root.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], summary, [tabindex="0"]')]
        .filter(el => el.getClientRects().length && !el.closest('[hidden]'));
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  }, true);
  // Ordinary scene clicks retain drag controls; only X or the labelled toggle captures the cursor.
  window.addEventListener('pagehide', close);
}
