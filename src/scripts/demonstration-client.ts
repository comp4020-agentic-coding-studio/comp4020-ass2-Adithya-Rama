import type {Demonstration, DemoValue, DemoFrame} from "../lib/demonstration-types";
import {createDemoProgress,checkDemoStep,applyDemoAttempt,advanceDemo,demoCoaching,useDemoHint,setDemoMode,markDemoWatched,assertDemo} from "../lib/demonstration-engine";

function mount(root:HTMLElement){
 if(root.dataset.demoMounted)return;root.dataset.demoMounted="true";
 const demo=JSON.parse(root.querySelector<HTMLScriptElement>("[data-demo-definition]")!.textContent!) as Demonstration;
 assertDemo(demo);
 const el=<T extends HTMLElement=HTMLElement>(selector:string)=>root.querySelector<T>(selector)!;
 const make=<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;return node;};
 const modeFromUrl=new URLSearchParams(location.search).get("mode")==="control"?"control":"watch";
 let progress=createDemoProgress(demo,modeFromUrl);
 let responses:Record<string,DemoValue>={};const cached=new Map<string,Record<string,DemoValue>>();
 let playing=false,pending=false,shownAfter=false,elapsed=0,last=0,frame=0,lastBroadcast=0,waiting:ReturnType<typeof setTimeout>|undefined;
 let speed=1,coaching="guided",sceneReady=false,narrationEnabled=false;
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
 }
 function stopSpeech(){if("speechSynthesis" in window)window.speechSynthesis.cancel();}
 function narrate(text:string){if(!narrationEnabled||!playing||!("speechSynthesis" in window))return;stopSpeech();const utterance=new SpeechSynthesisUtterance(text);utterance.rate=.9*speed;window.speechSynthesis.speak(utterance);}
 function stop(){
  playing=false;pending=false;if(waiting)clearTimeout(waiting);cancelAnimationFrame(frame);stopSpeech();sendMode();updateTransport();
 }
 function updateTransport(){
  root.dataset.mode=progress.mode;
  el<HTMLButtonElement>("[data-demo-play]").textContent=pending?"Cancel opening":playing?"Pause":"Play";
  el<HTMLButtonElement>("[data-demo-previous]").disabled=progress.stepIndex===0;
  el<HTMLButtonElement>("[data-demo-next]").disabled=progress.stepIndex===demo.steps.length-1||(progress.mode==="control"&&!progress.attempts[step().id]?.completed);
  el<HTMLButtonElement>("[data-demo-watch]").setAttribute("aria-pressed",String(progress.mode==="watch"));
  el<HTMLButtonElement>("button[data-demo-control]").setAttribute("aria-pressed",String(progress.mode==="control"));
  el("[data-demo-mode-label]").textContent=progress.mode==="watch"?"Watch the reasoning and apparatus. Take control at any point.":"You control this example. Test a decision to see its consequences.";
  form.hidden=progress.mode!=="control";el("[data-demo-watch-note]").hidden=progress.mode==="control";
  el("[data-demo-progress-bar]").style.width=((progress.stepIndex+elapsed/duration())/demo.steps.length*100)+"%";
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
  renderInputs();updateTransport();sendFrame();
  if(focus){const heading=el("[data-demo-step-title]");heading.tabIndex=-1;heading.focus({preventScroll:true});}
 }
 function showHint(){
  progress=useDemoHint(demo,progress);el("[data-demo-hint-text]").hidden=false;el("[data-demo-hint-text]").textContent=step().hint;updateTransport();
 }
 function showOutcome(watched=false){
  shownAfter=true;if(watched)progress=markDemoWatched(demo,progress);
  actionSummary();el("[data-demo-caption]").textContent=step().success;sendFrame();updateTransport();if(watched)narrate(step().success);
 }
 const tick=(now:number)=>{
  if(!playing)return;
  const dt=Math.min(200,now-last);last=now;elapsed+=dt*speed;
  if(elapsed>=beforeDuration()&&!shownAfter)showOutcome(true);
  if(elapsed>=duration()){
   progress=markDemoWatched(demo,progress);
   if(progress.stepIndex===demo.steps.length-1){elapsed=duration();stop();announce("The demonstration has finished. Open the completed example below, or take control and practise the decisions yourself.");updateTransport();return;}
   progress=advanceDemo(demo,progress);renderStep();narrate(step().narration);announce("Chapter "+(progress.stepIndex+1)+": "+step().title);
  }
  if(now-lastBroadcast>120){sendFrame();updateTransport();lastBroadcast=now;}
  frame=requestAnimationFrame(tick);
 };
 function beginPlayback(){
  pending=false;if(waiting)clearTimeout(waiting);playing=true;last=performance.now();sendMode();updateTransport();narrate(shownAfter?step().success:step().narration);announce("Playing chapter "+(progress.stepIndex+1)+". Pause, inspect or take control whenever you like.");frame=requestAnimationFrame(tick);
 }
 function requestPlayback(){
  el(".demo-theatre").scrollIntoView({block:"start",behavior:"instant"});
  stop();progress=setDemoMode(demo,progress,"watch");sendMode();updateTransport();
  if(progress.stepIndex===demo.steps.length-1&&elapsed>=duration()){progress={...progress,stepIndex:0};renderStep();}
  if(sceneReady){beginPlayback();return;}
  const launch=el<HTMLButtonElement>("[data-world-launch]");
  if(!launch.disabled)launch.click();
  pending=true;updateTransport();announce("Opening the 3D demonstration. The transcript remains available.");
  waiting=setTimeout(()=>{if(!pending)return;beginPlayback();announce("Playing the guided steps. If graphics are still loading, the same decisions and results remain visible in the transcript and apparatus controls.");},8000);
 }
 el("[data-demo-watch]").addEventListener("click",()=>{if(progress.mode!=="watch"){progress=setDemoMode(demo,progress,"watch");renderStep();}requestPlayback();});
 el("[data-demo-play]").addEventListener("click",()=>{if(playing||pending){stop();announce("Paused. Inspect the current decision or take control.");}else requestPlayback();});
 el("button[data-demo-control]").addEventListener("click",()=>{
  stop();progress=setDemoMode(demo,progress,"control");renderStep();sendMode();
  if(!sceneReady&&!el<HTMLButtonElement>("[data-world-launch]").disabled)el<HTMLButtonElement>("[data-world-launch]").click();
  announce("Your turn. "+step().prompt);inputs.querySelector<HTMLElement>("input,select,button")?.focus({preventScroll:true});
 });
 form.addEventListener("submit",event=>{
  event.preventDefault();if(progress.mode!=="control")return;
  const result=checkDemoStep(step(),responses);progress=applyDemoAttempt(demo,progress,responses);
  feedback.textContent=result.feedback;feedback.dataset.correct=String(result.correct);
  inputs.querySelectorAll<HTMLElement>("[data-demo-field]").forEach(field=>{const correct=result.fields[field.dataset.demoField!];field.querySelector("input,select")?.setAttribute("aria-invalid",String(correct===false));});
  if(result.correct){elapsed=duration();showOutcome();announce(progress.completed?"You have practised every chapter. Review your personal record and transfer the method to the assigned task.":"Decision demonstrated. Read the result, then continue when ready.");}
  else{
   shownAfter=false;sendFrame();
   if(coaching==="guided"&&(progress.attempts[step().id]?.attempts??0)>=2)showHint();
   announce("There is something to investigate. The feedback names the part to reconsider.");
  }
  updateTransport();
 });
 el("[data-demo-hint]").addEventListener("click",showHint);
 el<HTMLSelectElement>("[data-demo-coaching]").addEventListener("change",event=>{coaching=(event.target as HTMLSelectElement).value;el<HTMLDetailsElement>("[data-demo-why]").open=coaching==="guided";announce(coaching==="guided"?"The coach explains each step and offers a cue after repeated difficulty.":"Try each decision first. Explanations and hints remain available whenever you want them.");});
 el<HTMLSelectElement>("[data-demo-speed]").addEventListener("change",event=>{speed=Number((event.target as HTMLSelectElement).value);});
 function jump(index:number){stop();progress={...progress,stepIndex:Math.max(0,Math.min(demo.steps.length-1,index))};renderStep(true);sendMode();announce("Chapter "+(progress.stepIndex+1)+". "+step().prompt);}
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
  lines.push("","## Transfer",demo.transfer);download(demo.id+"-my-practice.md",lines.join("\n"));
 });
 el("[data-demo-reset]").addEventListener("click",()=>{if(!window.confirm("Restart this worked example and clear its practice record for this visit? Your course passport and assigned activities stay saved."))return;stop();progress=createDemoProgress(demo,progress.mode);cached.clear();renderStep();sendMode();announce("This example has restarted.");});
 if("speechSynthesis" in window){
  const speech=el<HTMLButtonElement>("[data-demo-narrate]");speech.hidden=false;
  speech.textContent="Turn narration on";speech.setAttribute("aria-pressed","false");speech.addEventListener("click",()=>{narrationEnabled=!narrationEnabled;speech.setAttribute("aria-pressed",String(narrationEnabled));speech.textContent=narrationEnabled?"Turn narration off":"Turn narration on";if(narrationEnabled)narrate(shownAfter?step().success:step().narration);else stopSpeech();announce(narrationEnabled?"Device narration is enabled during playback. Captions remain visible.":"Narration is off. Captions remain visible.");});
 }
 window.addEventListener("mastermind:scene-ready",()=>{sceneReady=true;sendFrame();sendMode();if(pending)beginPlayback();});
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
 document.addEventListener("visibilitychange",()=>{if(document.hidden&&(playing||pending)){stop();announce("Playback paused while you were away.");}});
 let printDetails:HTMLDetailsElement[]=[];
 window.addEventListener("beforeprint",()=>{
  stop();
  if(!printDetails.length){printDetails=Array.from(root.querySelectorAll<HTMLDetailsElement>("details:not([open])"));printDetails.forEach(details=>details.open=true);}
 });
 window.addEventListener("afterprint",()=>{printDetails.forEach(details=>details.open=false);printDetails=[];});
 window.addEventListener("pagehide",()=>stop());
 root.querySelectorAll<HTMLButtonElement>("button[data-demo-watch],button[data-demo-control],button[data-demo-play],button[data-demo-next],button[data-demo-previous],button[data-demo-replay],button[data-demo-hint],button[data-demo-jump],button[data-demo-download],button[data-demo-export],button[data-demo-reset]").forEach(button=>button.disabled=false);
 renderStep();sendMode();announce(progress.mode==="control"?"Choose your coaching style and try the first decision.":"Ready. Watch the worked example, or take control to practise.");
}
for(const root of document.querySelectorAll<HTMLElement>("[data-demo-id]"))try{mount(root);}catch(error){const status=root.querySelector("[data-demo-status]");if(status)status.textContent="The interactive demonstration could not start. The full transcript and completed example remain available below.";console.error(error);}
