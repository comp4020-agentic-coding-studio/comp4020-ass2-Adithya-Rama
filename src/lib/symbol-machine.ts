export type Protocol="R1"|"R2"|"interpreter";
export interface SymbolState{witness:boolean;silver:boolean;record:boolean;permission:boolean;complete:boolean}
export interface SymbolStep{action:string;accepted:boolean;reason:string;before:SymbolState;after:SymbolState}
export function initialState():SymbolState{return {witness:false,silver:false,record:false,permission:false,complete:false};}
export function applySymbol(protocol:Protocol,state:SymbolState,action:string):SymbolStep{
 const before={...state},after={...state};let reason="";
 if(state.complete)reason="The run is already complete.";
 else if(protocol==="interpreter"){
  if(action==="OBSERVE"){if(state.record)reason="A record already exists.";else after.record=true;}
  else if(action==="AUTHORISE"){if(!state.record)reason="AUTHORISE requires a record.";else if(state.permission)reason="Permission is already granted.";else after.permission=true;}
  else if(action==="TRANSFER"){if(!state.permission)reason="TRANSFER requires permission.";else after.complete=true;}
  else reason="This action is not part of the supplied interpreter.";
 }else{
  if(action==="WITNESS"){if(state.witness)reason="The witness token already exists.";else if(protocol==="R2"&&!state.silver)reason="R2 WITNESS requires an existing silver token.";else after.witness=true;}
  else if(action==="SILVER"){if(state.silver)reason="The silver token already exists.";else if(protocol==="R1"&&!state.witness)reason="R1 SILVER requires a witness token.";else after.silver=true;}
  else if(action==="CROWN"){if(!state.witness||!state.silver)reason="CROWN requires both the silver and witness conditions.";else after.complete=true;}
  else reason="This action is not part of the supplied seal model.";
 }
 return {action,accepted:reason==="",reason:reason||"Prerequisites satisfied.",before,after};
}
export function traceSequence(protocol:Protocol,actions:string[]):SymbolStep[]{
 let state=initialState();return actions.map(action=>{const step=applySymbol(protocol,state,action);state=step.after;return step;});
}
