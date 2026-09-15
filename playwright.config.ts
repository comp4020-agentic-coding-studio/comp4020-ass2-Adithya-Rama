import {defineConfig} from "@playwright/test";
const remote=process.env.COURSE_BASE_URL;
export default defineConfig({
 testDir:"./tests/browser",testMatch:"**/*.e2e.ts",timeout:30000,fullyParallel:true,workers:2,
 reporter:[["list"],["html",{open:"never"}]],
 use:{baseURL:remote??"http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/",trace:"retain-on-failure"},
 projects:[{name:"desktop",use:{viewport:{width:1920,height:1080}}},{name:"phone",use:{viewport:{width:390,height:844}}}],
 webServer:remote?undefined:{command:"pnpm preview --host 0.0.0.0",url:"http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/",reuseExistingServer:true,timeout:30000},
});
