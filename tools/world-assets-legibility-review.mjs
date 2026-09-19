import {chromium} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const base=process.env.COURSE_BASE_URL||'http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/';
const page=await browser.newPage({viewport:{width:1920,height:1080}}),errors=[],results=[];
page.on('pageerror',e=>errors.push(e.message));
async function load(id){
 await page.goto(base+'demonstrations/'+id+'/',{waitUntil:'networkidle'});
 await page.locator('[data-demo-speed]').selectOption('1.35');
 await page.locator('[data-demo-watch]').click();
 await page.locator('[data-world-canvas] canvas').waitFor({state:'visible',timeout:60000});
 await page.locator('[data-world-loading]').waitFor({state:'hidden',timeout:60000});
 return page.locator('[data-demo-definition]').evaluate(n=>JSON.parse(n.textContent));
}
async function fit(name){

 await page.waitForTimeout(200);
 const bounds=await page.evaluate(()=>{const rect=s=>{const r=document.querySelector(s).getBoundingClientRect();return{top:r.top,bottom:r.bottom,height:r.height}};return{viewport:{width:innerWidth,height:innerHeight},theatre:rect('.demo-theatre'),canvas:rect('[data-world-canvas]'),caption:rect('.demo-caption'),overflow:document.documentElement.scrollWidth>innerWidth}});
 await page.screenshot({path:'docs/evidence/'+name+'-viewport.png'});results.push({name,...bounds});
}
try{
 await load('lab-03');
 await page.locator('[data-demo-jump="2"]').click();await page.waitForTimeout(500);
 await page.locator('[data-world-canvas]').screenshot({path:'docs/evidence/demo-spatial-final-before.png'});
 await page.locator('[data-demo-watch]').click();
 await page.waitForFunction(()=>{const n=document.querySelector('[data-academy-world]');return n?.dataset.worldDemoStep==='rotate'&&n.dataset.worldDemoPhase==='after'},undefined,{timeout:60000});
 await page.waitForTimeout(800);await page.locator('[data-demo-play]').click();
 await page.locator('[data-world-canvas]').screenshot({path:'docs/evidence/demo-spatial-final-after.png'});
 await fit('demo-final-desktop-fit');
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(300);
 await page.locator('[data-demo-jump="2"]').click();await page.locator('[data-demo-watch]').click();await page.waitForTimeout(500);
 await fit('demo-final-mobile-fit');
 await page.setViewportSize({width:1920,height:1080});
 if(!process.env.SPATIAL_REVIEW_ONLY){
 const policy=await load('lab-07');
 const index=policy.steps.findIndex(s=>s.controls.some(c=>c.id==='custodianApprove'));
 await page.locator('[data-demo-jump="'+index+'"]').click();await page.locator('button[data-demo-control]').click();
 const instrument=page.locator('[data-world-equipment]');
 await instrument.selectOption({label:'Archive record B'});await page.waitForTimeout(700);
 const toggle=page.locator('[data-demo-input="custodianApprove"]'),before=await toggle.isChecked();
 await page.locator('[data-world-canvas]').screenshot({path:'docs/evidence/demo-policy-final-before.png'});
 await toggle.setChecked(!before);await page.waitForTimeout(500);
 await page.locator('[data-world-canvas]').screenshot({path:'docs/evidence/demo-policy-final-after.png'});
 results.push({name:'live-policy',before,after:await toggle.isChecked(),step:await page.locator('[data-academy-world]').getAttribute('data-world-demo-step')});
 const final=await load('assessment-final');
 const manifestIndex=final.steps.findIndex(s=>s.after.room==='digital'&&s.after.items?.some(i=>i.text));
 if(manifestIndex<0)throw new Error('No final digital manifest frame');
 await page.locator('[data-demo-jump="'+manifestIndex+'"]').click();
 await page.locator('[data-demo-watch]').click();
 await page.waitForFunction(id=>{const n=document.querySelector('[data-academy-world]');return n?.dataset.worldDemoStep===id&&n.dataset.worldDemoPhase==='after'},final.steps[manifestIndex].id,{timeout:60000});
 await page.waitForTimeout(700);await page.locator('[data-demo-play]').click();
 await page.locator('[data-world-canvas]').screenshot({path:'docs/evidence/demo-final-manifest.png'});
 results.push({name:'manifest',step:final.steps[manifestIndex].id,items:final.steps[manifestIndex].after.items});
 }
 const grid=await load('lab-10');
 const gridIndex=grid.steps.findIndex(s=>s.before.room==='movement');
 await page.locator('[data-demo-jump="'+gridIndex+'"]').click();await page.waitForTimeout(400);
 await page.locator('[data-world-canvas]').screenshot({path:'docs/evidence/demo-route-final-overhead.png'});
 results.push({name:'route-grid',step:grid.steps[gridIndex].id,shot:grid.steps[gridIndex].before.shot});
 const report={environment:'Final local production preview; Chromium SwiftShader software renderer',base,errors,results};
 await writeFile('docs/evidence/'+(process.env.SPATIAL_REVIEW_ONLY?'demo-spatial-fit-review.json':'demo-legibility-review.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
