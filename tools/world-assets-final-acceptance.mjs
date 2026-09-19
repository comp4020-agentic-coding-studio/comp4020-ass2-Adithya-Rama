import {chromium} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const base=process.env.COURSE_BASE_URL||'http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/';
const page=await browser.newPage({viewport:{width:1920,height:1080}}),errors=[],results=[];
page.on('pageerror',e=>errors.push(e.message));
async function load(id){
 await page.goto(base+'demonstrations/'+id+'/',{waitUntil:'networkidle'});
 await page.locator('[data-demo-speed]').selectOption('1.35');
 return page.locator('[data-demo-definition]').evaluate(n=>JSON.parse(n.textContent));
}
async function watch(definition,id){
 const index=definition.steps.findIndex(s=>s.id===id);if(index<0)throw new Error('Missing chapter '+id);
 await page.locator('[data-demo-jump="'+index+'"]').click();
 await page.locator('[data-demo-watch]').click();
 await page.locator('[data-world-canvas] canvas').waitFor({state:'visible',timeout:60000});
 await page.locator('[data-world-loading]').waitFor({state:'hidden',timeout:60000});
 await page.waitForFunction(id=>document.querySelector('[data-academy-world]')?.dataset.worldDemoStep===id,id,{timeout:60000});
 await page.waitForTimeout(1800);
}
async function after(id){
 await page.waitForFunction(id=>{const n=document.querySelector('[data-academy-world]');return n?.dataset.worldDemoStep===id&&n.dataset.worldDemoPhase==='after'},id,{timeout:90000});
 await page.waitForTimeout(1800);
}
async function capture(name){
 const bounds=await page.evaluate(()=>{
  const rect=s=>{const r=document.querySelector(s).getBoundingClientRect();return{top:r.top,bottom:r.bottom,height:r.height,width:r.width}};
  const theatre=rect('.demo-theatre'),canvas=rect('[data-world-canvas]'),caption=rect('.demo-caption');
  return{viewport:{width:innerWidth,height:innerHeight},theatre,canvas,caption,captionText:document.querySelector('[data-demo-caption]').textContent,mode:document.querySelector('.demo-player').dataset.mode,step:document.querySelector('[data-academy-world]').dataset.worldDemoStep,phase:document.querySelector('[data-academy-world]').dataset.worldDemoPhase,header:rect('header'),overflow:document.documentElement.scrollWidth>innerWidth,theatreFits:theatre.top>=0&&theatre.bottom<=innerHeight,captionFits:caption.top>=0&&caption.bottom<=innerHeight};
 });
 await page.screenshot({path:'docs/evidence/'+name+'-viewport.png'});
 await page.locator('[data-world-canvas]').screenshot({path:'docs/evidence/'+name+'-canvas.png'});
 results.push({name,...bounds});
}
try{
 let definition;
 if(!process.env.CAPTION_REVIEW_ONLY){
 definition=await load('lab-03');await watch(definition,'rotate');await capture('demo-accepted-spatial-before');
 await after('rotate');await capture('demo-accepted-spatial-after');
 await page.setViewportSize({width:390,height:844});
 definition=await load('lab-03');await watch(definition,'rotate');await capture('demo-accepted-spatial-mobile');
 await page.locator('button[data-demo-control]').click();await page.waitForTimeout(500);
 results.push({name:'mobile-takeover',canvasHeight:await page.locator('[data-world-canvas]').evaluate(n=>n.getBoundingClientRect().height),hud:await page.locator('.world-hud').isVisible(),equipment:await page.locator('[data-world-equipment]').isVisible(),form:await page.locator('[data-demo-form]').isVisible(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
 await page.locator('.academy-world').screenshot({path:'docs/evidence/demo-accepted-takeover-mobile.png'});
 await page.setViewportSize({width:1920,height:1080});
 definition=await load('lab-10');const grid=definition.steps.find(s=>s.id==='map');await watch(definition,grid.id);await capture('demo-accepted-route-grid');
 }
 await page.setViewportSize({width:1920,height:1080});
 definition=await load('assessment-final');await watch(definition,'baseline');await capture('demo-accepted-long-caption-desktop');
 await page.setViewportSize({width:390,height:844});
 definition=await load('assessment-final');await watch(definition,'baseline');await capture('demo-accepted-long-caption-mobile');
 const report={environment:'Local production preview; Chromium with SwiftShader',base,method:'Used real chapter and Watch controls. No manual scroll or DOM camera injection. Bounds were measured before screenshot helpers could reposition elements.',errors,results};
 await writeFile('docs/evidence/'+(process.env.CAPTION_REVIEW_ONLY?'demo-long-caption-review.json':'demo-final-acceptance-review.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}