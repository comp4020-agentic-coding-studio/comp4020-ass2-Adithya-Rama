import {readFile} from 'node:fs/promises';
import {recordOutcome,performField} from './mission-helpers';
import {test,expect,type Page,type Locator} from '@playwright/test';

test.use({launchOptions:{args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']}});
test.setTimeout(120000);

async function launch(page:Page,path:string,detailed=false){
 await page.goto(path);
 await page.locator('[data-world-launch]').click();
 await expect(page.locator('[data-world-canvas] canvas')).toBeVisible({timeout:45000});
 await expect(page.locator('[data-world-loading]')).toBeHidden({timeout:45000});
 if(!detailed)await page.locator('[data-world-quality]').selectOption('low');
 return page.locator('[data-academy-world]');
}
async function assertCursorUnlocked(page:Page,scene:Locator){
 await expect(scene).toHaveAttribute('data-world-mouse-look','false');
 await expect(scene).toHaveAttribute('data-world-look-mode','drag');
 await expect.poll(()=>page.evaluate(()=>document.pointerLockElement===null)).toBe(true);
 await expect(scene.locator('[data-immersive-look]')).toHaveAttribute('aria-pressed','false');
}
async function expand(page:Page,scene:Locator){
 await scene.locator('[data-world-fullscreen]').click();
 await expect(scene).toHaveAttribute('data-immersive','true');
 await expect(scene.locator('[data-immersive-console]')).toBeVisible();
 // Every lab, assignment, project and demonstration starts with usable controls.
 await assertCursorUnlocked(page,scene);
 await scene.locator('[data-world-canvas] canvas').focus();
 await page.keyboard.press('x');
 await expect(scene).toHaveAttribute('data-world-look-mode',/locked|free/,{timeout:20000});
 await expect(scene.locator('[data-immersive-look]')).toHaveAttribute('aria-pressed','true');
 await page.keyboard.press('x');
 await assertCursorUnlocked(page,scene);
 await page.screenshot({path:test.info().outputPath('immersive-instructions.png')});
 return scene.locator('[data-immersive-console]');
}
async function nextFrames(page:Page){
 await page.evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));
}
async function unlockedCameraUsesDrag(page:Page,scene:Locator){
 const canvas=scene.locator('[data-world-canvas] canvas');
 const rect=(await canvas.boundingBox())!;
 // Keep the scene stationary so a camera change can only come from our input.
 await scene.locator('[data-world-pause]').click();
 await expect(scene.locator('[data-world-pause]')).toHaveAttribute('aria-pressed','true');
 await canvas.hover({position:{x:25,y:rect.height*.5}});
 await nextFrames(page);
 const before=await scene.getAttribute('data-world-camera');
 await page.mouse.move(rect.x+80,rect.y+rect.height*.6,{steps:4});
 await nextFrames(page);
 expect(await scene.getAttribute('data-world-camera')).toBe(before);
 await page.mouse.down();
 await page.mouse.move(rect.x+150,rect.y+rect.height*.5,{steps:4});
 await page.mouse.up();
 await expect(scene).not.toHaveAttribute('data-world-camera',before!);
 await canvas.click({position:{x:25,y:rect.height*.5}});
 await assertCursorUnlocked(page,scene);
}
async function denyNativeApis(page:Page){
 await page.addInitScript(()=>{
  Object.defineProperty(document,'fullscreenEnabled',{configurable:true,value:true});
  Object.defineProperty(Element.prototype,'requestFullscreen',{configurable:true,value(){return Promise.reject(new DOMException('Fullscreen denied by test policy','NotAllowedError'));}});
  Object.defineProperty(Element.prototype,'requestPointerLock',{configurable:true,value(){return Promise.reject(new DOMException('Pointer lock denied by test policy','NotAllowedError'));}});
 });
}
async function viewFits(page:Page,scene:Locator){
 const bounds=await scene.evaluate(root=>{
  const panel=root.querySelector<HTMLElement>('[data-immersive-console]')!;
  const canvas=root.querySelector<HTMLElement>('[data-world-canvas]')!;
  const exit=root.querySelector<HTMLElement>('[data-immersive-exit]')!;
  const buttons=[...root.querySelectorAll<HTMLElement>('[data-immersive-bar] button')].filter(node=>node.getClientRects().length).map(node=>({text:node.textContent,rect:node.getBoundingClientRect().toJSON()}));
  return {buttons,viewport:{width:innerWidth,height:innerHeight},root:root.getBoundingClientRect().toJSON(),panel:panel.getBoundingClientRect().toJSON(),canvas:canvas.getBoundingClientRect().toJSON(),exit:exit.getBoundingClientRect().toJSON(),exitReceivesPointer:exit.contains(document.elementFromPoint(exit.getBoundingClientRect().left+exit.clientWidth/2,exit.getBoundingClientRect().top+exit.clientHeight/2)),panelWidth:panel.clientWidth,panelScrollWidth:panel.scrollWidth};
 });
 expect(bounds.root.left).toBeGreaterThanOrEqual(-1);
 expect(bounds.root.right).toBeLessThanOrEqual(bounds.viewport.width+1);
 expect(bounds.root.bottom).toBeLessThanOrEqual(bounds.viewport.height+1);
 expect(bounds.panel.width).toBeGreaterThan(200);
 expect(bounds.panel.height).toBeGreaterThan(80);
 expect(bounds.panel.bottom).toBeLessThanOrEqual(bounds.viewport.height+1);
 expect(bounds.canvas.width).toBeGreaterThan(150);
 expect(bounds.canvas.height).toBeGreaterThan(100);
 expect(bounds.exitReceivesPointer).toBe(true);
 expect(bounds.exit.top).toBeGreaterThanOrEqual(0);
 expect(bounds.exit.bottom).toBeLessThanOrEqual(bounds.viewport.height);
 expect(bounds.panelScrollWidth).toBeLessThanOrEqual(bounds.panelWidth+1);
 for(let i=0;i<bounds.buttons.length;i++)for(let j=i+1;j<bounds.buttons.length;j++){
  const a=bounds.buttons[i]!,b=bounds.buttons[j]!;
  const overlaps=Math.min(a.rect.right,b.rect.right)-Math.max(a.rect.left,b.rect.left)>1&&Math.min(a.rect.bottom,b.rect.bottom)-Math.max(a.rect.top,b.rect.top)>1;
  expect(overlaps,'Fullscreen buttons overlap: '+a.text+' / '+b.text).toBe(false);
 }
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.screenshot({path:test.info().outputPath('immersive-'+bounds.viewport.width+'x'+bounds.viewport.height+'.png')});
}

test('native fullscreen starts unlocked; X toggles mouse-look, drag works, typing is safe and Tab releases',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 const scene=await launch(page,'sessions/week-04/',true);
 await scene.locator('[data-world-fullscreen]').click();
 await expect.poll(()=>page.evaluate(()=>document.fullscreenElement===document.querySelector('[data-academy-world]')),{timeout:20000}).toBe(true);
 await assertCursorUnlocked(page,scene);
 await unlockedCameraUsesDrag(page,scene);
 const canvas=scene.locator('[data-world-canvas] canvas');
 await canvas.focus();
 await page.keyboard.press('x');
 await expect.poll(()=>page.evaluate(()=>document.pointerLockElement===document.querySelector('[data-world-canvas] canvas')),{timeout:20000}).toBe(true);
 await expect(scene).toHaveAttribute('data-world-look-mode','locked');
 await expect(scene).toHaveAttribute('data-world-camera',/^-?[\d.]+,-?[\d.]+,-?[\d.]+$/);
 const before=await scene.getAttribute('data-world-camera');
 // Native capture is real. Headless Chromium cancels CDP absolute moves with
 // opposite recenter events, so exercise relative-delta integration explicitly.
 // tools/native-pointer-review.mjs separately verifies trusted OS-relative input.
 await canvas.evaluate(node=>{
  for(const [movementX,movementY] of [[0,0],[24,8],[24,8]])
   node.dispatchEvent(new MouseEvent('mousemove',{bubbles:true,movementX,movementY}));
 });
 await nextFrames(page);
 await expect(scene).not.toHaveAttribute('data-world-camera',before!);
 await page.keyboard.press('x');
 await assertCursorUnlocked(page,scene);
 await expect(scene).toHaveAttribute('data-immersive','true');
 const panel=scene.locator('[data-immersive-console]');
 await panel.locator('[data-training-controls]').getByRole('button',{name:'Release interlock',exact:true}).click();
 await expect(panel.locator('.training-readout')).toContainText('Released');
 const direction=panel.locator('[data-training-controls]').getByLabel('Predict output direction relative to the driver');
 await direction.selectOption('opposite');
 await direction.focus();await page.keyboard.press('x');
 await expect(direction).toHaveValue('opposite');
 await assertCursorUnlocked(page,scene);
 const reflection=panel.locator('[data-training-reflection]');
 const disclosure=reflection.locator('xpath=ancestor::details[1]');
 if(await disclosure.count())await disclosure.locator('summary').click();
 await reflection.focus();
 await page.keyboard.press('x');
 await expect(reflection).toHaveValue('x');
 await assertCursorUnlocked(page,scene);
 // A modifier shortcut and a held key must not toggle camera control.
 await canvas.focus();
 await page.keyboard.press('Control+x');
 await assertCursorUnlocked(page,scene);
 await scene.locator('[data-immersive-look]').click();
 await expect.poll(()=>page.evaluate(()=>document.pointerLockElement!==null),{timeout:20000}).toBe(true);
 await page.keyboard.down('x');
 await assertCursorUnlocked(page,scene);
 await page.keyboard.down('x');
 await assertCursorUnlocked(page,scene);
 await page.keyboard.up('x');
 await scene.locator('[data-immersive-look]').click();
 await expect.poll(()=>page.evaluate(()=>document.pointerLockElement!==null),{timeout:20000}).toBe(true);
 await page.keyboard.press('Tab');
 await assertCursorUnlocked(page,scene);
 await expect(scene.locator('[data-immersive-console]')).toBeFocused();
 await expect(scene).toHaveAttribute('data-immersive','true');
 await viewFits(page,scene);
 await page.keyboard.press('Escape');
 await expect(scene).toHaveAttribute('data-immersive','false');
 await expect.poll(()=>page.evaluate(()=>document.fullscreenElement===null)).toBe(true);
 await expect(scene.locator('[data-world-fullscreen]')).toBeFocused();
});

test('denied native APIs start unlocked and X toggles fallback look while panel choices and scrolling stay usable',async({page})=>{
 await denyNativeApis(page);
 await page.emulateMedia({reducedMotion:'reduce'});
 const scene=await launch(page,'sessions/week-04/',true);
 await scene.locator('[data-world-fullscreen]').click();
 await expect(scene).toHaveAttribute('data-immersive','true');
 await assertCursorUnlocked(page,scene);
 expect(await page.evaluate(()=>document.fullscreenElement)).toBeNull();
 expect(await page.evaluate(()=>document.pointerLockElement)).toBeNull();
 await unlockedCameraUsesDrag(page,scene);
 const canvas=scene.locator('[data-world-canvas] canvas');
 await canvas.focus();await page.keyboard.press('x');
 await expect(scene).toHaveAttribute('data-world-look-mode','free');
 await canvas.hover({position:{x:40,y:70}});
 const before=await scene.getAttribute('data-world-camera');
 const rect=await canvas.boundingBox();
 await page.mouse.move(rect!.x+100,rect!.y+90);
 await expect(scene).not.toHaveAttribute('data-world-camera',before!);
 const initial=Number(await scene.getAttribute('data-world-zoom'));
 await page.mouse.wheel(0,-200);
 await expect.poll(async()=>Number(await scene.getAttribute('data-world-zoom'))).toBeLessThan(initial);
 const closer=Number(await scene.getAttribute('data-world-zoom'));
 await page.mouse.wheel(0,160);
 await expect.poll(async()=>Number(await scene.getAttribute('data-world-zoom'))).toBeGreaterThan(closer);
 await page.keyboard.press('x');
 await assertCursorUnlocked(page,scene);
 const panel=scene.locator('[data-immersive-console]');
 const zoom=await scene.getAttribute('data-world-zoom');
 await panel.hover({position:{x:30,y:60}});
 await page.mouse.wheel(0,450);
 await expect.poll(()=>panel.evaluate(node=>node.scrollTop)).toBeGreaterThan(0);
 expect(await scene.getAttribute('data-world-zoom')).toBe(zoom);
 await scene.locator('[data-world-zoom-in]').click();
 await expect.poll(async()=>Number(await scene.getAttribute('data-world-zoom'))).toBeLessThan(Number(zoom));
 await panel.locator('[data-training-controls]').getByRole('button',{name:'Release interlock',exact:true}).click();
 await panel.locator('[data-training-phase="check"]').click();
 await expect(panel.locator('[data-training-confirm-dialog]')).toBeVisible();
 await panel.locator('[data-training-confirm-cancel]').click();
 await expect(panel.locator('.training-readout')).toContainText('Released');
 await expect(scene).toHaveAttribute('data-immersive','true');
 await assertCursorUnlocked(page,scene);
 await canvas.focus();await page.keyboard.press('x');
 await expect(scene).toHaveAttribute('data-world-look-mode','free');
 await page.keyboard.press('Tab');
 await assertCursorUnlocked(page,scene);
 await expect(panel).toBeFocused();
 await viewFits(page,scene);
 await scene.locator('[data-immersive-exit]').click();
 await expect(scene).toHaveAttribute('data-immersive','false');
});

test('all mechanism phases can be completed, explained and saved inside fullscreen without losing state on return',async({page})=>{
 test.setTimeout(180000);
 const scene=await launch(page,'sessions/week-04/');
 const panel=await expand(page,scene);
 for(const phase of ['practice','check','transfer'] as const){
  if(phase!=='practice'){
   await panel.locator('[data-training-phase="'+phase+'"]').click();
   await expect(panel.locator('[data-training-confirm-dialog]')).toBeVisible();
   if(phase==='check'){
    await page.keyboard.press('Escape');
    await expect(panel.locator('[data-training-confirm-dialog]')).toBeHidden();
    await expect(scene).toHaveAttribute('data-immersive','true');
    await expect(panel.locator('[data-training-phase="practice"]')).toHaveAttribute('aria-pressed','true');
    await panel.locator('[data-training-phase="'+phase+'"]').click();
   }
   await panel.locator('[data-training-confirm-accept]').click();
   await expect(scene).toHaveAttribute('data-immersive','true');
  }
  const c=panel.locator('[data-training-controls]');
  await c.getByRole('button',{name:'Release interlock',exact:true}).click();
  await c.getByRole('button',{name:'Rotate cam 90°',exact:true}).click();
  if(phase!=='transfer')await c.getByRole('button',{name:'Rotate cam 90°',exact:true}).click();
  await c.getByRole('button',{name:'Attach return spring',exact:true}).click();
  const changes=phase==='check'?2:phase==='transfer'?1:0;
  for(let i=0;i<changes;i++)await c.getByRole('button',{name:'Change driven gear (12 → 24 → 36)',exact:true}).click();
  await c.getByLabel('Predict output direction relative to the driver').selectOption('opposite');
  await panel.locator('[data-training-test]').click();
  await expect(panel.locator('[data-training-result]')).toHaveAttribute('data-skill-verified','true');
  const field=panel.locator('[data-field-operation]');
  await field.locator('[data-field-inspect]').click();
  await field.locator('[data-field-execute]').click();
  await field.locator('[data-field-collect]').click();
  const checkpoints=field.locator('[data-field-checkpoint]');
  for(let i=0;i<await checkpoints.count();i++)await checkpoints.nth(i).click();
  await field.locator('[data-field-deliver]').click();
  // Delivery includes actual travel to the receiver, with the scene's bounded arrival deadline.
  await expect(field).toHaveAttribute('data-field-state','complete',{timeout:30000});
  await expect(panel.locator('[data-training-result]')).toHaveAttribute('data-complete','true');
  const reflection=panel.locator('[data-training-reflection]');
  // The written account follows the completed practical check, still in the same fullscreen panel.
  const disclosure=reflection.locator('xpath=ancestor::details[1]');
  if(await disclosure.count())await disclosure.evaluate(node=>(node as HTMLDetailsElement).open=true);
  await reflection.fill('I released the interlock before setting the cam and verified the gear ratio against the changed input turns in '+phase+'.');
  await panel.locator('[data-training-save]').click();
  await expect(panel.locator('[data-training-save-status]')).toContainText('local skills passport');
 }
 await viewFits(page,scene);
 const finalReadout=await panel.locator('.training-readout').textContent();
 await scene.locator('[data-immersive-exit]').click();
 await expect(scene).toHaveAttribute('data-immersive','false');
 await expect(page.locator('[data-training-controls]')).toHaveCount(1);
 expect(await page.locator('.training-readout').textContent()).toBe(finalReadout);
 await expect(page.locator('[data-training-reflection]')).toHaveValue(/in transfer/);
 const restored=await expand(page,scene);
 expect(await restored.locator('.training-readout').textContent()).toBe(finalReadout);
 await expect(restored.locator('[data-training-reflection]')).toHaveValue(/in transfer/);
 await scene.locator('[data-immersive-exit]').click();
 await page.reload();
 await expect(page.locator('[data-training-reflection]')).toHaveValue(/in transfer/);
 await expect(page.locator('.training-readout')).toContainText('90°');
});

test('A1 can be completed and its real assessment record exported without leaving fullscreen',async({page})=>{
 const scene=await launch(page,'assessments/assignment-1/');
 const panel=await expand(page,scene);
 for(const item of ['lens','spool','tile','map','manifest'])await panel.locator('[data-inspect="'+item+'"]').click();
 await panel.locator('[data-recall] input').fill('lens, spool, tile');
 await panel.locator('[data-recall] button').click();
 await panel.locator('[data-orient] select').selectOption('90');
 await panel.locator('[data-orient] button').click();
 await panel.locator('[data-role="systems"]').click();
 await panel.locator('[data-zone="workshop"]').click();
 await panel.locator('[data-follower]').selectOption('24');
 await panel.locator('[data-brake]').check();
 await panel.locator('[data-turn]').click();
 await panel.locator('[data-zone="dispatch"]').click();
 await performField(panel);
 await panel.locator('[data-ending="physical"]').click();
 await expect(panel.locator('[data-debrief]')).toBeVisible();
 const download=page.waitForEvent('download');
 await panel.locator('[data-export-mission]').click();
 const record=await readFile((await (await download).path())!,'utf8');
 expect(record).toContain('Debrief');
 expect(record).toContain('Bronze lens');
 await expect(scene).toHaveAttribute('data-immersive','true');
 await viewFits(page,scene);
});

test('A2 keeps paired restoration controls and the exported relay record inside fullscreen',async({page})=>{
 const scene=await launch(page,'assessments/assignment-2/');
 const panel=await expand(page,scene);
 await panel.locator('[data-role="systems"]').click();await panel.locator('[data-zone="power"]').click();
 await panel.locator('[data-measure]').click();await panel.locator('[data-fuse]').selectOption('intact');await panel.locator('[data-switch]').check();
 await panel.locator('[data-role="investigator"]').click();await panel.locator('[data-zone="control"]').click();
 await panel.locator('[data-replica] select').selectOption('A');await panel.locator('[data-replica] button').click();await panel.locator('[data-policy] button').click();
 await panel.locator('[data-role="coordinator"]').click();await panel.locator('[data-zone="archive"]').click();
 await panel.locator('[data-handoff] [name=item]').selectOption('verified archive');await panel.locator('[data-handoff] [name=destination]').selectOption('dispatch');await panel.locator('[data-handoff] [name=condition]').selectOption('after integrity check');await panel.locator('[data-handoff] button').click();
 await panel.locator('[data-zone="dispatch"]').click();await performField(panel);await panel.locator('[data-ending="digital"]').click();
 await expect(panel.locator('[data-debrief]')).toBeVisible();
 const download=page.waitForEvent('download');await panel.locator('[data-export-mission]').click();
 const record=await readFile((await (await download).path())!,'utf8');
 expect(record).toContain('Debrief');expect(record).toContain('Archive A');
 await expect(scene).toHaveAttribute('data-immersive','true');await viewFits(page,scene);
});

test('the final project keeps roles, areas, plan versions, resolution and export together in fullscreen',async({page})=>{
 const scene=await launch(page,'operation/');
 const panel=await expand(page,scene);
 const role=(id:string)=>panel.locator('[data-role="'+id+'"]').click();
 const zone=(id:string)=>panel.locator('[data-zone="'+id+'"]').click();
 await panel.locator('[data-field-inspect]').click();
 await scene.locator('[data-immersive-task]').click();
 // The task control opens guidance. Travel and responsibility are explicit actions.
 await role('coordinator');await zone('dispatch');
 await expect(panel.locator('[data-role="coordinator"]')).toHaveAttribute('aria-pressed','true');
 await expect(panel.locator('[data-zone="dispatch"]')).toHaveAttribute('aria-current','location');
 await panel.locator('[data-plan] textarea').fill('Version 1: inspect the source, restore power and the cradle, then use the upper passage for recovery.');
 await panel.locator('[data-plan] button').click();
 await role('observer');await zone('arrival');
 for(const item of ['lens','spool','tile','map','manifest'])await panel.locator('[data-inspect="'+item+'"]').click();
 await panel.locator('[data-recall] input').fill('tile, lens, spool');await panel.locator('[data-recall] button').click();
 await panel.locator('[data-orient] select').selectOption('180');await panel.locator('[data-orient] button').click();
 await role('investigator');await zone('control');await panel.locator('[data-replica] select').selectOption('A');await panel.locator('[data-replica] button').click();
 await role('systems');await zone('workshop');
 await panel.locator('[data-follower]').selectOption('36');await panel.locator('[data-brake]').check();await panel.locator('[data-turn]').click();
 await zone('power');await panel.locator('[data-measure]').click();await panel.locator('[data-fuse]').selectOption('intact');await panel.locator('[data-switch]').check();
 await role('investigator');await zone('control');
 await panel.locator('[data-policy] button').click();
 await role('coordinator');await zone('archive');
 await panel.locator('[data-agreement] input[type=checkbox]').check();await panel.locator('[data-agreement] input[name=recipient]').fill('Meridian custodian');await panel.locator('[data-agreement] button').click();
 await panel.locator('[data-handoff] [name=item]').selectOption('verified archive');await panel.locator('[data-handoff] [name=destination]').selectOption('dispatch');await panel.locator('[data-handoff] [name=condition]').selectOption('after integrity check');await panel.locator('[data-handoff] button').click();
 await role('observer');await panel.locator('[data-route] select').selectOption('upper');await panel.locator('[data-route] button').click();
 await role('coordinator');await zone('dispatch');
 await panel.locator('[data-plan] textarea').fill('Version 2: retain the original with its custodian, verify Archive A against the current signed source and use the tested powered upper route.');
 await panel.locator('[data-plan] button').click();
 await expect(panel.locator('[data-plans]')).toContainText('Version 1:');
 await expect(panel.locator('[data-plans]')).toContainText('Version 2:');
 await recordOutcome(panel,'digital');
 await panel.locator('[data-ending="digital"]').click();
 await expect(panel.locator('[data-debrief]')).toBeVisible();
 await expect(panel.locator('[data-ending-text]')).toContainText('Verified digital copy recovered');
 const download=page.waitForEvent('download');await panel.locator('[data-export-mission]').click();
 const record=await readFile((await (await download).path())!,'utf8');
 expect(record).toContain('Version 1:');expect(record).toContain('Version 2:');
 await expect(scene).toHaveAttribute('data-immersive','true');
 await viewFits(page,scene);
 await panel.locator('[data-debrief]').scrollIntoViewIfNeeded();
 await page.screenshot({path:test.info().outputPath('recovery-debrief.png')});
});

test('worked-example chapters and response controls stay usable in fullscreen and remain separate from coursework',async({page})=>{
 const scene=await launch(page,'demonstrations/lab-04/?mode=control');
 const saved=await page.evaluate(()=>localStorage.getItem('mastermind:SLOP4408:v2'));
 const panel=await expand(page,scene);
 await panel.locator('[data-demo-jump="2"]').click();
 await expect(panel.locator('[data-demo-form]')).toBeVisible();
 await panel.locator('[data-demo-input="cam"]').fill('270');
 await panel.locator('[data-demo-form]').getByRole('button',{name:'Test my decision',exact:true}).click();
 await expect(panel.locator('[data-demo-feedback]')).toHaveAttribute('data-correct','true');
 await expect(panel.locator('[data-demo-feedback]')).toContainText('cam');
 await panel.locator('.demo-finished summary').click();
 await expect(panel.locator('.demo-finished details')).toHaveAttribute('open','');
 const exampleDownload=page.waitForEvent('download');
 await panel.locator('[data-demo-download]').click();
 expect((await readFile((await (await exampleDownload).path())!,'utf8')).length).toBeGreaterThan(200);
 await panel.locator('[data-demo-reset]').click();
 await expect(panel.locator('[data-demo-reset-dialog]')).toBeVisible();
 await panel.locator('[data-demo-reset-cancel]').click();
 await expect(panel.locator('[data-demo-input="cam"]')).toHaveValue('270');
 await expect(scene).toHaveAttribute('data-immersive','true');
 expect(await page.evaluate(()=>localStorage.getItem('mastermind:SLOP4408:v2'))).toBe(saved);
 await viewFits(page,scene);
 await scene.locator('[data-immersive-exit]').click();
 await expect(page.locator('[data-demo-input="cam"]')).toHaveValue('270');
});

test('expanded view responds to resizing and touch controls when native fullscreen is unavailable',async({browser,baseURL})=>{
 const context=await browser.newContext({baseURL,viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 try{
  const page=await context.newPage();await denyNativeApis(page);
  const scene=await launch(page,'sessions/week-04/');
  await scene.locator('[data-world-fullscreen]').click();
  await expect(scene).toHaveAttribute('data-immersive','true');
  await expect(scene).toHaveAttribute('data-world-mouse-look','false');
  await viewFits(page,scene);
  const before=Number(await scene.getAttribute('data-world-zoom'));
  await scene.locator('[data-world-zoom-in]').tap();
  await expect.poll(async()=>Number(await scene.getAttribute('data-world-zoom'))).toBeLessThan(before);
  for(const viewport of [{width:320,height:700},{width:844,height:390},{width:768,height:1024}]){
   await page.setViewportSize(viewport);await viewFits(page,scene);
  }
  await scene.locator('[data-immersive-exit]').tap();
  await expect(scene).toHaveAttribute('data-immersive','false');
 }finally{await context.close();}
});
