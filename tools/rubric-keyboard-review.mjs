
import {chromium} from '@playwright/test';import {mkdir,writeFile} from 'node:fs/promises';
await mkdir('.browser-rubric-audit',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--disable-gpu']});const report=[];
try{
for(const viewport of [{width:1920,height:1080},{width:390,height:844}]){
const context=await browser.newContext({viewport,reducedMotion:'reduce'});const page=await context.newPage();
await page.goto('http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/sessions/week-07/#activity',{waitUntil:'networkidle'});
const visited=[];let tested=false,saved=false,resized=false,resizePreserved=false;
for(let tabs=0;tabs<350;tabs++){
 await page.keyboard.press('Tab');
 const el=await page.evaluate(()=>{const a=document.activeElement;return {tag:a?.tagName,type:a?.getAttribute('type'),text:a?.textContent?.trim(),inBench:Boolean(a?.closest('[data-training-controls]')),role:a?.closest('.training-policy')?.querySelector('h4')?.textContent,label:a?.closest('label')?.textContent,checked:a?.checked,reflection:a?.hasAttribute('data-training-reflection'),save:a?.hasAttribute('data-training-save')};});
 if(el.inBench&&el.type==='checkbox'){
  const role=el.role,action=el.label?.replace('Allow ','').trim();const expected=action==='read'||(role==='technician'&&action==='service')||(role==='registrar'&&action==='certify');
  if(el.checked!==expected)await page.keyboard.press('Space');visited.push(role+'/'+action);
  if(!resized&&visited.length===4){const before=await page.locator('.training-policy input').evaluateAll(ns=>ns.map(n=>n.checked));await page.setViewportSize(viewport.width===390?{width:1024,height:768}:{width:390,height:844});const after=await page.locator('.training-policy input').evaluateAll(ns=>ns.map(n=>n.checked));resizePreserved=JSON.stringify(before)===JSON.stringify(after);await page.setViewportSize(viewport);resized=true;}
 }else if(el.tag==='BUTTON'&&el.text==='Test this configuration'){
  await page.keyboard.press('Enter');tested=true;
 }else if(el.reflection&&tested){
  await page.keyboard.type('I removed observer service and certification, restored the specialist permissions, and tested all nine combinations. This keyboard-only audit attempt used the published mandate.');
 }else if(el.save&&tested){
  await page.keyboard.press('Enter');saved=true;break;
 }
}
const feedback=await page.locator('[data-training-feedback]').innerText();
const saveStatus=await page.locator('[data-training-save-status]').innerText();
const ok=visited.length===9&&tested&&saved&&feedback.includes('All nine policy checks pass')&&saveStatus.includes('sent to your local skills passport')&&resizePreserved;
report.push({viewport,keyboardOnly:true,visited,tested,saved,resizePreserved,feedback,saveStatus,ok});
await page.screenshot({path:'.browser-rubric-audit/keyboard-'+viewport.width+'.png'});await context.close();
}
}catch(e){report.push({error:e.stack??String(e),ok:false});}
finally{await browser.close();await writeFile('.browser-rubric-audit/keyboard.json',JSON.stringify(report,null,2));}
console.log(JSON.stringify(report,null,2));if(report.some(r=>!r.ok))process.exitCode=1;
