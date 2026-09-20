import {newMission,applyMission,missionRequirements,taskLabels,roles,missionMarkdown,resolutionText,resolutionEvidenceText,currentRecovery,missionRoleBrief,recoveryProfiles,missionFieldSpec,type Ending,type MissionState,type MissionAction,type MissionKind,type Scenario,type Role,type Zone,type Task} from "../lib/mission-engine";
import {missionGuide,missionSummaries} from "../data/learner-guidance";
import {withMission} from "../lib/passport";
import {passport,announcePassport,download} from "./passport-client";
import {renderFieldOperation,broadcastFieldOperation} from "./field-operation-view";
import type {FieldOperationAction} from "../lib/field-operation";
for(const root of document.querySelectorAll<HTMLElement>("[data-mission]")){
 const kind=root.dataset.mission as MissionKind;
 function freshMission(scenario:Scenario="baseline"):MissionState{
  const trial=newMission(kind,scenario);
  if(kind==="a2")trial.declaredObjective="digital";
  return trial;
 }
 let state:MissionState=passport.getMission(kind)??freshMission();
 let outcomeChoice:Ending=state.resolutionChoice??state.recovery?.resolution?.ending??state.declaredObjective;
 const guideFor=(task:Task)=>missionGuide(task,kind);
 const q=<T extends Element=HTMLElement>(s:string)=>root.querySelector<T>(s)!;
 const all=<T extends Element=HTMLElement>(s:string)=>root.querySelectorAll<T>(s);
 type Objective=Task|"first-plan"|"finish"|"debrief"|"legacy"|"field";
 let focusedObjective:Task|"first-plan"|null=null;
 function currentObjective():Objective{
  if(!state.field||(kind==="recovery"&&!currentRecovery(state)))return "legacy";
  if(state.status==="complete")return "debrief";
  if(!state.field.inspected)return "field";
  if(focusedObjective==="first-plan"&&state.plans.length)focusedObjective=null;
  if(focusedObjective&&focusedObjective!=="first-plan"&&state.tasks.includes(focusedObjective))focusedObjective=null;
  if(focusedObjective)return focusedObjective;
  if(kind==="recovery"&&state.plans.length===0)return "first-plan";
  return missionRequirements[kind].find(task=>!state.tasks.includes(task))??(state.field.delivered?"finish":"field");
 }
 function goToObjective(objective:Objective){
  if(objective==="legacy"){q("[data-legacy-mission]").scrollIntoView({block:"nearest",behavior:"auto"});return;}
  if(objective==="debrief"){q("[data-debrief]").scrollIntoView({block:"nearest",behavior:"auto"});return;}
  if(objective==="field"){q("[data-field-operation]").scrollIntoView({block:"nearest",behavior:"auto"});q<HTMLElement>("[data-field-operation] button")?.focus({preventScroll:true});return;}
  const target=objective==="first-plan"||objective==="finish"?{role:"coordinator" as Role,zone:"dispatch" as Zone}:guideFor(objective);
  focusedObjective=objective==="finish"?null:objective;
  act({type:"role",role:target.role});
  if(state.zone!==target.zone){q("[data-mission-status]").textContent="Objective located in "+target.zone+". Walk to the room exit or choose its labelled Station area. Your role is ready; you remain where you are.";q<HTMLButtonElement>('[data-zone="'+target.zone+'"]').focus({preventScroll:true});return;}
  const panel=q<HTMLElement>('[data-zone-panel="'+target.zone+'"]');
  panel.tabIndex=-1;panel.focus({preventScroll:true});panel.scrollIntoView({block:"nearest",behavior:"auto"});
 }
 function renderGuidance(){
  const objective=currentObjective();
  const title=q("[data-mission-next-title]"),action=q("[data-mission-next-action]"),success=q("[data-mission-next-success]");
  const button=q<HTMLButtonElement>("[data-mission-next]");
  button.hidden=objective==="debrief"||objective==="legacy";
  button.textContent=objective==="field"?"Focus field operation":objective==="finish"?"Locate the Dispatch record":"Locate this objective";
  if(objective==="legacy"){
   title.textContent="Historical trial record";
   action.textContent="Export this record before starting a new trial. Current missions include performed transport, transmission or handover. Earlier checks have been preserved without inventing those actions.";
   success.textContent="Earlier actions and endings are preserved; new evidence has not been invented.";
  }else if(objective==="debrief"){
   title.textContent="Practical trial complete";
   action.textContent=missionSummaries[kind].after;
   success.textContent="Use Export assessment record below. Write your observations and explanation after playing, using the recorded actions.";
  }else if(objective==="field"){
   const spec=missionFieldSpec(state);
   title.textContent=state.field?.inspected?spec.objective:"Inspect the mission console";
   action.textContent=!state.field?.inspected?spec.problem+" Select Inspect at the scene console or in Field operation.":"Travel to Dispatch using the room exit or Station areas. "+spec.consequence+" "+spec.resolveLabel+".";
   success.textContent=state.field?.inspected?"Done when the receiving point confirms the performed handover. Opening the record panel alone does not finish it.":"Done when the mission problem is recorded; then investigate its equipment.";
  }else if(objective==="first-plan"){
   title.textContent="First, preserve the plan you intend to test";
   action.textContent="You have inspected the problem. At Dispatch, use Coordinator to write an initial sequence naming your route, the evidence you need and who checks it. Select Preserve this plan version. Later, keep it and add a separate revision.";
   success.textContent="Done when Version 1 appears in the preserved plan history. No long reflection is required during equipment tasks.";
  }else if(objective==="finish"){
   title.textContent=kind==="recovery"?"Choose and explain the recovery outcome":"Finish the practical trial";
   action.textContent=kind==="recovery"?"The field operation has been performed. At Dispatch, use Coordinator to record the actual recipient, receipt or continuing-support conditions, then file the matching outcome. Read the debrief and export the run.":"The field delivery is recorded. At Dispatch, select Finish "+(kind==="a1"?"workshop":"relay")+" trial, read the debrief, then export your assessment record.";
   success.textContent="Done when the after-action debrief appears. An ending is evidence of practice, not an academic grade.";
  }else{
   const guide=guideFor(objective);
   title.textContent=taskLabels[objective];
   action.textContent=roles[guide.role].title+" · "+guide.zone+". "+guide.action;
   success.textContent="Done when: "+guide.success;
  }
 }
 function save(){try{passport.commit(withMission(passport.state,state));announcePassport();}catch(e){q("[data-mission-status]").textContent=e instanceof Error?e.message:"Export this run before continuing.";}}
 function act(action:MissionAction){
  const r=applyMission(state,action);state=r.state;
  q("[data-mission-status]").textContent=r.message;q("[data-mission-status]").dataset.success=String(r.success);
  if(action.type==="inspect")q("[data-inspection]").textContent=r.message;
  if(action.type==="measure")q("[data-measurement]").textContent=r.message;
  save();render();
 }
 function updateOutcomeFields(){
  const form=root.querySelector<HTMLFormElement>("[data-resolution-evidence]");if(!form)return;
  form.querySelector<HTMLSelectElement>("[data-outcome-choice]")!.value=outcomeChoice;
  form.querySelectorAll<HTMLFieldSetElement>("[data-outcome-fields]").forEach(group=>{
   const selected=group.dataset.outcomeFields===outcomeChoice;group.hidden=!selected;group.disabled=!selected;
  });
 }
 function render(){
  const identity=root.querySelector<HTMLElement>('[data-scene-player-label]');
  if(identity)identity.textContent="You · "+roles[state.role].title;
  q<HTMLSelectElement>("[data-objective]").value=state.declaredObjective; q<HTMLSelectElement>("[data-objective]").disabled=state.log.some(entry=>entry.action!=="objective");
  q("[data-role-title]").textContent=roles[state.role].title+" briefing";q("[data-role-brief]").textContent=missionRoleBrief(state.role,kind);q("[data-role-tools]").textContent="Tools: "+roles[state.role].tools.join(" · ");
  all<HTMLButtonElement>("[data-role]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.role===state.role)));
  const available:Zone[]=kind==="a1"?["arrival","workshop","dispatch"]:kind==="a2"?["power","control","archive","dispatch"]:["arrival","workshop","power","control","archive","dispatch"];
  all<HTMLButtonElement>("[data-zone]").forEach(b=>{b.hidden=!available.includes(b.dataset.zone as Zone);b.setAttribute("aria-current",b.dataset.zone===state.zone?"location":"false");});
  all("[data-zone-panel]").forEach(p=>{p.hidden=p.dataset.zonePanel!==state.zone;});
  q("[data-objectives]").replaceChildren(...missionRequirements[kind].map(t=>{
   const li=document.createElement("li"),done=state.tasks.includes(t),guide=guideFor(t);
   const label=document.createElement("strong");label.textContent=(done?"✓ ":"○ ")+taskLabels[t];li.append(label);li.classList.toggle("done",done);
   const details=document.createElement("details"),summary=document.createElement("summary");summary.textContent="How to complete this objective";
   const instruction=document.createElement("p");instruction.textContent=roles[guide.role].title+" · "+guide.zone+". "+guide.action;
   const criterion=document.createElement("p");criterion.className="small";criterion.textContent="Done when: "+guide.success;
   const go=document.createElement("button");go.type="button";go.textContent=done?"Revisit "+taskLabels[t].toLowerCase():"Go to "+taskLabels[t].toLowerCase();go.dataset.guideTask=t;go.addEventListener("click",()=>goToObjective(t));
   details.append(summary,instruction,criterion,go);li.append(details);return li;
  }));
  q("[data-mission-progress]").textContent=missionRequirements[kind].filter(t=>state.tasks.includes(t)).length+" / "+missionRequirements[kind].length+" capabilities demonstrated";
  q<HTMLSelectElement>("[data-follower]").value=String(state.follower);q<HTMLInputElement>("[data-brake]").checked=!state.brake;
  q("[data-mechanism-readout]").textContent="Ratio "+state.driver+":"+state.follower+" · output "+(state.driver/state.follower).toFixed(2)+" turns · brake "+(state.brake?"engaged":"released")+" · input turns "+state.turns;
  q<HTMLSelectElement>("[data-fuse]").value=state.fuse;q<HTMLInputElement>("[data-switch]").checked=state.switchClosed;
  q("[data-circuit-readout]").textContent="Lamp "+(state.fuse==="intact"&&state.switchClosed?"ON":"OFF")+" · measurement "+(state.measured?"recorded":"not yet recorded");
  const legacy=!state.field||(kind==="recovery"&&!currentRecovery(state)),legacyNotice=q<HTMLElement>("[data-legacy-mission]");
  legacyNotice.hidden=!legacy;legacyNotice.textContent=legacy?resolutionText(state):"";
  root.dataset.missionRules=legacy?"legacy":"field-1";
  const records=q("[data-archive-records]");records.replaceChildren();
  const source=state.scenario==="conflicting-archive"?"Current signed source, revision 2: M27-B. This supersedes the early M27-A record.":"Current signed source, revision 1: M27-A.";
  [source,"Archive A: checksum M27-A; complete sequence; recorded 09:10.","Archive B: checksum M27-B; complete sequence; recorded 09:25.",...(kind==="recovery"?Object.values(recoveryProfiles).map(profile=>"Recovery profile "+profile.id+": "+profile.follower+" follower teeth, "+profile.ratio+" output; verified receiving receipt "+profile.receipt+"."):[]),"A later timestamp is evidence of recency, not of integrity."].forEach(line=>{const p=document.createElement("p");p.textContent=line;records.append(p);});
  if(kind==="recovery"){
   const verified=state.recovery?.verifiedProfile?recoveryProfiles[state.recovery.verifiedProfile]:null;
   q("[data-profile-status]").textContent=verified?"Verified profile "+verified.id+" / "+verified.source+": use "+verified.follower+" follower teeth for "+verified.ratio+" output. Cradle test: "+(state.recovery?.cradleProfile===verified.id?"recorded":"required")+".":"The Investigator must verify the current archive before the cradle can be tested.";
   q("[data-digital-receipt]").textContent=verified&&state.field?.executed&&state.resolutionChoice==="digital"?"Receiving terminal receipt: "+verified.receipt+". Record this after collecting it and completing the receiving check.":"The receiving receipt appears after you transmit the verified copy in the field operation.";
   q("[data-outcome-status]").textContent=state.recovery?.resolution?resolutionEvidenceText(state):"No current outcome evidence recorded. Changed equipment or linked decisions require a fresh outcome record.";
   updateOutcomeFields();
  }
  q("[data-disruption]").textContent=state.scenario==="equipment-failure"?"Equipment Failure bulletin: lift supply unavailable. Upper passage and lift share that dependency. Service passage is independent.":state.scenario==="conflicting-archive"?"Conflicting Archive bulletin: signed source revision 2 supersedes the original checksum. Reconsider the preferred replica.":"Baseline bulletin: the supplied systems behave as documented. Test assumptions before preserving a revised plan.";
  q("[data-plans]").replaceChildren(...state.plans.map(p=>{const section=document.createElement("section");const h=document.createElement("h4");h.textContent="Version "+p.version+" / "+p.route;const body=document.createElement("p");body.textContent=p.text;section.append(h,body);return section;}));
  q("[data-action-log]").replaceChildren(...state.log.slice(-25).map(l=>{const li=document.createElement("li");li.textContent=roles[l.role].title+": "+l.message;return li;}));
  q("[data-debrief]").hidden=state.status!=="complete";q("[data-ending-title]").textContent=kind==="a1"?"Workshop trial complete.":kind==="a2"?"Relay trial complete.":state.ending==="physical"?"The original returns.":state.ending==="digital"?"The knowledge survives.":"A responsible handover.";q("[data-ending-text]").textContent=resolutionText(state);
  const history=passport.state.runs.filter(r=>r.kind===kind),comparison=q("[data-run-comparison]");comparison.replaceChildren();
  history.forEach((r,i)=>{const details=document.createElement("details");const summary=document.createElement("summary");summary.textContent="Run "+(i+1)+" · "+r.scenario+" · "+r.ending;const body=document.createElement("p");body.textContent=resolutionText(r);const facts=document.createElement("p");facts.textContent="Declared objective: "+r.declaredObjective+" · archive "+(r.replica??"not required")+" · route "+r.route+" · "+r.plans.length+" plan versions";const button=document.createElement("button");button.type="button";button.textContent="Export this run";button.addEventListener("click",()=>download(missionMarkdown(r),"mastermind-run-"+(i+1)+".md","text/markdown"));details.append(summary,body,facts,button);comparison.append(details);});
  if(history.length>=2){const a=history.at(-2)!,b=history.at(-1)!;const h=document.createElement("h4");h.textContent="Compare the last two completed runs";comparison.append(h);for(const [label,left,right] of [["Scenario",a.scenario,b.scenario],["Declared objective",a.declaredObjective,b.declaredObjective],["Verified copy",a.replica??"none",b.replica??"none"],["Route",a.route,b.route],["Resolution",a.ending??"none",b.ending??"none"]]){const p=document.createElement("p");p.textContent=label+": "+left+(left===right?" (unchanged)":" → "+right);comparison.append(p);}}
  renderGuidance();
  const fieldRoot=q<HTMLElement>("[data-field-operation]");
  fieldRoot.hidden=legacy;
  if(state.field){const spec=missionFieldSpec(state);renderFieldOperation(fieldRoot,spec,state.field,action=>act({type:"field",action}));broadcastFieldOperation("mission:"+kind,spec,state.field);}
  const approach=root.querySelector<HTMLSelectElement>("[data-field-ending]");if(approach){approach.value=state.resolutionChoice??state.declaredObjective;approach.disabled=state.status==="complete";}
  window.dispatchEvent(new CustomEvent("mastermind:scene-state",{detail:{...state,missionKind:state.kind,kind:"mission",feedback:q("[data-mission-status]").textContent}}));
 }
 all<HTMLButtonElement>("button").forEach(b=>b.disabled=false);
 q<HTMLSelectElement>("[data-scenario]").value=state.scenario;
 q<HTMLSelectElement>("[data-objective]").addEventListener("change",e=>act({type:"objective",objective:(e.target as HTMLSelectElement).value as "physical"|"digital"|"stabilise"}));
 const restart=q<HTMLDialogElement>("[data-restart-dialog]");
 q("[data-start-mission]").addEventListener("click",()=>restart.showModal());
 q("[data-mission-next]").addEventListener("click",()=>goToObjective(currentObjective()));
 q("[data-restart-cancel]").addEventListener("click",()=>restart.close());
 q("[data-restart-confirm]").addEventListener("click",()=>{const objective=q<HTMLSelectElement>("[data-objective]").value as MissionState["declaredObjective"];state=freshMission(q<HTMLSelectElement>("[data-scenario]").value as Scenario);if(kind==="recovery")state=applyMission(state,{type:"objective",objective}).state;outcomeChoice=state.resolutionChoice??state.declaredObjective;focusedObjective=null;save();render();q("[data-mission-status]").textContent="New trial started. Read your role brief and begin in "+state.zone+".";restart.close();});
 all<HTMLButtonElement>("[data-role]").forEach(b=>b.addEventListener("click",()=>act({type:"role",role:b.dataset.role as Role})));
 all<HTMLButtonElement>("[data-zone]").forEach(b=>b.addEventListener("click",()=>act({type:"zone",zone:b.dataset.zone as Zone})));
 all<HTMLButtonElement>("[data-inspect]").forEach(b=>b.addEventListener("click",()=>act({type:"inspect",item:b.dataset.inspect!})));
 function form(selector:string,callback:(data:FormData)=>void){q<HTMLFormElement>(selector).addEventListener("submit",event=>{event.preventDefault();callback(new FormData(event.currentTarget as HTMLFormElement));});}
 const str=(d:FormData,k:string)=>String(d.get(k)??"");
 form("[data-recall]",d=>act({type:"recall",items:str(d,"items")}));
 form("[data-orient]",d=>act({type:"orient",degrees:Number(d.get("degrees"))}));
 q("[data-hide-manifest]").addEventListener("click",()=>q("[data-inspection]").textContent="Notes hidden. Reconstruct the order before inspecting again.");
 q<HTMLSelectElement>("[data-follower]").addEventListener("change",e=>act({type:"gear",follower:Number((e.target as HTMLSelectElement).value)}));
 q<HTMLInputElement>("[data-brake]").addEventListener("change",e=>act({type:"brake",released:(e.target as HTMLInputElement).checked}));
 q("[data-turn]").addEventListener("click",()=>act({type:"turn"}));
 q("[data-measure]").addEventListener("click",()=>act({type:"measure"}));
 q<HTMLSelectElement>("[data-fuse]").addEventListener("change",e=>act({type:"fuse",value:(e.target as HTMLSelectElement).value as "open"|"intact"}));
 q<HTMLInputElement>("[data-switch]").addEventListener("change",e=>act({type:"switch",closed:(e.target as HTMLInputElement).checked}));
 form("[data-replica]",d=>act({type:"replica",replica:str(d,"replica") as "A"|"B"}));
 form("[data-policy]",d=>act({type:"policy",subject:str(d,"subject"),action:str(d,"action"),allowed:str(d,"decision")==="allow"}));
 form("[data-agreement]",d=>act({type:"agreement",preserve:d.has("preserve"),recipient:str(d,"recipient")}));
 form("[data-handoff]",d=>act({type:"handoff",item:str(d,"item"),destination:str(d,"destination"),condition:str(d,"condition")}));
 form("[data-route]",d=>act({type:"route",route:str(d,"route")}));
 form("[data-plan]",d=>act({type:"plan",text:str(d,"text")}));
 if(kind==="recovery"){
  const chooseApproach=(event:Event)=>{outcomeChoice=(event.target as HTMLSelectElement).value as Ending;act({type:"resolution-choice",ending:outcomeChoice});};
  q<HTMLSelectElement>("[data-outcome-choice]").addEventListener("change",chooseApproach);
  q<HTMLSelectElement>("[data-field-ending]").addEventListener("change",chooseApproach);
  form("[data-resolution-evidence]",d=>act({type:"resolution-evidence",evidence:{
   ending:outcomeChoice,recipient:str(d,"recipient"),originalLocation:str(d,outcomeChoice==="digital"?"digital-location":"stable-location"),
   receipt:str(d,"receipt"),supportConfirmed:d.has("support"),preservationConfirmed:d.has(outcomeChoice==="physical"?"preserve-physical":"preserve-digital"),
   stableConfirmed:d.has("stable"),limitation:str(d,"limitation")
  }}));
 }
 all<HTMLButtonElement>("[data-ending]").forEach(b=>b.addEventListener("click",()=>act({type:"resolve",ending:b.dataset.ending as "physical"|"digital"|"stabilise"})));
 q("[data-export-mission]").addEventListener("click",()=>download(missionMarkdown(state),"mastermind-"+kind+"-"+state.scenario+".md","text/markdown"));
 q("[data-print-mission]").addEventListener("click",()=>{const report=q("[data-mission-print]");report.textContent=missionMarkdown(state);report.hidden=false;document.body.classList.add("printing-mission");window.print();document.body.classList.remove("printing-mission");report.hidden=true;});
 function replaceActiveMission(reset=false){
  const saved=reset?undefined:passport.getMission(kind);
  state=saved??freshMission();outcomeChoice=state.resolutionChoice??state.recovery?.resolution?.ending??state.declaredObjective;focusedObjective=null;
  // A replacement may intentionally omit this trial. Never revive the prior tab state.
  all<HTMLFormElement>("form").forEach(form=>form.reset());
  q("[data-inspection]").textContent="";
  q("[data-measurement]").textContent=state.measured?"A measurement is preserved in this trial's action record.":"";
  q<HTMLSelectElement>("[data-scenario]").value=state.scenario;
  q("[data-mission-status]").textContent=reset?"The passport was reset. This trial starts fresh.":saved?"Restored this trial from the selected backup.":"The selected backup has no saved "+titleForKind()+" trial. This trial starts fresh.";
  render();
 }
 function titleForKind(){return kind==="a1"?"workshop":kind==="a2"?"relay":"recovery";}
 window.addEventListener("mastermind:restore",()=>{const saved=passport.getMission(kind);if(saved){state=saved;render();}});
 window.addEventListener("mastermind:replace",()=>replaceActiveMission());
 window.addEventListener("mastermind:reset",()=>replaceActiveMission(true));
 window.addEventListener("mastermind:mission-zone",event=>{const zone=(event as CustomEvent<{zone:Zone}>).detail.zone;if(["arrival","workshop","power","control","archive","dispatch"].includes(zone))act({type:"zone",zone});});
 function useTool(role:Role,action:MissionAction){if(state.role!==role)act({type:"role",role});act(action);}
 window.addEventListener("mastermind:interact",event=>{
  const detail=(event as CustomEvent<{objectId:string;week?:number}>).detail;if(detail.week)return;const id=detail.objectId;
  if(["lens","spool","tile","map","manifest"].includes(id))useTool("observer",{type:"inspect",item:id});
  else if(id==="crank"||id==="mechanism")useTool("systems",{type:"turn"});
  else if(id==="gear")useTool("systems",{type:"gear",follower:state.follower===24?36:state.follower===36?48:24});
  else if(id==="interlock")useTool("systems",{type:"brake",released:state.brake});
  else if(id.startsWith("measure-")||id==="circuit")useTool("systems",{type:"measure"});
  else if(id==="repair-fuse")useTool("systems",{type:"fuse",value:"intact"});
  else if(id==="toggle-power")useTool("systems",{type:"switch",closed:!state.switchClosed});
  else if(id==="files"||id==="permissions"){act({type:"role",role:"investigator"});q("[data-zone-panel=control]").scrollIntoView({block:"nearest"});}
  else if(id==="archive"||id==="message"||id==="council"){act({type:"role",role:"coordinator"});q("[data-zone-panel=archive]").scrollIntoView({block:"nearest"});}
 });
 window.addEventListener("mastermind:field-action",event=>{const detail=(event as CustomEvent<{scope:string;action:FieldOperationAction}>).detail;if(detail.scope==="mission:"+kind)act({type:"field",action:detail.action});});
 window.addEventListener("mastermind:scene-ready",render);
 q("[data-mission-status]").textContent=state.status==="complete"?"Your completed trial is restored. Read the debrief or export the record.":state.log.length?"Your saved trial is restored. Follow Do this next to continue.":"Begin at the mission console. Inspect the problem, investigate its equipment and perform the resulting operation. Locate an objective shows its room without moving you.";
 render();
}