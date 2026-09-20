import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const output='.browser-course-overview';await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--disable-gpu']});
const results=[];const errors=[];
try{
 for(const [name,width,height] of [['desktop',1920,1080],['phone',390,844],['narrow',320,844],['tablet',768,1024]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));
  for(const [label,route] of [['home',''],['guide','course-guide/'],...(name==='desktop'||name==='phone'?[['people','people/'],['lab','sessions/week-05/'],['assessment','assessments/assignment-1/'],['final','assessments/final-project/']]:[])]){
   const response=await page.goto('http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/'+route,{waitUntil:'networkidle'});
   const metrics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,headings:[...document.querySelectorAll('main h1,main h2')].map(el=>el.textContent?.trim()),clipped:[...document.querySelectorAll('.course-introduction h1,.course-introduction p,.study-route-options p,.academic-sidebar dd')].filter(el=>el.scrollWidth>el.clientWidth+2).map(el=>el.textContent)}));
   await page.screenshot({path:output+'/'+label+'-'+name+'.jpg',type:'jpeg',quality:85});
   if(label==='home'){await page.locator('#overview').screenshot({path:output+'/overview-'+name+'.jpg',type:'jpeg',quality:85});}
   results.push({page:label,viewport:{width,height},status:response.status(),...metrics});
  }
  await page.close();
 }
}finally{await browser.close();await writeFile(output+'/review.json',JSON.stringify({capturedAt:new Date().toISOString(),results,errors},null,2));}
if(errors.length||results.some(r=>r.status!==200||r.overflow||r.clipped.length))throw new Error('Academic page review found a runtime, overflow or clipping failure');
console.log(JSON.stringify({pages:results.length,viewports:4,errors}));