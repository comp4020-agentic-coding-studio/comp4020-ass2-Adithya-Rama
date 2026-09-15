import { activities, activityForWeek, crew, type Activity } from "../data/academy";
import { emptySave, parseImport, persist, STORAGE_KEY, MAX_IMPORT_BYTES, saveAnswer, checkActivity, toMarkdown, runState, checkpointOptions, checkpointBrief, checkpoints, presetNames, presets, type Save, type Answer, type Preset } from "../lib/academy-engine";
let save:Save=emptySave();
let storage:Storage|undefined;
let storageLocked=false;
let dirty=false;
let loadMessage="Your dossier is ready. Save each response to keep it.";
try{storage=window.localStorage;const raw=storage.getItem(STORAGE_KEY);if(raw){try{save=parseImport(raw);loadMessage="Resumed your saved operation.";}catch{storageLocked=true;loadMessage="The existing browser record could not be read. It has not been overwritten. Export it with Recover original, or explicitly start a new operation.";}}}
catch{loadMessage="Browser saving is unavailable. Work in this tab and export before leaving.";}
function el<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string,className?:string){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;return n;}
function status(text:string){document.querySelectorAll<HTMLElement>("[data-global-status]").forEach(n=>n.textContent=text);}
function commit(next:Save):string{
  save=next;save.updatedAt=new Date().toISOString();
  const result=storageLocked?"The previous browser record is protected. Export this session or explicitly start a new operation.":storage?persist(storage,save).message:"Saving is unavailable. Work remains in this tab; export a backup before leaving.";
  status(result);renderDossier();renderPlans();return result;
}
function download(name:string,text:string,mime:string){const url=URL.createObjectURL(new Blob([text],{type:mime}));const a=el("a");a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function occupied(){return dirty||Object.keys(save.answers).length>0||save.plans.length>0||save.runs.length>0||save.activeRun!==null||save.crew.length>0||storageLocked;}
function formAnswer(form:HTMLFormElement,a:Activity):Answer{
  const data=new FormData(form);
  const answer:Answer={reflection:String(data.get("reflection")??"").trim(),savedAt:new Date().toISOString()};
  if(a.kind==="choose")answer.choice=String(data.get("choice")??"");
  if(a.kind==="order")answer.order=Array.from(form.querySelectorAll<HTMLElement>("[data-item]")).map(x=>x.dataset.item!);
  if(a.kind==="classify"){answer.classifications={};for(const s of a.statements??[]){answer.classifications[s.id]={category:String(data.get(s.id+"-category")) as "observation"|"claim"|"assumption",confidence:String(data.get(s.id+"-confidence")) as "low"|"medium"|"high"};}}
  return answer;
}
function syncOrder(form:HTMLFormElement,order:string[]){
 const list=form.querySelector<HTMLOListElement>("[data-order-list]");if(!list)return;
 const existing=Array.from(list.children) as HTMLElement[];
 for(const item of order){const row=existing.find(n=>n.dataset.item===item);if(row)list.append(row);}
 updateOrderButtons(form);
}
function updateOrderButtons(form:HTMLFormElement){
 const rows=Array.from(form.querySelectorAll<HTMLElement>("[data-item]"));
 rows.forEach((row,i)=>row.querySelectorAll<HTMLButtonElement>("[data-move]").forEach(b=>b.disabled=(b.dataset.move==="-1"?i===0:i===rows.length-1)));
}
function restoreForms(){
 document.querySelectorAll<HTMLFormElement>("[data-activity-form]").forEach(form=>{
   const a=activities.find(a=>a.id===form.dataset.activityForm)!;const answer=save.answers[a.id];
   form.reset();(form.elements.namedItem("reflection") as HTMLTextAreaElement).value=answer?.reflection??"";
   if(answer?.choice){for(const input of form.querySelectorAll<HTMLInputElement>('input[name="choice"]'))input.checked=input.value===answer.choice;}
   for(const [id,v]of Object.entries(answer?.classifications??{})){(form.elements.namedItem(id+"-category")as HTMLSelectElement).value=v.category;(form.elements.namedItem(id+"-confidence")as HTMLSelectElement).value=v.confidence;}
   if(a.items)syncOrder(form,answer?.order??a.items);
   const msg=form.querySelector<HTMLElement>("[data-activity-status]")!;msg.textContent=answer?"Saved response restored.":"";
   form.querySelector<HTMLElement>("[data-feedback]")!.hidden=true;
 });
 document.querySelectorAll<HTMLInputElement>("[data-crew]").forEach(n=>n.checked=save.crew.includes(n.value as Save["crew"][number]));
}
function renderPlans(){
 document.querySelectorAll<HTMLElement>("[data-plan-comparison]").forEach(root=>{
   root.replaceChildren();
   const plans=save.plans;const first=plans.find(p=>p.label==="Version 1");const second=plans.filter(p=>p.label==="Version 2").at(-1);
   if(!first){root.append(el("p","No plan has been preserved yet. Week 6 creates your original; Week 7 supplies a labelled sample if needed.","small"));return;}
   const grid=el("div",undefined,"snapshots");
   for(const p of [first,second]){const card=el("section",undefined,"snapshot");card.append(el("h3",p?.label??"Version 2"));if(p){card.append(el("p",p.source==="sample"?"Supplied sample · not your submission":"Your saved reasoning","small"),el("p",p.order.join(" → ")),el("p",p.text,"preserve-text"));}else card.append(el("p","No revision saved yet."));grid.append(card);}
   const dependency=el("div",undefined,"callout");dependency.append(el("strong","Affected dependency · E03 → E07"),el("p","R1: WITNESS creates the prerequisite for SILVER. R2: SILVER creates the prerequisite for WITNESS. CROWN still needs the completed token chain."));
   root.append(el("h2","What changed?"),dependency,grid,el("p","E07 changes the seal dependency. Version 1 remains unchanged; the latest Version 2 is shown. Every saved revision is included in exports.","small"));
 });
}
function renderDossier(){
 document.querySelectorAll<HTMLElement>("[data-dossier]").forEach(root=>{
   root.replaceChildren();root.append(el("h2","Fieldwork journal"));
   root.append(el("p",Object.keys(save.answers).length+" of 12 practice records saved. These are not academic marks.","small"));
   if(!Object.keys(save.answers).length)root.append(el("p","Start with any lab. Your saved reasoning will appear here."));
   for(const a of activities){const answer=save.answers[a.id];if(!answer)continue;
     const row=el("section",undefined,"journal-entry");row.append(el("h3","Week "+a.week+" · "+a.title));
     if(answer.choice)row.append(el("p","Decision: "+(a.options?.find(o=>o.id===answer.choice)?.label??answer.choice)));
     if(answer.order)row.append(el("p","Sequence: "+answer.order.join(" → ")));
     for(const [key,v]of Object.entries(answer.classifications??{})){const text=a.statements?.find(s=>s.id===key)?.text??key;row.append(el("p",text+" — "+v.category+" / confidence "+v.confidence,"small"));}
     row.append(el("p",answer.reflection,"preserve-text"));root.append(row);
   }
   if(save.crew.length)root.append(el("h3","Selected crew"),el("p",save.crew.map(id=>crew.find(c=>c.id===id)?.name).join(", ")));
 });
}
function renderRuns(){
 const root=document.querySelector<HTMLElement>("[data-rehearsal]");if(!root)return;root.replaceChildren();
 const run=save.activeRun;
 if(!run){root.append(el("p","Choose a preset. Every run has six checkpoints; no previous lab completion is required."));}
 else{
  const state=runState(run);const readout=el("div",undefined,"readout");
  for(const [label,value]of [["Decision units",state.budget],["Assumptions",state.assumptions],["Agreement",state.agreement]]){const n=el("div");n.append(el("strong",String(value)),el("span",String(label)));readout.append(n);}
  root.append(readout);
  if(run.choices.length<6){
   root.append(el("h3",(run.choices.length+1)+"/6 · "+checkpoints[run.choices.length]),el("p",checkpointBrief(run)));
   const buttons=el("div",undefined,"actions");
   for(const option of checkpointOptions(run)){const b=el("button",option.label);b.type="button";b.addEventListener("click",()=>{
     if(save.runs.length>=30){status("Thirty runs are saved. Export your record before starting a new operation.");return;}
     const next=structuredClone(save);next.activeRun!.choices.push(option.id);
     if(next.activeRun!.choices.length===6)next.runs.push(structuredClone(next.activeRun!));
     commit(next);renderRuns();const heading=root.querySelector<HTMLElement>("h3");if(heading){heading.tabIndex=-1;heading.focus();}
   });buttons.append(b);}
   root.append(buttons);
  }else root.append(el("h3","Ending: "+state.final),el("p","Declared objective: "+state.goal+". This ending is a simulation result, not an academic grade."));
  const list=el("ol");for(const reason of state.reasons)list.append(el("li",reason));root.append(list);
 }
 const history=document.querySelector<HTMLElement>("[data-run-history]");if(!history)return;history.replaceChildren();
 if(save.runs.length){history.append(el("h2","Compare rehearsal records"));save.runs.forEach((r,i)=>{const state=runState(r);const details=el("details");details.append(el("summary","Run "+(i+1)+" · "+presetNames[r.preset]+" · "+state.final));const ol=el("ol");state.reasons.forEach(t=>ol.append(el("li",t)));details.append(ol);history.append(details);});}
}
function initialise(){
 status(loadMessage);restoreForms();renderDossier();renderPlans();renderRuns();
 document.querySelectorAll<HTMLButtonElement|HTMLInputElement>("[data-save],[data-sample],[data-hint],[data-export],[data-print],[data-import],[data-load-sample],[data-reset],[data-start-run],[data-save-crew]").forEach(b=>b.disabled=false);
 document.querySelectorAll<HTMLFormElement>("[data-activity-form]").forEach(form=>{
  const a=activities.find(a=>a.id===form.dataset.activityForm)!;let hint=0;
  form.addEventListener("input",()=>{dirty=true;form.querySelector<HTMLElement>("[data-activity-status]")!.textContent="Unsaved changes. Press Save to keep this response.";});
  form.querySelectorAll<HTMLButtonElement>("[data-move]").forEach(b=>b.addEventListener("click",()=>{
   const row=b.closest<HTMLElement>("[data-item]")!;const list=row.parentElement!;const direction=Number(b.dataset.move);
   if(direction<0&&row.previousElementSibling)list.insertBefore(row,row.previousElementSibling);
   if(direction>0&&row.nextElementSibling)list.insertBefore(row.nextElementSibling,row);
   updateOrderButtons(form);dirty=true;form.querySelector<HTMLElement>("[data-activity-status]")!.textContent="Sequence changed. Save to keep it.";
   const focus=row.querySelector<HTMLButtonElement>('[data-move="'+direction+'"]');if(focus&&!focus.disabled)focus.focus();else row.querySelector<HTMLButtonElement>("button:not(:disabled)")?.focus();
  }));
  form.addEventListener("submit",event=>{event.preventDefault();if(!form.reportValidity())return;
   try{const answer=formAnswer(form,a);const next=saveAnswer(save,a,answer);const message=commit(next);dirty=false;
    form.querySelector<HTMLElement>("[data-activity-status]")!.textContent=message;
    const feedback=form.querySelector<HTMLElement>("[data-feedback]")!;feedback.replaceChildren(...checkActivity(a,answer).map(t=>el("p",t)));feedback.hidden=false;
   }catch(error){form.querySelector<HTMLElement>("[data-activity-status]")!.textContent=(error as Error).message;}
  });
  form.querySelector("[data-sample]")?.addEventListener("click",()=>{
    (form.elements.namedItem("reflection")as HTMLTextAreaElement).value=a.sample;
    const radio=form.querySelector<HTMLInputElement>('input[name="choice"]');if(radio)radio.checked=true;
    if(a.correct)syncOrder(form,a.correct);
    for(const s of a.statements??[])(form.elements.namedItem(s.id+"-category")as HTMLSelectElement).value=s.answer;
    dirty=true;form.querySelector<HTMLElement>("[data-activity-status]")!.textContent="Example response loaded for inspection. Edit it before saving as your own reasoning.";
  });
  form.querySelector("[data-hint]")?.addEventListener("click",()=>{form.querySelector<HTMLElement>("[data-activity-status]")!.textContent=a.hints[Math.min(hint++,a.hints.length-1)];});
 });
 document.querySelectorAll<HTMLButtonElement>("[data-export]").forEach(b=>b.addEventListener("click",()=>download("glass-crown-dossier."+ (b.dataset.export==="json"?"json":"md"),b.dataset.export==="json"?JSON.stringify(save,null,2):toMarkdown(save),b.dataset.export==="json"?"application/json":"text/markdown")));
 document.querySelectorAll("[data-print]").forEach(b=>b.addEventListener("click",()=>window.print()));
 document.querySelector<HTMLInputElement>("[data-import]")?.addEventListener("change",async event=>{
   const input=event.currentTarget as HTMLInputElement;const file=input.files?.[0];if(!file)return;
   try{if(file.size>MAX_IMPORT_BYTES)throw new Error("This file exceeds the 1 MB limit.");const imported=parseImport(await file.text());
     if(occupied()&&!window.confirm("Replace the current dossier with this validated backup? Export first if you want to keep both."))return;
     storageLocked=false;dirty=false;commit(imported);restoreForms();renderRuns();
   }catch(error){status((error as Error).message);}finally{input.value="";}
 });
 document.querySelectorAll("[data-reset]").forEach(b=>b.addEventListener("click",()=>{
  if(occupied()&&!window.confirm("Start a new operation and replace this dossier? Export a backup first to preserve it."))return;
  storageLocked=false;dirty=false;commit(emptySave());restoreForms();renderRuns();
 }));
 document.querySelectorAll("[data-load-sample]").forEach(b=>b.addEventListener("click",()=>{
  if(occupied()&&!window.confirm("Replace the current dossier with a clearly labelled teaching sample?"))return;
  let sample=emptySave();const now=new Date().toISOString();
  for(const week of [2,6,7]){const a=activityForWeek(week);const answer:Answer={reflection:"SUPPLIED SAMPLE: "+a.sample,savedAt:now};if(a.correct)answer.order=[...a.correct];if(a.statements){answer.classifications={};for(const s of a.statements)answer.classifications[s.id]={category:s.answer,confidence:"medium"};}sample=saveAnswer(sample,a,answer);}
  sample.plans.forEach(p=>p.source="sample");storageLocked=false;dirty=false;commit(sample);restoreForms();renderRuns();status("Teaching sample loaded. It is labelled in the record and exports.");
 }));
 document.querySelectorAll<HTMLButtonElement>("[data-start-run]").forEach(b=>b.addEventListener("click",()=>{
   if(save.activeRun&&save.activeRun.choices.length<6&&!window.confirm("Restart the unfinished rehearsal? Completed runs and the rest of your dossier will stay."))return;
   const preset=b.dataset.startRun as Preset;if(!presets.includes(preset))return;
   const next=structuredClone(save);next.activeRun={preset,choices:[]};commit(next);renderRuns();
 }));
 document.querySelector("[data-save-crew]")?.addEventListener("click",()=>{
  const next=structuredClone(save);next.crew=Array.from(document.querySelectorAll<HTMLInputElement>("[data-crew]:checked")).map(n=>n.value as Save["crew"][number]);commit(next);
 });
 if(storageLocked&&storage){const area=document.querySelector("[data-global-status]");const recover=el("button","Recover original browser record");recover.type="button";recover.addEventListener("click",()=>{try{download("glass-crown-recovery.txt",storage!.getItem(STORAGE_KEY)??"","text/plain");}catch{status("The browser would not allow recovery. Your stored record has not been modified.");}});area?.after(recover);}
}
window.addEventListener("beforeunload",event=>{if(dirty){event.preventDefault();}});
initialise();
