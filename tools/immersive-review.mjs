import {chromium} from '@playwright/test';
import {readdir, writeFile, mkdir} from 'node:fs/promises';
const base = process.env.COURSE_BASE_URL || 'http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/';
const packages = await readdir('node_modules/.pnpm');
const axe = 'node_modules/.pnpm/'+packages.find(name=>name.startsWith('axe-core@'))+'/node_modules/axe-core/axe.min.js';
await mkdir('.browser-immersive-review',{recursive:true});
const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const results=[];
try {
 for (const viewport of [{width:1920,height:1080},{width:390,height:844}]) {
  for (const route of ['sessions/week-01/','operation/','demonstrations/assessment-final/']) {
   const page=await browser.newPage({viewport});
   await page.goto(base+route);
   await page.locator('[data-world-launch]').click();
   await page.locator('[data-world-toolbar]').waitFor({state:'visible',timeout:60000});
   await page.locator('[data-world-quality]').selectOption('low');
   await page.locator('[data-world-fullscreen]').click();
   await page.waitForFunction(()=>document.querySelector('[data-academy-world]')?.getAttribute('data-immersive')==='true');
   await page.keyboard.press('Tab');
   await page.locator('[data-immersive-controls]').click();
   await page.addScriptTag({path:axe});
   const violations=await page.evaluate(async()=> (await window.axe.run(document.querySelector('[data-academy-world]'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
   const name=route.replaceAll('/','-')+viewport.width;
   await page.screenshot({path:'.browser-immersive-review/'+name+'.png'});
   results.push({route,viewport,violations});
   await page.close();
  }
 }
 await writeFile('.browser-immersive-review/results.json',JSON.stringify(results,null,2));
 console.log(JSON.stringify(results,null,2));
 if(results.some(result=>result.violations.length))process.exitCode=1;
} finally { await browser.close(); }
