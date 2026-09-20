import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
import sharp from 'sharp';

const base=process.env.COURSE_BASE_URL||'http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/';
const out='.browser-scene-review';
await mkdir(out,{recursive:true});
const labs=Array.from({length:12},(_,i)=>String(i+1).padStart(2,'0'));
const demos=[...labs.map(id=>'lab-'+id),'assessment-fieldwork','assessment-a1','assessment-a2','assessment-final'];
const routes=[...labs.map(id=>({path:'sessions/week-'+id+'/',key:'lab-'+id,kind:'lab'})),
 ...demos.map(id=>({path:'demonstrations/'+id+'/?mode=control',key:'demo-'+id,kind:'demo'})),
 {path:'assessments/assignment-1/',key:'mission-a1',kind:'mission'},
 {path:'assessments/assignment-2/',key:'mission-a2',kind:'mission'},
 {path:'operation/',key:'mission-recovery',kind:'mission'}];
const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const results=[],images=[];
async function snapshot(page,route,label){
 const world=page.locator('[data-academy-world]');
 await page.waitForFunction(()=>Boolean(document.querySelector('[data-academy-world]')?.dataset.worldStaging));
 const data=await world.evaluate(root=>JSON.parse(root.dataset.worldStaging));
 const visible=data.objects.filter(item=>item.visible);
 const issues=[];
 const instructor=visible.find(item=>item.id==='mara');
 if(data.characters?.length!==2||data.characters.some(person=>!['instructor','learner'].includes(person.role)))issues.push('Rendered scene contains an ambiguous extra human figure.');
 if(!instructor||instructor.role!=='instructor'||instructor.position[0]<=6||instructor.position[2]<=0)issues.push('Instructor is missing or outside the distinct teaching bay.');
 for(const item of visible){
  if(!item.position.every(Number.isFinite))issues.push(item.id+': non-finite placement');
  if(item.support==='wall'&&item.position[2]>-6)issues.push(item.id+': wall fixture does not sit against the room partition');
  if(item.support==='desk'&&item.id!=='workbench'&&item.position[1]<1.5)issues.push(item.id+': desk prop is below the working surface');
 }
 const filename=route.key+'-'+label.replace(/[^a-z0-9-]/gi,'-')+'.png';
 await page.locator('[data-world-canvas]').screenshot({path:out+'/'+filename});
 images.push({filename,title:route.key+' / '+label});
 results.push({route:route.path,label,context:await page.locator('[data-scene-context]').getAttribute('data-scene-context'),data,issues,image:filename});
}
try{
 for(const route of routes){
  const page=await browser.newPage({viewport:{width:1920,height:1080},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+route.path);
  await page.locator('[data-world-launch]').click();
  await page.locator('[data-world-canvas] canvas').waitFor({state:'visible',timeout:60000});
  await page.locator('[data-world-loading]').waitFor({state:'hidden',timeout:60000});
  await page.locator('[data-world-quality]').selectOption('low');
  if(route.kind==='demo'){
   const definition=await page.locator('[data-demo-definition]').evaluate(node=>JSON.parse(node.textContent));
   const seen=new Set();
   for(let i=0;i<definition.steps.length;i++){
    const step=definition.steps[i],frame=step.before;
    // Repeated numeric values use the same apparatus. Survey each distinct
    // object arrangement, room, covered state and named speaker role instead.
    const signature=JSON.stringify([frame.room,frame.items?.map(item=>[item.id,item.shape]),frame.values?.covered,frame.focus==='speaker'?frame.labels:undefined]);
    if(seen.has(signature))continue;seen.add(signature);
    await page.locator('[data-demo-jump="'+i+'"]').click();
    await page.waitForFunction(id=>document.querySelector('[data-academy-world]')?.dataset.worldDemoStep===id,step.id);
    await snapshot(page,route,step.id);
   }
  }else if(route.key==='lab-01'){
   for(const phase of ['practice','check','transfer']){
    if(phase!=='practice'){
     await page.locator('[data-training-phase="'+phase+'"]').click();
     if(await page.locator('[data-training-confirm-dialog]').isVisible())await page.locator('[data-training-confirm-accept]').click();
     await page.waitForFunction(phase=>JSON.parse(document.querySelector('[data-academy-world]').dataset.worldStaging).phase===phase,phase);
    }
    await snapshot(page,route,phase);
   }
  }else if(route.kind==='mission'){
   const zones=await page.locator('[data-zone]').evaluateAll(nodes=>nodes.filter(node=>!node.hidden).map(node=>node.dataset.zone));
   for(const zone of zones){
    await page.locator('[data-zone="'+zone+'"]').click();
    await page.waitForFunction(zone=>JSON.parse(document.querySelector('[data-academy-world]').dataset.worldStaging).zone===zone,zone);
    await snapshot(page,route,zone);
   }
  }else await snapshot(page,route,'initial');
  if(errors.length)results.at(-1).issues.push(...errors.map(message=>'Page error: '+message));
  console.log(route.key+': '+results.filter(result=>result.route===route.path).length+' arrangements inspected');
  await page.close();
 }
 // Contact sheets support human visual review; metadata alone is not that review.
 for(let offset=0;offset<images.length;offset+=8){
  const group=images.slice(offset,offset+8),layers=[];
  for(let i=0;i<group.length;i++){
   const x=i%2*720,y=Math.floor(i/2)*445,item=group[i];
   layers.push({input:await sharp(out+'/'+item.filename).resize(720,405,{fit:'contain',background:'#172b31'}).toBuffer(),left:x,top:y+40});
   const safe=item.title.replaceAll('&','&amp;').replaceAll('<','&lt;');
   layers.push({input:Buffer.from('<svg width="720" height="40"><rect width="720" height="40" fill="#f3eedf"/><text x="14" y="27" font-family="sans-serif" font-size="18" fill="#172b31">'+safe+'</text></svg>'),left:x,top:y});
  }
  await sharp({create:{width:1440,height:Math.ceil(group.length/2)*445,channels:3,background:'#f3eedf'}}).composite(layers).png().toFile(out+'/contact-'+String(offset/8+1).padStart(2,'0')+'.png');
 }
 await writeFile(out+'/results.json',JSON.stringify({viewport:{width:1920,height:1080},routes:routes.length,arrangements:results.length,results},null,2));
 console.log(JSON.stringify({routes:routes.length,arrangements:results.length,issues:results.flatMap(item=>item.issues.map(message=>({route:item.route,label:item.label,message})))}));
 if(results.some(item=>item.issues.length))process.exitCode=1;
}finally{await browser.close();}
