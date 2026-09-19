import {chromium} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
const base=process.env.COURSE_BASE_URL||'http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/';
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const errors=[],results=[];
try{
 for(const [name,width,height,id,step] of [['desktop',1920,1080,'lab-10','map'],['mobile',390,844,'assessment-final','baseline']]){
  const page=await browser.newPage({viewport:{width,height}});page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'demonstrations/'+id+'/',{waitUntil:'networkidle'});
  const definition=await page.locator('[data-demo-definition]').evaluate(n=>JSON.parse(n.textContent));
  const index=definition.steps.findIndex(s=>s.id===step);
  await page.locator('[data-demo-jump="'+index+'"]').click();await page.locator('[data-demo-watch]').click();
  await page.locator('[data-world-canvas] canvas').waitFor({state:'visible',timeout:60000});await page.locator('[data-world-loading]').waitFor({state:'hidden',timeout:60000});
  await page.waitForFunction(step=>document.querySelector('[data-academy-world]')?.dataset.worldDemoStep===step,step);await page.waitForTimeout(1000);
  const result=await page.evaluate(()=>{const r=document.querySelector('.demo-theatre').getBoundingClientRect();return{theatre:{top:r.top,bottom:r.bottom},viewport:{width:innerWidth,height:innerHeight},fits:r.top>=0&&r.bottom<=innerHeight,overflow:document.documentElement.scrollWidth>innerWidth,caption:document.querySelector('[data-demo-caption]').textContent,phase:document.querySelector('[data-academy-world]').dataset.worldDemoPhase};});
  await page.screenshot({path:'docs/evidence/demo-route-clear-'+name+'-viewport.png'});await page.locator('[data-world-canvas]').screenshot({path:'docs/evidence/demo-route-clear-'+name+'-canvas.png'});
  results.push({name,...result});await page.close();
 }
 const report={environment:'Rebuilt local production preview; Chromium with SwiftShader',method:'Real chapter and Watch controls; no manual scroll or injected scene. Targeted verification after moving the two stools outside the grid and fixing overhead north-up framing.',errors,results};
 await writeFile('docs/evidence/demo-route-clear-review.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}