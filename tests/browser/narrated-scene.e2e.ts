import {test,expect,type Page} from '@playwright/test';
import {installSpeechMock,type SpeechWindow} from './speech-fixture';
test.use({launchOptions:{args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']}});
test.setTimeout(120000);

async function finishUntil(page:Page,phase:string){
 for(let i=0;i<160;i++){
  if(await page.locator('[data-demo-id]').getAttribute('data-demo-narration-phase')===phase)return;
  await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.finish());
  await page.waitForTimeout(10);
 }
 await expect(page.locator('[data-demo-id]')).toHaveAttribute('data-demo-narration-phase',phase);
}
async function launchWatch(page:Page,id:string){
 await installSpeechMock(page);
 await page.goto('demonstrations/'+id+'/');
 await page.locator('[data-demo-watch]').click();
 const world=page.locator('[data-academy-world]');
 await expect(world.locator('[data-world-canvas] canvas')).toBeVisible({timeout:45000});
 await expect(world.locator('[data-world-loading]')).toBeHidden({timeout:45000});
 await world.locator('[data-world-quality]').selectOption('low');
 await world.locator('[data-world-fullscreen]').click();
 await expect(world).toHaveAttribute('data-immersive','true');
 return world;
}
test('narrated observation shows the demonstrator and apparatus, then preserves takeover',async({page})=>{
 const world=await launchWatch(page,'lab-01');
 const panel=world.locator('[data-immersive-console]');
 await expect(world).toHaveAttribute('data-world-demonstrator','beside-apparatus');
 const cast=await world.evaluate(node=>JSON.parse(node.dataset.worldStaging!).characters);
 expect(cast.map((person:{role:string})=>person.role).sort()).toEqual(['demonstrator','instructor']);
 expect(cast.every((person:{visible:boolean})=>person.visible)).toBe(true);
 await expect(panel.locator('[data-scene-player-label]')).toContainText('Student demonstrator');
 await expect(panel.locator('[data-demo-narrate]')).toHaveText('Mute narration');
 await finishUntil(page,'action');
 await expect(panel.locator('[data-demo-caption]')).toContainText('11:35');
 await finishUntil(page,'outcome');
 await expect(world).toHaveAttribute('data-world-demo-phase','after');
 await panel.locator('[data-demo-play]').click();
 await page.waitForTimeout(700);
 await page.screenshot({path:test.info().outputPath('narrated-clock-fullscreen.png')});
 expect(await panel.evaluate(node=>node.scrollWidth<=node.clientWidth+1)).toBe(true);
 await panel.locator('button[data-demo-control]').click();
 await expect(panel.locator('[data-scene-player-label]')).toHaveText('You control the student');
 await panel.locator('[data-demo-input="clock"]').fill('11:35');
 await panel.locator('[data-demo-form] button').click();
 await expect(panel.locator('[data-demo-jump="0"]')).toContainText('Practised with support');
 expect(await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.speaking)).toBe(false);
});

test('final walkthrough presents distinct crew and spoken completed-work review inside fullscreen',async({page})=>{
 const world=await launchWatch(page,'assessment-final');
 const panel=world.locator('[data-immersive-console]');
 await panel.locator('[data-demo-jump="1"]').click();
 await panel.locator('[data-demo-play]').click();
 await expect(world).toHaveAttribute('data-world-demo-step','crew');
 await expect.poll(async()=>{
  const data=await world.evaluate(node=>JSON.parse(node.dataset.worldStaging!));
  return data.objects.filter((item:{role:string})=>item.role==='case-record').map((item:{label:string})=>item.label).join(' ');
 }).toMatch(/Lena.*Omar.*Priya.*Jonah/);
 await panel.locator('[data-demo-play]').click();
 await page.waitForTimeout(700);
 await page.screenshot({path:test.info().outputPath('narrated-final-crew.png')});
 await panel.locator('[data-demo-completion]').click();
 await expect(page.locator('[data-demo-id]')).toHaveAttribute('data-demo-narration-phase','completion');
 await expect(panel.locator('[data-demo-caption]')).toContainText('Version One');
 await expect(panel.locator('[data-demo-caption]')).toContainText('Version Two');
 await expect(panel.locator('[data-demo-caption]')).toContainText('individual defences');
 await expect(panel.locator('.demo-finished details')).toHaveAttribute('open','');
 await panel.locator('[data-demo-play]').click();
 await panel.locator('[data-demo-caption]').scrollIntoViewIfNeeded();
 await page.screenshot({path:test.info().outputPath('narrated-final-conclusion.png')});
 expect(await panel.evaluate(node=>node.scrollWidth<=node.clientWidth+1)).toBe(true);
});
