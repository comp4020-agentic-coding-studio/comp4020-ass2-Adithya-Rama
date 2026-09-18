import {chromium} from "@playwright/test";
import {readFile,writeFile} from "node:fs/promises";
const source=await readFile("node_modules/.pnpm/axe-core@4.13.0/node_modules/axe-core/axe.min.js","utf8");
const browser=await chromium.launch({headless:true});const report=[];
for(const viewport of [{width:1920,height:1080},{width:390,height:844}]){
 const page=await browser.newPage({viewport});
 for(const path of ["","academy/","sessions/week-02/","sessions/week-04/","sessions/week-07/","sessions/week-11/","assessments/assignment-1/","operation/"]){
  await page.goto("http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/"+path,{waitUntil:"networkidle"});
  await page.addScriptTag({content:source});
  const results=await page.evaluate(async()=>await window.axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}}));
  report.push({path,viewport,violations:results.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
 }
 await page.close();
}
await browser.close();await writeFile("docs/evidence/redesign/accessibility.json",JSON.stringify(report,null,2));console.log(JSON.stringify(report.filter(r=>r.violations.length),null,2));if(report.some(r=>r.violations.length))process.exitCode=1;
