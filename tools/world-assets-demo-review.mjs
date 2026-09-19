import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
await mkdir('docs/evidence',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1920,height:1080}});

const errors=[];page.on('pageerror',e=>errors.push(e.message));
const results=[];const base=process.env.COURSE_BASE_URL||'http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/';
for(const [id,name,chapter] of [['lab-04','mechanism',2],['lab-01','perception',0],['lab-03','spatial',2],['lab-07','policy',4],['lab-11','revision',3]]){
 await page.goto(base+'demonstrations/'+id+'/',{waitUntil:'networkidle'});
 await page.locator('[data-demo-watch]').click();await page.locator('[data-world-canvas] canvas').waitFor({state:'visible',timeout:60000});
 await page.locator('[data-demo-jump="'+chapter+'"]').click();
 await page.waitForTimeout(1600);
 await page.locator('.demo-theatre').screenshot({path:'docs/evidence/demo-'+name+'-desktop.png'});
 results.push({id,room:await page.locator('[data-academy-world]').getAttribute('data-world-room'),step:await page.locator('[data-academy-world]').getAttribute('data-world-demo-step'),canvas:await page.locator('canvas').count(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
 if(id==='lab-01'){
  await page.setViewportSize({width:390,height:844});await page.waitForTimeout(700);
  await page.locator('.demo-theatre').screenshot({path:'docs/evidence/demo-perception-mobile.png'});
  results.push({id,mobile:true,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
  await page.setViewportSize({width:1920,height:1080});
 }
}

await page.goto(base+'demonstrations/lab-07/',{waitUntil:'networkidle'});
const policyDefinition=await page.locator('[data-demo-definition]').evaluate(node=>JSON.parse(node.textContent));
const policyChapter=policyDefinition.steps.findIndex(step=>step.controls.some(control=>['reader:approve','readerApprove','custodianApprove'].includes(control.id)));
if(policyChapter<0)throw new Error('No live approval toggle was authored');
await page.locator('[data-demo-watch]').click();await page.locator('[data-world-canvas] canvas').waitFor({state:'visible',timeout:60000});
await page.locator('[data-demo-jump="'+policyChapter+'"]').click();await page.locator('button[data-demo-control]').click();
const control=policyDefinition.steps[policyChapter].controls.find(control=>['reader:approve','readerApprove','custodianApprove'].includes(control.id));
const instrument=page.locator('[data-world-equipment]');
const middle=await instrument.locator('option').evaluateAll(nodes=>nodes.find(node=>node.textContent==='Archive record B')?.value);
if(middle!==undefined)await instrument.selectOption(middle);
await page.waitForTimeout(1200);
const toggle=page.locator('[data-demo-input="'+control.id+'"]'),initial=await toggle.isChecked();
await page.locator('.demo-theatre').screenshot({path:'docs/evidence/demo-policy-control-before.png'});
await toggle.setChecked(!initial);await page.waitForTimeout(600);
await page.locator('.demo-theatre').screenshot({path:'docs/evidence/demo-policy-control-after.png'});
results.push({id:'lab-07',liveControl:control.id,before:initial,after:await toggle.isChecked(),method:'Changed a real takeover permission toggle without submitting the answer; inspect the matrix in the paired images.'});

await writeFile('docs/evidence/demo-world-review.json',JSON.stringify({environment:'Local course server, Chromium SwiftShader software renderer',base,errors,results},null,2));
console.log(JSON.stringify({errors,results},null,2));
await browser.close();
