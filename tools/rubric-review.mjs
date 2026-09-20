
import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const output='.browser-rubric-audit';
const base='http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/';
await mkdir(output,{recursive:true});
const report={capturedAt:new Date().toISOString(),browser:'',pages:[],slides:[],slowLoad:[],errors:[]};
const browser=await chromium.launch({headless:true,args:['--disable-gpu']});
report.browser=browser.version();
try{
for(const [label,width,height] of [['desktop',1920,1080],['phone',390,844]]){
 const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
 const page=await context.newPage();
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 for(const [name,route] of [['home',''],['course-guide','course-guide/'],['week-02','lectures/week-02/'],['week-07','lectures/week-07/'],['week-11','lectures/week-11/'],['assessment','assessments/final-project/'],['policies','policies/']]){
  const res=await page.goto(base+route,{waitUntil:'networkidle'});
  const metrics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,headings:[...document.querySelectorAll('main h1,main h2')].map(x=>x.textContent),height:document.documentElement.scrollHeight}));
  await page.screenshot({path:output+'/'+name+'-'+label+'.png'});
  if(name==='home')await page.locator('.course-orientation').screenshot({path:output+'/orientation-'+label+'.png'});
  report.pages.push({name,viewport:label,status:res.status(),...metrics});
 }
 await page.goto(base+'decks/week-07/',{waitUntil:'networkidle'});
 await page.locator('.slides>section.present').waitFor();
 for(let i=0;i<14;i++){
  const current=page.locator('.slides>section.present');
  const data=await current.evaluate(el=>{const r=el.getBoundingClientRect(); const nodes=[...el.querySelectorAll('h1,h2,p,td,th,button')].filter(x=>!x.closest('aside')&&x.getBoundingClientRect().width);return {title:el.querySelector('h1,h2')?.textContent,nav:el.querySelector('.deck-nav span')?.textContent,overflow:el.scrollWidth>el.clientWidth+1,textOutside:nodes.filter(x=>{const b=x.getBoundingClientRect();return b.left<Math.max(0,r.left)-2||b.right>Math.min(innerWidth,r.right)+2||b.top<Math.max(0,r.top)-2||b.bottom>Math.min(innerHeight,r.bottom)+2;}).map(x=>x.textContent)}});
  report.slides.push({slide:i+1,viewport:label,...data});
  await page.screenshot({path:output+'/slide-'+String(i+1).padStart(2,'0')+'-'+label+'.png'});
  if(i<13){await current.getByRole('button',{name:'Next →',exact:true}).click();await page.waitForFunction(n=>document.querySelector('.slides>section.present .deck-nav span')?.textContent?.trim()===n+' / 14',i+2);}
 }
 report.errors.push(...errors.map(message=>({viewport:label,message})));
 await context.close();
}
const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
const page=await context.newPage();const cdp=await context.newCDPSession(page);
await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:400,downloadThroughput:150*1024,uploadThroughput:75*1024});
const start=Date.now();await page.goto(base+'sessions/week-01/',{waitUntil:'domcontentloaded',timeout:90000});
const missionVisible=await page.getByRole('heading',{name:'Your mission, in plain language',exact:true}).count();
await page.locator('[data-training-controls] button').first().waitFor({state:'visible',timeout:90000});
const controlsReady=Date.now()-start;
await page.locator('[data-training-controls]').scrollIntoViewIfNeeded();
await page.screenshot({path:output+'/slow-phone-controls.png'});
report.slowLoad.push({viewport:'390x844',latencyMs:400,downloadBytesPerSecond:150*1024,cacheDisabled:true,missionVisible:Boolean(missionVisible),controlsVisibleAfterMs:controlsReady,scope:'Successful HTML/scripts loading; optional 3D world not activated'});
await context.close();
}catch(e){report.errors.push({scope:'review',message:e.stack??String(e)});}
finally{await browser.close();await writeFile(output+'/review.json',JSON.stringify(report,null,2));}
for(const page of report.pages)if(page.status!==200||page.overflow)throw new Error('Page review failed: '+page.name+' / '+page.viewport);
for(const slide of report.slides)if(slide.overflow||slide.textOutside.length)throw new Error('Slide review failed: '+slide.slide+' / '+slide.viewport);
console.log(JSON.stringify({pages:report.pages.length,slides:report.slides.length,slowLoad:report.slowLoad,errors:report.errors}));
if(report.errors.length)process.exitCode=1;
