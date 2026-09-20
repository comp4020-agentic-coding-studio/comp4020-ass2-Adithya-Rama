// Optional Linux native-input review: xvfb-run -a pnpm exec node tools/native-pointer-review.mjs
// Requires existing Xvfb, Python 3, libX11 and libXtst; not part of the portable suite.
import {chromium} from '@playwright/test';
import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
const browser=await chromium.launch({headless:false,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1920,height:1080},reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/sessions/week-04/');
 await page.locator('[data-world-launch]').click();
 await page.locator('[data-world-canvas] canvas').waitFor({timeout:45000});
 await page.locator('[data-world-loading]').waitFor({state:'hidden',timeout:45000});
 await page.locator('[data-world-quality]').selectOption('low');
 const scene=page.locator('[data-academy-world]'),canvas=scene.locator('canvas');
 await scene.locator('[data-world-fullscreen]').click();
 await page.waitForFunction(()=>document.fullscreenElement===document.querySelector('[data-academy-world]'));
 await scene.locator('[data-world-pause]').click();
 await canvas.focus();
 await page.evaluate(()=>{window.samples=[];document.addEventListener('mousemove',event=>window.samples.push({x:event.movementX,y:event.movementY,trusted:event.isTrusted,locked:!!document.pointerLockElement}));});
 await page.keyboard.press('x');
 await page.waitForFunction(()=>document.pointerLockElement===document.querySelector('[data-world-canvas] canvas'));
 const before=await scene.getAttribute('data-world-camera');
 execFileSync('python3',['-c','import ctypes,time\nx11=ctypes.CDLL("libX11.so.6");xtst=ctypes.CDLL("libXtst.so.6")\nx11.XOpenDisplay.argtypes=[ctypes.c_char_p];x11.XOpenDisplay.restype=ctypes.c_void_p\nx11.XFlush.argtypes=[ctypes.c_void_p]\nxtst.XTestFakeRelativeMotionEvent.argtypes=[ctypes.c_void_p,ctypes.c_int,ctypes.c_int,ctypes.c_ulong]\ndisplay=x11.XOpenDisplay(None)\nassert display\nfor _ in range(8):\n xtst.XTestFakeRelativeMotionEvent(display,12,4,0)\n x11.XFlush(display)\n time.sleep(.04)\n']);
 await page.waitForFunction(old=>document.querySelector('[data-academy-world]').dataset.worldCamera!==old,before,{timeout:5000});
 const after=await scene.getAttribute('data-world-camera');
 const samples=await page.evaluate(()=>window.samples);
 if(!samples.some(sample=>sample.trusted&&sample.locked&&sample.x===12&&sample.y===4))throw new Error('No trusted OS-relative input delivered under native pointer lock');
 const report={method:'Headed Chromium with real XTest relative mouse input under Xvfb',before,after,mode:await scene.getAttribute('data-world-look-mode'),samples};
 const output=JSON.stringify(report,null,2)+'\n';
 if(process.argv[2])writeFileSync(process.argv[2],output);
 console.log(output);
}finally{await browser.close();}

