import {test,expect} from '@playwright/test';
import {installSpeechMock,type SpeechWindow} from './speech-fixture';

test('an investigative demonstration concludes with its learning record without forced delivery',async({page})=>{
 await installSpeechMock(page);await page.goto('demonstrations/lab-02/');
 await page.locator('[data-world-launch]').evaluate(button=>(button as HTMLButtonElement).disabled=true);
 await expect(page.getByRole('region',{name:'Learning method'})).toContainText('external written record');
 await page.locator('[data-demo-watch]').click();
 const player=page.locator('[data-demo-id]');
 for(let i=0;i<150;i++){
  if(await player.getAttribute('data-demo-narration-phase')==='completion')break;
  await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.finish());
  await page.waitForTimeout(20);
 }
 await expect(player).toHaveAttribute('data-demo-narration-phase','completion');
 await expect(page.locator('[data-demo-caption]')).toContainText('investigation and explained record are complete');
 await expect(page.locator('[data-demo-caption]')).not.toContainText('Completion preview');
 await expect(page.locator('[data-field-operation]')).not.toHaveAttribute('data-field-state','complete');
 await expect(page.locator('[data-demo-field-proof]')).toContainText('Scene delivery is optional');
 const spoken=await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.spoken.join(' '));
 expect(spoken).toContain('Written checklist with receiver read-back');
 expect(spoken).toContain('The method we are practising');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

test('jumping to the last chapter is an explicit preview rather than completed investigation',async({page})=>{
 await installSpeechMock(page);await page.goto('demonstrations/lab-01/');
 await page.locator('[data-world-launch]').evaluate(button=>(button as HTMLButtonElement).disabled=true);
 await page.locator('[data-demo-completion]').click();
 await expect(page.locator('[data-demo-caption]')).toContainText('Completion preview');
 await expect(page.locator('[data-demo-field-proof]')).toContainText('0 / 6');
});