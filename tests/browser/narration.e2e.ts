import {test,expect,type Page} from '@playwright/test';
import type {Demonstration} from '../../src/lib/demonstration-types';
import {installSpeechMock,type SpeechWindow} from './speech-fixture';

async function openCaptionPlayer(page:Page,id='lab-04'){
 await page.goto('demonstrations/'+id+'/');
 await expect(page.locator('[data-demo-play]')).toBeEnabled();
 // Voice lifecycle tests deliberately keep WebGL unopened; the same caption player is the supported graphics fallback.
 await page.locator('[data-world-launch]').evaluate(button=>(button as HTMLButtonElement).disabled=true);
 return page.locator('[data-demo-id]');
}
async function finishUntil(page:Page,phase:string){
 for(let i=0;i<160;i++){
  if(await page.locator('[data-demo-id]').getAttribute('data-demo-narration-phase')===phase)return;
  await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.finish());
  await page.waitForTimeout(10);
 }
 await expect(page.locator('[data-demo-id]')).toHaveAttribute('data-demo-narration-phase',phase);
}
async function nextCaption(page:Page){
 const text=await page.locator('[data-demo-caption]').innerText();
 await page.clock.fastForward(text.trim().split(/\s+/).length/2.6*1000+1900);
}

test('Watch starts narration only after its gesture and waits for speech before changing the apparatus',async({page})=>{
 await installSpeechMock(page);await page.clock.install();
 const player=await openCaptionPlayer(page);
 expect(await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.spoken)).toEqual([]);
 await page.locator('[data-demo-watch]').click();
 await expect(player).toHaveAttribute('data-demo-narration-phase','introduction');
 await expect(page.locator('[data-demo-narrate]')).toHaveText('Mute narration');
 await expect.poll(()=>page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.spoken.length)).toBeGreaterThan(0);
 await page.clock.fastForward(60000);
 await expect(player).toHaveAttribute('data-demo-narration-phase','introduction');
 expect(await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.cancelled)).toBe(0);
 await finishUntil(page,'action');
 expect(await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.frames.at(-1)?.phase)).toBe('before');
 await expect(page.locator('[data-demo-observed]')).toBeHidden();
 await finishUntil(page,'outcome');
 expect(await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.frames.at(-1)?.phase)).toBe('after');
 await expect(page.locator('[data-demo-observed]')).toBeVisible();
 const demo=await page.locator('[data-demo-definition]').evaluate(node=>JSON.parse(node.textContent!)) as Demonstration;
 await expect(page.locator('[data-demo-caption]')).toContainText(demo.steps[0]!.success);
});

test('pause and chapter navigation cancel voice and ignore old speech callbacks',async({page})=>{
 await installSpeechMock(page);const player=await openCaptionPlayer(page);
 await page.locator('[data-demo-watch]').click();
 await page.locator('[data-demo-play]').click();
 await expect(page.locator('[data-demo-play]')).toHaveText('Play');
 expect(await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.speaking)).toBe(false);
 await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.finishCancelled());
 await expect(player).toHaveAttribute('data-demo-narration-phase','introduction');
 await page.locator('[data-demo-play]').click();
 await expect.poll(()=>page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.spoken.length)).toBeGreaterThan(1);
 await page.locator('[data-demo-jump="1"]').click();
 await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.finishCancelled());
 await expect(page.locator('[data-demo-play]')).toHaveText('Play');
 await expect(page.locator('[data-demo-chapter]')).toContainText('02 /');
 expect(await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.speaking)).toBe(false);
 await page.locator('[data-demo-introduction]').click();
 await expect(player).toHaveAttribute('data-demo-narration-phase','introduction');
 await expect(page.locator('[data-demo-chapter]')).toContainText('01 /');
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
 await expect(page.locator('[data-demo-play]')).toHaveText('Play');
 expect(await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.speaking)).toBe(false);
 await page.evaluate(()=>Object.defineProperty(document,'hidden',{configurable:true,value:false}));
 await page.locator('[data-demo-play]').click();
 await page.evaluate(()=>window.dispatchEvent(new Event('pagehide')));
 expect(await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.speaking)).toBe(false);
});

test('taking control during a spoken action records supported practice',async({page})=>{
 await installSpeechMock(page);const player=await openCaptionPlayer(page);
 await page.locator('[data-demo-watch]').click();await finishUntil(page,'action');
 await expect(page.locator('[data-demo-jump="0"] [data-demo-chapter-state]')).toHaveText('Observed');
 await page.locator('button[data-demo-control]').click();
 await expect(player).toHaveAttribute('data-mode','control');
 expect(await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.speaking)).toBe(false);
 const demo=await page.locator('[data-demo-definition]').evaluate(node=>JSON.parse(node.textContent!)) as Demonstration;
 for(const control of demo.steps[0]!.controls){
  const field=page.locator('[data-demo-field="'+control.id+'"]');
  if(control.type==='select')await field.locator('select').selectOption(String(control.expected));
  else if(control.type==='toggle')await field.locator('input').setChecked(control.expected===true);
  else {expect(control.type).not.toBe('order');await field.locator('input').fill(String(control.expected));}
 }
 await page.locator('[data-demo-form] button[type="submit"]').click();
 await expect(page.locator('[data-demo-feedback]')).toHaveAttribute('data-correct','true');
 await expect(page.locator('[data-demo-jump="0"] [data-demo-chapter-state]')).toHaveText('Practised with support');
});

test('muting keeps captions playing and re-enabling narration requires no new page',async({page})=>{
 await installSpeechMock(page);await page.clock.install();const player=await openCaptionPlayer(page);
 await page.locator('[data-demo-watch]').click();await page.locator('[data-demo-narrate]').click();
 await expect(page.locator('[data-demo-narrate]')).toHaveText('Enable narration');
 expect(await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.speaking)).toBe(false);
 await nextCaption(page);await expect(player).toHaveAttribute('data-demo-narration-phase','briefing');
 await page.locator('[data-demo-narrate]').click();
 await expect(page.locator('[data-demo-narrate]')).toHaveText('Mute narration');
 expect(await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.speaking)).toBe(true);
});

for(const failure of ['error','no-start'] as const)test('a voice '+failure+' falls back to complete captions without freezing',async({page})=>{
 await installSpeechMock(page,{stall:failure==='no-start'});await page.clock.install();const player=await openCaptionPlayer(page);
 await page.locator('[data-demo-watch]').click();
 if(failure==='error')await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.fail());
 else await page.clock.fastForward(6000);
 await expect(page.locator('[data-demo-audio-status]')).toContainText(/caption/i);
 await expect(page.locator('[data-demo-narrate]')).toHaveText('Enable narration');
 await nextCaption(page);await expect(player).toHaveAttribute('data-demo-narration-phase','briefing');
 await expect(page.locator('[data-demo-play]')).toHaveText('Pause');
});

test('a browser without speech plays the introduction and actions with timed captions',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(window,'SpeechSynthesisUtterance',{configurable:true,value:undefined});});
 await page.clock.install();const player=await openCaptionPlayer(page,'lab-01');
 await expect(page.locator('[data-demo-narrate]')).toBeDisabled();
 await page.locator('[data-demo-watch]').click();await expect(player).toHaveAttribute('data-demo-narration-phase','introduction');
 await nextCaption(page);await expect(player).toHaveAttribute('data-demo-narration-phase','briefing');
 await nextCaption(page);await expect(player).toHaveAttribute('data-demo-narration-phase','action');
 await expect(page.locator('[data-demo-caption]')).not.toBeEmpty();
});

test('the final conclusion narrates observations and opens the complete worked submission',async({page})=>{
 await installSpeechMock(page);const player=await openCaptionPlayer(page,'assessment-final');
 await page.locator('[data-demo-completion]').click();
 await expect(player).toHaveAttribute('data-demo-narration-phase','completion');
 await expect(page.locator('.demo-finished details')).toHaveAttribute('open','');
 await expect(page.locator('[data-demo-jump]').last().locator('[data-demo-chapter-state]')).toHaveText('Ready to explore');
 await expect(page.locator('[data-demo-caption]')).toContainText('Completion preview');
 await expect(page.locator('[data-demo-field-proof]')).toContainText('0 / 18');
 await expect(page.locator('[data-field-operation]')).not.toHaveAttribute('data-field-state','complete');
 await expect(page.locator('[data-demo-caption]')).toContainText('Read the finished work');
 expect(await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.spoken.length)).toBeGreaterThan(0);
 for(let i=0;i<100&&await page.locator('[data-demo-play]').textContent()==='Pause';i++)await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.finish());
 await expect(page.locator('[data-demo-play]')).toHaveText('Play');
 await expect(page.locator('[data-demo-status]')).toContainText('finished');
 await page.locator('[data-demo-introduction]').click();
 await expect(player).toHaveAttribute('data-demo-narration-phase','introduction');
});

test('the restart dialog pauses narration and cancellation preserves the current visit',async({page})=>{
 await installSpeechMock(page);await openCaptionPlayer(page);
 await page.locator('[data-demo-jump="1"]').click();
 await page.locator('[data-demo-watch]').click();await finishUntil(page,'action');
 await expect(page.locator('[data-demo-jump="1"] [data-demo-chapter-state]')).toHaveText('Observed');
 await page.locator('[data-demo-reset]').click();
 await expect(page.locator('[data-demo-reset-dialog]')).toBeVisible();
 await expect(page.locator('[data-demo-play]')).toHaveText('Play');
 expect(await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.speaking)).toBe(false);
 await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.finishCancelled());
 await page.locator('[data-demo-reset-cancel]').click();
 await expect(page.locator('[data-demo-chapter]')).toContainText('02 /');
 await expect(page.locator('[data-demo-jump="1"] [data-demo-chapter-state]')).toHaveText('Observed');
 await page.locator('[data-demo-play]').click();
 expect(await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.speaking)).toBe(true);
 await page.locator('[data-demo-reset]').click();
 await page.locator('[data-demo-reset-confirm]').click();
 await expect(page.locator('[data-demo-chapter]')).toContainText('01 /');
 await expect(page.locator('[data-demo-jump="1"] [data-demo-chapter-state]')).toHaveText('Ready to explore');
 await expect(page.locator('[data-demo-play]')).toHaveText('Play');
 expect(await page.evaluate(()=>(window as unknown as SpeechWindow).__demoSpeechMock.speaking)).toBe(false);
});
