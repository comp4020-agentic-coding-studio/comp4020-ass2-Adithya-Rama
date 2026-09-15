// Keep the API's source references aligned with the activity's authoritative case list.
import {readFile,writeFile} from "node:fs/promises";
import {activities} from "../src/data/academy.ts";
for(const a of activities)for(const collection of ["lectures","sessions"]){
 const path="src/content/"+collection+"/week-"+String(a.week).padStart(2,"0")+".md";
 const original=await readFile(path,"utf8");
 await writeFile(path,original.replace(/^caseFiles:.*$/m,"caseFiles: "+JSON.stringify(a.caseIds)));
}
console.log("Aligned the 24 teaching records with their activity case references.");
