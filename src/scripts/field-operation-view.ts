import type {FieldOperationAction,FieldOperationSpec,FieldOperationState} from '../lib/field-operation';
export interface FieldOperationFrame {scope:string;spec:FieldOperationSpec;state:FieldOperationState}
export function broadcastFieldOperation(scope:string,spec:FieldOperationSpec,state:FieldOperationState){
  window.dispatchEvent(new CustomEvent<FieldOperationFrame>('mastermind:field-state',{detail:{scope,spec,state}}));
}
export function requestFieldOperation(scope:string,action:FieldOperationAction,perform:()=>void){
  const request=new CustomEvent('mastermind:field-request',{cancelable:true,detail:{scope,action,perform}});
  if(window.dispatchEvent(request))perform();
}
export function renderFieldOperation(root:HTMLElement,spec:FieldOperationSpec,state:FieldOperationState,dispatch:(action:FieldOperationAction)=>void){
  const panel=root.matches('[data-field-operation]')?root:root.querySelector<HTMLElement>('[data-field-operation]');
  if(!panel)return;
  const perform=(action:FieldOperationAction)=>requestFieldOperation(panel.dataset.fieldScope||'',action,()=>dispatch(action));
  const text=(selector:string,value:string)=>{const el=panel.querySelector<HTMLElement>(selector);if(el&&el.textContent!==value)el.textContent=value;};
  panel.dataset.fieldState=state.delivered?'complete':state.carrying?'handover':state.executed?'intervention':state.verified?'ready':state.inspected?'investigating':'briefing';
  text('[data-field-stage]',state.delivered?'Operation complete':state.carrying?'Handover in progress':state.executed?'Intervention active':state.verified?'Solution verified':'Investigation');
  text('[data-field-title]',spec.title);text('[data-field-objective]',spec.objective);text('[data-field-problem]',state.executed?spec.consequence:spec.problem);
  text('[data-field-next]',state.delivered?'Mission accomplished. Explain your decisions and keep the mission record.':!state.inspected?'Inspect the mission station, then investigate the equipment.':!state.verified?'Use the task equipment to diagnose the problem. Test your solution before operating the mission station.':!state.executed?spec.actionLabel+'. Your tested solution is ready to put into effect.':!state.carrying?'Collect '+spec.cargoLabel+' from the mission station.':state.visited.length<spec.checkpoints.length?'Go to '+spec.checkpoints[state.visited.length]+'.':spec.resolveLabel+' at the receiving station.');
  text('[data-field-cargo]',state.delivered?'Handover recorded: '+spec.cargoLabel:state.carrying?'Carrying: '+spec.cargoLabel:'Awaiting handover: '+spec.cargoLabel);
  text('[data-field-status]',state.log.at(-1)??'Inspect the mission station to begin.');
  const button=(selector:string,label:string,disabled:boolean,action:FieldOperationAction)=>{const b=panel.querySelector<HTMLButtonElement>(selector);if(b){b.textContent=label;b.disabled=disabled;b.onclick=()=>perform(action);}};
  button('[data-field-inspect]','Inspect mission station',state.delivered,{type:'inspect'});
  button('[data-field-execute]',spec.actionLabel,!state.inspected||!state.verified||state.executed,{type:'execute'});
  button('[data-field-collect]','Collect '+spec.cargoLabel,!state.executed||state.carrying||state.delivered,{type:'collect'});
  button('[data-field-deliver]',spec.resolveLabel,!state.carrying||state.visited.length!==spec.checkpoints.length||state.delivered,{type:'deliver'});
  const checkpoints=panel.querySelector<HTMLElement>('[data-field-checkpoints]')!;
  if(checkpoints.dataset.spec!==spec.id||checkpoints.children.length!==spec.checkpoints.length){checkpoints.replaceChildren();checkpoints.dataset.spec=spec.id;for(const id of spec.checkpoints){const b=document.createElement('button');b.type='button';b.dataset.fieldCheckpoint=id;checkpoints.append(b);}}
  Array.from(checkpoints.querySelectorAll('button')).forEach((b,i)=>{const id=spec.checkpoints[i]!;b.textContent=(i<state.visited.length?'✓ ':'Go to ')+id;b.disabled=!state.carrying||i!==state.visited.length||state.delivered;b.onclick=()=>perform({type:'checkpoint',id});});
  const list=panel.querySelector<HTMLOListElement>('[data-field-log]')!;
  const signature=JSON.stringify(state.log.slice(-8));if(list.dataset.trace!==signature){list.dataset.trace=signature;list.replaceChildren();for(const line of state.log.slice(-8)){const li=document.createElement('li');li.textContent=line;list.append(li);}}
}
