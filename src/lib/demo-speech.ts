/** One device voice at a time. Playback advances on spoken completion, not an estimate. */
let activeSpeech: {cancel:()=>void; interrupt:()=>void}|undefined;
export function speechAvailable():boolean {
  try{return typeof window!=="undefined"&&Boolean(window.speechSynthesis)&&typeof SpeechSynthesisUtterance!=="undefined";}catch{return false;}
}
export function createDemoNarrator(interrupted:()=>void){
  let generation=0,watchdog:ReturnType<typeof setInterval>|undefined;
  const session={cancel,interrupt:interrupted};
  function cancel(){
    generation++;
    if(watchdog)clearInterval(watchdog);watchdog=undefined;
    if(activeSpeech===session){activeSpeech=undefined;if(speechAvailable())try{window.speechSynthesis.cancel();}catch{}}
  }
  function speak(text:string,rate:number,done:()=>void,unavailable:(reason:string)=>void){
    cancel();
    if(!speechAvailable()){unavailable("This browser has no device narration. The complete captions will play instead.");return;}
    if(activeSpeech){const prior=activeSpeech;prior.cancel();prior.interrupt();}
    activeSpeech=session;
    const token=generation,synth=window.speechSynthesis;
    // Short utterances permit reliable completion events and recovery on mobile voices.
    // Working speech is never cut off to match the scene's estimated reading duration.
    const sentences=text.trim().split(/(?<=[.!?])\s+(?=[A-Z0-9“])/u);
    const chunks=sentences.flatMap(sentence=>{
      const words=sentence.trim().split(/\s+/),parts:string[]=[];
      for(let i=0;i<words.length;i+=45)parts.push(words.slice(i,i+45).join(" "));
      return parts;
    }).filter(Boolean);
    let index=0;
    const failed=(reason:string)=>{if(token!==generation)return;cancel();unavailable(reason);};
    const next=()=>{
      if(token!==generation||activeSpeech!==session)return;
      if(index>=chunks.length){activeSpeech=undefined;if(watchdog)clearInterval(watchdog);watchdog=undefined;done();return;}
      const chunk=chunks[index++]!,utterance=new SpeechSynthesisUtterance(chunk);
      utterance.lang=document.documentElement.lang||"en-AU";utterance.rate=rate;
      let voices:SpeechSynthesisVoice[]=[];try{voices=synth.getVoices();}catch{}
      const voice=voices.find(v=>v.lang===utterance.lang)||voices.find(v=>v.lang.startsWith("en")&&v.localService)||voices.find(v=>v.lang.startsWith("en"));
      if(voice)utterance.voice=voice;
      let started=false,idleSince=0,lastProgress=Date.now();const issued=lastProgress;
      utterance.onstart=()=>{if(token===generation){started=true;lastProgress=Date.now();}};
      utterance.onboundary=()=>{if(token===generation){started=true;lastProgress=Date.now();}};
      utterance.onend=()=>{if(token!==generation)return;if(watchdog)clearInterval(watchdog);watchdog=undefined;next();};
      utterance.onerror=()=>failed("The device voice could not finish this explanation. Continuing with the complete captions; you can retry narration.");
      watchdog=setInterval(()=>{
        if(token!==generation)return;
        const now=Date.now();
        if(!started&&synth.speaking){started=true;lastProgress=now;}
        if(!started&&now-issued>5000){failed("The device voice did not start. Continuing with captions; select Enable narration to retry.");return;}
        if(started&&!synth.speaking&&!synth.pending){idleSince||=now;if(now-idleSince>1500){failed("The device voice stopped responding. Continuing with captions; select Enable narration to retry.");return;}}else idleSince=0;
        // A short utterance with no progress for two minutes is a failed voice, not a timed scene transition.
        if(now-lastProgress>120000)failed("The device voice stalled. Continuing with captions; select Enable narration to retry.");
      },500);
      try{synth.speak(utterance);}catch{failed("This device could not start narration. The complete captions will play instead.");}
    };
    next();
  }
  return {speak,cancel};
}
