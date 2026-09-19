import {chromium} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
const base=process.env.COURSE_BASE_URL||'http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/';
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1920,height:1080}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto(base+'sessions/week-04/',{waitUntil:'networkidle'});
 await page.locator('[data-training-controls]').getByRole('button',{name:'Release interlock',exact:true}).click();
 const passportBefore=await page.evaluate(()=>JSON.stringify({...localStorage}));
 await page.goto(base+'demonstrations/assessment-final/',{waitUntil:'networkidle'});
 const definition=await page.locator('[data-demo-definition]').evaluate(n=>JSON.parse(n.textContent));
 await page.locator('[data-demo-speed]').selectOption('1.35');
 await page.locator('[data-demo-watch]').click();
 await page.locator('[data-world-canvas] canvas').waitFor({state:'visible',timeout:60000});
 const started=Date.now(),chapters=[],seen=new Set(),rooms=new Set();let finished=false;
 while(Date.now()-started<12*60*1000){
  const state=await page.evaluate(()=>{
   const scene=document.querySelector('[data-academy-world]');
   return {chapter:document.querySelector('[data-demo-chapter]').textContent,title:document.querySelector('[data-demo-caption-title]').textContent,room:scene.dataset.worldRoom,step:scene.dataset.worldDemoStep,phase:scene.dataset.worldDemoPhase,status:document.querySelector('[data-demo-status]').textContent,playing:scene.dataset.worldDemoPlaying};
  });
  const chapterIndex=parseInt(state.chapter,10)-1;const renderedChapterMatches=state.step===definition.steps[chapterIndex]?.id;
  if(renderedChapterMatches&&!seen.has(state.chapter)){
   seen.add(state.chapter);chapters.push({...state,elapsedSeconds:Math.round((Date.now()-started)/1000)});
   console.log('CHAPTER '+state.chapter+' / '+state.room+' / '+state.title);
  }
  if(state.room&&!rooms.has(state.room)&&state.phase==='after'){
   rooms.add(state.room);
   await page.locator('.demo-theatre').screenshot({path:'docs/evidence/demo-final-'+state.room+'-desktop.png'});
  }
  if(state.status.includes('The demonstration has finished')){
   await page.locator('.demo-theatre').screenshot({path:'docs/evidence/demo-final-ending-desktop.png'});
   await page.setViewportSize({width:390,height:844});await page.waitForTimeout(500);
   await page.locator('.demo-theatre').screenshot({path:'docs/evidence/demo-final-ending-mobile.png'});
   const report={environment:'Local production preview; Chromium SwiftShader software renderer',method:'Complete hands-free playback using the actual Watch button at Brisk pace. No injected frames, chapter skipping or timer acceleration.',base,errors,chapters,rooms:[...rooms],ending:state,expectedChapters:definition.steps.length,elapsedSeconds:Math.round((Date.now()-started)/1000),passportPreserved:passportBefore===await page.evaluate(()=>JSON.stringify({...localStorage})),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)};
   await writeFile('docs/evidence/demo-final-world-review.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
   if(chapters.length!==definition.steps.length||state.playing!=='false'||!report.passportPreserved||errors.length)throw new Error('The complete playback review found an acceptance failure');
   finished=true;process.exitCode=0;break;
  }
  await page.waitForTimeout(1200);
 }
 if(!finished)throw new Error('The complete film did not finish within the bounded 12-minute review');
}finally{await browser.close();}
