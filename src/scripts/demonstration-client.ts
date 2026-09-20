import type {Demonstration, DemoValue, DemoFrame} from "../lib/demonstration-types";
import {getDemoWalkthrough} from "../data/demonstration-walkthroughs";
import {createDemoNarrator,speechAvailable} from "../lib/demo-speech";
import {createDemoProgress,checkDemoStep,applyDemoAttempt,advanceDemo,demoCoaching,useDemoHint,setDemoMode,markDemoWatched,assertDemo,demoExpectedResponses} from "../lib/demonstration-engine";
import {getDemoOperation,createDemoFieldRun,recordDemoFieldProof,applyDemoFieldAction} from "../data/demo-operations";
import type {FieldOperationAction} from "../lib/field-operation";
import {renderFieldOperation,broadcastFieldOperation,requestFieldOperation} from "./field-operation-view";

function mount(root:HTMLElement){
 if(root.dataset.demoMounted)return;root.dataset.demoMounted="true";
 const demo=JSON.parse(root.querySelector<HTMLScriptElement>("[data-demo-definition]")!.textContent!) as Demonstration;
 assertDemo(demo);
 const el=<T extends HTMLElement=HTMLElement>(selector:string)=>root.querySelector<T>(selector)!;
 const make=<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;return node;};
 const modeFromUrl=new URLSearchParams(location.search).get("mode")==="control"?"control":"watch";
 let progress=createDemoProgress(demo,modeFromUrl);
 let responses:Record<string,DemoValue>={};const cached=new Map<string,Record<string,DemoValue>>();
 type WalkPhase="introduction"|"briefing"|"action"|"outcome"|"field-action"|"field-result"|"completion";
 const walkthrough=getDemoWalkthrough(demo);
 const operation=getDemoOperation(demo),fieldScope="demo:"+demo.id;
 const fieldRuns={watch:createDemoFieldRun(demo),control:createDemoFieldRun(demo)};
 let fieldIndex=0,fieldResult="";
 const fieldRun=()=>fieldRuns[progress.mode];
 function sendField(){broadcastFieldOperation(fieldScope,operation,fieldRun().field);}
 function renderField(){
  renderFieldOperation(root,operation,fieldRun().field,action=>dispatchField(action));
  if(progress.mode==="watch")root.querySelectorAll<HTMLButtonElement>("[data-field-operation] button").forEach(button=>button.disabled=true);
  el("[data-demo-field-proof]").textContent=(progress.mode==="watch"?"Demonstrator":"Your practice")+": "+fieldRun().verifiedSteps.length+" / "+demo.steps.length+" chapter checks support this operation. "+(progress.mode==="watch"?"Watch performs the same station actions after every required check.":"After all chapter checks, perform the intervention, collect the package and follow its handover route.")+" Watching and your own operation remain separate.";
 }
 function dispatchField(action:FieldOperationAction,playback=false){
  if(progress.mode==="watch"&&!playback){announce("Take control to operate the mission stations. Watching never completes your own operation.");return false;}
  const result=applyDemoFieldAction(demo,fieldRun(),action);fieldRuns[progress.mode]=result.run;
  fieldResult=result.message;renderField();sendField();
  if(!playback)announce(result.message);
  return result.success;
 }
 let playing=false,shownAfter=false,elapsed=0,last=0,frame=0,lastBroadcast=0;
 let speed=1,coaching="guided",sceneReady=false,narrationEnabled=true;
 let phase:WalkPhase="introduction",introSeen=false,finished=false,phaseElapsed=0,phaseBudget=1,segmentVersion=0;
 let captionWait:ReturnType<typeof setTimeout>|undefined,speechStartFrame=0;
 const narrator=createDemoNarrator(()=>{stop();announce("Playback paused because another demonstration started.");});
 const step=()=>demo.steps[progress.stepIndex]!;
 const live=el("[data-demo-status]"),inputs=el("[data-demo-inputs]"),feedback=el("[data-demo-feedback]");
 const form=el<HTMLFormElement>("[data-demo-form]");
 const readingTime=(text:string)=>text.trim().split(/\s+/).length/2.6*1000+1600;
 const beforeDuration=()=>Math.max(step().duration*500,readingTime(step().narration));
 const duration=()=>beforeDuration()+Math.max(step().duration*500,readingTime(step().success));
 const announce=(message:string)=>{live.textContent=message;};
 function sendFrame(){
  const shot=shownAfter?step().after:step().before;
  const liveValues:Record<string,DemoValue>={};
  if(progress.mode==="control"&&!shownAfter)for(const control of step().controls){
   const value=responses[control.id];
   if(control.type==="number"){
    if(value===""||typeof value==="boolean"||Array.isArray(value))continue;
    const number=Number(value);if(!Number.isFinite(number)||number<(control.min??-Infinity)||number>(control.max??Infinity))continue;
    liveValues[control.id]=number;
   }else if(value!==undefined){
    if(["route","sensors"].includes(control.id)&&(!Array.isArray(value)||value.some(item=>!/^\d+$/.test(item)||Number(item)>24)))continue;
    liveValues[control.id]=value;
   }
  }
  const scene:DemoFrame={...shot,values:{...shot.values,...liveValues},demoId:demo.id,stepId:step().id,title:step().title,phase:shownAfter?"after":"before",progress:Math.min(1,elapsed/duration())};
  window.dispatchEvent(new CustomEvent("mastermind:demo-frame",{detail:scene}));
 }
 function sendMode(){
  window.dispatchEvent(new CustomEvent("mastermind:demo-control",{detail:{active:progress.mode==="control"}}));
  window.dispatchEvent(new CustomEvent("mastermind:demo-playback",{detail:{playing}}));
  window.dispatchEvent(new CustomEvent("mastermind:demo-narration-phase",{detail:{demoId:demo.id,stepId:step().id,phase,playing}}));
 }
 function stopSpeech(){narrator.cancel();}
 function stop(){
  playing=false;segmentVersion++;if(captionWait)clearTimeout(captionWait);captionWait=undefined;
  cancelAnimationFrame(frame);cancelAnimationFrame(speechStartFrame);stopSpeech();sendMode();updateTransport();
 }
 function phaseText():string{
  if(phase==="introduction")return walkthrough.introduction;
  if(phase==="field-action")return walkthrough.fieldActions[fieldIndex]!.intention;
  if(phase==="field-result")return fieldResult;
  if(phase==="completion")return (fieldRuns.watch.field.delivered?"The demonstrated field operation has been completed through its recorded station actions. ":"Completion preview: this visit has not completed the full demonstrated field operation. The following is the authored finished example, not a receipt for actions performed in this visit. ")+walkthrough.completion;
  return walkthrough.steps[step().id]![phase];
 }
 const phaseNames:Record<WalkPhase,string>={introduction:"Before we begin",briefing:"What I need to do",action:"Watch my actions",outcome:"What I observed","field-action":"Perform the mission action","field-result":"Observe its consequence",completion:"My observations and finished submission"};
 function caption(){
  root.dataset.demoNarrationPhase=phase;
  el("[data-demo-narration-phase]").textContent=phaseNames[phase];
  el("[data-demo-caption-title]").textContent=phase==="introduction"?"Your worked-example briefing":phase==="completion"?"From the attempt to the finished work":phase.startsWith("field-")?operation.title:step().title;
  el("[data-demo-caption]").textContent=phaseText();
  el("[data-demo-narration]").textContent=phaseText();
 }
 function updateAudio(){
  const button=el<HTMLButtonElement>("[data-demo-narrate]");
  button.disabled=!speechAvailable();
  button.textContent=!speechAvailable()?"Device narration unavailable":narrationEnabled?"Mute narration":"Enable narration";
  button.setAttribute("aria-pressed",String(narrationEnabled&&speechAvailable()));
 }
 function segment(){
  if(!playing)return;
  const token=++segmentVersion;if(captionWait)clearTimeout(captionWait);captionWait=undefined;
  narrator.cancel();cancelAnimationFrame(speechStartFrame);
  phaseElapsed=0;phaseBudget=Math.max(1800,readingTime(phaseText())/speed);last=performance.now();
  if(phase==="action")progress=markDemoWatched(demo,progress);
  caption();sendFrame();updateTransport();
  window.dispatchEvent(new CustomEvent("mastermind:demo-narration-phase",{detail:{demoId:demo.id,stepId:step().id,phase,playing:true}}));
  const done=()=>{if(token===segmentVersion&&playing)advanceSegment();};
  const captionPlayback=()=>{if(token!==segmentVersion||!playing)return;captionWait=setTimeout(done,phaseBudget);};
  const speak=()=>{
   if(token!==segmentVersion||!playing)return;
   if(!narrationEnabled||!speechAvailable()){captionPlayback();return;}
   narrator.speak(phaseText(),.9*speed,done,reason=>{
    if(token!==segmentVersion||!playing)return;
    narrationEnabled=false;updateAudio();el("[data-demo-audio-status]").textContent=reason;announce(reason);captionPlayback();
   });
  };
  // Paint the changed apparatus before explaining its observed outcome.
  if(phase==="outcome")speechStartFrame=requestAnimationFrame(()=>{speechStartFrame=requestAnimationFrame(speak);});else speak();
 }
 function advanceSegment(){
  if(!playing)return;
  if(phase==="introduction"){
   const token=segmentVersion;
   requestFieldOperation(fieldScope,{type:"inspect"},()=>{
    if(!playing||token!==segmentVersion||progress.mode!=="watch")return;
    introSeen=true;dispatchField({type:"inspect"},true);phase="briefing";renderStep();segment();
   });
   return;
  }
  else if(phase==="briefing")phase="action";
  else if(phase==="action"){phase="outcome";showOutcome(true);}
  else if(phase==="outcome"){
   if(progress.stepIndex<demo.steps.length-1){progress=advanceDemo(demo,progress);phase="briefing";renderStep();}
   else if(fieldRun().field.verified){fieldIndex=0;phase="field-action";}
   else{phase="completion";el<HTMLDetailsElement>(".demo-finished details").open=true;}
  }else if(phase==="field-action"){
   const token=segmentVersion,action=walkthrough.fieldActions[fieldIndex]!.action;
   announce("The demonstrator is moving to the mission station. The result is recorded after arrival.");
   requestFieldOperation(fieldScope,action,()=>{
    if(!playing||token!==segmentVersion||progress.mode!=="watch")return;
    const completed=dispatchField(action,true);
    if(!completed){phase="completion";el<HTMLDetailsElement>(".demo-finished details").open=true;}
    else phase="field-result";
    segment();
   });
   return;
  }else if(phase==="field-result"){
   fieldIndex++;
   if(fieldIndex<walkthrough.fieldActions.length)phase="field-action";
   else{phase="completion";el<HTMLDetailsElement>(".demo-finished details").open=true;}
  }else{
   finished=true;elapsed=duration();stop();el("[data-demo-progress-bar]").style.width="100%";
   announce(fieldRuns.watch.field.delivered?"The narrated mission and its handover are complete. The worked submission is open below; take control for a separate practice run.":"Chapter preview finished. The authored submission is open, but this visit has not performed every chapter and mission action. Replay from the introduction for the complete operation.");return;
  }
  segment();
 }
 function updateTransport(){
  root.dataset.mode=progress.mode;
  el<HTMLButtonElement>("[data-demo-play]").textContent=playing?"Pause":"Play";
  el<HTMLButtonElement>("[data-demo-previous]").disabled=progress.stepIndex===0;
  el<HTMLButtonElement>("[data-demo-next]").disabled=progress.stepIndex===demo.steps.length-1||(progress.mode==="control"&&!progress.attempts[step().id]?.completed);
  el<HTMLButtonElement>("[data-demo-watch]").setAttribute("aria-pressed",String(progress.mode==="watch"));
  el<HTMLButtonElement>("button[data-demo-control]").setAttribute("aria-pressed",String(progress.mode==="control"));
  el("[data-demo-mode-label]").textContent=progress.mode==="watch"?"Watch the reasoning and apparatus. Take control at any point.":"You control this example. Test a decision to see its consequences.";
  form.hidden=progress.mode!=="control";el("[data-demo-watch-note]").hidden=progress.mode==="control";
  const within=Math.min(.99,phaseElapsed/phaseBudget);
  const position=phase==="introduction"?within:phase==="completion"||phase.startsWith("field-")?1+demo.steps.length*3+within:1+progress.stepIndex*3+({briefing:0,action:1,outcome:2}[phase as "briefing"|"action"|"outcome"])+within;
  el("[data-demo-progress-bar]").style.width=(finished?100:progress.mode==="watch"?position/(demo.steps.length*3+2)*100:(progress.stepIndex+elapsed/duration())/demo.steps.length*100)+"%";
  const playerLabel=root.querySelector<HTMLElement>("[data-scene-player-label]");
  if(playerLabel)playerLabel.textContent=progress.mode==="watch"?"Student demonstrator · observe their method":"You control the student";
  updateAudio();renderField();
  root.querySelectorAll<HTMLButtonElement>("[data-demo-jump]").forEach(button=>{
   const i=Number(button.dataset.demoJump),id=demo.steps[i]!.id;
   if(i===progress.stepIndex)button.setAttribute("aria-current","step");else button.removeAttribute("aria-current");
   button.querySelector("[data-demo-chapter-state]")!.textContent=progress.attempts[id]?.completed?(progress.attempts[id]?.independent?"Practised before result/hints":"Practised with support"):progress.watched?.includes(id)?"Observed":"Ready to explore";
  });
  const report=demoCoaching(demo,progress);
  el("[data-demo-coaching-result]").textContent=report.summary+" "+report.nextFocus;
 }
 function initialResponses(){
  responses=cached.has(step().id)?structuredClone(cached.get(step().id)!):Object.fromEntries(step().controls.map(control=>[control.id,structuredClone(control.initial??(control.type==="toggle"?false:control.type==="order"?(control.options??[]).map(option=>option.value):""))]));
 }
 function changed(id:string,value:DemoValue){
  const existing=progress.attempts[step().id];
  if(existing)progress={...progress,completed:false,attempts:{...progress.attempts,[step().id]:{...existing,completed:false,independent:false}}};
  fieldRuns.control=recordDemoFieldProof(demo,fieldRuns.control,step().id,false);sendField();
  responses[id]=value;cached.set(step().id,structuredClone(responses));shownAfter=false;elapsed=0;el("[data-demo-caption]").textContent=step().narration;el("[data-demo-observed]").hidden=true;feedback.textContent="";sendFrame();updateTransport();
 }
 function renderOrder(container:HTMLElement,id:string){
  container.replaceChildren();const control=step().controls.find(c=>c.id===id)!;
  const values=Array.isArray(responses[id])?responses[id] as string[]:[];
  const list=make("ol");list.className="demo-order-list";
  values.forEach((value,index)=>{
   const li=make("li"),name=control.options?.find(option=>option.value===value)?.label??value;
   li.append(make("span",name));
   for(const [offset,label] of [[-1,"↑"],[1,"↓"]] as const){
    const button=make("button",label);button.type="button";button.disabled=index+offset<0||index+offset>=values.length;button.setAttribute("aria-label","Move "+name+" "+(offset<0?"earlier":"later"));
    button.addEventListener("click",()=>{
     const next=[...values],target=index+offset;
     [next[index],next[target]]=[next[target]!,next[index]!];changed(id,next);renderOrder(container,id);
     const movedRow=container.querySelectorAll("li")[target];
     const preferred=movedRow?.querySelectorAll<HTMLButtonElement>("button")[offset<0?0:1];
     const focusTarget=preferred&&!preferred.disabled?preferred:movedRow?.querySelector<HTMLButtonElement>("button:not(:disabled)");
     focusTarget?.focus({preventScroll:true});
    });
    li.append(button);
   }
   list.append(li);
  });
  container.append(list);
 }
 function renderInputs(){
  inputs.replaceChildren();
  for(const control of step().controls){
   const field=make("fieldset"),legend=make("legend",control.label);field.append(legend);field.dataset.demoField=control.id;
   if(control.type==="order"){const order=make("div");field.append(order);renderOrder(order,control.id);}
   else{
    const input=control.type==="select"?make("select"):make("input");input.id="demo-"+demo.id+"-"+control.id;input.setAttribute("aria-label",control.label);input.dataset.demoInput=control.id;
    if(input instanceof HTMLSelectElement){
     const blank=make("option","Choose a response…");blank.value="";input.append(blank);
     for(const option of control.options??[]){const item=make("option",option.label);item.value=option.value;input.append(item);}
     input.value=String(responses[control.id]??"");
    }else{
     input.type=control.type==="toggle"?"checkbox":control.type==="number"?"number":"text";
     if(control.type==="toggle")input.checked=responses[control.id]===true;
     else input.value=String(responses[control.id]??"");
     if(control.type==="number"){input.step="any";if(control.min!==undefined)input.min=String(control.min);if(control.max!==undefined)input.max=String(control.max);}
     else input.maxLength=300;
    }
    input.addEventListener(control.type==="text"||control.type==="number"?"input":"change",()=>changed(control.id,input instanceof HTMLInputElement&&input.type==="checkbox"?input.checked:input.value));
    if(control.type==="toggle"){const label=make("label");label.className="demo-checklabel";label.append(input,make("span",control.label));field.append(label);}else field.append(input);
    if(control.unit)field.append(make("small","Unit: "+control.unit));
   }
   inputs.append(field);
  }
 }
 function actionSummary(){
  const list=el("[data-demo-action-summary]");list.replaceChildren();
  for(const control of step().controls){
   const value=control.expected;
   const label=Array.isArray(value)?value.map(v=>control.options?.find(o=>o.value===v)?.label??v).join(" → "):typeof value==="boolean"?(value?"Yes":"No"):control.options?.find(o=>o.value===String(value))?.label??String(value);
   const row=make("div");row.append(make("dt",control.label),make("dd",label+(control.unit?" "+control.unit:"")));list.append(row);
  }
  el("[data-demo-outcome]").textContent=step().success;
  el("[data-demo-observed]").hidden=false;
 }
 function renderStep(focus=false){
  shownAfter=false;elapsed=0;initialResponses();
  el("[data-demo-chapter]").textContent=String(progress.stepIndex+1).padStart(2,"0")+" / "+demo.steps.length;
  for(const selector of ["[data-demo-step-title]","[data-demo-caption-title]"])el(selector).textContent=step().title;
  el("[data-demo-caption]").textContent=step().narration;
  el("[data-demo-narration]").textContent=step().narration;
  el("[data-demo-why-text]").textContent=step().why;
  el("[data-demo-pitfall-text]").textContent=step().pitfall;
  el("[data-demo-prompt]").textContent=step().prompt;
  el("[data-demo-hint-text]").hidden=true;el("[data-demo-hint-text]").textContent="";
  el("[data-demo-observed]").hidden=true;feedback.textContent="";
  el<HTMLDetailsElement>("[data-demo-why]").open=coaching==="guided";
  el<HTMLDetailsElement>("[data-demo-pitfall]").open=false;
  if(progress.mode==="watch")caption();else{root.dataset.demoNarrationPhase="control";el("[data-demo-narration-phase]").textContent="Your turn · try the decision";}
  renderInputs();updateTransport();sendFrame();
  if(focus){const heading=el("[data-demo-step-title]");heading.tabIndex=-1;heading.focus({preventScroll:true});}
 }
 function showHint(){
  progress=useDemoHint(demo,progress);el("[data-demo-hint-text]").hidden=false;el("[data-demo-hint-text]").textContent=step().hint;updateTransport();
 }
 function showOutcome(watched=false){
  shownAfter=true;if(watched){
   progress=markDemoWatched(demo,progress);
   fieldRuns.watch=recordDemoFieldProof(demo,fieldRuns.watch,step().id,checkDemoStep(step(),demoExpectedResponses(step())).correct);
   sendField();
  }
  actionSummary();el("[data-demo-caption]").textContent=step().success;sendFrame();updateTransport();
 }
 const tick=(now:number)=>{
  if(!playing)return;
  const dt=Math.min(200,now-last);last=now;phaseElapsed+=dt;
  const fraction=Math.min(1,phaseElapsed/phaseBudget);
  elapsed=phase==="introduction"?0:phase==="briefing"?beforeDuration()*.4*fraction:phase==="action"?beforeDuration()*(.4+.6*fraction):phase==="outcome"?beforeDuration()+(duration()-beforeDuration())*fraction:duration();
  if(now-lastBroadcast>120){sendFrame();updateTransport();lastBroadcast=now;}
  frame=requestAnimationFrame(tick);
 };
 function beginPlayback(){
  playing=true;last=performance.now();sendMode();updateTransport();
  el("[data-demo-audio-status]").textContent=!speechAvailable()?"This browser has no device narration. The complete captions play instead.":narrationEnabled?"Narration is on. Mute it at any time; captions always remain visible.":"Narration is muted. Captions and the apparatus continue together.";
  announce(phase==="introduction"?"The demonstrator explains the task before starting.":phase==="completion"?"The demonstrator reviews the observations and finished submission.":"Playing chapter "+(progress.stepIndex+1)+". Pause or take control whenever you like.");
  segment();frame=requestAnimationFrame(tick);
 }
 function requestPlayback(){
  if(!root.querySelector('[data-academy-world][data-immersive="true"]'))el(".demo-theatre").scrollIntoView({block:"start",behavior:"instant"});
  const previousMode=progress.mode;stop();progress=setDemoMode(demo,progress,"watch");sendField();
  if(finished){progress={...progress,stepIndex:0};fieldRuns.watch=createDemoFieldRun(demo);fieldIndex=0;finished=false;introSeen=false;phase="introduction";renderStep();sendField();}
  else if(previousMode!=="watch"){phase=progress.stepIndex===0&&!introSeen?"introduction":"briefing";renderStep();}
  if(!sceneReady){const launch=el<HTMLButtonElement>("[data-world-launch]");if(!launch.disabled)launch.click();}
  // The first spoken briefing starts in the user's Watch/Play gesture, while 3D loads.
  beginPlayback();
 }
 el("[data-demo-watch]").addEventListener("click",requestPlayback);
 el("[data-demo-play]").addEventListener("click",()=>{if(playing){stop();announce("Paused. Play repeats the current explanation from its beginning; your chapter and apparatus stay here.");}else requestPlayback();});
 el("button[data-demo-control]").addEventListener("click",()=>{
  stop();progress=setDemoMode(demo,progress,"control");phase="briefing";finished=false;renderStep();sendMode();sendField();
  if(!sceneReady&&!el<HTMLButtonElement>("[data-world-launch]").disabled)el<HTMLButtonElement>("[data-world-launch]").click();
  announce("Your turn. "+step().prompt);inputs.querySelector<HTMLElement>("input,select,button")?.focus({preventScroll:true});
 });
 form.addEventListener("submit",event=>{
  event.preventDefault();if(progress.mode!=="control")return;
  const result=checkDemoStep(step(),responses);progress=applyDemoAttempt(demo,progress,responses);
  fieldRuns.control=recordDemoFieldProof(demo,fieldRuns.control,step().id,result.correct);sendField();
  feedback.textContent=result.feedback;feedback.dataset.correct=String(result.correct);
  inputs.querySelectorAll<HTMLElement>("[data-demo-field]").forEach(field=>{const correct=result.fields[field.dataset.demoField!];field.querySelector("input,select")?.setAttribute("aria-invalid",String(correct===false));});
  if(result.correct){elapsed=duration();showOutcome();announce(progress.completed?"Every chapter check now supports your operation. Return to the mission station, perform the intervention, then collect and deliver its package before your debrief.":"Decision demonstrated. Read the result, then continue when ready.");}
  else{
   shownAfter=false;sendFrame();
   if(coaching==="guided"&&(progress.attempts[step().id]?.attempts??0)>=2)showHint();
   announce("There is something to investigate. The feedback names the part to reconsider.");
  }
  updateTransport();
 });
 el("[data-demo-hint]").addEventListener("click",showHint);
 el<HTMLSelectElement>("[data-demo-coaching]").addEventListener("change",event=>{coaching=(event.target as HTMLSelectElement).value;el<HTMLDetailsElement>("[data-demo-why]").open=coaching==="guided";announce(coaching==="guided"?"Guided explanations show each step and offer a cue after repeated difficulty.":"Try each decision first. Explanations and hints remain available whenever you want them.");});
 el<HTMLSelectElement>("[data-demo-speed]").addEventListener("change",event=>{speed=Number((event.target as HTMLSelectElement).value);if(playing)announce("The new pace applies to the next explanation. The current spoken sentence will finish.");});
 function jump(index:number){stop();finished=false;introSeen=true;phase="briefing";progress={...progress,stepIndex:Math.max(0,Math.min(demo.steps.length-1,index))};renderStep(true);sendMode();sendField();announce("Chapter "+(progress.stepIndex+1)+". "+step().prompt+" This chapter visit does not certify the other chapters or the operation handover.");}
 el("[data-demo-next]").addEventListener("click",()=>{const next=advanceDemo(demo,progress);if(next.stepIndex!==progress.stepIndex)jump(next.stepIndex);});
 el("[data-demo-previous]").addEventListener("click",()=>jump(progress.stepIndex-1));
 el("[data-demo-replay]").addEventListener("click",()=>{jump(progress.stepIndex);if(progress.mode==="watch")requestPlayback();});
 root.querySelectorAll<HTMLButtonElement>("[data-demo-jump]").forEach(button=>button.addEventListener("click",()=>jump(Number(button.dataset.demoJump))));
 function download(name:string,text:string){const url=URL.createObjectURL(new Blob([text],{type:"text/markdown;charset=utf-8"}));const a=make("a");a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 el("[data-demo-download]").addEventListener("click",event=>{event.preventDefault();download(demo.artifact.filename,demo.artifact.markdown);});
 el("[data-demo-export]").addEventListener("click",()=>{
  const coach=demoCoaching(demo,progress);
  const lines=["# My worked-example practice: "+demo.title,"","This record is demonstration practice, separate from the assigned task and skills passport.","",coach.summary,coach.nextFocus,"","## Chapter record"];
  for(const chapter of demo.steps){const attempt=progress.attempts[chapter.id];lines.push("","### "+chapter.title,"Observed: "+(progress.watched?.includes(chapter.id)?"yes":"no"),"Practised successfully: "+(attempt?.completed?"yes":"no"),"Attempts: "+(attempt?.attempts??0)+"; hints shown: "+(attempt?.hints??0));if(attempt?.lastFeedback)lines.push(attempt.lastFeedback);}
  for(const mode of ["control","watch"] as const){
   const run=fieldRuns[mode];lines.push("","## "+(mode==="control"?"My performed operation":"Demonstrator operation"),"Verified chapters: "+run.verifiedSteps.length+" / "+demo.steps.length,"Handover complete: "+(run.field.delivered?"yes":"no"),...run.field.log.map(line=>"- "+line));
  }
  lines.push("","## Transfer",demo.transfer);download(demo.id+"-my-practice.md",lines.join("\n"));
 });
 el("[data-demo-introduction]").addEventListener("click",()=>{
  stop();progress={...setDemoMode(demo,progress,"watch"),stepIndex:0};fieldRuns.watch=createDemoFieldRun(demo);fieldIndex=0;sendField();introSeen=false;finished=false;phase="introduction";renderStep();requestPlayback();
 });
 el("[data-demo-completion]").addEventListener("click",()=>{
  stop();progress={...setDemoMode(demo,progress,"watch"),stepIndex:demo.steps.length-1};introSeen=true;finished=false;phase="completion";renderStep();showOutcome(false);el<HTMLDetailsElement>(".demo-finished details").open=true;requestPlayback();
 });
 const resetDialog=el<HTMLDialogElement>("[data-demo-reset-dialog]");
 el("[data-demo-reset]").addEventListener("click",()=>{stop();resetDialog.showModal();announce("Playback paused while you decide whether to restart. Keeping this example preserves the current chapter and practice record.");});
 el("[data-demo-reset-cancel]").addEventListener("click",()=>resetDialog.close());
 el("[data-demo-reset-confirm]").addEventListener("click",()=>{stop();progress=createDemoProgress(demo,progress.mode);fieldRuns.watch=createDemoFieldRun(demo);fieldRuns.control=createDemoFieldRun(demo);fieldIndex=0;sendField();cached.clear();introSeen=false;finished=false;phase=progress.mode==="watch"?"introduction":"briefing";renderStep();sendMode();announce("This example has restarted.");resetDialog.close();});
 el("[data-demo-narrate]").addEventListener("click",()=>{
  narrationEnabled=!narrationEnabled;updateAudio();stopSpeech();
  el("[data-demo-audio-status]").textContent=narrationEnabled?"Narration is enabled. It begins with playback; captions stay visible.":"Narration is muted. Captions and the apparatus continue together.";
  if(playing)segment();
 });
 window.addEventListener("mastermind:scene-ready",()=>{sceneReady=true;sendFrame();sendMode();sendField();});
 window.addEventListener("mastermind:field-action",event=>{
  const detail=(event as CustomEvent<{scope:string;action:FieldOperationAction}>).detail;
  if(detail?.scope===fieldScope&&detail.action)dispatchField(detail.action);
 });
 window.addEventListener("mastermind:demo-interact",event=>{
  const id=(event as CustomEvent<{id:string}>).detail?.id;
  if(progress.mode==="watch"){announce("Pause or take control to test this apparatus. "+step().prompt);return;}
  const aliases:Record<string,string>={gear:"gearFollower",driver:"turns",crank:"turns",interlock:"interlock",spring:"spring",cam:"cam",rotate:"orientation",connector:"orientation",power:"powered","toggle-power":"powered"};
  const control=step().controls.find(item=>item.id===(aliases[id]??id));
  if(control?.type==="toggle"){
   changed(control.id,responses[control.id]!==true);renderInputs();announce(control.label+" is now "+(responses[control.id]?"enabled":"disabled")+". Test the result when ready.");return;
  }
  if(control?.type==="number"&&["gearFollower","turns","cam","orientation","level"].includes(control.id)){
   const delta=control.id==="gearFollower"?6:["cam","orientation"].includes(control.id)?90:1;
   const next=Number(responses[control.id]||0)+delta;
   changed(control.id,next>(control.max??100)?control.min??0:next);renderInputs();
   announce(control.label+" adjusted to "+responses[control.id]+(control.unit?" "+control.unit:"")+". Use the number control for a precise setting.");return;
  }
  const direct=Array.from(inputs.querySelectorAll<HTMLElement>("[data-demo-input]")).find(input=>input.dataset.demoInput===(aliases[id]??id));
  const focus=direct??inputs.querySelector<HTMLElement>("input,select,button");
  focus?.focus({preventScroll:false});announce("Apparatus selected. "+step().prompt);
 });
 document.addEventListener("visibilitychange",()=>{if(document.hidden&&(playing)){stop();announce("Playback paused while you were away.");}});
 let printDetails:HTMLDetailsElement[]=[];
 window.addEventListener("beforeprint",()=>{
  stop();
  if(!printDetails.length){printDetails=Array.from(root.querySelectorAll<HTMLDetailsElement>("details:not([open])"));printDetails.forEach(details=>details.open=true);}
 });
 window.addEventListener("afterprint",()=>{printDetails.forEach(details=>details.open=false);printDetails=[];});
 window.addEventListener("pagehide",()=>stop());
 root.querySelectorAll<HTMLButtonElement>("button[data-demo-watch],button[data-demo-control],button[data-demo-play],button[data-demo-next],button[data-demo-previous],button[data-demo-replay],button[data-demo-hint],button[data-demo-jump],button[data-demo-download],button[data-demo-export],button[data-demo-reset],button[data-demo-introduction],button[data-demo-completion]").forEach(button=>button.disabled=false);
 if(progress.mode==="control")phase="briefing";
 renderStep();sendMode();sendField();el("[data-demo-audio-status]").textContent=speechAvailable()?"Narration starts when you choose Watch or Play. You can mute it at any time.":"This browser has no device narration. The complete captions are available and will play with the scene.";
 announce(progress.mode==="control"?"Choose your coaching style and try the first decision.":"Ready. Watch the worked example, or take control to practise.");
}
for(const root of document.querySelectorAll<HTMLElement>("[data-demo-id]"))try{mount(root);}catch(error){const status=root.querySelector("[data-demo-status]");if(status)status.textContent="The interactive demonstration could not start. The full transcript and completed example remain available below.";console.error(error);}