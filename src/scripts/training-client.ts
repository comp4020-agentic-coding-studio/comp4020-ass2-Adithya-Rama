import {
  applyTraining, applyTrainingField, trainingMissionComplete, archiveFiles, councilClaims, createTraining, handoffTarget, loci, mechanismConfig,
  memoryItems, observationFacts, phases, policyActions, policyRoles, rotatedPorts, sensorCells,
  spatialTarget, validTraining, type TrainingAction, type TrainingPhase, type Value,
} from '../lib/training-engine';
import { labGuides, labMilestones } from '../data/learner-guidance';
import { passport } from './passport-client';
import { completedRecoverySupportsLab } from '../lib/lab-recovery';
import { labOperation, labOperations } from '../data/lab-operations';
import { createFieldOperation, type FieldOperationAction } from '../lib/field-operation';
import { renderFieldOperation, broadcastFieldOperation } from './field-operation-view';

function mount(root:HTMLElement) {
  if(root.dataset.mounted)return;root.dataset.mounted='true';
  const week=Number(root.dataset.trainingWeek);
  let state=createTraining(week);let hint=0;let restoreApplied=false;
  const bench=root.querySelector<HTMLElement>('[data-training-controls]')!;
  const feedback=root.querySelector<HTMLElement>('[data-training-feedback]')!;
  const result=root.querySelector<HTMLElement>('[data-training-result]')!;
  const reflection=root.querySelector<HTMLTextAreaElement>('[data-training-reflection]')!;
  const trace=root.querySelector<HTMLOListElement>('[data-training-trace]')!;
  const saveStatus=root.querySelector<HTMLElement>('[data-training-save-status]')!;
  const phaseLabels={practice:'Practice',check:'Skill check',transfer:'Transfer challenge'};
  const node=<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string,className?:string)=>{
    const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(className)el.className=className;return el;
  };
  let checksThisPhase=0;let hintsThisVisit=0;
  const guide=labGuides[week]!;
  const hasCompletedRecovery=()=>completedRecoverySupportsLab(passport.getMission('recovery'));
  const operationScope='lab:'+week;
  const fieldAct=(action:FieldOperationAction)=>{
    if(week===12&&!hasCompletedRecovery())state=applyTraining(state,{type:'test'},{recoveryComplete:false});
    state=applyTrainingField(state,action);sync();checkpoint();
  };
  function updateField(){
    const spec=labOperation(week,state.phase);
    state.field??=createFieldOperation(spec);
    renderFieldOperation(root,spec,state.field,fieldAct);
    broadcastFieldOperation(operationScope,spec,state.field);
  }
  function updateGuidance(){
    const milestones=labMilestones(state);
    if(week===12)milestones[0]=hasCompletedRecovery();
    const nextIndex=milestones.findIndex(done=>!done);
    const next=root.querySelector<HTMLElement>('[data-lab-next]')!;
    const nextText=trainingMissionComplete(state)
      ? 'Mission accomplished. Open After playing below, explain the attempt and select Record attempt in skills passport before changing phase. '+(state.phase==='transfer'?'You can then export your learning record.':state.phase==='practice'?'Next, use Skill check to test your method against its published conditions.':'Next, try Transfer challenge with its changed conditions.')
      : state.complete?'The skill is verified. Return to Field operation above, enact the intervention and follow its checkpoints to finish the mission.':guide.steps[nextIndex<0?guide.steps.length-1:nextIndex]!.action;
    if(next.textContent!==nextText)next.textContent=nextText;
    root.querySelector<HTMLElement>('[data-guidance-phase]')!.textContent=phaseLabels[state.phase];
    root.querySelectorAll<HTMLElement>('[data-lab-step]').forEach((entry,i)=>{
      entry.dataset.completed=String(Boolean(milestones[i]));
      if(i===nextIndex&&!state.complete)entry.setAttribute('aria-current','step');else entry.removeAttribute('aria-current');
    });
    const after=root.querySelector<HTMLElement>('[data-immersive-reflection]')!;
    after.dataset.ready=String(trainingMissionComplete(state));
    const afterMessage=root.querySelector<HTMLElement>('[data-lab-after-message]')!;
    afterMessage.textContent=trainingMissionComplete(state)
      ? 'The mission consequence and receiver acknowledgement are recorded. Now explain your attempt and save it before changing phase. Mention any scene reopening, examples or hints you used.'
      : 'Finish the practical attempt first. Then record what you noticed, what changed and any help you used. You can also preserve an unfinished attempt.';
  }
  const coach=node('aside',undefined,'training-coaching');
  coach.setAttribute('aria-label','Your practice focus');
  const coachTitle=node('h3','Your practice focus');
  const coachStats=node('p',undefined,'small');
  const coachNext=node('p');
  coach.append(coachTitle,coachStats,coachNext);
  root.querySelector('.training-feedback')!.after(coach);
  function updateCoaching(){
    coachStats.textContent=checksThisPhase+' checks in this phase visit · '+hintsThisVisit+' hints opened this visit. These are practice observations, not marks.';
    const v=state.values;
    let next='Make one prediction, test it, then use the observed result to decide what to change. No attempt has been diagnosed yet.';
    if(state.complete&&!trainingMissionComplete(state))next='Your equipment check passed. Apply its result at the mission station, carry the resulting evidence through the indicated checkpoints and confirm the handover.';
    else if(trainingMissionComplete(state))next=week>=11?'Your account is ready for human review. Check it against the actual run and preserve a credible alternative.':
      state.phase==='transfer'?'You met this changed configuration. Explain which rule transferred and which details needed a new decision.':
      'You met this configuration. Try the '+(state.phase==='practice'?'skill check':'transfer challenge')+' and make a fresh prediction before operating it.';
    else if(checksThisPhase>0){
      next='Use the specific feedback above to revise one choice, then test again. Compare the new result with the previous attempt.';
      if(week===4){
        const target=mechanismConfig(state.phase);
        next=v.interlock?'Your interlock is still engaged. Release it before trying to reposition the cam; changing gears cannot remove this obstruction.':
         !v.spring?'The return spring is missing in your current setup. Attach it and check the cam before applying another input turn.':
         Number(v.cam)!==target.cam?'Your cam is at '+v.cam+'°, while this configuration requires '+target.cam+'°. Reposition it, then test the movement.':
         Math.abs(target.driver/Number(v.gear)*target.inputTurns-target.targetTurns)>.001?'Your '+v.gear+'-tooth follower does not produce the required '+target.targetTurns+' turns. Recalculate the ratio from '+target.driver+' driver teeth and '+target.inputTurns+' input turns.':
         'The mechanism now has the required ratio and support conditions. Check your direction prediction, then turn it once more to verify.';
      }
      if(week===5){
        const poweredReadings=state.actions.filter(a=>a.startsWith('Measured ')&&a.includes('(power on)'));
        next=poweredReadings.length===0?'Your trace has no powered voltage reading. Establish the battery reference before deciding which component to replace.':
         v.repaired&&!v.power?'A replacement is installed, but your supply is still isolated. Restore power and verify both the lamp supply and the lamp output.':
         v.repaired?'Your current load works. Check whether the trace identifies the original fault before replacement; working afterwards alone does not show diagnosis.':
         poweredReadings.some(a=>a.startsWith('Measured lamp: 6 V'))?'Your trace shows 6 V at a dark lamp. That supports a working supply, not a working lamp. Isolate power and test continuity before replacement.':
         'Compare the adjacent readings you actually recorded. Find where 6 V first disappears; isolate the supply before changing that component.';
      }
      if(week===7){
        const mismatches:string[]=[];
        for(const role of policyRoles)for(const action of policyActions){
          const allowed=(action==='read'||role==='technician'&&action==='service'||role==='registrar'&&action==='certify')&&!(state.phase==='transfer'&&role==='technician'&&action==='service');
          if(Boolean(v[role+':'+action])!==allowed)mismatches.push(role+' / '+action);
        }
        next=mismatches.length?'Your current policy still differs on '+mismatches.join(', ')+'. Repair the first mismatch, then rerun all combinations so a correction does not remove legitimate access.':
          'Your current matrix matches the mandate. Run the complete check to verify both allowed and forbidden actions.';
      }
      if(week===10)next=Number(v.position)!==4?'Your route currently ends at row '+(Math.floor(Number(v.position)/5)+1)+', column '+(Number(v.position)%5+1)+'. Continue or revise it toward row 1, column 5 before comparing contacts.':
        'You reached the destination with '+v.detected+' recorded sensor contacts. Compare that count with your prediction, and locate the first entry your prediction missed.';
    }
    coachNext.textContent=next;
  }

  const dispatch=()=>{
    window.dispatchEvent(new CustomEvent('mastermind:scene-state',{detail:{week,kind:'training',phase:state.phase,values:state.values,sequence:state.sequence,inspected:state.inspected,feedback:state.feedback,complete:state.complete,field:state.field}}));
  };
  const sync=()=>{
    feedback.textContent=state.feedback;
    result.textContent=trainingMissionComplete(state)?'Mission accomplished':state.complete?'Skill verified · enact your mission intervention':'Investigation in progress';
    result.dataset.complete=String(trainingMissionComplete(state));
    result.dataset.skillVerified=String(state.complete);
    trace.replaceChildren(...state.actions.slice(-16).map(a=>node('li',a)));
    root.querySelectorAll<HTMLButtonElement>('[data-training-phase]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.trainingPhase===state.phase)));
    updateCoaching();updateGuidance();updateField();dispatch();
  };
  const checkpoint=()=>window.dispatchEvent(new CustomEvent('mastermind:checkpoint',{detail:{week,state:structuredClone(state),reflection:reflection.value}}));
  const act=(action:TrainingAction)=>{const focusKey=bench.contains(document.activeElement)?(document.activeElement as HTMLElement)?.dataset.trainingAction:undefined;if(action.type==='test'||action.type==='crank')checksThisPhase++;state=applyTraining(state,action,{recoveryComplete:hasCompletedRecovery()});render();sync();checkpoint();if(focusKey)Array.from(bench.querySelectorAll<HTMLButtonElement>('[data-training-action]')).find(b=>b.dataset.trainingAction===focusKey)?.focus({preventScroll:true});};
  const p=(text:string,parent:HTMLElement=bench)=>parent.append(node('p',text));
  const button=(text:string,action:TrainingAction,parent:HTMLElement=bench)=>{
    const b=node('button',text);b.type='button';b.dataset.trainingAction=action.type+':'+(action.key??'');b.addEventListener('click',()=>act(action));parent.append(b);return b;
  };
  const group=(title:string)=>{const f=node('fieldset');f.append(node('legend',title));bench.append(f);return f;};
  const select=(title:string,key:string,options:{value:string;label:string}[],parent:HTMLElement=bench)=>{
    const label=node('label',title);const input=node('select');input.name=key;input.id='training-'+week+'-'+key.replace(':','-');
    label.htmlFor=input.id;for(const o of [{value:'',label:'Choose…'},...options]){const option=node('option',o.label);option.value=o.value;input.append(option);}
    input.value=String(state.values[key]??'');input.addEventListener('change',()=>{state=applyTraining(state,{type:'set',key,value:input.value});sync();checkpoint();});
    parent.append(label,input);return input;
  };
  const field=(title:string,key:string,parent:HTMLElement=bench,multiline=false)=>{
    const label=node('label',title);const input=multiline?node('textarea'):node('input');if(input instanceof HTMLInputElement)input.type='text';
    input.name=key;input.id='training-'+week+'-'+key;input.maxLength=multiline?4000:200;input.value=String(state.values[key]??'');
    label.htmlFor=input.id;input.addEventListener('input',()=>{state=applyTraining(state,{type:'set',key,value:input.value});sync();checkpoint();});
    parent.append(label,input);return input;
  };
  const checkbox=(title:string,key:string,parent:HTMLElement=bench)=>{
    const label=node('label',undefined,'training-check');const input=node('input');input.type='checkbox';input.checked=Boolean(state.values[key]);
    input.addEventListener('change',()=>{state=applyTraining(state,{type:'set',key,value:input.checked});sync();checkpoint();});label.append(input,node('span',title));parent.append(label);
  };
  const readout=(items:[string,Value][])=>{
    const dl=node('dl',undefined,'training-readout');for(const [label,value]of items){const d=node('div');d.append(node('dt',label),node('dd',String(value)));dl.append(d);}bench.append(dl);
  };
  function render(){
    bench.replaceChildren();const v=state.values,phase=state.phase;
    const top=node('div',undefined,'training-mode-heading');top.append(node('span',phaseLabels[phase],'eyebrow'));
    top.append(node('p',labOperations[week]!.phases[phase]));
    top.append(node('p',phase==='practice'?'Learn the controls and inspect the example. Hints are always available.':phase==='check'?'Test your method against the published conditions. Explain the result you observe.':'Apply the capability to a changed context; an earlier answer may no longer satisfy the requirement.'));
    bench.append(top);
    if(week===1){
      const f=group(v.covered?'Scene covered — reconstruct it':'Observation scene');
      if(!v.covered)observationFacts[phase].slice(0,4).forEach(fact=>button('Inspect '+fact.id,{type:'inspect',key:fact.id},f));
      button(v.covered?'Reopen scene':'Cover scene and recall',{type:'cover'},f);
      if(!v.covered&&state.inspected.length){
        const findings=node('div',undefined,'learner-findings');findings.append(node('h4','Your inspection findings'));
        const list=node('ul');observationFacts[phase].filter(fact=>state.inspected.includes(fact.id)).forEach(fact=>list.append(node('li',fact.label)));findings.append(list);f.append(findings);
      }
      p(v.covered?'The physical scene is covered. Complete your account from memory, then reopen it to compare.':'Inspect each object. A written statement can be directly visible while its claim remains unverified.',f);
      field('What time did the display show? Use HH:MM.','recall0',f);
      observationFacts[phase].forEach((fact,i)=>select(i===0?'A report of the display reading':i===1?'A report of the vessel’s position':fact.id==='note'?'The message being asserted: '+fact.label:fact.label,'classification'+i,[{value:'observation',label:'Observed fact'},{value:'claim',label:'Someone’s claim'},{value:'inference',label:'An inferred explanation'}],f));
    }
    if(week===2){
      const f=group(v.covered?'Retrieve along your route':'Encode four associations');
      p('Route: '+loci.join(' → ')+'. Use a distinctive imagined interaction at each location.',f);
      if(!v.covered)loci.forEach((place,i)=>{
        const entry=node('div',undefined,'training-locus');entry.append(node('h4',place+' · '+memoryItems[phase][i]));
        field('Your association','association'+i,entry);f.append(entry);
      });
      button('Walk to next location',{type:'inspect'},f);button(v.covered?'Review associations':'Cover list and retrieve',{type:'cover'},f);
      if(v.covered)loci.forEach((place,i)=>field('Recall the item at '+place,'recall'+i,f));
      p('Enter each item name. The check ignores letter case and spaces at the ends. Try unaided, then review; record both attempts in your reflection.',f);
    }
    if(week===3){
      const target=spatialTarget(phase);
      p('The original module connects north and east. Required connectors: '+rotatedPorts(target.rotation).join(' and ')+', at level '+target.level+'. Clockwise quarter-turns change orientation; raising changes level.');
      const diagram=node('div',undefined,'training-spatial');
      diagram.setAttribute('role','img');diagram.setAttribute('aria-label','Module ports '+rotatedPorts(Number(v.rotation)).join(' and ')+', level '+v.level);
      const compass=node('div','N','training-compass');const piece=node('div','└','training-piece');piece.style.transform='rotate('+v.rotation+'deg)';diagram.append(compass,piece,node('span','Level '+v.level));bench.append(diagram);
      const controls=group('Move the module');button('Rotate clockwise 90°',{type:'rotate'},controls);button('Raise one level (cycles 0–2)',{type:'level'},controls);
      readout([['Rotation',v.rotation!],['Ports',rotatedPorts(Number(v.rotation)).join(' / ')],['Level',v.level!]]);
      select('Where did the original north connector move?','prediction',['north','east','south','west'].map(d=>({value:'north becomes '+d,label:d})));
    }
    if(week===4){
      const c=mechanismConfig(phase);
      p('Training mechanism: a '+c.driver+'-tooth driver turns '+c.inputTurns+' times. Produce exactly '+c.targetTurns+' output turns with the cam at '+c.cam+'°. Meshed gears turn oppositely. Output = driver teeth ÷ driven teeth × input turns.');
      readout([['Driven gear',v.gear+' teeth'],['Cam',v.cam+'°'],['Interlock',v.interlock?'Engaged':'Released'],['Spring',v.spring?'Attached':'Detached'],['Observed output',v.turns+' turns']]);
      const f=group('Manipulate the mechanism');button('Change driven gear (12 → 24 → 36)',{type:'gear'},f);button(v.interlock?'Release interlock':'Engage interlock',{type:'interlock'},f);button('Rotate cam 90°',{type:'cam'},f);button(v.spring?'Detach spring':'Attach return spring',{type:'spring'},f);
      select('Predict output direction relative to the driver','prediction',[{value:'same',label:'Same direction'},{value:'opposite',label:'Opposite direction'}],f);
      button('Turn the crank',{type:'crank'},f);
    }
    if(week===5){
      p('Training circuit: 6 V battery → fuse → switch/cable → lamp → common return. One component is open. Switch on to measure supply; the first zero after 6 V locates a supply break. A dark lamp can still have 6 V: isolate power and test continuity to check the lamp itself.');
      readout([['Power',v.power?'On':'Isolated'],['Meter',v.meter!],['Lamp',v.power&&v.repaired?'Lit':'Dark']]);
      const f=group('Circuit bench');button(v.power?'Isolate power':'Switch on',{type:'power'},f);
      for(const point of ['battery','fuse','cable','lamp'])button('Measure '+point,{type:'measure',key:point},f);
      for(const part of ['fuse','cable','lamp']){button('Test '+part+' continuity',{type:'continuity',key:part},f);button('Replace '+part,{type:'repair',key:part},f);}
      p('A working lamp alone is insufficient evidence of diagnosis. Your trace should locate the original fault before replacement. Reset this phase to try again.',f);
    }
    if(week===6){
      p(phase==='transfer'?'Amended signed manifest: deliver the authorised annotated copy, 24 sections, checksum M-99. The source copy remains preserved.':'Signed source manifest: complete archive = 24 sections and checksum M-42. Compare the supplied copies; timestamps provide sequence, not integrity.');
      const f=group('File comparison');
      archiveFiles.forEach(file=>{
        const card=node('div',undefined,'training-document');card.append(node('h4',file.name),node('p',file.time+' · '+file.parts+' sections · '+file.hash));
        button('Inspect '+file.name,{type:'inspect',key:file.id},card);
        if(state.inspected.includes(file.id))card.append(node('p',file.body));f.append(card);
      });
      select('Which copy satisfies this manifest?','archive',archiveFiles.map(a=>({value:a.id,label:a.name})));
    }
    if(week===7){
      p('Role mandates: observer may read; technician may read and service; registrar may read and certify. A role never inherits another role’s extra permission.');
      if(phase==='transfer')p('New maintenance freeze: the technician’s service permission is temporarily suspended. Reading and registrar certification remain available.');
      const f=group('Repair the access policy');
      for(const role of policyRoles){const row=node('div',undefined,'training-policy');row.append(node('h4',role));for(const a of policyActions)checkbox('Allow '+a,role+':'+a,row);f.append(row);}
      p('Run all nine combinations. Both permitted actions and rejected actions matter; “deny everything” does not meet the mandate.',f);
    }
    if(week===8){
      const target=handoffTarget(phase);
      readout([['Active role',v.role!]]);
      const f=group(v.role==='analyst'?'Analyst information':'Operator information');
      if(v.role==='analyst')p('Manifest instruction: send '+target.quantity+' sealed units to '+target.destination+'. Confirm code '+target.code+'. Only this role receives the manifest.',f);
      else p('Your dispatch panel has Relay, Archive and Dispatch destinations. The queue contains one, two and three-unit batches. Ask the analyst for exact destination, quantity and confirmation code before moving a batch.',f);
      button('Switch role',{type:'role'},f);
      select('Destination communicated','destination',['Relay','Archive','Dispatch'].map(x=>({value:x,label:x})));
      select('Quantity communicated','quantity',['1','2','3'].map(x=>({value:x,label:x+' units'})));
      field('Verification code read back','code');checkbox('The operator read back all three details and the analyst confirmed.','acknowledged');
      p('For pairs: only the active role reads its card; communicate aloud or in a shared note. Solo: switch roles explicitly and check what information changed.');
    }
    if(week===9){
      p(phase==='transfer'?'Changed mandate: the original’s physical provenance is essential. It must remain stabilised until a supported handover. A digital copy alone is insufficient.':'Mandate: recover a verified usable record, keep the original with its custodian, and document custody. Your role is recovery mediator.');
      const f=group('Council statements');
      for(const c of councilClaims){const card=node('div',undefined,'training-document');card.append(node('h4',c.speaker),node('p','“'+c.claim+'”'));button('Check '+c.speaker+' against the record',{type:'inspect',key:c.id},card);if(state.inspected.includes(c.id))p(c.record,card);f.append(card);}
      select('Propose an agreement','proposal',[{value:'copy',label:'Verify a copy and document its handover; preserve the original.'},{value:'original',label:'Take the original immediately on the unsupported cart.'},{value:'stabilise',label:'Stabilise the original and arrange supported, documented handover.'}]);
    }
    if(week===10){
      p('Navigate from row 5, column 1 to row 1, column 5. Bronze cells are visible sensor coverage. Each entry into one records a contact. Predict the total before executing. You can pause after every move.');
      const grid=node('div',undefined,'training-grid');grid.setAttribute('role','img');grid.setAttribute('aria-label','Five by five sensor map. Start row 5 column 1, goal row 1 column 5. Sensors at '+sensorCells(phase).map(i=>'row '+(Math.floor(i/5)+1)+' column '+(i%5+1)).join('; '));
      for(let i=0;i<25;i++){const cell=node('span',i===Number(v.position)?'YOU':i===4?'GOAL':sensorCells(phase).includes(i)?'◉':String(i+1));cell.dataset.sensor=String(sensorCells(phase).includes(i));cell.dataset.player=String(i===Number(v.position));grid.append(cell);}bench.append(grid);
      const f=group('Plan and step through your route');for(const dir of ['north','east','south','west'])button('Add '+dir,{type:'route',key:dir},f);
      p(state.sequence.length?state.sequence.map((dir,i)=>(i<Number(v.steps)?'✓ ':'')+dir).join(' → '):'Route is empty.',f);
      button('Undo final step',{type:'undo'},f);button('Execute next step',{type:'step'},f);button('Rewind to start',{type:'rewind'},f);
      field('Predicted sensor contacts (number)','prediction',f);
      readout([['Current row',Math.floor(Number(v.position)/5)+1],['Current column',Number(v.position)%5+1],['Sensor contacts',v.detected!]]);
    }
    if(week===11){
      p('The original plan is immutable. Reveal the published disruption, identify its affected dependency, then propose a testable alternative.');
      const compare=node('div',undefined,'training-comparison');const original=node('div',undefined,'training-document');original.append(node('h4','Version 1 · preserved'),node('p',String(v.original)));compare.append(original);
      const revision=node('div',undefined,'training-document');revision.append(node('h4','Version 2 · your revision'));field('Revised sequence','revision',revision,true);field('Why this revision addresses the changed dependency','reason',revision,true);compare.append(revision);bench.append(compare);
      button('Publish the disruption',{type:'disrupt'});
      select('Replacement dependency to rehearse','replacement',[
        {value:'east',label:'Keep using the east passage'},
        {value:'west-unchecked',label:'Use the west passage without another relay check'},
        {value:'west-relay',label:'Verify the west relay, then use the west passage'},
        {value:'live-meter',label:'Wait for a live reading from the unavailable meter'},
        {value:'reference-readings',label:'Use supplied reference readings and preserve their limitation'},
      ]);
      button('Rehearse the replacement dependency',{type:'rehearse'});
      p(v.dependencyChecked?'The selected replacement has a recorded rehearsal result.':'No supported replacement rehearsal has been recorded.');
      if(v.disrupted)p(phase==='transfer'?'Changed condition: meter unavailable. Supplied reference readings: battery 6 V, fuse 6 V, cable 0 V, lamp 0 V. Explain the limit of diagnosing from recorded readings.':'Changed condition: east passage unavailable. West passage is open, but adds one relay check before handover.');
    }
    if(week===12){
      p('Launch Operation Last Light below. Complete a mission run before writing this account; the activity stores your explanation separately from the mission’s practical record.');
      const a=node('a','Enter the final recovery mission','button primary');a.href=root.dataset.missionUrl??'../../operation/';bench.append(a);
      p(hasCompletedRecovery()?'A completed recovery run is present in this passport. Use its exported action record for the account below.':'No completed recovery run is recorded in this passport yet. Complete the practical mission first; this page records your account afterwards.');
      field('What objective did your team pursue?','objective');field('Which recorded actions and observations support the result?','evidence',bench,true);field('What credible alternative did you reject, and why?','alternative',bench,true);
    }
  }
  const confirmation=root.querySelector<HTMLDialogElement>('[data-training-confirm-dialog]')!;
  let pendingChange:(()=>void)|undefined;
  function confirmChange(message:string,label:string,change:()=>void){
    if(!state.actions.length&&!reflection.value.trim()){change();return;}
    pendingChange=change;
    root.querySelector<HTMLElement>('[data-training-confirm-message]')!.textContent=message;
    root.querySelector<HTMLButtonElement>('[data-training-confirm-accept]')!.textContent=label;
    confirmation.showModal();
  }
  root.querySelector<HTMLButtonElement>('[data-training-confirm-accept]')!.addEventListener('click',()=>{
    const change=pendingChange;pendingChange=undefined;confirmation.close();change?.();
  });
  root.querySelector<HTMLButtonElement>('[data-training-confirm-cancel]')!.addEventListener('click',()=>{pendingChange=undefined;confirmation.close();});
  confirmation.addEventListener('cancel',()=>{pendingChange=undefined;});
  confirmation.addEventListener('close',()=>{pendingChange=undefined;});
  root.querySelectorAll<HTMLButtonElement>('[data-training-phase]').forEach(b=>{
    b.disabled=false;b.addEventListener('click',()=>{
      const next=b.dataset.trainingPhase as TrainingPhase;if(!phases.includes(next))return;
      confirmChange('Start the '+phaseLabels[next].toLowerCase()+' configuration? Export or record this attempt first to keep its evidence.','Start '+phaseLabels[next].toLowerCase(),()=>{
        state=createTraining(week,next);reflection.value='';hint=0;checksThisPhase=0;root.querySelectorAll<HTMLElement>('[data-training-hint-text]').forEach(text=>text.hidden=true);root.querySelector<HTMLButtonElement>('[data-training-hint]')!.textContent='Reveal next hint';render();sync();checkpoint();
      });
    });
  });
  root.querySelector<HTMLButtonElement>('[data-training-test]')!.disabled=false;
  root.querySelector<HTMLButtonElement>('[data-training-test]')!.addEventListener('click',()=>act({type:'test'}));
  root.querySelector<HTMLButtonElement>('[data-training-reset]')!.disabled=false;
  root.querySelector<HTMLButtonElement>('[data-training-reset]')!.addEventListener('click',()=>{
    confirmChange('Restart only this activity phase? Saved passport evidence remains available.','Restart this phase',()=>{
      state=createTraining(week,state.phase);checksThisPhase=0;hint=0;root.querySelectorAll<HTMLElement>('[data-training-hint-text]').forEach(text=>text.hidden=true);root.querySelector<HTMLButtonElement>('[data-training-hint]')!.textContent='Reveal next hint';render();sync();checkpoint();
    });
  });
  root.querySelector<HTMLButtonElement>('[data-training-save]')!.disabled=false;
  root.querySelector<HTMLButtonElement>('[data-training-save]')!.addEventListener('click',()=>{
    if(reflection.value.trim().length<20){saveStatus.textContent='Add a brief explanation of what you tried, observed and would change (at least 20 characters).';reflection.focus();return;}
    const detail={week,phase:state.phase,actions:state.actions,result:state.feedback,reflection:reflection.value.trim(),completed:trainingMissionComplete(state),state:structuredClone(state)};
    window.dispatchEvent(new CustomEvent('mastermind:evidence',{detail}));
    const next=trainingMissionComplete(state)
      ? state.phase==='transfer'?'All three phases use the same save action. Check your learning record for the attempts you want to keep.':state.phase==='practice'?'When ready, select Skill check to test your method against its published conditions.':'When ready, select Transfer challenge to try changed conditions.'
      : 'This record is marked unfinished. Return to Field operation, verify any unresolved equipment, perform the intervention and confirm its receiving handover. Then record the completed attempt before switching phases.';
    saveStatus.textContent='This attempt has been sent to your local skills passport. Export a backup below before leaving, especially if browser storage is unavailable. '+next;
  });
  const hintButton=root.querySelector<HTMLButtonElement>('[data-training-hint]')!;hintButton.disabled=false;
  hintButton.addEventListener('click',()=>{
    const hints=Array.from(root.querySelectorAll<HTMLElement>('[data-training-hint-text]'));
    const next=hints[hint];if(next){next.hidden=false;hint++;hintsThisVisit++;hintButton.textContent=hint===hints.length?'All hints revealed':'Reveal next hint';updateCoaching();}
  });
  window.addEventListener('mastermind:field-action',((event:CustomEvent<{scope:string;action:FieldOperationAction}>)=>{
    if(event.detail?.scope===operationScope)fieldAct(event.detail.action);
  }) as EventListener);
  window.addEventListener('mastermind:interact',((event:CustomEvent<{week:number;objectId:string}>)=>{
    if(event.detail.week!==week)return;
    const byWeek:Record<number,string>={1:'inspect',2:'inspect',3:'rotate',4:'crank',5:'measure',6:'inspect',7:'test',8:'role',9:'inspect',10:'step',11:'disrupt',12:'test'};
    const id=event.detail.objectId;
    if(week===1&&['clock','cup','door','note'].includes(id))act({type:'inspect',key:id});
    else if(week===4&&['gear','cam','spring','interlock','crank'].includes(id))act({type:id});
    else if(week===5&&id.startsWith('measure-'))act({type:'measure',key:id.slice(8)});
    else if(week===5&&id.startsWith('repair-'))act({type:'repair',key:id.slice(7)});
    else if(week===5&&id==='toggle-power')act({type:'power'});
    else act({type:byWeek[week]??'test'});
  }) as EventListener);
  window.addEventListener('mastermind:restore',((event:CustomEvent<{records?:unknown[];drafts?:Record<string,{state?:unknown;reflection?:string}>}>)=>{
    if(restoreApplied||state.actions.length)return;
    const records=event.detail?.records;
    if(!Array.isArray(records))return;
    const saved=event.detail.drafts?.[String(week)]??[...records].reverse().find((r)=>r&&typeof r==='object'&&'week' in r&&(r as {week:number}).week===week) as {state?:unknown;reflection?:string}|undefined;
    if(saved&&validTraining(saved.state,week)){state=saved.state;
      if(!state.field){
        const restored=createTraining(week,state.phase);
        state={...restored,...state,values:{...restored.values,...state.values},complete:false,field:restored.field};
        state.feedback='Historical skill record restored. Recheck the equipment and complete the new mission intervention; earlier evidence remains in your passport.';
      }
      reflection.value=typeof saved.reflection==='string'?saved.reflection:'';restoreApplied=true;render();sync();saveStatus.textContent='Restored your most recently recorded attempt for this week.';}
  }) as EventListener);
  window.addEventListener('mastermind:reset',()=>{state=createTraining(week);reflection.value='';restoreApplied=false;hint=0;checksThisPhase=0;render();sync();});
  window.addEventListener('mastermind:replace',()=>{state=createTraining(week);reflection.value='';restoreApplied=false;hint=0;checksThisPhase=0;render();sync();});
  let printDetails:HTMLDetailsElement[]=[];
  window.addEventListener('beforeprint',()=>{printDetails=Array.from(root.querySelectorAll<HTMLDetailsElement>('details:not([open])'));printDetails.forEach(d=>d.open=true);});
  window.addEventListener('afterprint',()=>{printDetails.forEach(d=>d.open=false);printDetails=[];});
  reflection.addEventListener('input',checkpoint);
  render();sync();window.dispatchEvent(new CustomEvent('mastermind:request-restore'));
  window.addEventListener('mastermind:scene-ready',()=>{updateField();dispatch();});
}
document.querySelectorAll<HTMLElement>('[data-training-week]').forEach(mount);