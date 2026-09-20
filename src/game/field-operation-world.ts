import * as THREE from 'three';
import type {FieldOperationFrame} from '../scripts/field-operation-view';
import type {FieldOperationAction} from '../lib/field-operation';

/** Physical mission staging, driven entirely by the shared performed-operation state. */
export class FieldOperationWorld {
 readonly group=new THREE.Group();
 readonly source=new THREE.Vector3(-5.7,0,1.8);
 readonly receiver=new THREE.Vector3(5.7,0,1.8);
 readonly stops=[new THREE.Vector3(-4,0,4.5),new THREE.Vector3(0,0,5.6),new THREE.Vector3(4,0,4.5)];
 private frame?:FieldOperationFrame;private briefingOnly=false;
 private screen!:THREE.Mesh<THREE.PlaneGeometry,THREE.MeshBasicMaterial>;
 private screenKey='';
 private gate!:THREE.Mesh;private platform!:THREE.Mesh;private lamp!:THREE.Mesh;
 private case!:THREE.Group;private receiverLamp!:THREE.Mesh;
 private markers:THREE.Mesh[]=[];private labels:THREE.Mesh[]=[];
 private opened=0;private effect='';private routeKey='';private routeLines:THREE.Mesh[]=[];
 private owned:THREE.Material[]=[];private beacon!:THREE.Mesh;private beam!:THREE.Mesh;private aerial!:THREE.Group;private lid!:THREE.Mesh;private revisionBarrier!:THREE.Mesh;
 constructor(){
  const mat=(color:number,emissive=0)=>{const m=new THREE.MeshStandardMaterial({color,roughness:.5,metalness:.3,emissive,emissiveIntensity:.7});this.owned.push(m);return m;};
  const dark=mat(0x142c35),gold=mat(0xc49952),cream=mat(0xe0d5b4),glass=mat(0x3a5660);
  const box=(w:number,h:number,d:number,x:number,y:number,z:number,m:THREE.Material)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;this.group.add(o);return o;};
  // Wall-service station with attached screen, containment drawer and status mast.
  box(1.8,1,.85,-5.7,.5,1.8,dark);box(1.9,.1,.95,-5.7,1.04,1.8,gold);
  box(.1,2.1,.1,-6.45,1.1,1.45,gold);box(.1,2.1,.1,-4.95,1.1,1.45,gold);
  const sm=new THREE.MeshBasicMaterial({color:0xffffff});this.owned.push(sm);
  this.screen=new THREE.Mesh(new THREE.PlaneGeometry(2.1,1.15),sm);this.screen.position.set(-5.7,2.05,1.42);this.group.add(this.screen);
  this.lamp=box(.22,.22,.22,-6.4,2.85,1.45,mat(0xad6048));
  // A supported gate and moving cradle make enabling progress visible.
  box(.18,2.65,.35,-2.3,1.325,3.6,gold);box(.18,2.65,.35,.1,1.325,3.6,gold);box(2.6,.18,.35,-1.1,2.65,3.6,gold);
  this.gate=box(2.16,2.32,.15,-1.1,1.22,3.6,glass);
  this.platform=box(1.65,.14,1.2,-5.7,1.15,1.8,cream);
  box(1.8,.75,1.05,5.7,.375,1.8,dark);box(1.95,.12,1.15,5.7,.8,1.8,gold);
  this.receiverLamp=box(.16,.25,.16,6.35,1,1.5,mat(0xad6048));
  const label=this.text('RECEIVING STATION',2.3);label.position.set(5.7,1.65,1.6);this.group.add(label);
  this.case=new THREE.Group();
  const body=box(.67,.47,.33,0,0,0,dark);body.removeFromParent();this.case.add(body);
  const band=box(.7,.06,.35,0,.05,0,gold);band.removeFromParent();this.case.add(band);
  const handle=box(.25,.06,.08,0,.3,0,gold);handle.removeFromParent();this.case.add(handle);this.group.add(this.case);
  this.stops.forEach((p,i)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.48,.48,.035,24),mat(i?0xc49952:0x77cdb4));m.position.set(p.x,.025,p.z);this.group.add(m);this.markers.push(m);const t=this.text(String(i+1),.7);t.position.set(p.x,.55,p.z);this.group.add(t);this.labels.push(t);});
  
  // Different mission systems share the action model, but enact different visible effects.
  this.beacon=box(.35,.55,.35,-7.2,2.5,1.8,mat(0xb87949));
  box(.12,2.25,.12,-7.2,1.1,1.8,gold);
  const beamMaterial=new THREE.MeshBasicMaterial({color:0x9bdfbb,transparent:true,opacity:.16,depthWrite:false});this.owned.push(beamMaterial);
  this.beam=new THREE.Mesh(new THREE.ConeGeometry(1.15,3,24,1,true),beamMaterial);this.beam.rotation.z=Math.PI;this.beam.position.set(-7.2,4.15,1.8);this.group.add(this.beam);
  this.aerial=new THREE.Group();const dish=new THREE.Mesh(new THREE.SphereGeometry(.48,16,12,0,Math.PI*2,0,Math.PI/2),gold);dish.rotation.z=-Math.PI/4;this.aerial.add(dish);this.aerial.position.set(-7.2,2.8,1.8);this.group.add(this.aerial);
  this.lid=box(1.65,.1,1,-5.7,1.43,1.8,gold);
  this.revisionBarrier=box(1.5,.14,.12,2.2,.85,3.6,mat(0xae654f));
  this.group.name='FieldMissionStaging';this.group.visible=false;
 }
 private text(label:string,width:number){const canvas=document.createElement('canvas');canvas.width=768;canvas.height=128;const c=canvas.getContext('2d')!;c.fillStyle='#f6e3b3';c.font='600 40px system-ui';c.textAlign='center';c.fillText(label,384,76,735);const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;const mat=new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false});this.owned.push(mat);return new THREE.Mesh(new THREE.PlaneGeometry(width,width/6),mat);}
 setFrame(frame:FieldOperationFrame){
  if(this.routeKey!==frame.spec.id){this.routeKey=frame.spec.id;
   const layout=frame.spec.id.includes('-service-')?[[-6,4.7],[0,6.7],[6,4.7]]:frame.spec.id.includes('-lift-')?[[-3,3.1],[0,4.2],[3.5,3.1]]:[[-4,4.5],[0,5.6],[4,4.5]];
   this.stops.forEach((p,i)=>{p.set(layout[i]![0]!,0,layout[i]![1]!);this.markers[i]!.position.set(p.x,.025,p.z);this.labels[i]!.position.set(p.x,.55,p.z);});
   this.routeLines.forEach(o=>{o.removeFromParent();o.geometry.dispose();});this.routeLines=[];
   const nodes=[this.source,...this.stops.slice(0,frame.spec.checkpoints.length),this.receiver];
   for(let i=0;i<nodes.length-1;i++){const a=nodes[i]!,b=nodes[i+1]!,path=new THREE.Mesh(new THREE.BoxGeometry(.065,.022,a.distanceTo(b)),this.owned[1]!);path.position.copy(a).lerp(b,.5);path.position.y=.03;path.rotation.y=Math.atan2(b.x-a.x,b.z-a.z);this.group.add(path);this.routeLines.push(path);}
  }
  this.frame=frame;this.effect=frame.spec.effect;this.group.visible=true;this.refreshScreen();this.markers.forEach((o,i)=>{o.visible=i<frame.spec.checkpoints.length;this.labels[i]!.visible=o.visible;(o.material as THREE.MeshStandardMaterial).emissive.set(i<frame.state.visited.length?0x216c52:0);});this.case.visible=frame.state.executed;
  // Light transmission/report cargo reads as a document, heavy recovery as a supported case.
  const document=['report','signal','relay','revision','custody'].includes(frame.spec.effect)||/record|receipt|report|manifest|verification|charter|dossier/i.test(frame.spec.cargoLabel);this.case.scale.set(document?1.2:1,document?.22:1,document?1.3:1);
 }
 private refreshScreen(){if(!this.frame)return;const {spec,state}=this.frame;const status=state.delivered?'MISSION ACCOMPLISHED':state.carrying?'HANDOVER IN PROGRESS':state.executed?'SYSTEM ENABLED':state.verified?'SOLUTION VERIFIED':'INTERVENTION REQUIRED';const key=spec.id+status;if(key===this.screenKey)return;this.screenKey=key;
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=560;const c=canvas.getContext('2d')!;c.fillStyle='#102c33';c.fillRect(0,0,1024,560);c.strokeStyle=state.executed?'#84d6ae':'#d8a754';c.lineWidth=8;c.strokeRect(8,8,1008,544);c.fillStyle='#e6b95f';c.font='700 37px system-ui';c.fillText(status,42,70,940);c.fillStyle='#f1ecd8';c.font='600 38px system-ui';
  const wrap=(text:string,y:number,max:number)=>{let line='',row=0;for(const word of text.split(/\s+/)){if(c.measureText(line+' '+word).width>920&&line){c.fillText(line,42,y+row*49);line=word;if(++row>=max)return;}else line+=(line?' ':'')+word;}if(row<max)c.fillText(line,42,y+row*49);};
  wrap(spec.title,142,2);c.font='32px system-ui';wrap(state.executed?spec.consequence:spec.problem,265,5);
  this.screen.material.map?.dispose();const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;this.screen.material.map=texture;this.screen.material.needsUpdate=true;
 }
 target(action:FieldOperationAction){if(action.type==='deliver')return this.receiver.clone().add(new THREE.Vector3(0,0,1));if(action.type==='checkpoint'){const index=this.frame?.spec.checkpoints.indexOf(action.id)??-1;return this.stops[Math.max(0,Math.min(index,2))]!.clone();}return this.source.clone().add(new THREE.Vector3(0,0,1));}
 setBriefingOnly(value:boolean){this.briefingOnly=value;this.group.visible=true;for(const child of this.group.children)child.visible=!value||(child.position.x<-4.8&&child.position.z<2.9);if(value)this.case.visible=false;else if(this.frame){this.case.visible=this.frame.state.executed;this.markers.forEach((marker,i)=>{marker.visible=i<this.frame!.spec.checkpoints.length;this.labels[i]!.visible=marker.visible;});}}
 equipment(){return [{mesh:this.screen,label:'Mission station · inspect, intervene and collect',id:'field-station',at:this.source.clone().add(new THREE.Vector3(0,1.5,0))},{mesh:this.receiverLamp,label:'Receiving station · complete the handover',id:'field-receiver',at:this.receiver.clone().add(new THREE.Vector3(0,1,0))},...this.markers.map((mesh,i)=>({mesh,label:'Route checkpoint '+(i+1),id:'field-checkpoint-'+i,at:this.stops[i]!.clone().add(new THREE.Vector3(0,.5,0))}))];}
 tick(dt:number,player:THREE.Object3D,reduced:boolean){if(!this.frame||!this.group.visible)return;if(this.briefingOnly)return;const s=this.frame.state;const desired=s.executed?1:0;this.opened=reduced?desired:THREE.MathUtils.damp(this.opened,desired,5,dt);
  this.gate.position.y=1.22+this.opened*2.35;this.platform.position.y=1.15+(['lift','recovery','door'].includes(this.effect)?this.opened*.65:0);
  (this.lamp.material as THREE.MeshStandardMaterial).color.set(s.executed?0x77cdb4:0xad6048);(this.receiverLamp.material as THREE.MeshStandardMaterial).emissive.set(s.delivered?0x347b57:0);
  const signal=['power','signal','relay','report'].includes(this.effect);
  this.beacon.visible=signal;this.beam.visible=signal&&s.executed;this.aerial.visible=['signal','relay','report'].includes(this.effect);
  this.beacon.material instanceof THREE.MeshStandardMaterial&&this.beacon.material.emissive.set(s.executed?0x7aab53:0);
  if(s.executed&&!reduced)this.aerial.rotation.y+=dt*.5;
  this.lid.visible=['archive','custody'].includes(this.effect);this.lid.position.x=-5.7+this.opened*1.7;
  this.revisionBarrier.visible=this.effect==='revision';this.revisionBarrier.rotation.z=.08;
  this.gate.visible=['door','route','revision','recovery','lift'].includes(this.effect);
  this.case.visible=s.executed;
  if(s.carrying){this.case.position.copy(player.position).add(new THREE.Vector3(.55,1.08,0));this.case.rotation.y=player.rotation.y;}
  else{this.case.position.copy(s.delivered?this.receiver:this.source);this.case.position.y=s.delivered?1.1:this.platform.position.y+.3;this.case.rotation.y=0;}
 }
 dispose(){this.group.removeFromParent();this.group.traverse(o=>{if(o instanceof THREE.Mesh)o.geometry.dispose();});this.owned.forEach(m=>{if(m instanceof THREE.MeshBasicMaterial)m.map?.dispose();m.dispose();});}
}
