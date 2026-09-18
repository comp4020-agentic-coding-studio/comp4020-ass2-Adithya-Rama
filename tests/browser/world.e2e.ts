import { test, expect, type Page } from '@playwright/test';
test.use({launchOptions:{args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']}});
test.setTimeout(90000);
async function enter(page:Page){
 await page.locator('[data-world-launch]').click();
 await expect(page.locator('[data-world-canvas] canvas')).toBeVisible({timeout:45000});
 await expect(page.locator('[data-world-loading]')).toBeHidden({timeout:45000});
}
test('academy rooms render, keyboard movement responds, and resources stabilise',async({page},info)=>{
 test.skip(info.project.name==='phone','The phone project covers the close-up workbench and failure journeys below.');
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('academy/');await enter(page);
 const scene=page.locator('[data-academy-world]');
 await expect(scene).toHaveAttribute('data-world-room','atrium');
 const first=await scene.getAttribute('data-world-position');
 await page.locator('canvas').focus();await page.keyboard.down('ArrowRight');await page.waitForTimeout(350);await page.keyboard.up('ArrowRight');
 await expect(scene).not.toHaveAttribute('data-world-position',first!);
 for(const room of ['perception','spatial','mechanics','systems','digital','council','movement','operations']){
  await page.locator('[data-world-travel]').selectOption(room);await expect(scene).toHaveAttribute('data-world-room',room);
 }
 const counts:number[]=[];
 for(const room of ['mechanics','digital','systems','mechanics','digital','systems','mechanics']){
  await page.locator('[data-world-travel]').selectOption(room);await expect(scene).toHaveAttribute('data-world-room',room);
  if(room==='mechanics')counts.push(Number(await scene.getAttribute('data-world-geometries')));
 }
 expect(Math.max(...counts)-Math.min(...counts)).toBeLessThan(8);
 expect(errors).toEqual([]);
});
test('mechanism scene uses authoritative equipment actions and stays readable on phone',async({page})=>{
 await page.goto('sessions/week-04/');await enter(page);
 await expect(page.locator('[data-academy-world]')).toHaveAttribute('data-world-room','mechanics');
 await page.locator('[data-world-equipment]').selectOption({label:'Release or engage the interlock'});
 await page.locator('[data-world-use]').click();await expect(page.locator('.training-readout')).toContainText('Released');
 await page.locator('[data-world-equipment]').selectOption({label:'Set the cam angle'});
 await page.locator('[data-world-use]').click();await expect(page.locator('.training-readout')).toContainText('90°');
 await page.setViewportSize({width:390,height:844});
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 const canvas=await page.locator('[data-world-canvas]').boundingBox(),controls=await page.locator('[data-world-object]').boundingBox();
 expect(controls!.y).toBeGreaterThanOrEqual(canvas!.y+canvas!.height-1);
});
test('lazy mission room restores the selected zone and equipment affects its record',async({page})=>{
 await page.goto('operation/');await page.locator('[data-role="systems"]').click();await page.locator('[data-zone="power"]').click();
 await enter(page);await expect(page.locator('[data-academy-world]')).toHaveAttribute('data-world-room','systems');
 await page.locator('[data-world-equipment]').selectOption({label:'Measure the battery'});await page.locator('[data-world-use]').click();
 await expect(page.locator('[data-mission-status]')).toContainText('Supply: 6 V');
 await page.locator('[data-world-travel]').selectOption('workshop');await expect(page.locator('[data-world-location]')).toContainText('Workshop');
});
test('missing local model gives a usable retry and preserves existing lesson work',async({page})=>{
 await page.route('**/academy-kit.glb',r=>r.abort());
 await page.goto('sessions/week-04/');
 await page.locator('[data-training-controls]').getByRole('button',{name:'Release interlock',exact:true}).click();
 await page.locator('[data-world-launch]').click();await expect(page.locator('.world-error')).toBeVisible({timeout:45000});
 await expect(page.locator('[data-world-launch]')).toBeEnabled();await expect(page.locator('canvas')).toHaveCount(0);
 await expect(page.locator('.training-readout')).toContainText('Released');
 await page.unroute('**/academy-kit.glb');await enter(page);await expect(page.locator('.training-readout')).toContainText('Released');
});
test('real WebGL context loss restores rendering without erasing the skill attempt',async({page})=>{
 await page.goto('sessions/week-04/');
 await page.locator('[data-training-controls]').getByRole('button',{name:'Release interlock',exact:true}).click();
 await enter(page);
 const before=await page.evaluate(()=>JSON.stringify({...localStorage}));
 await page.evaluate(()=>{
  const canvas=document.querySelector<HTMLCanvasElement>('[data-world-canvas] canvas')!;
  const extension=canvas.getContext('webgl2')!.getExtension('WEBGL_lose_context');
  if(!extension)throw new Error('Test renderer does not expose the context-loss extension');
  (window as Window & {loss?:WEBGL_lose_context}).loss=extension;extension.loseContext();
 });
 await expect(page.locator('[data-world-status]')).toContainText('Graphics paused');
 await expect(page.locator('.training-readout')).toContainText('Released');
 await page.waitForTimeout(500);
 await page.evaluate(()=>(window as Window & {loss?:WEBGL_lose_context}).loss!.restoreContext());
 await expect(page.locator('[data-world-status]')).toContainText('Graphics restored');
 expect(await page.evaluate(()=>JSON.stringify({...localStorage}))).toBe(before);
 await page.reload();await expect(page.locator('.training-readout')).toContainText('Released');
});

