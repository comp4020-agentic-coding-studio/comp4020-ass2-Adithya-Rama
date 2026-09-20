import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.env.COURSE_BASE_URL||'http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/';
const cases=[
 ['lab-05',['verify','conclude']],['lab-06',['limit','amend']],['lab-07',['repair']],
 ['lab-09',['agree','change']],['lab-11',['revise']],['assessment-a2',['measure','archive','amend']]
];
const out='.browser-example-separation';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const results=[];
try{
 for(const viewport of [{width:1920,height:1080},{width:390,height:844}]){
  for(const [id,steps] of cases){
   const page=await browser.newPage({viewport});const errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+'demonstrations/'+id+'/?mode=control');
   const demo=await page.locator('[data-demo-definition]').evaluate(el=>JSON.parse(el.textContent));
   await page.locator('[data-world-launch]').click();
   await page.locator('[data-world-toolbar]').waitFor({state:'visible',timeout:60000});
   await page.locator('[data-world-quality]').selectOption('low');
   await page.locator('[data-world-fullscreen]').click();
   await page.waitForFunction(()=>document.querySelector('[data-academy-world]')?.getAttribute('data-immersive')==='true');
   for(const idStep of steps){
    const index=demo.steps.findIndex(s=>s.id===idStep),step=demo.steps[index];
    await page.locator('[data-demo-jump="'+index+'"]').click();
    for(const control of step.controls){
     const field=page.locator('[data-demo-field="'+control.id+'"]');
     if(control.type==='order'){
      for(let pos=0;pos<control.expected.length;pos++){
       const name=control.options.find(o=>o.value===control.expected[pos]).label;
       let current=(await field.locator('li>span').allTextContents()).indexOf(name);
       while(current>pos){await field.getByRole('button',{name:'Move '+name+' earlier',exact:true}).click();current--;}
      }
     }else if(control.type==='toggle')await field.locator('input').setChecked(control.expected===true);
     else if(control.type==='select')await field.locator('select').selectOption(String(control.expected));
     else await field.locator('input').fill(String(control.expected));
    }
    await page.locator('[data-demo-form]').getByRole('button',{name:'Test my decision',exact:true}).click();
    const correct=await page.locator('[data-demo-feedback]').getAttribute('data-correct');
    if(correct!=='true')throw new Error(id+'/'+idStep+' was not accepted');
    await page.waitForTimeout(400);
    const world=page.locator('[data-academy-world]');
    if(step.after.room==='systems'){
     const labels=await page.locator('[data-world-equipment] option').allTextContents();
     const expected=step.after.values.voltage+' V diagnostic bench';
     if(!labels.includes(expected)||labels.includes('Six-volt diagnostic bench'))throw new Error(id+'/'+idStep+' has an incorrect scenario-voltage label: '+labels.join(', '));
    }
    const diagnostic=await world.getAttribute('data-world-staging');
    const panel=await page.locator('[data-immersive-console]').evaluate(el=>({width:el.clientWidth,scrollWidth:el.scrollWidth}));
    const file=id+'-'+idStep+'-'+viewport.width+'.png';
    await page.screenshot({path:out+'/'+file});
    results.push({id,step:idStep,viewport,file,correct:true,panelOverflow:panel.scrollWidth>panel.width+1,pageErrors:[...errors],staging:diagnostic?JSON.parse(diagnostic):null});
   }
   await page.close();
  }
 }
 await writeFile(out+'/results.json',JSON.stringify(results,null,2));
 console.log(JSON.stringify({views:results.length,errors:results.filter(r=>r.pageErrors.length||r.panelOverflow).map(r=>({id:r.id,step:r.step,width:r.viewport.width,errors:r.pageErrors,overflow:r.panelOverflow}))}));
 if(results.some(r=>r.pageErrors.length||r.panelOverflow))process.exitCode=1;
}finally{await browser.close();}
