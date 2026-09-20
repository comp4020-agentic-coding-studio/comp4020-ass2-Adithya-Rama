import {test,expect} from '@playwright/test';
test.use({launchOptions:{args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']}});
test.setTimeout(120000);
test('a verified lab intervention opens a passage and carries its evidence through the world',async({page})=>{
 await page.goto('sessions/week-03/');
 await page.locator('[data-world-launch]').click();
 await expect(page.locator('[data-world-canvas] canvas')).toBeVisible({timeout:45000});
 await page.locator('[data-world-quality]').selectOption('low');
 await page.locator('[data-world-fullscreen]').click();
 const field=page.locator('[data-field-operation]');
 await field.locator('[data-field-inspect]').click();
 await expect(field).toHaveAttribute('data-field-state','investigating',{timeout:30000});
 const scene=page.locator('[data-academy-world]');
 const inspectedPosition=await scene.getAttribute('data-world-position');
 expect(Number(inspectedPosition!.split(',')[0])).toBeLessThan(-4);
 const c=page.locator('[data-training-controls]');
 await c.getByRole('button',{name:'Rotate clockwise 90°',exact:true}).click();
 await c.getByLabel('Where did the original north connector move?').selectOption('north becomes east');
 await page.locator('[data-training-test]').click();
 await expect(field.locator('[data-field-execute]')).toBeEnabled();
 await field.locator('[data-field-execute]').click();
 await expect(field.locator('[data-field-collect]')).toBeEnabled({timeout:30000});
 await field.locator('[data-field-collect]').click();
 await expect(field).toHaveAttribute('data-field-state','handover',{timeout:30000});
 await field.locator('[data-field-checkpoint]').first().click();
 await expect(field.locator('[data-field-deliver]')).toBeEnabled({timeout:30000});
 await field.locator('[data-field-deliver]').click();
 await expect(field).toHaveAttribute('data-field-state','complete',{timeout:30000});
 expect(Number((await scene.getAttribute('data-world-position'))!.split(',')[0])).toBeGreaterThan(4);
 expect(JSON.parse((await scene.getAttribute('data-world-field-state'))!).delivered).toBe(true);
 await expect(scene.locator('[data-world-field-goal]')).toContainText('MISSION ACCOMPLISHED');
 await page.screenshot({path:test.info().outputPath('field-mission-complete.png')});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 // Return from the receiver under deliberately slow animation frames. Arrival must
 // still record inspection rather than oscillating around the destination.
 await page.evaluate(()=>{
  const schedule=window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame=callback=>schedule(()=>{window.setTimeout(()=>callback(performance.now()),180);});
 });
 await page.locator('[data-training-phase="check"]').click();
 await page.locator('[data-training-confirm-accept]').click();
 await expect(field).toHaveAttribute('data-field-state','briefing');
 await field.locator('[data-field-inspect]').click();
 await expect(field).toHaveAttribute('data-field-state','investigating',{timeout:30000});
 expect(Number((await scene.getAttribute('data-world-position'))!.split(',')[0])).toBeLessThan(-4);
});
test('paused graphics retain an explicit usable mission-control path',async({page})=>{
 await page.goto('sessions/week-01/');
 await page.locator('[data-world-launch]').click();
 await expect(page.locator('[data-world-canvas] canvas')).toBeVisible({timeout:45000});
 await page.locator('[data-world-pause]').click();
 await page.locator('[data-field-inspect]').click();
 await expect(page.locator('[data-field-operation]')).toHaveAttribute('data-field-state','investigating');
 await expect(page.locator('[data-world-pause]')).toHaveAttribute('aria-pressed','true');
});
