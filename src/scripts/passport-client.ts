import {PassportStore,parsePassport,passportHasWork,passportMarkdown,withEvidence,type EvidenceInput} from "../lib/passport";
let storage:Storage|undefined;try{storage=window.localStorage;}catch{}
export const passport=new PassportStore(storage);
export function download(text:string,name:string,type="text/plain"){
 const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement("a");a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
export function announcePassport(){
 document.querySelectorAll<HTMLElement>("[data-passport-status]").forEach(e=>e.textContent=passport.message);
 document.querySelectorAll<HTMLElement>("[data-passport-count]").forEach(e=>e.textContent=passport.state.records.length+" practice records · "+passport.state.runs.length+" completed trials · saved "+new Date(passport.state.updatedAt).toLocaleString());
 window.dispatchEvent(new CustomEvent("mastermind:restore",{detail:{records:passport.state.records,drafts:passport.state.drafts,missions:passport.state.missions}}));
}
function initialise(){
 document.querySelectorAll<HTMLElement>(".passport-tools button,.passport-tools input").forEach(e=>e.removeAttribute("disabled"));
 document.querySelectorAll<HTMLButtonElement>("[data-passport-legacy]").forEach(e=>{e.hidden=!passport.legacy();e.addEventListener("click",()=>download(passport.legacy()??"{}","mastermind-legacy-preserved.json","application/json"));});
 document.querySelectorAll<HTMLButtonElement>("[data-passport-export]").forEach(e=>e.addEventListener("click",()=>e.dataset.passportExport==="json"?download(JSON.stringify(passport.state,null,2),"mastermind-passport.json","application/json"):download(passportMarkdown(passport.state),"mastermind-learning-record.md","text/markdown")));
 for(const region of document.querySelectorAll<HTMLElement>(".passport-tools")){
  const dialog=region.querySelector<HTMLDialogElement>("[data-passport-dialog]")!;
  let pending:(()=>void)|undefined;
  const confirm=(title:string,body:string,action:()=>void)=>{pending=action;dialog.querySelector("[data-dialog-title]")!.textContent=title;dialog.querySelector("[data-dialog-body]")!.textContent=body;dialog.showModal();};
  dialog.querySelector("[data-dialog-confirm]")?.addEventListener("click",()=>{pending?.();pending=undefined;dialog.close();announcePassport();});
  dialog.querySelector("[data-dialog-cancel]")?.addEventListener("click",()=>{pending=undefined;dialog.close();});
  region.querySelector("[data-passport-archive]")?.addEventListener("click",()=>confirm("Export and clear completed-run history?","A JSON backup will download before clearing historical runs. Your active missions and lab work remain.",()=>{download(JSON.stringify(passport.state,null,2),"mastermind-history-backup.json","application/json");const next=structuredClone(passport.state);next.runs=[];next.revision++;next.updatedAt=new Date().toISOString();passport.commit(next);}));
  region.querySelector("[data-passport-reset]")?.addEventListener("click",()=>confirm("Reset this skills passport?","Export a backup first. This clears new training records and missions. The legacy dossier is preserved.",()=>{passport.reset();window.dispatchEvent(new CustomEvent("mastermind:reset"));}));
  region.querySelector<HTMLInputElement>("[data-passport-import]")?.addEventListener("change",async event=>{
   const input=event.target as HTMLInputElement;const file=input.files?.[0];if(!file)return;
   try {
    if(!file.name.toLowerCase().endsWith(".json"))throw new Error("Choose a JSON backup file.");
    if(file.size>1024*1024)throw new Error("The JSON backup must be no larger than 1 MB.");
    const raw=await file.text();parsePassport(raw);
    const replace=()=>{passport.import(raw);window.dispatchEvent(new CustomEvent("mastermind:replace"));announcePassport();};
    if(passportHasWork(passport.state)||passport.protected)confirm("Restore this backup?","The validated file will replace the current passport. Export current work first if you need both.",replace);else replace();
   }catch(error){passport.message=error instanceof Error?error.message:"The backup could not be read. Your current work has not changed.";announcePassport();}
   input.value="";
  });
  region.querySelector("[data-passport-print]")?.addEventListener("click",()=>{
   const report=region.querySelector<HTMLElement>("[data-passport-report]")!;report.textContent=passportMarkdown(passport.state);report.hidden=false;document.body.classList.add("printing-passport");window.print();document.body.classList.remove("printing-passport");report.hidden=true;
  });
 }
 announcePassport();
}
window.addEventListener("mastermind:evidence",event=>{
 try{passport.commit(withEvidence(passport.state,(event as CustomEvent<EvidenceInput>).detail));announcePassport();}
 catch(error){passport.message=error instanceof Error?error.message:"The record could not be saved.";announcePassport();}
});
window.addEventListener("mastermind:request-restore",()=>announcePassport());
window.addEventListener("storage",event=>{if(event.key==="mastermind:SLOP4408:v2"){passport.protected=true;passport.message="Another tab saved changes. Export this tab's work before choosing which backup to restore.";announcePassport();}});
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initialise,{once:true});else initialise();

window.addEventListener("mastermind:checkpoint",event=>{
 const detail=(event as CustomEvent<{week:number;state:Record<string,unknown>;reflection:string}>).detail;
 try {
  const next=structuredClone(passport.state);next.drafts[String(detail.week)]=detail;next.selectedWeek=detail.week;next.revision++;next.updatedAt=new Date().toISOString();
  const checked=parsePassport(JSON.stringify(next));passport.commit(checked);
  document.querySelectorAll<HTMLElement>("[data-passport-status]").forEach(e=>e.textContent=passport.message);
 }catch(error){passport.message=error instanceof Error?error.message:"This checkpoint could not be saved. Export your learning record.";
 document.querySelectorAll<HTMLElement>("[data-passport-status]").forEach(e=>e.textContent=passport.message);}
});