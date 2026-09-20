import * as THREE from 'three';
import type { DemoItem, DemoShot } from '../lib/demonstration-types';

function printed(text:string,width:number,height:number,background='#ece5d4',color='#16313a'){
 const canvas=document.createElement('canvas');canvas.width=768;canvas.height=384;
 const ctx=canvas.getContext('2d')!;ctx.fillStyle=background;ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle=color;
 const words=text.split(/\s+/);const lines:string[]=[];let line='';
 ctx.font='600 54px sans-serif';
 for(const word of words){const next=line?line+' '+word:word;if(ctx.measureText(next).width>690&&line){lines.push(line);line=word}else line=next}if(line)lines.push(line);
 const size=Math.min(62,260/Math.max(1,lines.length));ctx.font='600 '+size+'px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
 lines.slice(0,5).forEach((value,i)=>ctx.fillText(value,384,192+(i-(Math.min(lines.length,5)-1)/2)*size*1.2,700));
 const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;
 const mesh=new THREE.Mesh(new THREE.PlaneGeometry(width,height),new THREE.MeshBasicMaterial({map:tex,side:THREE.DoubleSide}));mesh.userData.demoLabel=true;return mesh;
}
/** Original alternate-example objects. Every shown fact comes from the authored item. */
export function demonstrationItem(item:DemoItem):THREE.Group {
 const group=new THREE.Group();group.name='demo-'+item.id;group.userData.demoItem=item.id;
 const surface=new THREE.MeshStandardMaterial({color:new THREE.Color(item.color),roughness:.42,metalness:item.shape==='lens'||item.shape==='key'?.6:.12});
 const dark=new THREE.MeshStandardMaterial({color:0x18343d,roughness:.65});
 const paper=new THREE.MeshStandardMaterial({color:0xece5d4,roughness:.9});
 const add=(geo:THREE.BufferGeometry,mat:THREE.Material,x=0,y=0,z=0)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;group.add(m);return m};
 if(item.shape==='lens'){
  add(new THREE.TorusGeometry(.23,.045,10,32),surface,0,.31);
  add(new THREE.CircleGeometry(.205,32),new THREE.MeshPhysicalMaterial({color:0x9cc4c6,transparent:true,opacity:.45,metalness:.12,roughness:.08}),0,.31,.006);
  add(new THREE.CylinderGeometry(.045,.06,.27,12),surface,0,.03);
 }else if(item.shape==='spool'){
  add(new THREE.CylinderGeometry(.18,.18,.35,32),surface,0,.24);
  for(const y of [.055,.42])add(new THREE.CylinderGeometry(.255,.255,.045,32),surface,0,y);
  for(let i=0;i<12;i++)add(new THREE.TorusGeometry(.182,.007,4,24),dark,0,.075+i*.027).rotation.x=Math.PI/2;
  add(new THREE.CylinderGeometry(.055,.055,.46,12),dark,0,.24);
 }else if(item.shape==='tile'){
  const tile=add(new THREE.BoxGeometry(.54,.08,.54),surface,0,.045);tile.rotation.y=.1;
  add(new THREE.TorusGeometry(.13,.008,4,24),dark,0,.09).rotation.x=-Math.PI/2;
 }else if(item.shape==='book'){
  add(new THREE.BoxGeometry(.45,.17,.59),paper,0,.10);
  for(const y of [.013,.195])add(new THREE.BoxGeometry(.49,.025,.63),surface,0,y);
  add(new THREE.BoxGeometry(.035,.19,.63),surface,-.245,.1);
  if(!item.text)for(let i=0;i<4;i++)add(new THREE.BoxGeometry(.012,.012,.57),surface,-.12+i*.07,.215);
  if(item.text){add(new THREE.BoxGeometry(.045,.22,.045),dark,0,.27,-.13);add(new THREE.BoxGeometry(.61,.33,.025),dark,0,.43,-.13);const label=printed(item.text,.57,.30);label.position.set(0,.43,-.114);group.add(label)}
 }else if(item.shape==='key'){
  add(new THREE.TorusGeometry(.145,.04,10,24),surface,-.13,.1).rotation.x=-Math.PI/2;
  add(new THREE.BoxGeometry(.35,.045,.055),surface,.16,.10);
  for(const x of [.20,.31])add(new THREE.BoxGeometry(.055,.045,.14),surface,x,.10,.045);
 }else if(item.shape==='clock'){
  add(new THREE.CylinderGeometry(.31,.31,.1,48),surface,0,.35).rotation.x=Math.PI/2;
  add(new THREE.CircleGeometry(.27,48),paper,0,.35,.056);
  for(let i=0;i<12;i++){const a=i*Math.PI/6;const tick=add(new THREE.BoxGeometry(.015,i%3===0?.06:.035,.01),dark,Math.sin(a)*.235,.35+Math.cos(a)*.235,.064);tick.rotation.z=-a}
  const time=item.time||item.text||'';const match=time.match(/(\d{1,2}):(\d{2})/);
  if(match){const hours=Number(match[1]),minutes=Number(match[2]);for(const [length,angle] of [[.14,((hours%12)+minutes/60)*Math.PI/6],[.20,minutes*Math.PI/30]]){const hand=add(new THREE.BoxGeometry(.018,length!,.013),dark,Math.sin(angle!)*length!/2,.35+Math.cos(angle!)*length!/2,.079);hand.rotation.z=-angle!}}
  add(new THREE.SphereGeometry(.024,12,8),surface,0,.35,.091);
  if(time){const label=printed(time,.52,.17);label.position.set(0,-.02,.08);group.add(label)}
 }else if(item.shape==='mug'){
  add(new THREE.CylinderGeometry(.19,.16,.34,32,1,true),surface,0,.19);
  add(new THREE.TorusGeometry(.178,.015,8,32),surface,0,.365).rotation.x=Math.PI/2;
  add(new THREE.CylinderGeometry(.15,.15,.025,24),dark,0,.17);
  if(!/jar/i.test(item.label))add(new THREE.TorusGeometry(.105,.025,10,24),surface,.235,.21).rotation.y=0;
 }else if(item.shape==='flask'){
  add(new THREE.CylinderGeometry(.15,.13,.42,28),surface,0,.22);
  add(new THREE.CylinderGeometry(.08,.12,.09,24),surface,0,.47);
  add(new THREE.CylinderGeometry(.085,.085,.045,24),dark,0,.535);
 }else if(item.shape==='hatch'){
  add(new THREE.BoxGeometry(.57,.54,.06),dark,0,.3);
  add(new THREE.BoxGeometry(.47,.43,.012),new THREE.MeshStandardMaterial({color:0x09171d,roughness:1}),0,.3,.04);
  const hinge=new THREE.Group();hinge.position.set(-.25,.3,.08);group.add(hinge);
  const isWindow=/window/i.test(item.label);
  const door=new THREE.Mesh(new THREE.BoxGeometry(.5,.45,.025),isWindow?new THREE.MeshPhysicalMaterial({color:0xa5c9d0,transparent:true,opacity:.45,roughness:.08,metalness:.15}):surface);door.position.x=.25;hinge.add(door);
  if(isWindow)for(const [x,y,w,h] of [[.25,.23,.54,.035],[.25,-.23,.54,.035],[0,0,.035,.48],[.5,0,.035,.48],[.25,0,.025,.46]]){const frame=new THREE.Mesh(new THREE.BoxGeometry(w!,h!,.055),surface);frame.position.set(x!,y!,.016);hinge.add(frame);}
  const handle=new THREE.Mesh(new THREE.BoxGeometry(.035,.09,.04),dark);handle.position.set(.43,0,.04);hinge.add(handle);
  hinge.rotation.y=item.open?-1.2:0;
 }else if(item.shape==='paper'){
  add(new THREE.BoxGeometry(.61,.025,.48),surface,0,.025);
  const text=printed(item.text||item.label,.57,.44);text.position.set(0,.041,0);text.rotation.x=-Math.PI/2;group.add(text);
 }else{
  add(new THREE.CylinderGeometry(.23,.26,.11,24),dark,0,.06);
  add(new THREE.CylinderGeometry(.17,.17,.34,24),surface,0,.28);
  add(new THREE.SphereGeometry(.18,20,12,0,Math.PI*2,0,Math.PI/2),new THREE.MeshStandardMaterial({color:item.color,emissive:item.color,emissiveIntensity:.6,roughness:.2}),0,.45);
  for(const sign of [-1,1])add(new THREE.BoxGeometry(.035,.4,.035),dark,sign*.20,.3);
 }
 return group;
}
export function demonstrationGear(teeth:number):THREE.Group {
 const count=Math.max(6,Math.min(48,Math.round(teeth))),radius=count*.018,inner=radius-.022,outer=radius+.028;
 const shape=new THREE.Shape();
 for(let i=0;i<count;i++)for(let j=0;j<4;j++){const angle=(i+j/4)*Math.PI*2/count,r=j===1||j===2?outer:inner,x=Math.cos(angle)*r,y=Math.sin(angle)*r;if(i===0&&j===0)shape.moveTo(x,y);else shape.lineTo(x,y)}
 shape.closePath();const bore=new THREE.Path();bore.absarc(0,0,.07,0,Math.PI*2,true);shape.holes.push(bore);
 if(count>=18)for(let i=0;i<6;i++){const angle=i*Math.PI/3,hole=new THREE.Path();hole.absarc(Math.cos(angle)*radius*.6,Math.sin(angle)*radius*.6,radius*.12,0,Math.PI*2,true);shape.holes.push(hole)}
 const geo=new THREE.ExtrudeGeometry(shape,{depth:.09,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.008,bevelThickness:.008,curveSegments:16});geo.translate(0,0,-.045);
 const mesh=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:0xd0a35d,metalness:.78,roughness:.28}));mesh.castShadow=true;mesh.receiveShadow=true;
 const group=new THREE.Group();group.name='DemoGear'+count;group.userData.teeth=count;group.add(mesh);
 const shaft=new THREE.Mesh(new THREE.CylinderGeometry(.052,.052,.16,16),new THREE.MeshStandardMaterial({color:0x344c53,metalness:.8,roughness:.3}));shaft.rotation.x=Math.PI/2;group.add(shaft);return group;
}
export function demonstrationCamera(shot:DemoShot,focus:THREE.Vector3,aspect:number,progress:number,reduced:boolean){
 const portrait=aspect<1.1,target=focus.clone();let offset:THREE.Vector3;
 // The lowest hanging fixture is at y=4.92; the teaching camera stays below it.
 if(shot==='overhead'){target.y=Math.min(target.y,1.4);offset=new THREE.Vector3(0,Math.max(.8,4.55-target.y),.05);}
 else if(shot==='establishing'){target.y=1.8;offset=new THREE.Vector3(portrait?2.5:4.2,2.75,portrait?8.7:7.5)}
 else if(shot==='shoulder')offset=new THREE.Vector3(2.7,1.5,portrait?5.6:4.4);
 else offset=new THREE.Vector3(.5,1.05,portrait?4.3:3.6);
 if(!reduced&&shot!=='overhead')offset.x+=Math.sin(Math.max(0,Math.min(1,progress))*Math.PI)*.22;
 return {position:target.clone().add(offset),target};
}
