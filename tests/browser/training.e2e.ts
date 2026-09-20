import {readFile} from 'node:fs/promises';
import {test,expect,type Page,type Locator} from '@playwright/test';
import {completeRecovery,recordOutcome} from './mission-helpers';
const route=(week:number)=>'sessions/week-'+String(week).padStart(2,'0')+'/';
async function openLab(page:Page,week:number){
  await page.goto(route(week));const lab=page.locator('[data-training-week="'+week+'"]');
  await expect(lab.locator('[data-training-test]')).toBeEnabled();return lab;
}
async function finishField(lab:Locator){
  const field=lab.locator('[data-field-operation]');
  await field.locator('[data-field-inspect]').click();
  await field.locator('[data-field-execute]').click();
  await field.locator('[data-field-collect]').click();
  const checkpoints=field.locator('[data-field-checkpoint]');
  for(let i=0;i<await checkpoints.count();i++)await checkpoints.nth(i).click();
  await field.locator('[data-field-deliver]').click();
  await expect(field).toHaveAttribute('data-field-state','complete');
}
async function solve(lab:Locator,week:number,phase:'practice'|'check'|'transfer'='practice'){
  const c=lab.locator('[data-training-controls]');
  const click=(name:string)=>c.getByRole('button',{name,exact:true}).click();
  if(week===1){
    for(const id of ['clock','cup','door','note'])await click('Inspect '+id);
    await click('Cover scene and recall');
    await c.getByLabel('What time did the display show? Use HH:MM.').fill(phase==='practice'?'08:20':phase==='check'?'09:40':'14:10');
    for(let i=0;i<5;i++)await c.locator('select[name="classification'+i+'"]').selectOption(i<3?'observation':i===3?'claim':'inference');
  }
  if(week===2){
    for(let i=0;i<4;i++)await click('Walk to next location');
    await click('Cover list and retrieve');
    const items=phase==='practice'?['Compass','Lantern','Coil','Archive']:phase==='check'?['Lens','Battery','Map','Seal']:['Sample','Receipt','Sensor','Capsule'];
    for(let i=0;i<4;i++)await c.locator('input[name="recall'+i+'"]').fill(items[i]!);
  }
  if(week===3){
    const turns=phase==='practice'?1:phase==='check'?2:3;
    for(let i=0;i<turns;i++)await click('Rotate clockwise 90°');
    for(let i=0;i<turns-1;i++)await click('Raise one level (cycles 0–2)');
    await c.getByLabel('Where did the original north connector move?').selectOption('north becomes '+['east','south','west'][turns-1]);
  }
  if(week===4){
    await click('Release interlock');await click('Rotate cam 90°');if(phase!=='transfer')await click('Rotate cam 90°');
    await click('Attach return spring');
    if(phase==='check'){await click('Change driven gear (12 → 24 → 36)');await click('Change driven gear (12 → 24 → 36)');}
    if(phase==='transfer')await click('Change driven gear (12 → 24 → 36)');
    await c.getByLabel('Predict output direction relative to the driver').selectOption('opposite');
  }
  if(week===5){
    const fault=phase==='practice'?'fuse':phase==='check'?'cable':'lamp';
    await click('Switch on');await click('Measure battery');await click('Measure '+fault);await click('Isolate power');await click('Test '+fault+' continuity');await click('Replace '+fault);await click('Switch on');
  }
  if(week===6){await click('Inspect Archive A');await click('Inspect Archive B');await c.getByLabel('Which copy satisfies this manifest?').selectOption(phase==='transfer'?'B':'A');}
  if(week===7){
    for(const role of ['observer','technician','registrar']){
      const row=c.locator('.training-policy').filter({hasText:role});
      for(const action of ['read','service','certify']){
        const allowed=action==='read'||role==='technician'&&action==='service'&&phase!=='transfer'||role==='registrar'&&action==='certify';
        await row.getByLabel('Allow '+action,{exact:true}).setChecked(allowed);
      }
    }
  }
  if(week===8){
    const target=phase==='practice'?['Relay','2','AMBER']:phase==='check'?['Archive','3','COPPER']:['Dispatch','1','IVORY'];
    await click('Switch role');await c.getByLabel('Destination communicated').selectOption(target[0]!);
    await c.getByLabel('Quantity communicated').selectOption(target[1]!);await c.getByLabel('Verification code read back').fill(target[2]!);
    await c.getByLabel('The operator read back all three details and the analyst confirmed.').check();
  }
  if(week===9){
    for(const person of ['Operator Neri','Custodian Pell','Engineer Sen'])await click('Check '+person+' against the record');
    await c.getByLabel('Propose an agreement').selectOption(phase==='transfer'?'stabilise':'copy');
  }
  if(week===10){
    for(let i=0;i<4;i++)await click('Add east');for(let i=0;i<4;i++)await click('Add north');
    await c.getByLabel('Predicted sensor contacts (number)').fill(phase==='practice'?'0':'1');
    for(let i=0;i<8;i++)await click('Execute next step');
  }
  if(week===11){
    await click('Publish the disruption');await c.getByLabel('Revised sequence',{exact:true}).fill('Inspect manifest, restore relay, verify the extra west relay, use west passage and record handover.');
    await c.getByLabel('Why this revision addresses the changed dependency').fill('The east passage is no longer available. Assign an operator to verify the west relay before the team commits to the new route.');
  }
  if(week===11){
    await c.getByLabel('Replacement dependency to rehearse').selectOption(phase==='transfer'?'reference-readings':'west-relay');
    await click('Rehearse the replacement dependency');
  }
  if(week===12){
    await c.getByLabel('What objective did your team pursue?').fill('Recover a verified usable archive copy.');
    await c.getByLabel('Which recorded actions and observations support the result?').fill('The mission record should identify the inspected source manifest and the completed checksum comparison.');
    await c.getByLabel('What credible alternative did you reject, and why?').fill('A supported handover could preserve the original; compare its delay with the requirement for a usable copy.');
  }
  await lab.locator('[data-training-test]').click();
  await expect(lab.locator('[data-training-result]')).toHaveAttribute('data-skill-verified','true');
  await expect(lab.locator('[data-training-result]')).toHaveAttribute('data-complete','false');
  await finishField(lab);
  await expect(lab.locator('[data-training-result]')).toHaveAttribute('data-complete','true');
}
for(let week=1;week<=12;week++)test('week '+week+' supports meaningful controls and evidence',async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  if(week===12){
    await completeRecovery(page);
    await recordOutcome(page,'physical');
    await page.locator('[data-ending="physical"]').click();
    await expect(page.locator('[data-mission-status]')).toContainText('complete');
  }
  const lab=await openLab(page,week);await solve(lab,week);
  await lab.locator('[data-training-reflection]').fill('I compared my prediction with the observed result and checked the specific rule before recording this attempt.');
  await lab.locator('[data-training-save]').click();
  await expect(lab.locator('[data-training-save-status]')).toContainText('local skills passport');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  expect(errors).toEqual([]);
});
for(const week of [4,5,7,10])test('week '+week+' changes its skill check and transfer requirements',async({page})=>{
  const lab=await openLab(page,week);
  for(const phase of ['check','transfer'] as const){
    await lab.locator('[data-training-phase="'+phase+'"]').click();
    if(phase==='transfer'){await expect(lab.locator('[data-training-confirm-dialog]')).toBeVisible();await lab.locator('[data-training-confirm-accept]').click();}
    await solve(lab,week,phase);
  }
});
test('mechanical controls preserve keyboard focus and reload an exact unfinished checkpoint',async({page})=>{
  const lab=await openLab(page,4);const c=lab.locator('[data-training-controls]');
  await c.getByRole('button',{name:'Release interlock',exact:true}).focus();await page.keyboard.press('Enter');
  await expect(c.getByRole('button',{name:'Engage interlock',exact:true})).toBeFocused();
  await c.getByRole('button',{name:'Rotate cam 90°',exact:true}).focus();await page.keyboard.press('Enter');await page.keyboard.press('Enter');
  await expect(c.getByRole('button',{name:'Rotate cam 90°',exact:true})).toBeFocused();
  await lab.locator('[data-training-reflection]').fill('A blocked cam does not respond until I release the interlock.');
  await page.reload();await expect(page.locator('[data-training-reflection]')).toHaveValue(/blocked cam/);
  await expect(page.locator('.training-readout')).toContainText('180°');await expect(page.locator('.training-readout')).toContainText('Released');
  await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
test('scene actions and HTML actions operate the same mechanism',async({page})=>{
  const lab=await openLab(page,4);
  await page.evaluate(()=>window.dispatchEvent(new CustomEvent('mastermind:interact',{detail:{week:4,objectId:'interlock'}})));
  await expect(lab.locator('.training-readout')).toContainText('Released');
  await page.evaluate(()=>window.dispatchEvent(new CustomEvent('mastermind:interact',{detail:{week:4,objectId:'cam'}})));
  await expect(lab.locator('.training-readout')).toContainText('90°');
  await lab.locator('[data-training-controls]').getByRole('button',{name:'Rotate cam 90°',exact:true}).click();
  await expect(lab.locator('.training-readout')).toContainText('180°');
});
test('all supplied rules remain readable without JavaScript',async({browser,baseURL})=>{
  const context=await browser.newContext({javaScriptEnabled:false,baseURL});const page=await context.newPage();
  for(const week of [2,4,7,10,11]){
    await page.goto(route(week));const worksheet=page.locator('.training-worksheet');await worksheet.locator('summary').click();
    await expect(worksheet).toContainText('Your output');expect(await worksheet.textContent()).toMatch(/supplied|Supplied|Preserved/);
  }
  await context.close();
});



test('a passport reset clears this lab and an imported draft restores it in place',async({page})=>{
  const lab=await openLab(page,4);
  await lab.locator('[data-training-controls]').getByRole('button',{name:'Release interlock',exact:true}).click();
  await lab.locator('[data-training-controls]').getByRole('button',{name:'Rotate cam 90°',exact:true}).click();
  await lab.locator('[data-training-reflection]').fill('The cam moved one quarter-turn after the interlock was released.');
  const downloadPromise=page.waitForEvent('download');await page.locator('[data-passport-export="json"]').click();
  const download=await downloadPromise;const file=await download.path();expect(file).toBeTruthy();
  await page.locator('[data-passport-reset]').click();await page.locator('[data-dialog-confirm]').click();
  await expect(lab.locator('[data-training-reflection]')).toHaveValue('');
  await expect(lab.locator('.training-readout')).toContainText('Engaged');
  await page.locator('[data-passport-import]').setInputFiles({name:'mastermind-passport.json',mimeType:'application/json',buffer:await readFile(file!)});
  await expect(lab.locator('[data-training-reflection]')).toHaveValue(/quarter-turn/);
  await expect(lab.locator('.training-readout')).toContainText('90°');
  await expect(lab.locator('.training-readout')).toContainText('Released');
});
test('phase and restart confirmations preserve an attempt until explicitly accepted',async({page})=>{
  const lab=await openLab(page,4);
  const nativeDialogs:string[]=[];page.on('dialog',dialog=>{nativeDialogs.push(dialog.type());void dialog.dismiss();});
  await lab.locator('[data-training-controls]').getByRole('button',{name:'Release interlock',exact:true}).click();
  await lab.locator('[data-training-reflection]').fill('Keep this explanation while I decide whether to change configuration.');
  await lab.locator('[data-training-phase="check"]').click();
  await expect(lab.locator('[data-training-confirm-dialog]')).toBeVisible();
  await expect(lab.locator('[data-training-confirm-message]')).toContainText('Start the skill check configuration?');
  await lab.locator('[data-training-confirm-cancel]').click();
  await expect(lab.locator('[data-training-phase="practice"]')).toHaveAttribute('aria-pressed','true');
  await expect(lab.locator('.training-readout')).toContainText('Released');
  await expect(lab.locator('[data-training-reflection]')).toHaveValue(/Keep this explanation/);
  await lab.locator('[data-training-reset]').click();
  await expect(lab.locator('[data-training-confirm-dialog]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(lab.locator('[data-training-confirm-dialog]')).not.toBeVisible();
  await expect(lab.locator('.training-readout')).toContainText('Released');
  await lab.locator('[data-training-reset]').click();
  await lab.locator('[data-training-confirm-accept]').click();
  await expect(lab.locator('.training-readout')).toContainText('Engaged');
  await expect(lab.locator('[data-training-reflection]')).toHaveValue(/Keep this explanation/);
  await lab.locator('[data-training-phase="check"]').click();
  await expect(lab.locator('[data-training-confirm-dialog]')).toBeVisible();
  await lab.locator('[data-training-confirm-accept]').click();
  await expect(lab.locator('[data-training-phase="check"]')).toHaveAttribute('aria-pressed','true');
  await expect(lab.locator('[data-training-reflection]')).toHaveValue('');
  expect(nativeDialogs).toEqual([]);
});
