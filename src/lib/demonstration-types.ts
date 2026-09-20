/** Authored worked examples. These are separate from assessed activity fixtures and saves. */
export type DemoRoom = "atrium" | "perception" | "spatial" | "mechanics" | "systems" | "digital" | "council" | "movement" | "operations";
export type DemoShot = "establishing" | "overhead" | "close" | "shoulder";
export type DemoValue = string | number | boolean | string[];
export type DemoItem = {id:string;label:string;shape:"lens"|"spool"|"tile"|"book"|"key"|"beacon"|"clock"|"mug"|"hatch"|"paper"|"flask";color:string;text?:string;time?:string;open?:boolean};
export interface DemoScene {
 room:DemoRoom; shot:DemoShot; focus?:string; values?:Record<string,DemoValue>; items?:DemoItem[]; labels?:string[];
}
export interface DemoControl {
 id:string; label:string; type:"select"|"number"|"text"|"toggle"|"order";
 options?:{value:string;label:string}[];
 initial?:DemoValue; expected:DemoValue; aliases?:string[]; tolerance?:number;
 unit?:string; min?:number; max?:number;
}
export interface DemoStep {
 id:string; title:string; narration:string; why:string; prompt:string;
 controls:DemoControl[]; success:string; pitfall:string; hint:string;
 before:DemoScene; after:DemoScene; duration:number;
}
export interface Demonstration {
 id:string; kind:"lab"|"assessment"; week?:number; title:string; subtitle:string;
 skill:string; setting:string; difference:string; transfer:string;
 sourceHref:string; sourceLabel:string; estimatedMinutes:number;
 steps:DemoStep[];
 artifact:{title:string;filename:string;markdown:string};
}
export interface DemoAttempt {stepId:string;attempts:number;hints:number;completed:boolean;lastFeedback:string;lastIncorrect?:string[];independent?:boolean}
export interface DemoProgress {demoId:string;stepIndex:number;mode:"watch"|"control";attempts:Record<string,DemoAttempt>;completed:boolean;watched?:string[]}
export interface DemoCheckResult {correct:boolean;fields:Record<string,boolean>;feedback:string}
export interface DemoFrame extends DemoScene {demoId:string;stepId:string;title:string;phase:"before"|"after";progress:number}
