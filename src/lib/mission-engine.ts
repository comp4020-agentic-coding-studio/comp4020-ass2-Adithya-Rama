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
 disruptionSeen:boolean; declaredObjective:"physical"|"digital"|"stabilise"; log:MissionLog[]; ending:"physical"|"digital"|"stabilise"|null;
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
 {type:"resolve";ending:"physical"|"digital"|"stabilise"};
export const missionRequirements:Record<MissionKind,Task[]> = {
 a1:["observe","recall","orient","mechanism"],
 a2:["circuit","investigate","permission","handoff"],
 recovery:[...taskIds]
};
export function newMission(kind:MissionKind="recovery",scenario:Scenario="baseline"):MissionState {
 return {kind,scenario,role:"observer",zone:kind==="a2"?"power":"arrival",status:"active",tasks:[],inspected:[],driver:12,follower:36,brake:true,turns:0,fuse:"open",switchClosed:false,measured:false,replica:null,policyPatched:false,route:"upper",handoff:"",agreement:"",plans:[],disruptionSeen:false,declaredObjective:"physical",log:[],ending:null};
}
const taskRole:Partial<Record<MissionAction["type"],Role>> = {inspect:"observer",recall:"observer",orient:"observer",gear:"systems",brake:"systems",turn:"systems",measure:"systems",fuse:"systems",switch:"systems",replica:"investigator",policy:"investigator",handoff:"coordinator",agreement:"coordinator",plan:"coordinator",route:"observer"};
export function applyMission(current:MissionState,action:MissionAction):{state:MissionState;message:string;success:boolean} {
 const s:MissionState=JSON.parse(JSON.stringify(current));
 let message="",success=true;
 const complete=(task:Task)=>{if(!s.tasks.includes(task))s.tasks.push(task);};
 const invalidate=(...tasks:Task[])=>{s.tasks=s.tasks.filter(task=>!tasks.includes(task));};
 const fail=(why:string)=>{success=false;message=why;};
 if(action.type==="role") {s.role=action.role;return {state:s,message:roles[s.role].brief,success:true};}
 if(action.type==="zone") {s.zone=action.zone;return {state:s,message:"Entered "+s.zone+". Your progress is retained.",success:true};}
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
  message=({lens:"Bronze lens: seated in the left mount.",spool:"Blue spool: below the navigation board.",tile:"White tile: beside the manifest.",map:"The plan's north arrow is rotated 90 degrees clockwise.",manifest:"Packing order: lens, spool, tile. Build a spatial association before hiding this record."} as Record<string,string>)[action.item]!;
  if(["lens","spool","tile","map","manifest"].every(i=>s.inspected.includes(i)))complete("observe");
  break;
 case "recall":
  if(action.items.toLowerCase().replace(/[^a-z]/g,"")==="lensspooltile"){complete("recall");message="The three items and their order match the manifest. Repeat in the transfer lab with a different list.";}else fail("Compare your recall with the manifest: identify a missing item or an order error, then try again.");
  break;
 case "orient":
  if(action.degrees===90){complete("orient");message="Correct: north rotates one quarter-turn clockwise. The apparent right-hand passage is the plan's north route.";}else fail("Use the north arrow, not the camera's facing direction. The supplied rotation is one quarter-turn clockwise.");
  break;
 case "gear":if(![24,36,48].includes(action.follower)){fail("Choose one of the supplied 24, 36 or 48-tooth follower gears.");break;} s.follower=action.follower;s.turns=0;invalidate("mechanism");message="12 / "+s.follower+" = "+(12/s.follower).toFixed(2)+" output turns per input turn, in the opposite direction.";break;
 case "brake":s.brake=!action.released;invalidate("mechanism");message=s.brake?"Brake engaged: the cradle is held.":"Brake released: the cam can move.";break;
 case "turn":
  if(s.brake){fail("The engaged brake blocks the cam. More input force is not the repair.");break;}
  if(s.turns>=10000){fail("This run has reached its recorded-turn limit. Export the record and restart the trial.");break;}
  s.turns+=1;message="One input turn produced "+(12/s.follower).toFixed(2)+" follower turns.";
  if(s.follower===24){complete("mechanism");message+=" Half-speed output raises the cradle to its required position.";}else fail(message+" The cradle requires half-speed output; inspect the tooth ratio.");
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
  s.replica=action.replica;
  const expected=s.scenario==="conflicting-archive"?"B":"A";
  if(s.replica===expected){complete("investigate");s.disruptionSeen=true;message="Archive "+expected+" matches the current signed source and has a complete sequence. "+(s.scenario==="conflicting-archive"?"The later signed source supersedes the early checksum; retain that change in your revision.":"The other copy has a changed checksum.");}
  else {s.tasks=s.tasks.filter(t=>t!=="investigate");fail("This copy does not match the current signed source. A newer timestamp alone does not establish integrity.");}
  break;
 }
 case "policy":
  if(action.subject==="observer"&&action.action==="certify"&&!action.allowed){s.policyPatched=true;complete("permission");message="Regression check: observer/read ALLOW; observer/certify DENY; technician/service ALLOW; registrar/certify ALLOW. Legitimate access is preserved.";}
  else fail("The defect grants observers certification. Deny that combination while preserving legitimate read, service and registrar certification.");
  break;
 case "handoff":
  s.handoff=[action.item,action.destination,action.condition].join(" → ");invalidate("handoff");
  if(action.item==="verified archive"&&action.destination==="dispatch"&&action.condition==="after integrity check"){complete("handoff");message="The handoff identifies item, destination and condition. The receiving role can act without guessing.";}
  else fail("The receiver needs the verified archive sent to dispatch after its integrity check. Make all three parts explicit.");
  break;
 case "agreement":
  if(action.preserve&&action.recipient.trim().length>=2){s.agreement="Preserve original; hand over to "+action.recipient.trim();complete("agreement");message="Custodian: Agreed. Preserve the original and name "+action.recipient.trim()+" in the handover.";}
  else fail("Custodian: I need both original preservation and a named recipient before I can agree.");
  break;
 case "route":
  if(!["upper","service","lift"].includes(action.route)){fail("Choose a route on the supplied station map.");break;}
  s.route=action.route;invalidate("route");
  if(s.scenario==="equipment-failure"&&(s.route==="upper"||s.route==="lift")){s.disruptionSeen=true;s.tasks=s.tasks.filter(t=>t!=="route");fail("Published disruption: the lift supply is unavailable. Both upper and lift routes depend on it. Test the independent service passage.");}
  else if((s.route==="lift"||s.route==="upper")&&!s.tasks.includes("circuit"))fail("This route shares the lift supply and requires the restored circuit.");
  else {complete("route");message=(s.route==="service"?"Service passage: two marked sensor pauses, then the archive crossing.":"Upper passage: sensor sweep clears after the marked pause.")+" Route model tested; use the movement lab to inspect individual sensor events.";}
  break;
 case "plan":
  if(s.plans.length>=50){fail("This run holds 50 plan versions. Export the preserved history and begin a new run before adding more.");break;}
  if(action.text.length>8000){fail("Keep each plan version within 8,000 characters.");break;}
  if(action.text.trim().length<20){fail("Explain the route, required evidence and what would make you revise it (at least 20 characters).");break;}
  if(s.plans.at(-1)?.text===action.text.trim()){fail("The new version is identical to the latest plan. Record what changed, or retain the existing version.");break;}
  s.plans.push({version:s.plans.length+1,text:action.text.trim(),route:s.route});
  if(s.plans.length>1){complete("revision");message="Version "+s.plans.length+" recorded. Version 1 remains unchanged.";}
  else message="Version 1 preserved. Investigate the scenario, then add an explained revision.";
  break;
 case "resolve": {
  if(s.follower!==24||s.brake||s.turns<1)invalidate("mechanism");
  if(s.fuse!=="intact"||!s.switchClosed||!s.measured)invalidate("circuit");
  if(!s.policyPatched)invalidate("permission");
  if(s.replica!==(s.scenario==="conflicting-archive"?"B":"A"))invalidate("investigate");
  if(s.handoff!=="verified archive → dispatch → after integrity check")invalidate("handoff");
  if(!s.agreement.startsWith("Preserve original; hand over to "))invalidate("agreement");
  if(s.plans.length<2)invalidate("revision");
  if((s.scenario==="equipment-failure"&&s.route!=="service")||((s.route==="upper"||s.route==="lift")&&!s.tasks.includes("circuit")))invalidate("route");
  const missing=missionRequirements[s.kind].filter(t=>!s.tasks.includes(t));
  if(missing.length){fail("Before closing this trial: "+missing.map(t=>taskLabels[t]).join("; ")+".");break;}
  s.ending=action.ending;s.status="complete";message=resolutionText(s);break;
 }
 }
 s.log.push({role:s.role,action:action.type,message,success});
 if(s.log.length>200)s.log=s.log.slice(-200);
 return {state:s,message,success};
}
export function resolutionText(s:MissionState):string {
 if(!s.ending)return "The operation is still in progress.";
 const comparison=s.ending===s.declaredObjective?"The ending matches the initially declared "+s.declaredObjective+" objective.":"The initial objective was "+s.declaredObjective+"; the ending is "+s.ending+". Explain this revision using the recorded decisions rather than presenting it as the original intention.";
 if(s.kind==="a1")return "The Sealed Workshop trial is complete: observation, recall, orientation and the current cradle configuration are demonstrated. This preparatory trial does not establish a completed archive recovery. "+comparison+" This is practice evidence, not an academic grade.";
 if(s.kind==="a2")return "Restore the Relay trial is complete: the diagnosed circuit, verified record, permission repair and precise handoff are demonstrated. The final recovery mission remains a separate integrated task. "+comparison+" This is practice evidence, not an academic grade.";
 const result=s.ending==="physical"?"Physical archive recovered with the original preserved and a recorded recipient. The remaining obligation is transport and custody.":s.ending==="digital"?"Verified digital copy recovered. Integrity is supported by the current signed source; physical preservation remains a separate obligation.":"Archive stabilised for documented handover. Immediate removal is deferred; the recipient inherits the outstanding recovery work.";
 return result+" "+comparison+" "+(s.scenario==="equipment-failure"?"The service route avoided the failed lift dependency.":s.scenario==="conflicting-archive"?"The later source changed which replica could be justified.":"The baseline evidence supported the selected model.")+" This is practice evidence, not an academic grade.";
}
export function missionMarkdown(s:MissionState):string {
 return ["# "+(s.kind==="a1"?"The Sealed Workshop":s.kind==="a2"?"Restore the Relay":"Operation Last Light"),"","Scenario: "+s.scenario,"Initial objective: "+s.declaredObjective,"Resolution: "+(s.ending??"In progress"),"",...s.tasks.map(t=>"- "+taskLabels[t]),"","## Plan history",...s.plans.flatMap(p=>["","### Version "+p.version,"Route: "+p.route,p.text]),"","## Action record",...s.log.map(l=>"- ["+roles[l.role].title+"] "+l.message),"","## Debrief",resolutionText(s)].join("\n");
}

