import {test,expect} from "@playwright/test";
test("a throttled connection still presents teaching before activity use",async({page})=>{
 const session=await page.context().newCDPSession(page);
 await session.send("Network.enable");
 await session.send("Network.emulateNetworkConditions",{offline:false,latency:150,downloadThroughput:150_000,uploadThroughput:75_000});
 await page.goto("sessions/week-02/",{waitUntil:"domcontentloaded"});
 await expect(page.locator("h1")).toBeVisible();
 await page.getByText("Worksheet, feedback and exemplar",{exact:true}).click();
 await expect(page.getByText("Worked response:",{exact:false})).toBeVisible();
 await expect(page.getByRole("button",{name:"Save to dossier & review"})).toBeEnabled();
 await session.detach();
});
