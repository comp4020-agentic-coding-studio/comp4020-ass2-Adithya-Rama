/** Shared performed-operation rules. Domain models supply proof; graphics cannot certify it. */
export type FieldEffect = 'report'|'signal'|'door'|'lift'|'power'|'archive'|'relay'|'custody'|'route'|'revision'|'recovery';
export interface FieldOperationSpec {
  id:string; title:string; objective:string; problem:string; consequence:string;
  actionLabel:string; resolveLabel:string; effect:FieldEffect; cargoLabel:string; checkpoints:string[];
}
export interface FieldOperationState {
  version:1; operationId:string; inspected:boolean; verified:boolean; executed:boolean;
  carrying:boolean; visited:string[]; delivered:boolean; log:string[];
}
export type FieldOperationAction = {type:'inspect'}|{type:'proof';verified:boolean}|{type:'execute'}|{type:'collect'}|{type:'checkpoint';id:string}|{type:'deliver'};
export function createFieldOperation(spec:FieldOperationSpec):FieldOperationState {
  return {version:1,operationId:spec.id,inspected:false,verified:false,executed:false,carrying:false,visited:[],delivered:false,log:[]};
}
export function validFieldOperation(value:unknown,spec:FieldOperationSpec):value is FieldOperationState {
  if(!value||typeof value!=='object'||Array.isArray(value))return false;
  const s=value as FieldOperationState;
  if(s.version!==1||s.operationId!==spec.id||!['inspected','verified','executed','carrying','delivered'].every(k=>typeof (s as unknown as Record<string,unknown>)[k]==='boolean'))return false;
  if(!Array.isArray(s.visited)||s.visited.length>spec.checkpoints.length||s.visited.some((id,i)=>id!==spec.checkpoints[i]))return false;
  if(!Array.isArray(s.log)||s.log.length>120||s.log.some(line=>typeof line!=='string'||line.length>2000))return false;
  if(s.executed&&(!s.inspected||!s.verified)||s.carrying&&!s.executed||s.visited.length&&(!s.executed||!s.carrying&&!s.delivered))return false;
  if(s.delivered&&(!s.executed||!s.verified||!s.inspected||s.carrying||s.visited.length!==spec.checkpoints.length))return false;
  return true;
}
export function applyFieldOperation(spec:FieldOperationSpec,current:FieldOperationState,action:FieldOperationAction):{state:FieldOperationState;success:boolean;message:string} {
  if(!validFieldOperation(current,spec))return {state:current,success:false,message:'This operation record does not match its scenario. Keep your backup and restart this mission.'};
  const state:FieldOperationState={...current,visited:[...current.visited],log:[...current.log]};
  let success=true,message='';
  const fail=(text:string)=>{success=false;message=text;};
  if(action.type==='proof'){
    if(state.verified===action.verified)return {state,success:true,message:action.verified?'Your tested solution is ready.':'Investigate the obstacle and test a solution.'};
    state.verified=action.verified;
    if(!action.verified){state.executed=false;state.carrying=false;state.visited=[];state.delivered=false;message='The supporting evidence changed. The intervention and handover must be verified again.';}
    else message='Your tested solution supports the intervention. Return to the mission station to put it into effect.';
  }else if(state.delivered){return {state,success:false,message:'This operation is complete. Its action record is preserved.'};}
  else if(action.type==='inspect'){state.inspected=true;message=spec.problem;}
  else if(action.type==='execute'){
    if(!state.inspected)fail('Inspect the mission station first to establish the obstacle.');
    else if(!state.verified)fail('This obstacle is still unresolved. Use the equipment and verify your solution before operating the station.');
    else if(state.executed)fail('The intervention is already active. Continue with the handover.');
    else{state.executed=true;message=spec.consequence;}
  }else if(action.type==='collect'){
    if(!state.executed)fail('Resolve the obstacle before collecting '+spec.cargoLabel+'.');
    else if(state.carrying)fail('You already have '+spec.cargoLabel+'. Continue to the next checkpoint.');
    else{state.carrying=true;message='Collected '+spec.cargoLabel+'. '+(spec.checkpoints.length?'Follow the marked route, checking each point in order.':'Take it to the receiving station.');}
  }else if(action.type==='checkpoint'){
    if(!state.carrying)fail('Collect '+spec.cargoLabel+' before travelling its handover route.');
    else if(action.id!==spec.checkpoints[state.visited.length])fail('The next checkpoint is '+(spec.checkpoints[state.visited.length]??'the receiving station')+'.');
    else{state.visited.push(action.id);message='Reached '+action.id+'. '+(state.visited.length===spec.checkpoints.length?'The receiving station can now accept the handover.':'Continue to '+spec.checkpoints[state.visited.length]+'.');}
  }else if(action.type==='deliver'){
    if(!state.carrying||state.visited.length!==spec.checkpoints.length)fail('Bring '+spec.cargoLabel+' through the required checkpoints before completing the handover.');
    else{state.carrying=false;state.delivered=true;message=spec.resolveLabel+'. '+spec.objective+' — operation complete. Your action record is ready for the debrief.';}
  }else fail('That action is not available in this operation.');
  if(message){state.log.push((success?'✓ ':'Attempt: ')+message);state.log=state.log.slice(-120);}
  return {state,success,message};
}
