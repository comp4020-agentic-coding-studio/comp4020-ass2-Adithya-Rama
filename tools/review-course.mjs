import {chromium} from "@playwright/test";
import {mkdir,writeFile} from "node:fs/promises";
const browser=await chromium.launch({headless:true,args:["--enable-unsafe-swiftshader"]});
await mkdir("docs/evidence/redesign",{recursive:true});
const observations=[];
for(const [name,width,height] of [["desktop",1920,1080],["phone",390,844]]){
 const page=await browser.newPage({viewport:{width,height}});
 for(const [slug,path] of [["home",""],["mechanism","sessions/week-04/"],["assessment","assessments/assignment-1/"],["mission","operation/"]]){
  const errors=[];page.on("pageerror",e=>errors.push(e.message));
  await page.goto("http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/"+path,{waitUntil:"networkidle"});
  await page.screenshot({path:"docs/evidence/redesign/"+slug+"-"+name+".png",fullPage:false});
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  observations.push({page:path,viewport:name,overflow,errors});
 }
 await page.close();
}
await writeFile("docs/evidence/redesign/page-inspection.json",JSON.stringify(observations,null,2));
await browser.close();
console.log(JSON.stringify(observations));
