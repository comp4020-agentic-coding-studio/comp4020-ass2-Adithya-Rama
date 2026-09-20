import {test,expect,type Page,type Locator} from '@playwright/test';

test.use({launchOptions:{args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']}});
test.setTimeout(120000);

type StagedObject={id:string;label:string;support:string;position:[number,number,number];visible:boolean;role?:string;state?:string;shape?:string};
type Staging={room:string;zone:string|null;phase:string;objects:StagedObject[];characters:{name:string;role:string;visible:boolean;position:number[]}[]};
const labs=Array.from({length:12},(_,i)=>String(i+1).padStart(2,'0'));
const examples=[...labs.map(id=>'lab-'+id),'assessment-fieldwork','assessment-a1','assessment-a2','assessment-final'];
const routes=[...labs.map(id=>({path:'sessions/week-'+id+'/',id:'lab:'+id})),
 ...examples.map(id=>({path:'demonstrations/'+id+'/',id:'demo:'+id})),
 {path:'assessments/assignment-1/',id:'mission:a1'},{path:'assessments/assignment-2/',id:'mission:a2'},{path:'operation/',id:'mission:recovery'}];

async function launch(page:Page,path:string){
 await page.goto(path);
 await page.locator('[data-world-launch]').click();
 await expect(page.locator('[data-world-canvas] canvas')).toBeVisible({timeout:45000});
 await expect(page.locator('[data-world-loading]')).toBeHidden({timeout:45000});
 await page.locator('[data-world-quality]').selectOption('low');
 const world=page.locator('[data-academy-world]');
 await expect(world).toHaveAttribute('data-world-staging',/.+/);
 return world;
}
async function staging(world:Locator):Promise<Staging>{
 return JSON.parse((await world.getAttribute('data-world-staging'))!);
}
function object(snapshot:Staging,id:string){
 const found=snapshot.objects.find(item=>item.id===id&&item.visible);
 expect(found,'Missing visible staged object: '+id).toBeTruthy();
 return found!;
}
function instructorIsSeparate(snapshot:Staging){
 expect(snapshot.characters).toHaveLength(2);
 expect(snapshot.characters.map(person=>person.role).sort()).toEqual(['instructor','learner']);
 const guide=object(snapshot,'mara');
 expect(guide.role).toBe('instructor');
 expect(guide.label).toMatch(/instructor/i);
 expect(guide.position[0]).toBeGreaterThan(6);
 expect(guide.position[2]).toBeGreaterThan(0);
}
async function expand(world:Locator){
 await world.locator('[data-world-fullscreen]').click();
 await expect(world).toHaveAttribute('data-immersive','true');
 await expect(world).toHaveAttribute('data-world-mouse-look','false');
 return world.locator('[data-immersive-console]');
}

test('every lab, demonstration and assessment resolves its own scene context before 3D loads',async({page})=>{
 for(const route of routes){
  await page.goto(route.path);
  const context=page.locator('[data-scene-context]');
  await expect(context).toHaveCount(1);
  await expect(context).toHaveAttribute('data-scene-context',route.id);
  await expect(context.locator('[data-scene-player-label]')).toBeVisible();
  await expect(context).toContainText('Dr Mara Voss');
  await context.locator('summary').click();
  await expect(context.locator('[data-scene-guide]')).toHaveAttribute('open','');
  await expect(context).toContainText('What counts as evidence');
  await expect(context).toContainText('Why the objects are here');
  await expect(context).not.toContainText('undefined');
  await expect(page.locator('[data-world-canvas] canvas')).toHaveCount(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }
});

test('fullscreen Scene guide opens the existing guide and preserves the live lab attempt',async({page})=>{
 const world=await launch(page,'sessions/week-04/');
 await page.locator('[data-training-controls]').getByRole('button',{name:'Release interlock',exact:true}).click();
 await page.locator('[data-training-reflection]').fill('I released the interlock; the instructor is not the fault.');
 const guide=page.locator('[data-scene-guide]');
 await guide.evaluate(node=>(window as unknown as {originalSceneGuide:Element}).originalSceneGuide=node);
 const panel=await expand(world);
 await world.locator('[data-world-guide]').click();
 await expect(panel.locator('[data-scene-guide]')).toHaveAttribute('open','');
 await expect(panel.locator('[data-scene-guide]>summary')).toBeFocused();
 await expect(panel).toContainText('training mechanism');
 await expect(panel.locator('.training-readout')).toContainText('Released');
 await expect(panel.locator('[data-training-reflection]')).toHaveValue('I released the interlock; the instructor is not the fault.');
 expect(await guide.evaluate(node=>(window as unknown as {originalSceneGuide:Element}).originalSceneGuide===node)).toBe(true);
 await page.screenshot({path:test.info().outputPath('lab-scene-guide.png')});
 await world.locator('[data-immersive-exit]').click();
 await expect(world).toHaveAttribute('data-immersive','false');
 await expect(world.locator('[data-scene-guide]')).toHaveCount(1);
 await expect(page.locator('[data-training-reflection]')).toHaveValue('I released the interlock; the instructor is not the fault.');
});

test('assigned observation fixtures follow their phases and disappear while recall is covered',async({page})=>{
 const world=await launch(page,'sessions/week-01/');
 let current=await staging(world);
 instructorIsSeparate(current);
 expect(object(current,'clock').support).toBe('wall');
 expect(object(current,'clock').position[2]).toBeLessThan(-6);
 expect(object(current,'door').support).toBe('wall');
 expect(object(current,'cup').support).toBe('desk');
 expect(object(current,'note').support).toBe('desk');
 for(const phase of ['check','transfer']){
  await page.locator('[data-training-phase="'+phase+'"]').click();
  const confirm=page.locator('[data-training-confirm-dialog]');
  if(await confirm.isVisible())await page.locator('[data-training-confirm-accept]').click();
  await expect.poll(async()=>(await staging(world)).phase).toBe(phase);
  current=await staging(world);
  expect(object(current,'cup').support).toBe(phase==='check'?'shelf':'desk');
  expect(object(current,'door').support).toBe('wall');
  expect(object(current,'door').state).toBe(phase==='check'?'closed':'open');
  const menu=await page.locator('[data-world-equipment] option').allTextContents();
  expect(menu.join(' ')).toMatch(phase==='check'?/shelf cup/i:/silver flask/i);
 }
 const cover=page.locator('[data-training-controls]').getByRole('button',{name:/cover.*scene|hide.*scene/i});
 await cover.click();
 await expect.poll(async()=>(await staging(world)).objects.filter(item=>['clock','cup','door','note','ledger'].includes(item.id)&&item.visible).length).toBe(0);
 // The persistent guide must not disclose the hidden reading during recall.
 const context=await page.locator('[data-scene-context]').textContent();
 expect(context).not.toMatch(/08:20|09:40|14:10/);
 await page.screenshot({path:test.info().outputPath('observation-recall-covered.png')});
});

test('worked observation example uses room fixtures and keeps its gardener distinct from the guide',async({page})=>{
 const world=await launch(page,'demonstrations/lab-01/?mode=control');
 const initial=await staging(world);
 const coachingBefore=await page.locator('[data-demo-coaching-result]').textContent();
 instructorIsSeparate(initial);
 expect(object(initial,'clock').support).toBe('wall');
 expect(object(initial,'hatch').support).toBe('wall');
 expect(object(initial,'clock').position[2]).toBeLessThan(object(initial,'mug').position[2]-2);
 expect(object(initial,'note').support).toBe('desk');
 expect(object(initial,'ledger').support).toBe('desk');
 const panel=await expand(world);
 await world.locator('[data-world-guide]').click();
 await expect(panel.locator('[data-scene-context]')).toContainText('gardener is not shown');
 await expect(panel.locator('[data-scene-context]')).toContainText('not clues');
 // A guide visit must not answer or advance the example.
 await expect(panel.locator('[data-demo-input="clock"]')).toHaveValue('');
 await expect(panel.locator('[data-demo-coaching-result]')).toHaveText(coachingBefore!);
 await page.screenshot({path:test.info().outputPath('demonstration-scene-guide.png')});
});

test('mission role identity follows responsibility changes in fullscreen without resetting the plan',async({page})=>{
 const world=await launch(page,'operation/');
 const panel=await expand(world);
 await panel.locator('[data-role="coordinator"]').click();
 await panel.locator('[data-zone="dispatch"]').click();
 const plan='Inspect the archive, verify support, and keep a named handover condition.';
 await panel.locator('[data-plan] textarea').fill(plan);
 await panel.locator('[data-plan]').getByRole('button').click();
 await expect(panel.locator('[data-plans]')).toContainText('Version 1');
 await panel.locator('[data-role="investigator"]').click();
 await world.locator('[data-world-guide]').click();
 await expect(panel.locator('[data-scene-player-label]')).toHaveText('You · Investigator');
 await expect(panel.locator('[data-scene-context]')).toContainText('custodian');
 await expect(panel.locator('[data-plans]')).toContainText(plan);
 for(const zone of ['arrival','workshop','power','control','archive','dispatch']){
  await panel.locator('[data-zone="'+zone+'"]').click();
  await expect.poll(async()=>(await staging(world)).zone).toBe(zone);
  const scene=await staging(world);instructorIsSeparate(scene);
  if(zone==='workshop')expect(object(scene,'mechanism').support).toBe('mounted-rig');
  if(zone==='power')expect(object(scene,'circuit').support).toBe('desk');
  if(zone==='dispatch')expect(object(scene,'sensors').support).toBe('floor');
 }
 await world.locator('[data-world-guide]').click();
 await expect(panel.locator('[data-scene-player-label]')).toHaveText('You · Investigator');
 await expect(panel.locator('[data-plans]')).toContainText(plan);
 await page.screenshot({path:test.info().outputPath('mission-scene-guide.png')});
});

test('first authored council frame names the actual speakers and memory starts on its apparatus',async({page})=>{
 const world=await launch(page,'demonstrations/lab-09/?mode=control');
 const initial=await staging(world);
 instructorIsSeparate(initial);
 expect(initial.objects.filter(item=>item.role==='case-record').map(item=>item.label)).toEqual(['Caretaker Ada','Archivist Rin','Engineer Bo']);
 await expect(page.locator('[data-world-equipment]')).toContainText('Caretaker Ada');
 await expect(page.locator('[data-world-equipment]')).not.toContainText('Analyst · sending role');
 const memory=await launch(page,'demonstrations/lab-02/?mode=control');
 expect(object(await staging(memory),'lens').support).toBe('pedestal');
 await expect(page.locator('[data-world-object-label]')).toHaveText('Lens');
 await expect(page.locator('[data-world-use]')).not.toHaveText('Enter room');
 const selectedBefore=await page.locator('[data-world-equipment]').inputValue();
 // Re-emitting the same chapter must retain apparatus selection, not fall back to the exit.
 await page.locator('[data-demo-jump="0"]').click();
 await expect(page.locator('[data-world-equipment]')).toHaveValue(selectedBefore);
 await expect(page.locator('[data-world-use]')).not.toHaveText('Enter room');
});

test('final example distinguishes the four crew members from later custody stakeholders',async({page})=>{
 const world=await launch(page,'demonstrations/assessment-final/?mode=control');
 const steps=await page.locator('[data-demo-definition]').evaluate(node=>(JSON.parse(node.textContent!) as {steps:{id:string}[]}).steps.map(step=>step.id));
 for(const [stepId,names] of [['crew',['Lena · observation','Omar · systems','Priya · investigation','Jonah · coordination']],['handoff',['Custodian Quill','Recipient Venn','Coordinator Jonah']],['crew',['Lena · observation','Omar · systems','Priya · investigation','Jonah · coordination']]] as const){
  const index=steps.indexOf(stepId);expect(index).toBeGreaterThanOrEqual(0);
  await page.locator('[data-demo-jump="'+index+'"]').click();
  await expect.poll(async()=>(await staging(world)).objects.filter(item=>item.role==='case-record').map(item=>item.label)).toEqual([...names]);
 }
});
