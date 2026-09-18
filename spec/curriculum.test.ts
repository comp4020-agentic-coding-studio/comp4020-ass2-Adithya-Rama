import {readFileSync,existsSync} from "node:fs";
import {describe,it,expect} from "vitest";
import {weeks,learningOutcomes,weekByNumber} from "../src/data/curriculum";
import {createTraining,observationFacts,memoryItems,spatialTarget,mechanismConfig,handoffTarget,sensorCells} from "../src/lib/training-engine";
interface Node {id:string;type:string;title:string;description:string;meta:Record<string,any>;spec?:string[];related?:string[]}
const api=JSON.parse(readFileSync("dist/api/index.json","utf8")) as {course:Record<string,any>;nodes:Node[]};
const nodes=(type:string)=>api.nodes.filter(n=>n.type===type).sort((a,b)=>a.meta.week-b.meta.week);
const source=(id:string)=>readFileSync("src/content/"+id+".md","utf8");
describe("the published skills academy contract",()=>{
 it("retains the allocated identity and publishes the replacement course",()=>{
  expect(api.course.code).toBe("SLOP4408");expect(api.course.level).toBe(4);
  expect(api.course.title).toBe("MASTERMIND: The Academy of Impossible Skills");
  expect(api.course.startDate).toBe("2027-02-22");expect(api.course.endDate).toBe("2027-05-28");
  expect(()=>weekByNumber(0)).toThrow();expect(()=>weekByNumber(13)).toThrow();
 });
 it("publishes twelve Monday briefings and Friday labs around the scheduled break",()=>{
  for(const type of ["lectures","sessions"]){
   const entries=nodes(type);expect(entries.map(n=>n.meta.week)).toEqual(Array.from({length:12},(_,i)=>i+1));
   for(const n of entries){
    const date=String(n.meta.date).slice(0,10);expect(new Date(date+"T00:00:00Z").getUTCDay()).toBe(type==="lectures"?1:5);
    expect(date<"2027-04-05"||date>"2027-04-18").toBe(true);
    expect(n.title).toBe(weekByNumber(n.meta.week).title);
   }
  }
  expect(new Set(weeks.map(w=>w.skill)).size).toBe(12);
 });
 it("resolves skills, activities and supplied material identifiers",()=>{
  for(const n of [...nodes("lectures"),...nodes("sessions")]){
   const w=weekByNumber(n.meta.week);expect(n.meta.activityId).toBe(w.activityId);
   expect(createTraining(w.week).week).toBe(w.week);
   expect(n.meta.learningOutcomes.length).toBeGreaterThan(0);
   for(const id of n.meta.learningOutcomes)expect(learningOutcomes.some(o=>o.id===id)).toBe(true);
   expect(n.meta.skillIds).toEqual(n.meta.learningOutcomes);
   for(const id of n.meta.caseFiles)expect(w.materials.some(m=>m.startsWith(id+":"))).toBe(true);
  }
 });
 it("provides a browser and complete campus route, preparation and named output every week",()=>{
  for(const n of nodes("sessions")){
   const w=weekByNumber(n.meta.week);expect(n.meta.produces).toEqual([w.output]);
   expect(n.meta.browserActivity).toBe("/"+n.id+"/#activity");
   expect(existsSync("public"+n.meta.campusPack)).toBe(true);
   const body=source(n.id),campus=readFileSync("public"+n.meta.campusPack,"utf8");
   for(const heading of ["## Before you arrive","## Supplied case file and rules","## The two-hour lab","## Browser route","## Campus route","## What leaves the room","## Feedback and explanation","## Closing reflection"])expect(body).toContain(heading);
   for(const range of ["0–10","10–30","30–60","60–80","80–105","105–120"])expect(body).toContain(range);
   for(const heading of ["## Equipment","## Facilitator setup","## Complete supplied rules","## Practice","## Skill check","## Transfer challenge","## Student record","## Explanation"])expect(campus).toContain(heading);
   expect(campus).toContain(w.output);
   for(const required of n.meta.requires)expect(nodes("sessions").some(p=>p.meta.week<n.meta.week&&p.meta.produces.includes(required))||n.meta.sampleAvailable).toBe(true);
   for(const id of n.meta.assessmentIds)expect(api.nodes.some(a=>a.id==="assessments/"+id)).toBe(true);
  }
 });
 it("aligns consequential teaching fixtures with the actual training models",()=>{
  const lab=(week:number)=>source("sessions/week-"+String(week).padStart(2,"0"));
  for(const phase of ["practice","check","transfer"] as const){
   expect(lab(1)).toContain(observationFacts[phase][0]!.label.match(/\d{2}:\d{2}/)![0]);
   for(const item of memoryItems[phase])expect(lab(2)).toContain(item);
   expect(lab(3)).toContain("level "+spatialTarget(phase).level);
   expect(lab(4)).toContain(String(mechanismConfig(phase).cam));
   const handoff=handoffTarget(phase);expect(lab(8)).toContain(handoff.destination);expect(lab(8)).toContain(handoff.code);
   expect(sensorCells(phase).length).toBe(4);
  }
  expect(lab(5)).toContain("continuity check");expect(lab(6)).toContain("M-99");
  expect(lab(7)).toContain("maintenance hold");expect(lab(10)).toContain("5×5");
 });
 it("keeps four assessments with exact weights, modes, dates and criterion descriptors",()=>{
  const assessed=nodes("assessments");
  expect(Object.fromEntries(assessed.map(n=>[n.id,n.meta.weight]))).toEqual({"assessments/fieldwork":10,"assessments/assignment-1":20,"assessments/assignment-2":25,"assessments/final-project":45});
  expect(assessed.reduce((sum,n)=>sum+n.meta.weight,0)).toBe(100);
  const find=(id:string)=>assessed.find(n=>n.id==="assessments/"+id)!;
  expect(find("assignment-1").meta.participation).toBe("individual");expect(find("assignment-2").meta.participation).toBe("pair");expect(find("final-project").meta.participation).toBe("group");
  expect(String(find("assignment-1").meta.due).slice(0,10)).toBe("2027-03-19");
  expect(String(find("assignment-2").meta.due).slice(0,10)).toBe("2027-04-30");
  expect(String(find("assignment-2").meta.checkpointDue).slice(0,10)).toBe("2027-04-23");
  expect(String(find("final-project").meta.due).slice(0,10)).toBe("2027-05-28");
  for(const a of assessed){
   expect(a.meta.marking.criteria.reduce((sum:number,c:{weight:number})=>sum+c.weight,0)).toBe(100);
   const body=source(a.id);expect(body).toContain("Criterion-specific performance standards");
   for(const c of a.meta.marking.criteria)expect(body).toContain("### "+c.name+" — "+c.weight+"%");
   for(const descriptor of ["Outstanding","Competent","Developing","Insufficient"])expect(body).toContain(descriptor);
   expect(existsSync("public/templates/"+a.id.split("/")[1]+".md")).toBe(true);
  }
 });
 it("requires preservation at the disruption rehearsal and accumulated evidence in the final",()=>{
  const w11=nodes("sessions").find(n=>n.meta.week===11)!;expect(w11.meta.disruption).toBe("IM-02");expect(w11.meta.preserves).toBe("original-plan");
  const final=api.nodes.find(n=>n.id==="assessments/final-project")!;
  expect(final.meta.requires).toEqual(weeks.slice(0,11).map(w=>w.output));expect(final.meta.requiresRevision).toBe(true);
  const finalText=source(final.id);for(const resolution of ["Physical recovery","Digital recovery","Stabilisation and handover"])expect(finalText).toContain(resolution);
 });
 it("publishes and links a fourteen-slide permissions deck with notes and HTML summary",()=>{
  const lecture=nodes("lectures").find(n=>n.meta.week===7)!;expect(lecture.meta.slides).toBe("/decks/week-07/");
  const deck=readFileSync("dist/decks/week-07/index.html","utf8");expect(deck).toContain("Challenge the System");expect(deck).toContain('class="notes"');
  const raw=readFileSync("src/decks/week-07.deck.mdx","utf8");expect((raw.match(/<DeckNav slide=/g)||[]).length).toBe(14);
  expect(source(lecture.id)).toContain("## Slide deck and readable summary");
  for(const n of nodes("lectures"))for(const heading of ["## What you will learn","## The briefing","## Worked example","## A plausible mistake","## Before the lab","## What happens next"])expect(source(n.id)).toContain(heading);
 });
 it("renders canonical assessment weights and Canberra deadlines",()=>{
  const index=readFileSync("dist/assessments/index.html","utf8");
  for(const a of nodes("assessments")){
   const page=readFileSync("dist/"+a.id+"/index.html","utf8");expect(page).toContain(String(a.meta.weight)+"%");expect(index).toContain(String(a.meta.weight)+"%");expect(page).toContain("17:00 Canberra");
  }
 });
});
