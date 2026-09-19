import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

// Supplemental layout evidence. The main browser suite owns full 3D journeys.
// This helper does not activate WebGL and does not imply real-device performance.
const base = process.env.COURSE_BASE_URL ?? 'http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/';
const output = 'docs/evidence/responsive';
const viewports = [
  { name: 'small-phone', width: 320, height: 667 },
  { name: 'tablet-portrait', width: 768, height: 1024 },
  { name: 'tablet-landscape', width: 1024, height: 768 },
  { name: 'laptop', width: 1440, height: 900 },
  { name: 'phone-landscape', width: 844, height: 390 },
];
const routes = [
  '', 'academy/', 'sessions/week-02/', 'sessions/week-04/',
  'sessions/week-07/', 'sessions/week-11/', 'assessments/',
  'assessments/fieldwork/', 'assessments/assignment-1/',
  'assessments/assignment-2/', 'assessments/final-project/',
  'operation/', 'demonstrations/', 'demonstrations/lab-04/?mode=control',
  'demonstrations/assessment-final/?mode=control', 'lectures/week-07/',
];
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const report = { generatedAt: new Date().toISOString(), scope: 'Chromium layout and semantic controls; no claim about every device, browser or GPU performance', viewports, pages: [], heroBreakpoints: [], navigation: [], resize: [], staticExamples: [], failures: [] };
const failure = (scope, message) => report.failures.push({ scope, message });
async function layout(page) {
  return page.evaluate(() => {
    const shown = node => {
      const style = getComputedStyle(node);
      return node.getClientRects().length > 0 && style.visibility !== 'hidden' && style.display !== 'none';
    };
    const controls = [...document.querySelectorAll('.academy-page button, .academy-page input, .academy-page textarea, .academy-page select, .academy-page summary, .course-navigation a')].filter(shown);
    const clippedControls = [];
    for (const node of controls) {
      const rect = node.getBoundingClientRect();
      const label = (node.getAttribute('aria-label') || node.textContent || node.name || node.id || node.tagName).trim().slice(0, 140);
      if (rect.left < -1 || rect.right > innerWidth + 1) clippedControls.push({ label, reason: 'outside horizontal viewport', left: rect.left, right: rect.right });
      for (let parent = node.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
        const style = getComputedStyle(parent);
        if (!['hidden', 'clip'].includes(style.overflowX) && !['hidden', 'clip'].includes(style.overflowY)) continue;
        const bounds = parent.getBoundingClientRect();
        const horizontal = ['hidden', 'clip'].includes(style.overflowX) && (rect.left < bounds.left - 1 || rect.right > bounds.right + 1);
        const vertical = ['hidden', 'clip'].includes(style.overflowY) && (rect.top < bounds.top - 1 || rect.bottom > bounds.bottom + 1);
        if (horizontal || vertical) {
          clippedControls.push({ label, reason: 'clipped by ancestor', ancestor: parent.className, horizontal, vertical });
          break;
        }
      }
    }
    const heroTextClips = [];
    const hero = document.querySelector('.academy-hero');
    const heroCopy = document.querySelector('.hero-copy');
    if (hero && heroCopy) {
      const heroBounds = hero.getBoundingClientRect();
      const copyBounds = heroCopy.getBoundingClientRect();
      const copyStyle = getComputedStyle(heroCopy);
      const bounds = { left: Math.max(heroBounds.left, copyBounds.left + parseFloat(copyStyle.paddingLeft)), right: Math.min(heroBounds.right, copyBounds.right - parseFloat(copyStyle.paddingRight)), top: heroBounds.top, bottom: heroBounds.bottom };
      const walker = document.createTreeWalker(heroCopy, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (!node.textContent.trim() || !shown(node.parentElement)) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        for (const rect of range.getClientRects()) {
          if (rect.left < bounds.left - 1 || rect.right > bounds.right + 1 || rect.top < bounds.top - 1 || rect.bottom > bounds.bottom + 1) heroTextClips.push({ text: node.textContent.trim(), left: rect.left, right: rect.right, heroLeft: bounds.left, heroRight: bounds.right });
        }
      }
    }
    const navigation = [...document.querySelectorAll('.course-navigation a')].map(node => ({ text: node.textContent.trim(), href: node.getAttribute('href'), visible: shown(node) }));
    return { viewportWidth: innerWidth, documentWidth: document.documentElement.scrollWidth, overflow: document.documentElement.scrollWidth > innerWidth + 1, controlCount: controls.length, clippedControls, heroTextClips, navigation };
  });
}
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    for (const route of routes) {
      const errors = [];
      const listener = error => errors.push(error.message);
      page.on('pageerror', listener);
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      const expanded = page.locator('.demo-finished details');
      if (await expanded.count()) await expanded.locator('summary').click();
      const metrics = await layout(page);
      const item = { route, viewport: viewport.name, status: response.status(), errors, ...metrics };
      report.pages.push(item);
      if (item.status !== 200 || errors.length || metrics.overflow || metrics.clippedControls.length || metrics.heroTextClips.length || metrics.navigation.length !== 6 || metrics.navigation.some(link => !link.visible)) failure(viewport.name + ':' + route, JSON.stringify(item));
      if ((viewport.name === 'small-phone' && ['', 'sessions/week-04/', 'demonstrations/assessment-final/?mode=control'].includes(route)) || (viewport.name === 'phone-landscape' && route === 'operation/') || (viewport.name === 'tablet-portrait' && route === 'demonstrations/')) {
        if (route.includes('week-04')) await page.locator('[data-training-controls]').scrollIntoViewIfNeeded();
        if (route.includes('assessment-final')) await page.locator('.demo-finished').scrollIntoViewIfNeeded();
        await page.screenshot({ path: output + '/' + viewport.name + '-' + (route.replace(/[^a-z0-9]+/gi, '-') || 'home') + '.png' });
      }
      page.off('pageerror', listener);
    }
    await page.goto(base, { waitUntil: 'networkidle' });
    const assessments = page.locator('.course-navigation').getByRole('link', { name: 'Assessments', exact: true });
    await assessments.focus();
    await page.keyboard.press('Enter');
    await page.waitForURL(base + 'assessments/');
    report.navigation.push({ viewport: viewport.name, keyboardNavigation: 'Assessments reached with Enter', url: page.url() });
    await context.close();
  }

  const heroContext = await browser.newContext({ viewport: { width: 1920, height: 1080 }, reducedMotion: 'reduce' });
  const heroPage = await heroContext.newPage();
  await heroPage.goto(base, { waitUntil: 'networkidle' });
  for (const width of [320, 360, 375, 380, 381, 390, 430, 600, 601, 768, 900, 901, 1024, 1199, 1200, 1440, 1920]) {
    await heroPage.setViewportSize({ width, height: 900 });
    const metrics = await layout(heroPage);
    report.heroBreakpoints.push({ width, overflow: metrics.overflow, heroTextClips: metrics.heroTextClips });
    if (metrics.overflow || metrics.heroTextClips.length) failure('hero-breakpoint:' + width, JSON.stringify(report.heroBreakpoints.at(-1)));
  }
  await heroContext.close();

  const resizeContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const resizePage = await resizeContext.newPage();
  await resizePage.goto(base + 'sessions/week-04/', { waitUntil: 'networkidle' });
  const bench = resizePage.locator('[data-training-controls]');
  await bench.getByRole('button', { name: 'Release interlock', exact: true }).click();
  await bench.getByRole('button', { name: 'Rotate cam 90°', exact: true }).click();
  await bench.getByRole('button', { name: 'Rotate cam 90°', exact: true }).click();
  const reflection = 'The cam kept its 180-degree position and released interlock while I resized the lesson.';
  await resizePage.locator('[data-training-reflection]').fill(reflection);
  for (const viewport of viewports) {
    await resizePage.setViewportSize({ width: viewport.width, height: viewport.height });
    const actualReflection = await resizePage.locator('[data-training-reflection]').inputValue();
    const actualReadout = await resizePage.locator('.training-readout').innerText();
    const metrics = await layout(resizePage);
    const preserved = actualReflection === reflection && actualReadout.includes('180°') && actualReadout.includes('Released');
    report.resize.push({ viewport: viewport.name, preserved, actualReadout, ...metrics });
    if (!preserved || metrics.overflow || metrics.clippedControls.length) failure('resize:' + viewport.name, JSON.stringify(report.resize.at(-1)));
  }
  await resizeContext.close();

  for (const viewport of [viewports[0], viewports[4]]) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, javaScriptEnabled: false, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto(base + 'demonstrations/assessment-final/', { waitUntil: 'networkidle' });
    await page.locator('.demo-transcript > summary').click();
    const summary = page.locator('.demo-finished details > summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    const text = await page.locator('.demo-example-document').innerText();
    const chapterCount = await page.locator('.demo-transcript > section').count();
    // Reach a real authored table using the page's native keyboard tab sequence.
    let focusedTable = false;
    for (let tab = 0; tab < 30; tab++) {
      await page.keyboard.press('Tab');
      focusedTable = await page.evaluate(() => document.activeElement?.matches('.demo-example-table table') ?? false);
      if (focusedTable) break;
    }
    const tableBefore = await page.evaluate(() => {
      const table = document.activeElement;
      return { tag: table?.tagName, scrollWidth: table?.scrollWidth, clientWidth: table?.clientWidth, scrollLeft: table?.scrollLeft };
    });
    for (let key = 0; key < 6; key++) await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(250);
    const tableAfter = await page.evaluate(() => document.activeElement?.scrollLeft);
    const keyboardScroll = tableBefore.scrollWidth <= tableBefore.clientWidth || tableAfter > tableBefore.scrollLeft;
    const metrics = await layout(page);
    const item = { viewport: viewport.name, scriptingDisabled: true, chapterCount, finishedExampleCharacters: text.length, containsVersion1: text.includes('Version 1'), focusedTable, tableBefore, tableAfter, keyboardScroll, ...metrics };
    report.staticExamples.push(item);
    if (chapterCount !== 18 || text.length < 10000 || !item.containsVersion1 || !focusedTable || !keyboardScroll || metrics.overflow || metrics.clippedControls.length) failure('no-script:' + viewport.name, JSON.stringify(item));
    await page.screenshot({ path: output + '/' + viewport.name + '-keyboard-table.png' });
    await context.close();
  }
} catch (error) {
  failure('helper', error.stack ?? String(error));
} finally {
  await browser.close();
  await writeFile(output + '/report.json', JSON.stringify(report, null, 2));
}
console.log(JSON.stringify({ pages: report.pages.length, heroBreakpoints: report.heroBreakpoints.length, navigationJourneys: report.navigation.length, resizeCases: report.resize.length, staticExamples: report.staticExamples.length, failures: report.failures }, null, 2));
if (report.failures.length) process.exitCode = 1;
