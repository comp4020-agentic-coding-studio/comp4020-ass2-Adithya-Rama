import {test,expect} from '@playwright/test';
test('academic overview and study information precede the practical environment',async({page})=>{
 await page.goto('./');
 await expect(page.locator('.course-introduction')).toContainText('In-person teaching preferred');
 await expect(page.locator('.course-introduction .actions a').first()).toHaveAttribute('href','#overview');
 for(const id of ['overview','audience','outcomes','study','assessment','teaching-team'])await expect(page.locator('#'+id)).toBeVisible();
 expect(await page.locator('.overview-outcomes li').count()).toBe(6);
 expect(await page.locator('.study-stages a').count()).toBe(12);
 expect(await page.locator('#assessment .schedule-row').count()).toBe(4);
 expect(await page.locator('#teaching-team article').count()).toBe(3);
 expect(await page.evaluate(()=>Boolean(document.querySelector('#assessment')!.compareDocumentPosition(document.querySelector('#learning-environment')!)&Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
 const nav=page.getByRole('navigation',{name:'Course navigation',exact:true});
 await nav.getByRole('link',{name:'Course guide',exact:true}).click();
 await expect(page.locator('#materials')).toContainText('No purchased textbook');
 await expect(page.locator('.guide-routes article').first()).toContainText('In person');
 await page.getByRole('navigation',{name:'Course navigation',exact:true}).getByRole('link',{name:'People',exact:true}).click();
 await expect(page.locator('.staff-row')).toHaveCount(3);
 await expect(page.locator('main')).toContainText('Course convenor');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
test('all labs and assessments explain concrete campus learning before online participation',async({page})=>{
 test.setTimeout(60000);
 const routes=[...Array.from({length:12},(_,i)=>'sessions/week-'+String(i+1).padStart(2,'0')+'/'),...['fieldwork','assignment-1','assignment-2','final-project'].map(id=>'assessments/'+id+'/'),'operation/'];
 for(const route of routes){
  await page.goto(route);
  const study=page.getByRole('region',{name:'How you will study this activity'});
  await expect(study).toContainText('IN PERSON (PREFERRED)');
  await expect(study.locator('.study-route-options section').first()).toContainText('In person');
  expect((await study.locator('.study-route-options section p').first().textContent())!.length).toBeGreaterThan(100);
  await expect(study).toContainText('Online');
  const online=page.locator('[data-academy-world]').first();
  if(await online.count())expect(await study.evaluate(node=>Boolean(node.compareDocumentPosition(document.querySelector('[data-academy-world]')!)&Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
 }
});
test('academic information remains readable without scripts at narrow and intermediate widths',async({browser,baseURL})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();
 for(const width of [320,768]){
  await page.setViewportSize({width,height:900});
  for(const route of ['','course-guide/','people/']){
   const response=await page.goto(new URL(route,baseURL!).href);expect(response!.status()).toBe(200);
   await expect(page.locator('main h1')).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  }
 }
 await context.close();
});