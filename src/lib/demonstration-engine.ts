import type {Demonstration,DemoStep,DemoControl,DemoValue,DemoProgress,DemoAttempt,DemoCheckResult} from './demonstration-types';

export type DemoResponses=Record<string,unknown>;
export interface DemoCoaching {
 summary:string; nextFocus:string; completedSteps:number; independentSteps:number;
 watchedSteps:number; hintsUsed:number; attempts:number;
}
const normal=(value:string)=>value.normalize('NFKC').trim().toLocaleLowerCase('en').replace(/\s+/g,' ');
const copy=<T>(value:T):T=>structuredClone(value);
function numeric(value:unknown):number|null {
 if(typeof value==='number')return Number.isFinite(value)?value:null;
 if(typeof value!=='string'||!value.trim()||! /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(value.trim()))return null;
 const result=Number(value);return Number.isFinite(result)?result:null;
}
function invariant(condition:unknown,message:string):asserts condition {if(!condition)throw new Error(message);}
function assertControl(control:DemoControl,stepId:string):void {
 invariant(typeof control.id==='string'&&control.id.trim().length>0,'A control in '+stepId+' needs an identifier.');
 invariant(['select','number','text','toggle','order'].includes(control.type),'Unknown control type in '+stepId+'.');
 invariant(typeof control.label==='string'&&control.label.trim().length>0,'A control in '+stepId+' needs a label.');
 if(control.type==='number'){
  invariant(typeof control.expected==='number'&&Number.isFinite(control.expected),'Numeric answer '+control.id+' must be finite.');
  invariant(typeof control.min==='number'&&Number.isFinite(control.min)&&typeof control.max==='number'&&Number.isFinite(control.max)&&control.min<=control.max,'Numeric control '+control.id+' needs finite minimum and maximum bounds.');
  invariant(control.expected>=control.min&&control.expected<=control.max,'Numeric answer '+control.id+' is outside its bounds.');
  invariant(control.tolerance===undefined||(Number.isFinite(control.tolerance)&&control.tolerance>=0),'Numeric tolerance for '+control.id+' must be finite and non-negative.');
 }else if(control.type==='toggle')invariant(typeof control.expected==='boolean','Toggle answer '+control.id+' must be boolean.');
 else if(control.type==='order'){
  invariant(Array.isArray(control.expected)&&control.expected.length>0&&control.expected.every(item=>typeof item==='string'&&item.length>0),'Ordered answer '+control.id+' needs a non-empty list of item identifiers.');
  if(control.initial!==undefined){
   invariant(Array.isArray(control.initial)&&control.initial.every(item=>typeof item==='string'),'Initial order '+control.id+' must be a list.');
   invariant([...control.initial].sort().join('\u0000')===[...control.expected].sort().join('\u0000'),'Initial order '+control.id+' must contain the expected items.');
  }
 }else invariant(typeof control.expected==='string','Text/select answer '+control.id+' must be a string.');
 if(control.type==='select'){
  invariant(Array.isArray(control.options)&&control.options.length>0,'Select control '+control.id+' needs options.');
  invariant(control.options.some(option=>option.value===control.expected),'Select answer '+control.id+' is not an option.');
 }
 if(control.options){
  invariant(control.options.every(option=>typeof option.value==='string'&&typeof option.label==='string'),'Options for '+control.id+' need string values and labels.');
  invariant(new Set(control.options.map(option=>option.value)).size===control.options.length,'Duplicate option identifiers in '+control.id+'.');
  if(control.type==='order')invariant((control.expected as string[]).every(item=>control.options!.some(option=>option.value===item)),'Ordered answer '+control.id+' refers to an unknown item.');
 }
 if(control.aliases)invariant(control.aliases.every(alias=>typeof alias==='string'),'Aliases for '+control.id+' must be strings.');
}
function assertStep(step:DemoStep):void {
 invariant(typeof step.id==='string'&&step.id.trim().length>0,'Every example step needs an identifier.');
 invariant(Array.isArray(step.controls)&&step.controls.length>0,'Step '+step.id+' must have a learner control.');
 invariant(new Set(step.controls.map(control=>control.id)).size===step.controls.length,'Duplicate control identifiers in '+step.id+'.');
 step.controls.forEach(control=>assertControl(control,step.id));
 invariant(Number.isFinite(step.duration)&&step.duration>0,'Step '+step.id+' needs a positive playback duration.');
}
/** Validate authored content before a demonstration is presented or tested. */
export function assertDemo(demo:Demonstration):void {
 invariant(demo&&typeof demo==='object'&&typeof demo.id==='string'&&demo.id.trim().length>0,'The demonstration needs an identifier.');
 invariant(['lab','assessment'].includes(demo.kind),'Unknown demonstration kind.');
 invariant(Array.isArray(demo.steps)&&demo.steps.length>0&&demo.steps.length<=100,'The demonstration needs between one and 100 steps.');
 invariant(new Set(demo.steps.map(step=>step.id)).size===demo.steps.length,'Duplicate step identifiers in '+demo.id+'.');
 demo.steps.forEach(assertStep);
}
function assertProgress(demo:Demonstration,progress:DemoProgress):void {
 assertDemo(demo);
 invariant(progress.demoId===demo.id,'This progress belongs to another demonstration.');
 invariant(Number.isInteger(progress.stepIndex)&&progress.stepIndex>=0&&progress.stepIndex<demo.steps.length,'The demonstration step is out of range.');
 invariant(progress.mode==='watch'||progress.mode==='control','Unknown demonstration mode.');
 invariant(progress.attempts&&typeof progress.attempts==='object'&&!Array.isArray(progress.attempts),'The attempt history is malformed.');
 for(const [id,attempt]of Object.entries(progress.attempts)){
  const step=demo.steps.find(item=>item.id===id);
  invariant(step&&attempt.stepId===id,'An attempt refers to an unknown step.');
  invariant(Number.isInteger(attempt.attempts)&&attempt.attempts>=0&&Number.isInteger(attempt.hints)&&attempt.hints>=0,'Attempt and hint counts must be non-negative integers.');
  invariant(typeof attempt.completed==='boolean'&&typeof attempt.lastFeedback==='string','The attempt result is malformed.');
  if(attempt.lastIncorrect)invariant(Array.isArray(attempt.lastIncorrect)&&attempt.lastIncorrect.every(key=>step.controls.some(control=>control.id===key)),'An attempt refers to an unknown control.');
 }
 if(progress.watched)invariant(Array.isArray(progress.watched)&&new Set(progress.watched).size===progress.watched.length&&progress.watched.every(id=>demo.steps.some(step=>step.id===id)),'Watched progress refers to an unknown or repeated step.');
}
function currentAttempt(demo:Demonstration,progress:DemoProgress):DemoAttempt {
 const step=demo.steps[progress.stepIndex]!;
 return progress.attempts[step.id]??{stepId:step.id,attempts:0,hints:0,completed:false,lastFeedback:'',lastIncorrect:[],independent:false};
}
function updateCompletion(demo:Demonstration,progress:DemoProgress):DemoProgress {
 progress.completed=demo.steps.every(step=>progress.attempts[step.id]?.completed===true);
 return progress;
}
export function createDemoProgress(demo:Demonstration,mode:'watch'|'control'='watch'):DemoProgress {
 assertDemo(demo);invariant(mode==='watch'||mode==='control','Unknown demonstration mode.');
 return {demoId:demo.id,stepIndex:0,mode,attempts:{},completed:false,watched:[]};
}
export function restartDemo(demo:Demonstration,mode:'watch'|'control'='watch'):DemoProgress {return createDemoProgress(demo,mode);}
export function demoExpectedResponses(step:DemoStep):Record<string,DemoValue> {
 assertStep(step);return Object.fromEntries(step.controls.map(control=>[control.id,copy(control.expected)]));
}
function checkControl(control:DemoControl,response:unknown):{correct:boolean;reason:string} {
 if(control.type==='number'){
  const value=numeric(response);
  if(value===null)return {correct:false,reason:control.label+': enter a finite number without unit text.'};
  if(value<control.min!||value>control.max!)return {correct:false,reason:control.label+': '+value+' is outside the allowed '+control.min+'–'+control.max+' range.'};
  const expected=control.expected as number,tolerance=control.tolerance??0;
  const correct=Math.abs(value-expected)<=tolerance+Number.EPSILON*Math.max(1,Math.abs(value),Math.abs(expected));
  return {correct,reason:correct?'':control.label+': your value '+value+(control.unit?' '+control.unit:'')+' does not match the stated target'+(tolerance?' within '+tolerance+' tolerance':'')+'.'};
 }
 if(control.type==='toggle')return {correct:typeof response==='boolean'&&response===control.expected,reason:control.label+': check whether this condition should be enabled or disabled.'};
 if(control.type==='order'){
  const expected=control.expected as string[];
  const correct=Array.isArray(response)&&response.length===expected.length&&response.every((item,index)=>typeof item==='string'&&item===expected[index]);
  if(correct)return {correct:true,reason:''};
  if(!Array.isArray(response)||response.length!==expected.length)return {correct:false,reason:control.label+': include all '+expected.length+' steps exactly once in the supplied sequence.'};
  const first=response.findIndex((item,index)=>item!==expected[index]);
  return {correct:false,reason:control.label+': reconsider position '+(first+1)+' and the dependency immediately before it.'};
 }
 const accepted=[control.expected as string,...control.aliases??[]].map(normal);
 const correct=typeof response==='string'&&accepted.includes(normal(response));
 return {correct,reason:control.label+': your response does not yet match the condition described in this step.'};
}
/** Checks values against authored answers; never evaluates expressions or source code. */
export function checkDemoStep(step:DemoStep,responses:DemoResponses):DemoCheckResult {
 assertStep(step);
 const supplied=responses&&typeof responses==='object'&&!Array.isArray(responses)?responses:{};
 const fields:Record<string,boolean>=Object.create(null);const reasons:string[]=[];
 for(const control of step.controls){const result=checkControl(control,supplied[control.id]);fields[control.id]=result.correct;if(!result.correct)reasons.push(result.reason);}
 const extra=Object.keys(supplied).filter(id=>!step.controls.some(control=>control.id===id));
 if(extra.length)reasons.push('Unexpected response fields: '+extra.join(', ')+'. Use only this step’s controls.');
 const correct=Object.values(fields).every(Boolean)&&extra.length===0;
 return {correct,fields,feedback:correct?step.success+' '+step.why:reasons.join(' ')+' '+step.pitfall};
}
export function applyDemoAttempt(demo:Demonstration,progress:DemoProgress,responses:DemoResponses):DemoProgress {
 assertProgress(demo,progress);const next=copy(progress);
 // Observing the worked answer never creates a learner completion record.
 if(next.mode!=='control')return next;
 const step=demo.steps[next.stepIndex]!,result=checkDemoStep(step,responses),previous=currentAttempt(demo,next);
 next.attempts[step.id]={...previous,attempts:previous.attempts+1,completed:result.correct,lastFeedback:result.feedback,
  lastIncorrect:Object.entries(result.fields).filter(([,correct])=>!correct).map(([id])=>id),
  independent:result.correct&&previous.hints===0&&!next.watched?.includes(step.id)};
 return updateCompletion(demo,next);
}
export function useDemoHint(demo:Demonstration,progress:DemoProgress):DemoProgress {
 assertProgress(demo,progress);const next=copy(progress),step=demo.steps[next.stepIndex]!,attempt=currentAttempt(demo,next);
 next.attempts[step.id]={...attempt,hints:attempt.hints+1,lastFeedback:attempt.attempts?attempt.lastFeedback:step.hint};
 return next;
}
export function markDemoWatched(demo:Demonstration,progress:DemoProgress):DemoProgress {
 assertProgress(demo,progress);const next=copy(progress),id=demo.steps[next.stepIndex]!.id;
 next.watched=Array.from(new Set([...(next.watched??[]),id]));
 return updateCompletion(demo,next);
}
export function setDemoMode(demo:Demonstration,progress:DemoProgress,mode:'watch'|'control'):DemoProgress {
 assertProgress(demo,progress);invariant(mode==='watch'||mode==='control','Unknown demonstration mode.');
 return {...copy(progress),mode};
}
export function advanceDemo(demo:Demonstration,progress:DemoProgress):DemoProgress {
 assertProgress(demo,progress);const next=copy(progress),step=demo.steps[next.stepIndex]!;
 if(next.mode==='control'&&!next.attempts[step.id]?.completed)return next;
 next.stepIndex=Math.min(next.stepIndex+1,demo.steps.length-1);
 return updateCompletion(demo,next);
}
export function demoCoaching(demo:Demonstration,progress:DemoProgress):DemoCoaching {
 assertProgress(demo,progress);
 const entries=Object.values(progress.attempts),completedSteps=entries.filter(item=>item.completed).length;
 const independentSteps=entries.filter(item=>item.completed&&item.independent).length;
 const hintsUsed=entries.reduce((sum,item)=>sum+item.hints,0),attempts=entries.reduce((sum,item)=>sum+item.attempts,0),watchedSteps=progress.watched?.length??0;
 const current=demo.steps[progress.stepIndex]!;
 const unresolved=demo.steps.filter(step=>!progress.attempts[step.id]?.completed);
 const focus=unresolved.find(step=>step.id===current.id&&progress.attempts[step.id]?.attempts)||unresolved.find(step=>(progress.attempts[step.id]?.lastIncorrect?.length??0)>0)||unresolved[0];
 let nextFocus:string;
 if(!focus)nextFocus=demo.transfer+' Your worked-example record remains separate from the course assessment.';
 else {
  const attempt=progress.attempts[focus.id],wrong=attempt?.lastIncorrect?.map(id=>focus.controls.find(control=>control.id===id)!.label)??[];
  nextFocus=wrong.length?'Return to “'+focus.title+'” and focus on '+wrong.join(', ')+'. '+focus.pitfall:
   attempt?.hints?'Retry “'+focus.title+'” with the hint closed, and explain why your settings satisfy the condition.':
   'Take control of “'+focus.title+'” and predict the result before showing the worked answer.';
 }
 const summary=attempts?completedSteps+' of '+demo.steps.length+' steps solved through your controls across '+attempts+' attempts; '+independentSteps+' solved before showing a playback result or hint.':
  watchedSteps?'You watched '+watchedSteps+' of '+demo.steps.length+' steps. No control attempt has been recorded.':
  'Choose watch mode for a worked explanation or take control to try the example yourself.';
 return {summary,nextFocus,completedSteps,independentSteps,watchedSteps,hintsUsed,attempts};
}
