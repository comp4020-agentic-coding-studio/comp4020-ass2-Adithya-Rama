/** Authoritative recovery rules. Rendering and physics cannot award a task. */
export const roleIds = ["observer", "systems", "investigator", "coordinator"] as const;
export type Role = typeof roleIds[number];
export const scenarioIds = ["baseline", "equipment-failure", "conflicting-archive"] as const;
export type Scenario = typeof scenarioIds[number];
export type MissionKind = "recovery" | "a1" | "a2";
export const zoneIds = ["arrival","workshop","power","control","archive","dispatch"] as const;
export type Zone = typeof zoneIds[number];
export const taskIds = ["observe","recall","orient","mechanism","circuit","investigate","permission","handoff","agreement","route","revision"] as const;
export type Task = typeof taskIds[number];
export type Ending = "physical"|"digital"|"stabilise";
export type ArchiveProfileId = "A"|"B";
export const recoveryProfiles = {
 A:{id:"A" as const,source:"M27-A",follower:36,ratio:"one-third",receipt:"RECEIPT-A36"},
 B:{id:"B" as const,source:"M27-B",follower:48,ratio:"one-quarter",receipt:"RECEIPT-B48"},
};
export const missionFacts = {
 a1:{order:["lens","spool","tile"],orientation:90},
 recovery:{order:["tile","lens","spool"],orientation:180},
};
export interface ResolutionEvidence {
 ending:Ending; recipient:string; originalLocation:string; receipt:string;
 supportConfirmed:boolean; preservationConfirmed:boolean; stableConfirmed:boolean; limitation:string;
 profile:ArchiveProfileId; route:string;
}
export interface RecoveryProgress {
 version:2; verifiedProfile:ArchiveProfileId|null; cradleProfile:ArchiveProfileId|null;
 handoffProfile:ArchiveProfileId|null; routeProfile:ArchiveProfileId|null;
 resolution:ResolutionEvidence|null;
}
export function currentRecovery(s:MissionState):boolean{return s.kind==="recovery"&&s.recovery?.version===2;}
export function requiredProfile(s:MissionState){return recoveryProfiles[s.scenario==="conflicting-archive"?"B":"A"];}
export function expectedFollower(s:MissionState):number{return currentRecovery(s)?requiredProfile(s).follower:24;}
/** Shared by actions and imported saves: text presence is not an academic judgement. */
export function recoveryModelProblem(s:MissionState):string|null {
 if(!currentRecovery(s))return "This record uses legacy recovery rules.";
 const p=requiredProfile(s),r=s.recovery!;
 if(missionRequirements.recovery.some(task=>!s.tasks.includes(task)))return "The eleven common objectives are not all complete.";
 if(!["lens","spool","tile","map","manifest"].every(item=>s.inspected.includes(item)))return "The arrival inspection is incomplete.";
 if(s.replica!==p.id||r.verifiedProfile!==p.id)return "The archive does not match the current signed source.";
 if(s.follower!==p.follower||s.brake||s.turns<1||r.cradleProfile!==p.id)return "The cradle has not been tested for the verified profile.";
 if(s.fuse!=="intact"||!s.switchClosed||!s.measured)return "The diagnosed supply is not currently working.";
 if(!s.policyPatched)return "The permission repair is missing.";
 if(s.handoff!=="verified archive → dispatch → after integrity check"||r.handoffProfile!==p.id)return "The current-profile handoff is missing.";
 if(!s.agreement.startsWith("Preserve original; hand over to ")||s.agreement.slice("Preserve original; hand over to ".length).trim().length<2)return "Original-preserving custody has not been agreed.";
 if(s.plans.length<2||s.plans.some((plan,i)=>plan.text.trim().length<20||(i>0&&s.plans[i-1]!.text===plan.text)))return "Preserve distinct, explained plan versions.";
 if(!["upper","service","lift"].includes(s.route)||r.routeProfile!==p.id||(s.scenario==="equipment-failure"&&s.route!=="service"))return "The route is not supported by the current verified profile and scenario.";
 return null;
}
export function resolutionEvidenceProblem(s:MissionState,e:ResolutionEvidence):string|null {
 const model=recoveryModelProblem(s);if(model)return model;
 const p=requiredProfile(s);
 if(!["physical","digital","stabilise"].includes(e.ending)||e.profile!==p.id||e.route!==s.route)return "The outcome record does not match the current verified profile and tested route.";
 if(e.recipient.trim().length<2||e.recipient.length>100)return "Name the receiving person or responsible role (2–100 characters).";
 if(e.recipient.trim().toLowerCase()!==s.agreement.slice("Preserve original; hand over to ".length).trim().toLowerCase())return "Use the recipient named in the handling agreement, or renegotiate that agreement before recording a different recipient.";
 if(e.originalLocation.length>100||e.receipt.length>100||e.limitation.length>2000)return "Keep location and receipt within 100 characters and the remaining limitation within 2,000.";
 if(e.ending==="physical"&&(!e.supportConfirmed||!e.preservationConfirmed))return "Physical recovery needs tested support/route and original-preserving custody confirmations.";
 if(e.ending==="digital"&&(e.receipt.trim()!==p.receipt||e.originalLocation.trim().length<3||!e.preservationConfirmed))return "Digital recovery needs verified receipt "+p.receipt+", the original's retained location and preservation confirmation.";
 if(e.ending==="stabilise"&&(!e.stableConfirmed||e.originalLocation.trim().length<3||e.limitation.trim().length<20))return "Stabilisation needs a confirmed stable state, location, responsible recipient and remaining limitation of at least 20 characters.";
 return null;
}
export function missionRoleBrief(role:Role,kind:MissionKind):string {
 if(kind!=="recovery")return roles[role].brief;
 const briefs:Record<Role,string>={
 observer:"The final packing order is white tile, bronze lens, blue spool. Meridian's map north is rotated 180 degrees clockwise. Use the verified archive profile and tested cradle when choosing a supported route; upper and lift share the lift supply.",
 systems:"The Investigator must verify the current signed archive profile first. Profile A (M27-A) requires a 36-tooth follower: one-third output. Profile B (M27-B) requires 48 teeth: one-quarter output. Release the brake and test the profile's ratio. Measure the 6 V fuse fault before replacing it.",
 investigator:"Verify the complete copy against the current signed source. That copy supplies the recovery profile used by the Systems Specialist: A requires 36 teeth; B requires 48. Give the verified profile to the team before they configure the cradle. Repair observer certification without removing legitimate access.",
 coordinator:"Preserve the original plan, agree custody and name the recipient. Send a handoff after the verified profile's cradle is tested. At Dispatch, record evidence specific to physical recovery, digital receipt or stable handover before resolving that outcome."
 };return briefs[role];
}
export const roles:Record<Role,{title:string;brief:string;tools:string[]}> = {
 observer:{title:"Observer / Navigator",brief:"The arrival manifest names a bronze lens, a blue spool and a white tile, in that order. North on the workshop plan is rotated one quarter-turn clockwise from the entrance. The upper passage has the shortest route; the service passage is independent of the lift.",tools:["Scene inventory","Route overlay","Orientation board"]},
 systems:{title:"Systems Specialist",brief:"The archive cradle needs half-speed output. The 12-tooth driver must turn a 24-tooth follower. Release the brake before turning. The service supply is 6 V; an open fuse interrupts the complete circuit. Measure before replacing it.",tools:["Cutaway mechanism","Voltmeter","Service diagram"]},
 investigator:{title:"Investigator",brief:"A copy is eligible only when its recorded hash matches the signed source and its sequence is complete. Access policy: observers read, technicians service, registrars certify. In the conflicting scenario a later signed source replaces the early checksum.",tools:["Replica records","Signed source","Permission test"]},
 coordinator:{title:"Coordinator",brief:"The custodian requires preservation of the original and a named handover recipient. A useful handoff states the item, destination and required condition. Team members can decline a role; switch deliberately and record contribution.",tools:["Custodian council","Handoff composer","Plan versions"]}
};
export const taskLabels:Record<Task,string> = {observe:"Inspect the arrival scene",recall:"Recall the manifest",orient:"Reconstruct orientation",mechanism:"Restore the recovery cradle",circuit:"Restore the 6 V circuit",investigate:"Verify the archive",permission:"Repair the permission model",handoff:"Make a precise handoff",agreement:"Agree the handling conditions",route:"Test an available route",revision:"Preserve and revise the plan"};
export interface MissionLog {role:Role; action:string; message:string; success:boolean}
export interface MissionPlan {version:number; text:string; route:string}
export interface MissionState {
 kind:MissionKind; scenario:Scenario; role:Role; zone:Zone; status:"active"|"complete";
 tasks:Task[]; inspected:string[]; driver:number; follower:number; brake:boolean; turns:number;
 fuse:"open"|"intact"; switchClosed:boolean; measured:boolean; replica:"A"|"B"|null;
 policyPatched:boolean; route:string; handoff:string; agreement:string; plans:MissionPlan[];
 recovery?:RecoveryProgress; disruptionSeen:boolean; declaredObjective:"physical"|"digital"|"stabilise"; log:MissionLog[]; ending:"physical"|"digital"|"stabilise"|null;
}
export type MissionAction =
 {type:"objective";objective:"physical"|"digital"|"stabilise"}|{type:"role";role:Role}|{type:"zone";zone:Zone}|{type:"inspect";item:string}|
 {type:"recall";items:string}|{type:"orient";degrees:number}|
 {type:"gear";follower:number}|{type:"brake";released:boolean}|{type:"turn"}|
 {type:"measure"}|{type:"fuse";value:"open"|"intact"}|{type:"switch";closed:boolean}|
 {type:"replica";replica:"A"|"B"}|{type:"policy";subject:string;action:string;allowed:boolean}|
 {type:"handoff";item:string;destination:string;condition:string}|
 {type:"agreement";preserve:boolean;recipient:string}|
 {type:"route";route:string}|{type:"plan";text:string}|
 {type:"resolution-evidence";evidence:Omit<ResolutionEvidence,"profile"|"route">}|
 {type:"resolve";ending:"physical"|"digital"|"stabilise"};
export const missionRequirements:Record<MissionKind,Task[]> = {
 a1:["observe","recall","orient","mechanism"],
 a2:["circuit","investigate","permission","handoff"],
 recovery:["observe","recall","orient","investigate","mechanism","circuit","permission","handoff","agreement","route","revision"]
};
export function newMission(kind:MissionKind="recovery",scenario:Scenario="baseline"):MissionState {
 return {...(kind==="recovery"?{recovery:{version:2 as const,verifiedProfile:null,cradleProfile:null,handoffProfile:null,routeProfile:null,resolution:null}}:{}),kind,scenario,role:"observer",zone:kind==="a2"?"power":"arrival",status:"active",tasks:[],inspected:[],driver:12,follower:36,brake:true,turns:0,fuse:"open",switchClosed:false,measured:false,replica:null,policyPatched:false,route:"upper",handoff:"",agreement:"",plans:[],disruptionSeen:false,declaredObjective:"physical",log:[],ending:null};
}
const taskRole:Partial<Record<MissionAction["type"],Role>> = {inspect:"observer",recall:"observer",orient:"observer",gear:"systems",brake:"systems",turn:"systems",measure:"systems",fuse:"systems",switch:"systems",replica:"investigator",policy:"investigator",handoff:"coordinator",agreement:"coordinator",plan:"coordinator",route:"observer","resolution-evidence":"coordinator"};
export function applyMission(current:MissionState,action:MissionAction):{state:MissionState;message:string;success:boolean} {
 const s:MissionState=JSON.parse(JSON.stringify(current));
 let message="",success=true;
 const complete=(task:Task)=>{if(!s.tasks.includes(task))s.tasks.push(task);};
 const invalidate=(...tasks:Task[])=>{s.tasks=s.tasks.filter(task=>!tasks.includes(task));if(s.recovery){s.recovery.resolution=null;if(tasks.includes("mechanism"))s.recovery.cradleProfile=null;if(tasks.includes("handoff"))s.recovery.handoffProfile=null;if(tasks.includes("route"))s.recovery.routeProfile=null;}};
 const integrated=currentRecovery(s),profile=requiredProfile(s);
 const facts=integrated?missionFacts.recovery:missionFacts.a1;
 const fail=(why:string)=>{success=false;message=why;};
 if(action.type==="role") {s.role=action.role;return {state:s,message:missionRoleBrief(s.role,integrated?"recovery":s.kind==="recovery"?"a1":s.kind),success:true};}
 if(action.type==="zone") {s.zone=action.zone;return {state:s,message:"Entered "+s.zone+". Your progress is retained.",success:true};}
 if(s.kind==="recovery"&&!integrated)return {state:s,message:"This is a legacy recovery record. Export it for safekeeping, then start a new trial to use the current linked-profile and outcome-evidence rules.",success:false};
  if(s.status==="complete") return {state:s,message:"This run is complete. Start a new run to try another approach.",success:false};
 const owner=taskRole[action.type];
 if(owner&&s.role!==owner) return {state:s,message:"Switch to "+roles[owner].title+" to use this role's tools. Solo students can switch freely.",success:false};
 switch(action.type) {
 case "objective":
  if(!["physical","digital","stabilise"].includes(action.objective)){fail("Choose a published recovery objective.");break;}
  if(s.log.some(entry=>entry.action!=="objective")){fail("The initial objective is preserved once the trial begins. A different ending will be explained as a revision in the debrief.");break;}
  s.declaredObjective=action.objective;message="Initial recovery objective declared: "+action.objective+". The final debrief will compare this intention with the ending.";break;
 case "inspect":
  if(!["lens","spool","tile","map","manifest"].includes(action.item)){fail("That item is not in the supplied arrival scene.");break;}
  if(!s.inspected.includes(action.item))s.inspected.push(action.item);
  message=({lens:"Bronze lens: seated in the left mount.",spool:"Blue spool: below the navigation board.",tile:"White tile: beside the manifest.",map:"The plan's north arrow is rotated "+facts.orientation+" degrees clockwise.",manifest:"Packing order: "+facts.order.join(", ")+". Build a spatial association before hiding this record."} as Record<string,string>)[action.item]!;
  if(["lens","spool","tile","map","manifest"].every(i=>s.inspected.includes(i)))complete("observe");
  break;
 case "recall":
  if(integrated)invalidate("recall");
   if(action.items.toLowerCase().replace(/[^a-z]/g,"")===facts.order.join("")){complete("recall");message="The three items and their order match the manifest. Repeat in the transfer lab with a different list.";}else fail("Compare your recall with the manifest: identify a missing item or an order error, then try again.");
  break;
 case "orient":
  if(integrated)invalidate("orient");
  if(action.degrees===facts.orientation){complete("orient");message="Correct: the supplied map rotates north "+facts.orientation+" degrees clockwise. World directions do not change with the camera.";}else fail("Use the north arrow, not the camera's facing direction. The supplied rotation is "+facts.orientation+" degrees clockwise.");
  break;
 case "gear":if(![24,36,48].includes(action.follower)){fail("Choose one of the supplied 24, 36 or 48-tooth follower gears.");break;} s.follower=action.follower;s.turns=0;invalidate("mechanism",...(integrated?["handoff","route"] as Task[]:[]));message="12 / "+s.follower+" = "+(12/s.follower).toFixed(2)+" output turns per input turn, in the opposite direction.";break;
 case "brake":s.brake=!action.released;invalidate("mechanism",...(integrated?["handoff","route"] as Task[]:[]));message=s.brake?"Brake engaged: the cradle is held.":"Brake released: the cam can move.";break;
 case "turn":
  if(integrated&&s.recovery!.verifiedProfile!==profile.id){fail("Ask the Investigator to verify the current signed archive profile before testing its cradle.");break;}
  if(s.brake){fail("The engaged brake blocks the cam. More input force is not the repair.");break;}
  if(s.turns>=10000){fail("This run has reached its recorded-turn limit. Export the record and restart the trial.");break;}
  s.turns+=1;message="One input turn produced "+(12/s.follower).toFixed(2)+" follower turns.";
  if(s.follower===expectedFollower(s)){complete("mechanism");if(integrated){s.recovery!.cradleProfile=profile.id;message+=" This tests profile "+profile.id+" ("+profile.source+"): "+profile.ratio+" output, using "+profile.follower+" follower teeth.";}else message+=" Half-speed output raises the cradle to its required position.";}else {invalidate("mechanism",...(integrated?["handoff","route"] as Task[]:[]));fail(message+" The cradle requires "+(integrated?profile.ratio+" output for verified profile "+profile.id:"half-speed output")+"; inspect the tooth ratio.");}
  break;
 case "measure":if(s.fuse==="open")s.measured=true;message="Supply: 6 V. "+(s.fuse==="open"?"Open fuse identified. The fault is now recorded before replacement.":"Fuse is intact. Working readings alone do not establish what the original fault was.")+" Lamp: "+(s.fuse==="intact"&&s.switchClosed?"ON.":"OFF.");break;
 case "fuse":if(s.switchClosed){fail("Open the load switch before changing the fuse.");break;}s.fuse=action.value;invalidate("circuit","route");message="Fuse is now "+s.fuse+". Close the switch and verify the load.";break;
 case "switch":
  s.switchClosed=action.closed;invalidate("circuit","route");
  if(s.switchClosed&&s.fuse==="intact"&&s.measured){complete("circuit");message="The complete 6 V circuit powers the load. Your measurement supports the replacement.";}
  else if(s.switchClosed&&s.fuse==="intact")fail("The load is on, but record a measurement and verify the fault before claiming a diagnosis.");
  else message="Load off. A closed path through an intact fuse is required.";
  break;
 case "replica": {
  if(integrated&&s.replica!==action.replica){invalidate("mechanism","handoff","route");s.recovery!.verifiedProfile=null;}
  s.replica=action.replica;
  const expected=s.scenario==="conflicting-archive"?"B":"A";
  if(s.replica===expected){complete("investigate");if(integrated)s.recovery!.verifiedProfile=profile.id;s.disruptionSeen=true;message="Archive "+expected+" matches the current signed source and has a complete sequence. "+(s.scenario==="conflicting-archive"?"The later signed source supersedes the early checksum; retain that change in your revision.":"The other copy has a changed checksum.");}
  else {invalidate("investigate",...(integrated?["mechanism","handoff","route"] as Task[]:[]));if(integrated)s.recovery!.verifiedProfile=null;fail("This copy does not match the current signed source. A newer timestamp alone does not establish integrity.");}
  break;
 }
 case "policy":
  if(action.subject==="observer"&&action.action==="certify"&&!action.allowed){s.policyPatched=true;complete("permission");message="Regression check: observer/read ALLOW; observer/certify DENY; technician/service ALLOW; registrar/certify ALLOW. Legitimate access is preserved.";}
  else fail("The defect grants observers certification. Deny that combination while preserving legitimate read, service and registrar certification.");
  break;
 case "handoff":
  if(integrated&&(!s.tasks.includes("investigate")||s.recovery!.verifiedProfile!==profile.id||!s.tasks.includes("mechanism")||s.recovery!.cradleProfile!==profile.id)){invalidate("handoff","route");fail("The handoff needs the current verified archive profile and its tested cradle. Ask Investigator and Systems to complete those linked checks first.");break;}
  s.handoff=[action.item,action.destination,action.condition].join(" → ");invalidate("handoff",...(integrated?["route"] as Task[]:[]));
  if(action.item==="verified archive"&&action.destination==="dispatch"&&action.condition==="after integrity check"){complete("handoff");if(integrated)s.recovery!.handoffProfile=profile.id;message="The handoff identifies item, destination and condition. The receiving role can act without guessing.";}
  else fail("The receiver needs the verified archive sent to dispatch after its integrity check. Make all three parts explicit.");
  break;
 case "agreement":
  if(integrated)invalidate("agreement");
  if(action.preserve&&action.recipient.trim().length>=2){s.agreement="Preserve original; hand over to "+action.recipient.trim();complete("agreement");message="Custodian: Agreed. Preserve the original and name "+action.recipient.trim()+" in the handover.";}
  else fail("Custodian: I need both original preservation and a named recipient before I can agree.");
  break;
 case "route":
  if(integrated&&(!s.tasks.includes("investigate")||s.recovery!.verifiedProfile!==profile.id||!s.tasks.includes("mechanism")||s.recovery!.cradleProfile!==profile.id||s.recovery!.handoffProfile!==profile.id)){invalidate("route");fail("Route testing needs the current verified profile, its tested cradle and the Coordinator's matching handoff.");break;}
  if(!["upper","service","lift"].includes(action.route)){fail("Choose a route on the supplied station map.");break;}
  s.route=action.route;invalidate("route");
  if(s.scenario==="equipment-failure"&&(s.route==="upper"||s.route==="lift")){s.disruptionSeen=true;s.tasks=s.tasks.filter(t=>t!=="route");fail("Published disruption: the lift supply is unavailable. Both upper and lift routes depend on it. Test the independent service passage.");}
  else if((s.route==="lift"||s.route==="upper")&&!s.tasks.includes("circuit"))fail("This route shares the lift supply and requires the restored circuit.");
  else {complete("route");if(integrated)s.recovery!.routeProfile=profile.id;message=(s.route==="service"?"Service passage: two marked sensor pauses, then the archive crossing.":s.route==="lift"?"Lift route: the restored supply supports the crossing after the marked sensor pause.":"Upper passage: sensor sweep clears after the marked pause.")+" Route model tested; use the movement lab to inspect individual sensor events.";}
  break;
 case "plan":
  if(s.plans.length>=50){fail("This run holds 50 plan versions. Export the preserved history and begin a new run before adding more.");break;}
  if(action.text.length>8000){fail("Keep each plan version within 8,000 characters.");break;}
  if(action.text.trim().length<20){fail("Explain the route, required evidence and what would make you revise it (at least 20 characters).");break;}
  if(s.plans.at(-1)?.text===action.text.trim()){fail("The new version is identical to the latest plan. Record what changed, or retain the existing version.");break;}
  if(integrated)s.recovery!.resolution=null;
   s.plans.push({version:s.plans.length+1,text:action.text.trim(),route:s.route});
  if(s.plans.length>1){complete("revision");message="Version "+s.plans.length+" recorded. Version 1 remains unchanged.";}
  else message="Version 1 preserved. Investigate the scenario, then add an explained revision.";
  break;
 case "resolution-evidence": {
  if(!integrated){fail("Outcome evidence belongs to the current final recovery mission.");break;}
  s.recovery!.resolution=null;
  const e:ResolutionEvidence={...action.evidence,profile:profile.id,route:s.route};
  const problem=resolutionEvidenceProblem(s,e);if(problem){fail(problem);break;}
  s.recovery!.resolution={...e,recipient:e.recipient.trim(),originalLocation:e.originalLocation.trim(),receipt:e.receipt.trim(),limitation:e.limitation.trim()};
  message="Recorded "+e.ending+" evidence for verified profile "+profile.id+" and tested "+s.route+" route. Presence checks do not grade the quality of your explanation.";break;
 }
 case "resolve": {
  if(s.follower!==expectedFollower(s)||s.brake||s.turns<1)invalidate("mechanism");
  if(s.fuse!=="intact"||!s.switchClosed||!s.measured)invalidate("circuit");
  if(!s.policyPatched)invalidate("permission");
  if(s.replica!==(s.scenario==="conflicting-archive"?"B":"A"))invalidate("investigate");
  if(s.handoff!=="verified archive → dispatch → after integrity check")invalidate("handoff");
  if(!s.agreement.startsWith("Preserve original; hand over to "))invalidate("agreement");
  if(s.plans.length<2)invalidate("revision");
  if((s.scenario==="equipment-failure"&&s.route!=="service")||((s.route==="upper"||s.route==="lift")&&!s.tasks.includes("circuit")))invalidate("route");
  if(integrated){
    if(s.recovery!.verifiedProfile!==profile.id)invalidate("investigate","mechanism","handoff","route");
    if(s.recovery!.cradleProfile!==profile.id)invalidate("mechanism","handoff","route");
    if(s.recovery!.handoffProfile!==profile.id)invalidate("handoff","route");
    if(s.recovery!.routeProfile!==profile.id)invalidate("route");
   }
   const missing=missionRequirements[s.kind].filter(t=>!s.tasks.includes(t));
  if(missing.length){fail("Before closing this trial: "+missing.map(t=>taskLabels[t]).join("; ")+".");break;}
  if(integrated){const evidence=s.recovery!.resolution;if(!evidence||evidence.ending!==action.ending){fail("Record the distinct "+action.ending+" outcome evidence at Dispatch before resolving this ending. A record for another ending is insufficient.");break;}const problem=resolutionEvidenceProblem(s,evidence);if(problem){fail(problem);break;}}
   s.ending=action.ending;s.status="complete";message=resolutionText(s);break;
 }
 }
 s.log.push({role:s.role,action:action.type,message,success});
 if(s.log.length>200)s.log=s.log.slice(-200);
 return {state:s,message,success};
}
export function resolutionText(s:MissionState):string {
 if(s.kind==="recovery"&&!currentRecovery(s))return "Legacy recovery record from the earlier independent-task rules. "+(s.status==="complete"?"Its recorded ending is preserved. ":"Its unfinished work is preserved. ")+"It contains no verified linked-profile or outcome-specific evidence for the current final mission. Export it as historical practice and start a new trial for current evidence.";
  if(!s.ending)return "The operation is still in progress.";
 const comparison=s.ending===s.declaredObjective?"The ending matches the initially declared "+s.declaredObjective+" objective.":"The initial objective was "+s.declaredObjective+"; the ending is "+s.ending+". Explain this revision using the recorded decisions rather than presenting it as the original intention.";
 if(s.kind==="a1")return "The Sealed Workshop trial is complete: observation, recall, orientation and the current cradle configuration are demonstrated. This preparatory trial does not establish a completed archive recovery. "+comparison+" This is practice evidence, not an academic grade.";
 if(s.kind==="a2")return "Restore the Relay trial is complete: the diagnosed circuit, verified record, permission repair and precise handoff are demonstrated. The final recovery mission remains a separate integrated task. "+comparison+" This is practice evidence, not an academic grade.";
 const result=s.ending==="physical"?"Physical archive recovered with the original preserved and a recorded recipient. The remaining obligation is transport and custody.":s.ending==="digital"?"Verified digital copy recovered. Integrity is supported by the current signed source; physical preservation remains a separate obligation.":"Archive stabilised for documented handover. Immediate removal is deferred; the recipient inherits the outstanding recovery work.";
 return result+" "+resolutionEvidenceText(s)+" "+comparison+" "+(s.scenario==="equipment-failure"?"The service route avoided the failed lift dependency.":s.scenario==="conflicting-archive"?"The later source changed which replica could be justified.":"The baseline evidence supported the selected model.")+" This is practice evidence, not an academic grade.";
}
export function resolutionEvidenceText(s:MissionState):string {
 const e=s.recovery?.resolution;if(!e)return "No outcome-specific evidence recorded.";
 const p=recoveryProfiles[e.profile];
 const base="Recorded outcome: "+e.ending+"; profile "+p.source+"; tested route "+e.route+"; recipient "+e.recipient+".";
 return base+(e.ending==="physical"?" Supported transport and original-preserving custody acknowledged.":e.ending==="digital"?" Verified receipt "+e.receipt+". Original retained at "+e.originalLocation+" with preservation confirmed.":" Stable state confirmed at "+e.originalLocation+". Remaining limitation: "+e.limitation);
}
export function missionMarkdown(s:MissionState):string {
 return ["# "+(s.kind==="a1"?"The Sealed Workshop":s.kind==="a2"?"Restore the Relay":"Operation Last Light"),"","Scenario: "+s.scenario,"Initial objective: "+s.declaredObjective,"Resolution: "+(s.ending??"In progress"),"Rules: "+(s.kind==="recovery"?(currentRecovery(s)?"Integrated recovery v2":"Legacy recovery v1"):"Assessment trial"),"",...(currentRecovery(s)?["## Linked recovery evidence","Packing order: "+missionFacts.recovery.order.join(", "),"Map orientation: "+missionFacts.recovery.orientation+" degrees clockwise","Verified source: "+(s.recovery!.verifiedProfile?recoveryProfiles[s.recovery!.verifiedProfile].source:"not verified"),"Cradle profile: "+(s.recovery!.cradleProfile??"not tested")+"; follower "+s.follower+" teeth","Handoff profile: "+(s.recovery!.handoffProfile??"not verified"),"Route profile: "+(s.recovery!.routeProfile??"not verified"),"","## Outcome evidence",resolutionEvidenceText(s),""]:[]),...s.tasks.map(t=>"- "+taskLabels[t]),"","## Plan history",...s.plans.flatMap(p=>["","### Version "+p.version,"Route: "+p.route,p.text]),"","## Action record",...s.log.map(l=>"- ["+roles[l.role].title+"] "+l.message),"","## Debrief",resolutionText(s)].join("\n");
}

