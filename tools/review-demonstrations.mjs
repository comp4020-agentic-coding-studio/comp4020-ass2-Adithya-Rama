import {chromium} from "@playwright/test";
import {readFile,writeFile,mkdir} from "node:fs/promises";
const axe=await readFile("node_modules/.pnpm/axe-core@4.13.0/node_modules/axe-core/axe.min.js","utf8");
const browser=await chromium.launch({headless:true});
const report=[];await mkdir("docs/evidence/demonstrations",{recursive:true});
const paths=["demonstrations/","demonstrations/lab-01/","demonstrations/lab-04/","demonstrations/lab-07/","demonstrations/assessment-fieldwork/","demonstrations/assessment-a1/","demonstrations/assessment-a2/","demonstrations/assessment-final/"];
for(const [name,viewport] of [["desktop",{width:1920,height:1080}],["phone",{width:390,height:844}]]){
 const page=await browser.newPage({viewport});
 for(const path of paths){
  const errors=[];const listener=e=>errors.push(e.message);page.on("pageerror",listener);
  await page.goto("http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/"+path+"?mode=control",{waitUntil:"networkidle"});
  const sample=page.locator(".demo-finished details");
  if(await sample.count())await sample.evaluate(node=>node.open=true);
  await page.addScriptTag({content:axe});
  const result=await page.evaluate(()=>window.axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}}));
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  const slug=path.split("/").filter(Boolean).at(-1);
  await page.screenshot({path:"docs/evidence/demonstrations/"+slug+"-"+name+".png",fullPage:false});
  report.push({path,viewport,overflow,errors,violations:result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
  page.off("pageerror",listener);
 }
 await page.close();
}
await browser.close();await writeFile("docs/evidence/demonstrations/accessibility.json",JSON.stringify(report,null,2));
const failures=report.filter(r=>r.overflow||r.errors.length||r.violations.length);console.log(JSON.stringify(failures,null,2));if(failures.length)process.exitCode=1;
