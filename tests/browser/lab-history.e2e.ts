import {readFile} from 'node:fs/promises';
import {test,expect,type Page} from '@playwright/test';
const saveKey='mastermind:SLOP4408:v2';
function legacyPassport(){
 const state={week:4,phase:'practice',values:{gear:24,cam:0,spring:false,interlock:true,turns:0,prediction:''},sequence:[],inspected:[],actions:['Original observation before the revised investigation task.'],feedback:'Historical draft feedback.',complete:false};
 const draft={week:4,state,reflection:'My original draft explanation must survive the new lab requirements.'};
 const record={week:4,phase:'practice',state,actions:['Earlier recorded action.'],result:'Earlier record result.',reflection:'Earlier saved explanation.',completed:false,id:'w4-practice',at:'2026-09-15T12:00:00.000Z'};
 return {schemaVersion:2,courseCode:'SLOP4408',curriculumVersion:'last-light-1',updatedAt:'2026-09-15T12:00:00.000Z',revision:2,selectedWeek:4,records:[record],drafts:{'4':draft},missions:{},runs:[],preferences:{motion:'reduced',quality:'low',audio:false}};
}
async function openHistoricalLab(page:Page){
 const original=legacyPassport();
 await page.addInitScript(({key,data})=>{if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify(data));},{key:saveKey,data:original});
 await page.goto('sessions/week-04/');
 const lab=page.locator('[data-training-week="4"]');
 await expect(lab.locator('[data-training-feedback]')).toContainText('archived automatically');
 return {original,lab};
}
async function exported(page:Page,kind:'json'|'markdown'){
 const pending=page.waitForEvent('download');await page.locator('[data-passport-export="'+kind+'"]').click();const file=await (await pending).path();expect(file).toBeTruthy();return readFile(file!,'utf8');
}
test('historical draft and phase record survive new work, JSON and Markdown export, and reload',async({page})=>{
 const {original,lab}=await openHistoricalLab(page);
 await lab.getByRole('button',{name:'Inspect holding brake',exact:true}).click();
 await expect(page.locator('[data-passport-count]')).toContainText('1 preserved historical lab records');
 const reflection='Current investigation: inspect the original brake before proposing a correction.';
 await lab.locator('[data-training-reflection]').fill(reflection);await lab.locator('[data-training-save]').click();
 await expect(page.locator('[data-passport-count]')).toContainText('2 preserved historical lab records');
 const backup=JSON.parse(await exported(page,'json'));
 expect(backup.labHistory).toHaveLength(2);
 expect(backup.labHistory.find((e:{source:string})=>e.source==='draft').draft).toEqual(original.drafts['4']);
 expect(backup.labHistory.find((e:{source:string})=>e.source==='record').record).toEqual(original.records[0]);
 expect(backup.drafts['4'].state.learningVersion).toBe(2);expect(backup.records[0].state.learningVersion).toBe(2);
 const markdown=await exported(page,'markdown');expect(markdown).toContain(original.drafts['4'].reflection);expect(markdown).toContain(original.records[0]!.reflection);
 await page.reload();await expect(lab.locator('[data-training-reflection]')).toHaveValue(reflection);await expect(page.locator('[data-passport-count]')).toContainText('2 preserved historical lab records');
 expect(JSON.parse(await exported(page,'json')).labHistory).toEqual(backup.labHistory);
});
test('malformed historical archive import is rejected before replacing current work',async({page})=>{
 const {lab}=await openHistoricalLab(page);await lab.getByRole('button',{name:'Inspect holding brake',exact:true}).click();
 await lab.locator('[data-training-reflection]').fill('My current investigation remains intact after a rejected history import.');
 const before=await page.evaluate(key=>localStorage.getItem(key),saveKey);expect(before).toBeTruthy();
 const malformed=JSON.parse(before!);malformed.labHistory[0].draft.state.week=99;
 await page.locator('[data-passport-import]').setInputFiles({name:'invalid-history.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(malformed))});
 await expect(page.locator('[data-passport-status]')).toContainText('historical lab draft has invalid values');
 await expect(page.locator('[data-passport-dialog]')).not.toBeVisible();
 await expect(lab.locator('[data-training-reflection]')).toHaveValue('My current investigation remains intact after a rejected history import.');
 expect(await page.evaluate(key=>localStorage.getItem(key),saveKey)).toBe(before);
 expect(JSON.parse(await exported(page,'json'))).toEqual(JSON.parse(before!));
});