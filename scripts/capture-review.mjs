import {chromium} from "@playwright/test";
import sharp from "sharp";
import {mkdir,writeFile} from "node:fs/promises";
const base=process.env.COURSE_BASE_URL??"http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/";
await mkdir("docs/evidence",{recursive:true});
const browser=await chromium.launch();
const review=[];
for(const [name,viewport]of [["desktop",{width:1920,height:1080}],["phone",{width:390,height:844}]]){
 const context=await browser.newContext({viewport});const page=await context.newPage();
 for(const route of ["","sessions/week-07/","operation/"]){
  await page.goto(base+route);await page.screenshot({path:"docs/evidence/"+(route===""?"home":route.startsWith("sessions")?"revision":"operation")+"-"+name+".png"});
 }
 await page.goto(base+"decks/week-07/");
 await page.waitForSelector(".reveal.ready");
 const tiles=[];
 for(let i=0;i<14;i++){
  if(i>0) await page.keyboard.press("ArrowRight");
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
await browser.close();console.log("Captured desktop, phone and all 14 slides at both viewports.");
