import type {Page} from '@playwright/test';
export interface MockSpeechState {
  spoken:string[]; cancelled:number; speaking:boolean; pending:boolean;
  frames:{phase:string;stepId:string}[];
  finish:()=>void; fail:()=>void; finishCancelled:()=>void;
}
export type SpeechWindow=Window&{__demoSpeechMock:MockSpeechState};
export async function installSpeechMock(page:Page,options:{autoEndMs?:number;stall?:boolean}={}){
 await page.addInitScript(config=>{
  type U={text:string;rate:number;lang:string;voice:unknown;onstart:(()=>void)|null;onend:(()=>void)|null;onerror:((event:unknown)=>void)|null;onboundary:(()=>void)|null};
  class Utterance implements U {
   rate=1;lang='';voice:unknown=null;onstart:(()=>void)|null=null;onend:(()=>void)|null=null;onerror:((event:unknown)=>void)|null=null;onboundary:(()=>void)|null=null;
   constructor(public text:string){}
  }
  let current:U|undefined,cancelled:U|undefined;
  const state={
   spoken:[] as string[],cancelled:0,speaking:false,pending:false,frames:[] as {phase:string;stepId:string}[],
   finish(){const utterance=current;if(!utterance)return;current=undefined;state.speaking=false;state.pending=false;utterance.onend?.();},
   fail(){const utterance=current;current=undefined;state.speaking=false;state.pending=false;utterance?.onerror?.({error:'voice-unavailable'});},
   finishCancelled(){cancelled?.onend?.();}
  };
  const synth={
   get speaking(){return state.speaking;},get pending(){return state.pending;},
   getVoices(){return [];},
   speak(utterance:U){current=utterance;state.spoken.push(utterance.text);state.pending=false;if(config.stall)return;state.speaking=true;utterance.onstart?.();if(config.autoEndMs!==undefined)setTimeout(()=>{if(current===utterance)state.finish();},config.autoEndMs);},
   cancel(){state.cancelled++;cancelled=current;current=undefined;state.speaking=false;state.pending=false;cancelled?.onerror?.({error:'canceled'});}
  };
  Object.defineProperty(window,'speechSynthesis',{configurable:true,value:synth});
  Object.defineProperty(window,'SpeechSynthesisUtterance',{configurable:true,value:Utterance});
  Object.defineProperty(window,'__demoSpeechMock',{configurable:true,value:state});
  window.addEventListener('mastermind:demo-frame',event=>{const frame=(event as CustomEvent<{phase:string;stepId:string}>).detail;state.frames.push({phase:frame.phase,stepId:frame.stepId});});
 },options);
}
