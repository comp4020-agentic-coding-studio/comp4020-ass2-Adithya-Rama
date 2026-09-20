import {describe,it,expect} from 'vitest';
import {createFieldOperation,applyFieldOperation,validFieldOperation,type FieldOperationSpec} from '../src/lib/field-operation';
const spec:FieldOperationSpec={id:'test-route',title:'Recovery',objective:'Deliver the archive',problem:'The lift has no power',consequence:'Power restored',actionLabel:'Run lift',resolveLabel:'Accept archive',effect:'recovery',cargoLabel:'Archive',checkpoints:['Landing','Gallery','Receiver']};
describe('shared performed operation',()=>{
 it('requires an inspected obstacle and domain proof before any release',()=>{
  let s=createFieldOperation(spec);
  expect(applyFieldOperation(spec,s,{type:'execute'}).success).toBe(false);
  s=applyFieldOperation(spec,s,{type:'inspect'}).state;
  expect(applyFieldOperation(spec,s,{type:'collect'}).success).toBe(false);
  expect(applyFieldOperation(spec,s,{type:'execute'}).success).toBe(false);
  s=applyFieldOperation(spec,s,{type:'proof',verified:true}).state;
  expect(applyFieldOperation(spec,s,{type:'execute'}).success).toBe(true);
 });
 it('requires physical custody and ordered checkpoints before handover',()=>{
  let s=createFieldOperation(spec);
  for(const a of [{type:'inspect'} as const,{type:'proof',verified:true} as const,{type:'execute'} as const])s=applyFieldOperation(spec,s,a).state;
  expect(applyFieldOperation(spec,s,{type:'checkpoint',id:'Landing'}).success).toBe(false);
  s=applyFieldOperation(spec,s,{type:'collect'}).state;
  expect(applyFieldOperation(spec,s,{type:'checkpoint',id:'Receiver'}).success).toBe(false);
  expect(applyFieldOperation(spec,s,{type:'deliver'}).success).toBe(false);
  for(const id of spec.checkpoints)s=applyFieldOperation(spec,s,{type:'checkpoint',id}).state;
  s=applyFieldOperation(spec,s,{type:'deliver'}).state;
  expect(s.delivered).toBe(true);expect(s.carrying).toBe(false);expect(validFieldOperation(s,spec)).toBe(true);
  expect(applyFieldOperation(spec,s,{type:'deliver'}).success).toBe(false);
  const revoked=applyFieldOperation(spec,s,{type:'proof',verified:false}).state;
  expect(revoked.delivered).toBe(false);expect(revoked.visited).toEqual([]);expect(revoked.log.length).toBeGreaterThan(s.log.length);
 });
 it('rejects fabricated handovers, reordered routes and mismatched scenario saves',()=>{
  const s=createFieldOperation(spec);
  expect(validFieldOperation({...s,delivered:true},spec)).toBe(false);
  expect(validFieldOperation({...s,visited:['Gallery']},spec)).toBe(false);
  expect(validFieldOperation({...s,operationId:'other'},spec)).toBe(false);
 });
});
