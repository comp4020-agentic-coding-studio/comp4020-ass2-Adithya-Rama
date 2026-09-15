import {readFileSync} from "node:fs";
import {describe,it,expect} from "vitest";
import {activities,cases,outcomes} from "../src/data/academy";
interface Node {id:string;type:string;title:string;description:string;meta:Record<string,any>;spec?:string[];related?:string[]}
const api=JSON.parse(readFileSync("dist/api/index.json","utf8")) as {course:Record<string,any>;nodes:Node[]};
const nodes=(type:string)=>api.nodes.filter(n=>n.type===type).sort((a,b)=>a.meta.week-b.meta.week);
describe("the promises of MASTERMIND",()=>{
 it("retains allocated suffix, chosen level and teaching period",()=>{
  expect(api.course.code).toBe("SLOP4408");expect(api.course.level).toBe(4);
  expect(api.course.startDate).toBe("2027-02-22");expect(api.course.endDate).toBe("2027-05-28");
 });
 it("publishes twelve distinct briefings and Friday labs",()=>{
  for(const type of ["lectures","sessions"]){expect(nodes(type).map(n=>n.meta.week)).toEqual(Array.from({length:12},(_,i)=>i+1));for(const n of nodes(type)){expect(new Date(n.meta.date+"T00:00:00Z").getUTCDay()).toBe(type==="lectures"?1:5);}}
  expect(new Set(nodes("lectures").map(n=>n.title)).size).toBe(12);
 });
 it("provides valid outcomes, source files and an activity for each week",()=>{
  for(const n of [...nodes("lectures"),...nodes("sessions")]){
   const a=activities.find(a=>a.id===n.meta.activityId);expect(a).toBeDefined();expect(a?.week).toBe(n.meta.week);
   expect(n.meta.learningOutcomes.length).toBeGreaterThan(0);
   for(const id of n.meta.learningOutcomes)expect(outcomes.some(o=>o[0]===id)).toBe(true);
   for(const id of n.meta.caseFiles)expect(cases.some(c=>c.id===id)).toBe(true);
   expect(n.meta.caseFiles).toEqual(a!.caseIds);
  }
 });
 it("makes each output feed later work or the final defence",()=>{
  const sessions=nodes("sessions");
  for(const n of sessions){
   expect(n.meta.produces).toEqual([activities.find(a=>a.id===n.meta.activityId)!.output]);
   for(const required of n.meta.requires){
    expect(sessions.some(previous=>previous.meta.week<n.meta.week&&previous.meta.produces.includes(required))||n.meta.sampleAvailable).toBe(true);
   }
   for(const id of n.meta.assessmentIds)expect(api.nodes.some(a=>a.id==="assessments/"+id)).toBe(true);
   if(n.meta.week<12)expect(sessions.some(later=>later.meta.week>n.meta.week&&later.meta.requires.includes(n.meta.produces[0]))).toBe(true);
  }
 });
 it("maps assessment participation and weights without counting checkpoints twice",()=>{
  const weights=Object.fromEntries(nodes("assessments").map(n=>[n.id,n.meta.weight]));
  expect(weights).toEqual({"assessments/fieldwork":10,"assessments/assignment-1":20,"assessments/assignment-2":25,"assessments/final-project":45});
  expect(nodes("assessments").map(n=>n.meta.weight).reduce((a,b)=>a+b,0)).toBe(100);
  const modes=Object.fromEntries(nodes("assessments").map(n=>[n.id,n.meta.participation]));
  expect(modes["assessments/assignment-1"]).toBe("individual");expect(modes["assessments/assignment-2"]).toBe("pair");expect(modes["assessments/final-project"]).toBe("group");
  for(const a of nodes("assessments"))expect(a.meta.marking.criteria.reduce((sum:number,c:{weight:number})=>sum+c.weight,0)).toBe(100);
 });
 it("requires a preserved original and a revision at the midpoint",()=>{
  const week7=nodes("sessions").find(n=>n.meta.week===7)!;
  expect(week7.meta.disruption).toBe("E07");expect(week7.meta.preserves).toBe("plan-v1");expect(week7.meta.produces).toContain("plan-v2");
  expect(api.nodes.find(n=>n.id==="assessments/assignment-2")?.meta.requiresRevision).toBe(true);
 });
 it("publishes a real linked deck and substantial teaching structures",()=>{
  const lecture=nodes("lectures").find(n=>n.meta.week===7)!;expect(lecture.meta.slides).toBe("/decks/week-07/");
  const deck=readFileSync("dist/decks/week-07/index.html","utf8");expect(deck).toContain("Break the Mastermind");expect(deck).toContain('class="notes"');
  for(const n of nodes("lectures")){const body=readFileSync("src/content/"+n.id+".md","utf8");for(const heading of ["## What you will learn","## The briefing","## Worked example","## A plausible mistake","## Before the lab","## What happens next"])expect(body).toContain(heading);}
  for(const n of nodes("sessions")){const body=readFileSync("src/content/"+n.id+".md","utf8");for(const heading of ["## The two-hour lab","## What leaves the room","## How to judge the response","## Closing reflection"])expect(body).toContain(heading);}
 });
 it("renders canonical assessment values on each page and its index",()=>{
  const index=readFileSync("dist/assessments/index.html","utf8");
  for(const a of nodes("assessments")){const page=readFileSync("dist/"+a.id+"/index.html","utf8");expect(page).toContain(String(a.meta.weight)+"%");expect(index).toContain(String(a.meta.weight)+"%");expect(page).toContain("17:00 Canberra");}
 });
});
