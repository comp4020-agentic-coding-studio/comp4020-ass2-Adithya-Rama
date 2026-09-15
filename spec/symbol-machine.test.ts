import {it,expect} from "vitest";
import {applySymbol,initialState,traceSequence} from "../src/lib/symbol-machine";
it("invalid transitions do not manufacture a prerequisite or mutate the input",()=>{
 const state=initialState();const result=applySymbol("interpreter",state,"TRANSFER");
 expect(result.accepted).toBe(false);expect(result.after).toEqual(state);expect(state).toEqual(initialState());
 const trace=traceSequence("interpreter",["TRANSFER","OBSERVE","TRANSFER","AUTHORISE","TRANSFER"]);
 expect(trace.map(s=>s.accepted)).toEqual([false,true,false,true,true]);expect(trace.at(-1)?.after.complete).toBe(true);
});
it("the changed prerequisite reverses the permissible first action",()=>{
 expect(applySymbol("R1",initialState(),"WITNESS").accepted).toBe(true);
 expect(applySymbol("R2",initialState(),"WITNESS").accepted).toBe(false);
 expect(applySymbol("R2",initialState(),"SILVER").accepted).toBe(true);
});
it("rejects unknown symbols and repeated actions without changing state",()=>{
 expect(applySymbol("interpreter",initialState(),"fetch /secret").accepted).toBe(false);
 const trace=traceSequence("R1",["WITNESS","WITNESS"]);expect(trace[1].accepted).toBe(false);expect(trace[1].after).toEqual(trace[0].after);
});
it("completion closes the run",()=>{
 const trace=traceSequence("R2",["SILVER","WITNESS","CROWN","SILVER"]);expect(trace[2].after.complete).toBe(true);expect(trace[3].accepted).toBe(false);
});
