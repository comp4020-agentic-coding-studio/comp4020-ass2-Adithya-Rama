import {chromium} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({headless:true});
try {
 const page=await browser.newPage({viewport:{width:1920,height:1080}});
 await page.goto('http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/demonstrations/lab-03/',{waitUntil:'networkidle'});
 await page.locator('.demo-theatre').scrollIntoViewIfNeeded();
 const report=await page.evaluate(()=>{const bounds=selector=>{const r=document.querySelector(selector).getBoundingClientRect();return{top:r.top,bottom:r.bottom,height:r.height}};return{theatre:bounds('.demo-theatre'),stage:bounds('.world-stage'),caption:bounds('.demo-caption'),viewport:innerHeight,header:document.querySelector('header')?.getBoundingClientRect().height};});
 await writeFile('docs/evidence/demo-layout-before-review.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
} finally {await browser.close();}
