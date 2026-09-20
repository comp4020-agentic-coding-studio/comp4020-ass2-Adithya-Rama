import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const output='.browser-independent-learning';await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--disable-gpu']});const results=[];const errors=[];
try{
 for(const [name,width,height] of [['desktop',1920,1080],['phone',390,844],['narrow',320,844],['tablet',768,1024]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));
  for(const [label,route,selector] of [['guide','course-guide/','#overview'],['observation','sessions/week-01/','[data-training-controls]'],['diagnosis','sessions/week-05/','[data-training-controls]'],['negotiation','sessions/week-09/','[data-training-controls]'],['example','demonstrations/lab-02/','[aria-label="Learning method"]'],['final','operation/','[data-mission-progress]']]){
   const response=await page.goto('http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/'+route,{waitUntil:'networkidle'});
   const focus=page.locator(selector).first();await focus.scrollIntoViewIfNeeded();
   await page.screenshot({path:output+'/'+label+'-'+name+'.jpg',type:'jpeg',quality:85});
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
   results.push({page:label,viewport:{width,height},status:response.status(),overflow});
  }
  await page.close();
 }
}finally{await browser.close();await writeFile(output+'/review.json',JSON.stringify({capturedAt:new Date().toISOString(),results,errors},null,2));}
if(errors.length||results.some(r=>r.status!==200||r.overflow))throw new Error('Independent learning review found a runtime, response or overflow failure');
console.log(JSON.stringify({pageViewportCombinations:results.length,viewports:4,errors}));