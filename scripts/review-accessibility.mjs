import {chromium} from "@playwright/test";
import {realpathSync} from "node:fs";
import {createRequire} from "node:module";
import {writeFile} from "node:fs/promises";
const themeRequire=createRequire(realpathSync(new URL("../node_modules/astro-theme-university/package.json",import.meta.url)));
const axePath=themeRequire.resolve("axe-core/axe.min.js");
const base=process.env.COURSE_BASE_URL??"http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/";
const browser=await chromium.launch();
const reports=[];
try {
 for(const viewport of [{width:1920,height:1080},{width:390,height:844}]){
  const page=await browser.newPage({viewport});
  for(const route of ["","sessions/week-07/","operation/","assessments/assignment-1/","policies/","decks/week-07/"]){
   await page.goto(base+route);
   if(route==="operation/")await page.getByRole("button",{name:"Load labelled sample dossier"}).click();
   if(route.startsWith("decks"))await page.waitForSelector(".reveal.ready");
   await page.addScriptTag({path:axePath});
   const results=await page.evaluate(async()=>window.axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}}));
   reports.push({viewport,route,violations:results.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:results.incomplete.map(v=>({id:v.id,nodes:v.nodes.length}))});
  }
  await page.close();
 }
} finally {await browser.close();}
await writeFile("docs/evidence/accessibility.json",JSON.stringify(reports,null,2));
const failures=reports.filter(r=>r.violations.length);
console.log(JSON.stringify(failures.length?failures:{pages:reports.length,violations:0},null,2));
if(failures.length)process.exitCode=1;
