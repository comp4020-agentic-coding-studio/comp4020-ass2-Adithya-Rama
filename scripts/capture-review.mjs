import {chromium} from "@playwright/test";
import sharp from "sharp";
import {mkdir,writeFile} from "node:fs/promises";
const base=process.env.COURSE_BASE_URL??"http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/";
await mkdir("docs/evidence",{recursive:true});
const browser=await chromium.launch();
const review=[];
for(const [name,viewport]of [["desktop",{width:1920,height:1080}],["phone",{width:390,height:844}]]){
 const context=await browser.newContext({viewport});const page=await context.newPage();
 for(const route of ["","lectures/week-02/","lectures/week-07/","lectures/week-11/","assessments/assignment-1/"]){
  await page.goto(base+route);
  const file=route===""?"home":route.split("/").slice(0,2).join("-");
  await page.screenshot({path:"docs/evidence/"+file+"-"+name+".png"});
 }
 await page.goto(base+"operation/");await page.getByRole("button",{name:"Load labelled sample dossier"}).click();
 await page.screenshot({path:"docs/evidence/operation-"+name+".png"});
 await page.goto(base+"sessions/week-07/");
 await page.locator("[data-plan-comparison]").screenshot({path:"docs/evidence/revision-"+name+".png",style:".at-nav{visibility:hidden!important}"});
 await page.goto(base+"operation/");await page.getByRole("button",{name:"Start Contradiction",exact:true}).click();
 const run=page.locator("[data-rehearsal]");
 for(const choice of ["Disclose the record","Inspect the source conflict (2 units)","Renew agreement in council (2 units)","Adopt R2 and retest (2 units)","Examine the registry consequence (1 unit)","Disclose the record"])await run.getByRole("button",{name:choice,exact:true}).click();
 await page.locator("#rehearsal").screenshot({path:"docs/evidence/rehearsal-"+name+".png",style:".at-nav{visibility:hidden!important}"});
 if(name==="desktop"){
  const downloadPromise=page.waitForEvent("download");await page.getByRole("button",{name:"Export dossier Markdown"}).click();
  const download=await downloadPromise;await download.saveAs("docs/evidence/sample-rehearsal.md");
 }
 await page.goto(base+"decks/week-07/");await page.waitForSelector(".reveal.ready");
 const tiles=[];
 for(let i=0;i<14;i++){
  if(i>0)await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(120);
  const buffer=await page.screenshot();
  if(i===6)await writeFile("docs/evidence/deck-"+name+".png",buffer);
  const width=name==="desktop"?480:195;const height=name==="desktop"?270:422;
  tiles.push({input:await sharp(buffer).resize(width,height).png().toBuffer(),left:(i%4)*width,top:Math.floor(i/4)*height});
  review.push({viewport:name,slide:i+1,...await page.locator(".slides > section.present").evaluate(node=>({scrollHeight:node.scrollHeight,clientHeight:node.clientHeight,text:node.textContent?.slice(0,100)}))});
 }
 const width=name==="desktop"?480:195;const height=name==="desktop"?270:422;
 await sharp({create:{width:width*4,height:height*4,channels:3,background:"#222"}}).composite(tiles).png().toFile("docs/evidence/deck-contact-"+name+".png");
 await context.close();
}
await writeFile("docs/evidence/deck-fit.json",JSON.stringify(review,null,2));
await browser.close();console.log("Captured course review, preserved plans, a completed rehearsal and all 14 slides at both viewports.");
