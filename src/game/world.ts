import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { sensorCells, memoryItems, loci, type TrainingPhase } from '../lib/training-engine'; import RAPIER from '@dimforge/rapier3d-compat';

type RoomId = 'atrium'|'perception'|'spatial'|'mechanics'|'systems'|'digital'|'council'|'movement'|'operations';
type Equipment = { mesh: THREE.Object3D; label:string; id:string; at:THREE.Vector3; travel?:string };
type SceneUpdate = {kind?:string;week?:number;phase?:string;values?:Record<string,string|number|boolean>;sequence?:string[];feedback?:string;complete?:boolean;zone?:string;[key:string]:unknown};
const ROOMS: Record<RoomId,{name:string;week:number;tone:number}> = {
 atrium:{name:'Academy atrium',week:0,tone:0x335861},perception:{name:'Perception Gallery',week:1,tone:0x57766b},
 spatial:{name:'Spatial Lab',week:3,tone:0x5c7189},mechanics:{name:'Mechanics Workshop',week:4,tone:0x967653},
 systems:{name:'Systems Garage',week:5,tone:0x637b71},digital:{name:'Digital Observatory',week:6,tone:0x45667d},
 council:{name:'Council Studio',week:8,tone:0x8a6968},movement:{name:'Movement Hall',week:10,tone:0x526e75},
 operations:{name:'Operations Studio',week:11,tone:0x786748}
};
const ZONES = {arrival:'Arrival hall',workshop:'Workshop',power:'Power bay',control:'Control room',archive:'Archive chamber',dispatch:'Dispatch platform'};
const ZONE_ROOMS:Record<string,RoomId>={arrival:'perception',workshop:'mechanics',power:'systems',control:'digital',archive:'operations',dispatch:'movement'};
const ROOM_ALIASES:Record<string,RoomId>={observation:'perception',memory:'perception',mechanism:'mechanics',electronics:'systems',investigation:'digital',cybersecurity:'digital',communication:'council',identity:'council',stealth:'movement',rehearsal:'operations'};
const materials = {
 floorA:new THREE.MeshStandardMaterial({color:0x929f98,roughness:.82}),floorB:new THREE.MeshStandardMaterial({color:0xb6b8a7,roughness:.82}),stone:new THREE.MeshStandardMaterial({color:0xd4c7ae,roughness:.83}),wall:new THREE.MeshStandardMaterial({color:0x697a78,roughness:.92}),
 dark:new THREE.MeshStandardMaterial({color:0x20353d,roughness:.7}),bronze:new THREE.MeshStandardMaterial({color:0xc99b52,metalness:.65,roughness:.35}),
 green:new THREE.MeshStandardMaterial({color:0x7db7a4,roughness:.52}),glow:new THREE.MeshStandardMaterial({color:0xf7d6a0,emissive:0xc49a56,emissiveIntensity:.7}),
 teal:new THREE.MeshStandardMaterial({color:0x8cd9c7,emissive:0x407c6d,emissiveIntensity:.4}),glass:new THREE.MeshStandardMaterial({color:0x59838d,transparent:true,opacity:.26,roughness:.3,metalness:.2}),
 red:new THREE.MeshStandardMaterial({color:0xd88259,roughness:.6})
};
export class AcademyWorld {
 private root:HTMLElement;private scene=new THREE.Scene();private camera=new THREE.PerspectiveCamera(56,1,.08,120);
 private renderer!:THREE.WebGLRenderer;private stage:HTMLElement;private environment=new THREE.Group();private kit!:THREE.Group;
 private player!:THREE.Object3D;private physics!:RAPIER.World;private body!:RAPIER.RigidBody;private collider!:RAPIER.Collider;
 private controller!:RAPIER.KinematicCharacterController;private colliders:RAPIER.Collider[]=[];private equipment:Equipment[]=[];private selected?:Equipment;private selectionHelper?:THREE.BoxHelper;private actionTime=0;
 private animated:THREE.Object3D[]=[];private gears:THREE.Object3D[]=[];private gearTargets=[0,0];private dynamic:Record<string,THREE.Object3D>={};
 private resize?:ResizeObserver;private cleanups:Array<()=>void>=[];private frame=0;private elapsed=0;private last=0;
 private disposed=false;private paused=false;private inspect=false;private moving=false;private keys=new Set<string>();private target?:THREE.Vector3;
 private azimuth=0;private pitch=.36;private drag?:{x:number;y:number;startX:number;startY:number;moved:boolean};
 private reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;private ray=new THREE.Raycaster();private pointer=new THREE.Vector2();
 private room:RoomId='atrium';private zone='arrival';private state:SceneUpdate={};private week:number;private mode:string;private base:string;private low=false;private statusText='';
 constructor(root:HTMLElement){
  this.root=root;this.stage=root.querySelector<HTMLElement>('[data-world-canvas]')!;
  this.week=Number(root.dataset.week||0);this.mode=root.dataset.mode||'lab';this.base=root.dataset.base||'';
  const weekRooms=['atrium','perception','perception','spatial','mechanics','systems','digital','digital','council','council','movement','operations','operations']; const raw=root.dataset.room||'atrium'; const requested=/^\d+$/.test(raw)?weekRooms[Number(raw)]||'atrium':raw;this.room=(requested in ROOMS?requested:ROOM_ALIASES[requested]||'atrium') as RoomId;
  if(this.mode==='mission')this.room='perception';
 }
 async start(){
  this.renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
  this.renderer.setClearColor(0x344f58);this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;
  this.renderer.toneMappingExposure=1.05;this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  this.stage.append(this.renderer.domElement);this.renderer.domElement.tabIndex=0;
  this.renderer.domElement.setAttribute('aria-label','Interactive third-person academy. Move with W A S D or arrows. Press E to inspect. Equipment also has buttons.');
  this.renderer.domElement.setAttribute('role','application');
  await RAPIER.init();this.physics=new RAPIER.World({x:0,y:-9.81,z:0});this.controller=this.physics.createCharacterController(.015);
  this.controller.enableAutostep(.22,.3,true);this.controller.enableSnapToGround(.3);
  this.body=this.physics.createRigidBody(RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(0,.87,2.8));
  this.collider=this.physics.createCollider(RAPIER.ColliderDesc.capsule(.53,.27),this.body);
  const asset=await new GLTFLoader().loadAsync(this.base+'/world/academy-kit.glb');this.kit=asset.scene;this.player=this.asset('Student');this.player.name='StudentAvatar';this.scene.add(this.player);this.player.position.set(0,.07,2.8);
  this.scene.fog=new THREE.Fog(0x344f58,26,72);this.scene.add(new THREE.HemisphereLight(0xe8f2e5,0x405b69,2));
  const sun=new THREE.DirectionalLight(0xffe1ae,2.8);sun.position.set(-7,14,7);sun.castShadow=true;
  sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-14;sun.shadow.camera.right=14;sun.shadow.camera.top=14;sun.shadow.camera.bottom=-14;sun.shadow.normalBias=.04;this.scene.add(sun);
  const fill=new THREE.DirectionalLight(0x98bacf,1.5);fill.position.set(9,7,-6);this.scene.add(fill);this.scene.add(this.environment);
  this.buildRoom();this.installControls();this.root.querySelector<HTMLElement>('.world-poster')!.hidden=true;
  for(const selector of ['[data-world-canvas]','[data-world-hud]','[data-world-toolbar]'])this.root.querySelector<HTMLElement>(selector)!.hidden=false;
  this.resize=new ResizeObserver(()=>this.resizeView());this.resize.observe(this.stage);this.resizeView();this.setQuality('auto');
  this.camera.position.set(5,4,11);this.frame=requestAnimationFrame(this.tick);this.status('Walk, tap the floor, or inspect an instrument.');this.renderer.domElement.focus({preventScroll:true});
  window.dispatchEvent(new CustomEvent('mastermind:scene-ready',{detail:{week:this.week,room:this.room}}));
 }
 private asset(name:string){const object=this.kit.getObjectByName(name);if(!object)throw new Error('Missing local asset: '+name);const clone=object.clone(true);clone.traverse(o=>{if(o instanceof THREE.Mesh){o.castShadow=true;o.receiveShadow=true;}});if(!['Student','Mara'].includes(name))this.batchAsset(clone);else{const body=new THREE.Group();for(const child of [...clone.children])if(child instanceof THREE.Mesh)body.add(child);clone.add(body);this.batchAsset(body);for(const joint of ['ArmL','ArmR','LegL','LegR']){const limb=clone.getObjectByName(joint);if(limb)this.batchAsset(limb);}}return clone}
 private batchAsset(object:THREE.Object3D){
  object.updateMatrixWorld(true);const inverse=object.matrixWorld.clone().invert();
  const groups=new Map<string,{material:THREE.Material;meshes:THREE.Mesh[]}>();
  object.traverse(o=>{if(o instanceof THREE.Mesh&&!Array.isArray(o.material)){const key=o.material.uuid+Object.keys(o.geometry.attributes).sort().join(',');if(!groups.has(key))groups.set(key,{material:o.material,meshes:[]});groups.get(key)!.meshes.push(o)}});
  for(const {material,meshes} of groups.values()){
   const geometries=meshes.map(m=>m.geometry.clone().applyMatrix4(m.matrixWorld));
   const merged=mergeGeometries(geometries,false);geometries.forEach(g=>g.dispose());if(!merged)continue;
   meshes.forEach(m=>m.removeFromParent());const mesh=new THREE.Mesh(merged,material);mesh.castShadow=true;mesh.receiveShadow=true;mesh.geometry.applyMatrix4(inverse);object.add(mesh);
  }
 }
 private addAsset(name:string,x:number,y:number,z:number,scale=1){const obj=this.asset(name);obj.position.set(x,y,z);obj.scale.setScalar(scale);this.environment.add(obj);return obj}
 private box(w:number,h:number,d:number,x:number,y:number,z:number,mat:THREE.Material=materials.stone){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.receiveShadow=true;m.castShadow=true;this.environment.add(m);return m}
 private cylinder(r:number,h:number,x:number,y:number,z:number,mat:THREE.Material=materials.bronze,segments=24){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,segments),mat);m.position.set(x,y,z);m.receiveShadow=true;m.castShadow=true;this.environment.add(m);return m}
 private ring(r:number,t:number,x:number,y:number,z:number,mat:THREE.Material=materials.bronze){const m=new THREE.Mesh(new THREE.TorusGeometry(r,t,8,48),mat);m.position.set(x,y,z);this.environment.add(m);return m}
 private line(points:THREE.Vector3[],material:THREE.Material=materials.bronze,r=.025){const curve=new THREE.CatmullRomCurve3(points);const m=new THREE.Mesh(new THREE.TubeGeometry(curve,18,r,6,false),material);this.environment.add(m);return m}
 private solid(w:number,h:number,d:number,x:number,y:number,z:number){const c=this.physics.createCollider(RAPIER.ColliderDesc.cuboid(w/2,h/2,d/2).setTranslation(x,y,z));this.colliders.push(c)}
 private text(label:string,x:number,y:number,z:number,width=3,color='#f9e7c7'){
  const canvas=document.createElement('canvas');canvas.width=768;canvas.height=128;const ctx=canvas.getContext('2d')!;ctx.clearRect(0,0,768,128);ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='600 42px system-ui, sans-serif';ctx.fillText(label,384,64,730);
  const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(width,width/6),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false}));mesh.position.set(x,y,z);this.environment.add(mesh);return mesh;
 }
 private equipmentAt(mesh:THREE.Object3D,label:string,id:string,at?:THREE.Vector3,travel?:string){this.equipment.push({mesh,label,id,at:at||mesh.position.clone().add(new THREE.Vector3(0,1,0)),travel});mesh.userData.equipment=id}
 private buildRoom(){
  this.colliders.forEach(c=>this.physics.removeCollider(c,true));this.colliders=[];
  const assetGeometries=new Set<THREE.BufferGeometry>();const retainedMaterials=new Set<THREE.Material>(Object.values(materials));this.kit.traverse(o=>{if(o instanceof THREE.Mesh){assetGeometries.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:[o.material])retainedMaterials.add(m);}});
  this.environment.traverse(o=>{if(o instanceof THREE.Mesh){if(o.material instanceof THREE.MeshBasicMaterial&&o.material.map){o.material.map.dispose();o.material.dispose()}if(!assetGeometries.has(o.geometry))o.geometry.dispose();for(const m of Array.isArray(o.material)?o.material:[o.material])if(!retainedMaterials.has(m))m.dispose();}});
  this.environment.clear();this.equipment=[];this.animated=[];this.gears=[];this.dynamic={};this.selected=undefined;this.inspect=false;
  this.makeArchitecture();if(this.room==='atrium')this.makeAtrium();else this.makeEquipment();
  this.player.visible=true;this.player.rotation.y=Math.PI;this.player.position.set(0,.07,2.8);this.body.setTranslation({x:0,y:.87,z:2.8},true);this.azimuth=0;this.target=undefined;
  this.root.querySelector<HTMLElement>('[data-world-location]')!.textContent=this.mode==='mission'?'MERIDIAN / '+ZONES[this.zone as keyof typeof ZONES]:ROOMS[this.room].name;
  const menu=this.root.querySelector<HTMLSelectElement>('[data-world-equipment]')!;menu.replaceChildren();this.equipment.forEach((item,i)=>{const option=document.createElement('option');option.value=String(i);option.textContent=item.label;menu.append(option)});const first=this.equipment.find(e=>!e.travel)||this.equipment[0];if(first)this.select(first);this.updateModels();
 }
 private makeArchitecture(){
  const room=ROOMS[this.room];const wall=new THREE.MeshStandardMaterial({color:room.tone,roughness:.88});
  this.box(22,.3,21,0,-.18,0,materials.dark);this.solid(22,.4,21,0,-.2,0);
  for(let x=-9;x<=9;x+=3)for(let z=-7.5;z<=7.5;z+=3)this.box(2.94,.035,2.94,x,.013,z,(Math.round(x/3)+Math.round(z/3))%2?materials.floorA:materials.floorB);
  this.box(20,6,.3,0,3,-8.6,wall);this.solid(21,7,.4,0,3.5,-8.8);
  for(const sign of [-1,1]){this.box(.3,6,18,10*sign,3,0,wall);this.solid(.4,7,19,10.2*sign,3.5,0);this.box(.35,.18,18,9.8*sign,.2,0,materials.bronze)}
  this.solid(21,4,.4,0,2,9);this.box(20,.18,.22,0,.22,-8.36,materials.bronze);
  for(const x of [-8,-4,0,4,8]){
   this.box(.42,5.8,.45,x,2.9,-8.25,materials.stone);this.box(.7,.24,.75,x,.16,-8.25,materials.dark);this.box(.65,.22,.7,x,5.5,-8.25,materials.bronze);
   this.box(2.6,2.9,.05,x,3.2,-8.4,materials.dark);this.box(2.34,2.62,.05,x,3.2,-8.36,materials.glass);
   for(let j=0;j<4;j++)this.box(.035,2.65,.06,x-.9+j*.6,3.2,-8.3,materials.bronze);
  }
  for(const sign of [-1,1])for(const z of [-6,0,6]){this.box(.45,5.8,.45,9.55*sign,2.9,z,materials.stone);this.box(.7,.24,.75,9.55*sign,.17,z,materials.dark)}
  for(const z of [-6,0,6]){const arch=new THREE.Mesh(new THREE.TorusGeometry(3,.12,8,32,Math.PI),materials.stone);arch.position.set(0,4.2,z);this.environment.add(arch);arch.scale.x=3.2;arch.scale.y=.48;this.box(19.2,.12,.16,0,5.38,z,materials.bronze)}
  for(const x of [-7,7]){this.addAsset('Planter',x,0,6,1.25);this.addAsset('Planter',x,0,-6,1.1)}
  for(const x of [-7,-3,3,7])this.box(.07,.015,15,x,.041,0,materials.bronze);
  this.box(19,.015,.05,0,.042,4,materials.bronze);
  for(let x=-8;x<=8;x+=4){this.box(.15,.2,17,x,6.1,0,materials.dark);this.box(.04,1.05,.04,x,5.55,-2,materials.bronze);this.box(2,.13,.4,x,5,-2,materials.bronze);this.box(1.85,.03,.32,x,4.92,-2,materials.glow)}
  this.text(this.mode==='mission'?'MERIDIAN · '+ZONES[this.zone as keyof typeof ZONES].toUpperCase():ROOMS[this.room].name.toUpperCase(),0,4.25,-8.05,8);
  this.text(this.mode==='mission'?'OPERATION LAST LIGHT':'THE ACADEMY OF IMPOSSIBLE SKILLS',0,3.78,-8.02,5,'#e3c181');
  const glow=new THREE.PointLight(0xffc874,18,12,2);glow.position.set(0,3.6,-3);this.environment.add(glow);
  for(let i=0;i<14;i++){const h=5+((i*7)%9);this.box(2.6,h,3,-23+i*3.5,h/2,-24,new THREE.MeshStandardMaterial({color:0x36535e,roughness:1}));}
  this.addAsset('Mara',5.3,0,-4.8,1.05).rotation.y=-.65;this.text('DR MARA VOSS',5.3,2.1,-4.8,1.8,'#f7db9e');this.batchArchitecture();
 }

 private batchArchitecture(){
  const batches=new Map<string,{material:THREE.Material;meshes:THREE.Mesh[]}>();const assets=new Set<THREE.BufferGeometry>();this.kit.traverse(o=>{if(o instanceof THREE.Mesh)assets.add(o.geometry)});
  this.environment.updateMatrixWorld(true);
  this.environment.traverse(o=>{
   if(!(o instanceof THREE.Mesh)||Array.isArray(o.material)||o.material.transparent)return;
   const key=o.material.uuid+Object.keys(o.geometry.attributes).sort().join(',')+Boolean(o.geometry.index);
   if(!batches.has(key))batches.set(key,{material:o.material,meshes:[]});batches.get(key)!.meshes.push(o);
  });
  for(const {material,meshes} of batches.values()){
   if(meshes.length<2)continue;
   const geometries=meshes.map(m=>m.geometry.clone().applyMatrix4(m.matrixWorld));
   const merged=mergeGeometries(geometries,false);geometries.forEach(g=>g.dispose());if(!merged)continue;
   meshes.forEach(m=>{m.removeFromParent();if(!assets.has(m.geometry))m.geometry.dispose()});const mesh=new THREE.Mesh(merged,material);mesh.castShadow=true;mesh.receiveShadow=true;this.environment.add(mesh);
  }
 }
 private makeAtrium(){
  this.cylinder(2.8,.18,0,.1,-1,materials.dark);this.cylinder(2.4,.14,0,.26,-1,materials.bronze);
  const core=this.addAsset('Archive',0,.34,-1,2);this.equipmentAt(core,'Academy orientation','orientation',new THREE.Vector3(0,1.9,-1));
  const globe=this.ring(1.8,.025,0,2.2,-1);globe.rotation.y=.5;this.animated.push(globe);
  const ring=this.ring(1.95,.025,0,2.2,-1);ring.rotation.x=1.2;this.animated.push(ring);this.solid(3,2,3,0,1,-1);
  const entries=(Object.keys(ROOMS) as RoomId[]).filter(r=>r!=='atrium');const spots=[[-7,-6],[-3.4,-6],[3.4,-6],[7,-6],[-7,0],[7,0],[-7,4],[7,4]];
  entries.forEach((room,i)=>{
   const [x,z]=spots[i]!;const frame=new THREE.Group();frame.position.set(x!,0,z!);this.environment.add(frame);
   for(const sign of [-1,1]){const p=new THREE.Mesh(new THREE.BoxGeometry(.12,2.65,.22),materials.bronze);p.position.set(sign*.88,1.32,0);frame.add(p)}
   const cap=new THREE.Mesh(new THREE.BoxGeometry(1.88,.12,.22),materials.bronze);cap.position.set(0,2.7,0);frame.add(cap);
   const glass=new THREE.Mesh(new THREE.PlaneGeometry(1.6,2.4),new THREE.MeshStandardMaterial({color:ROOMS[room].tone,emissive:ROOMS[room].tone,emissiveIntensity:.25,transparent:true,opacity:1,side:THREE.DoubleSide}));glass.position.y=1.35;frame.add(glass);
   this.text(String(i+1).padStart(2,'0'),x!,1.65,z!+.04,1,'#e9c77e');this.text(ROOMS[room].name,x!,2.98,z!+.08,2.9,'#fff1cb');
   this.equipmentAt(frame,ROOMS[room].name,'travel-'+room,new THREE.Vector3(x!,1.3,z!),room);
  });
 }
 private makeEquipment(){
  const bench=this.addAsset('Workbench',0,0,-3,1.35);this.solid(3.6,1.5,1.7,0,.75,-3);
  this.addAsset('Stool',-2,0,-.7);this.addAsset('Stool',2,0,-.7);this.addAsset('Workbench',-6,0,-5,.8);this.addAsset('Console',6.4,0,1);
  for(let i=0;i<4;i++){const book=this.addAsset('Book',-6+i*.16,.91,-5,1);book.rotation.y=i*.3}
  this.text(this.subtitle(),0,2.95,-4.02,4.8,'#f2d28e');
  if(this.room==='mechanics')this.makeMechanism(bench);else if(this.room==='systems')this.makeCircuit(bench);else if(this.room==='spatial')this.makeSpatial(bench);
  else if(this.room==='perception')this.makePerception(bench);else if(this.room==='digital')this.makeDigital(bench);else if(this.room==='council')this.makeCouncil(bench);
  else if(this.room==='movement')this.makeSensors(bench);else this.makeOperations(bench);
  this.addAsset('Planter',-5,0,2);const entry=this.box(1.5,2.4,.07,-8,1.3,5,materials.dark);this.text(this.mode==='mission'?'NEXT ZONE':'RETURN TO ATRIUM',-8,1.6,5.05,1.4);
  this.equipmentAt(entry,this.mode==='mission'?'Travel through Meridian':'Return to academy atrium','exit',new THREE.Vector3(-8,1.3,5),this.mode==='mission'?'next':'atrium');
 }
 private subtitle(){return {mechanics:'PREDICT · OPERATE · DIAGNOSE',systems:'MEASURE BEFORE YOU REPLACE',perception:this.week===2?'MAKE A PLACE FOR A MEMORY':'NOTICE WHAT CHANGES',spatial:'ONE OBJECT · MANY PERSPECTIVES',digital:this.week===7?'IDENTITY × ACTION × PERMISSION':'FOLLOW THE EVIDENCE',council:'INFORMATION IS UNEVENLY DISTRIBUTED',movement:'PREDICT THE SENSOR MODEL',operations:'A PLAN IS A TESTABLE CLAIM',atrium:''}[this.room]}
 private makeMechanism(_bench:THREE.Object3D){
  const backing=this.box(3.05,1.58,.16,0,2.18,-3.35,materials.dark);this.box(3.16,.07,.26,0,3,-3.34,materials.bronze);
  for(const [x,teeth] of [[-.64,12],[.06,24]]){const g=this.addAsset('Gear'+teeth,x!,2.2,-3.19);g.userData.teeth=teeth;this.gears.push(g);this.ring(.07,.018,x!,2.2,-3.04,materials.glow)}
  const cam=new THREE.Mesh(new THREE.CircleGeometry(.22,24),materials.red);cam.position.set(.64,2.2,-2.99);cam.scale.set(1.3,.8,1);this.environment.add(cam);this.dynamic.cam=cam;
  this.dynamic.crank=this.box(.7,.08,.08,-.99,2.2,-2.93,materials.bronze);
  const handle=this.cylinder(.08,.24,-1.33,2.2,-2.87,materials.green);handle.rotation.x=Math.PI/2;
  this.dynamic.lock=this.box(.16,.43,.13,1.31,2.2,-3.1,materials.red);
  const points=[];for(let i=0;i<80;i++){const a=i*.5;points.push(new THREE.Vector3(-1.1+Math.cos(a)*.045,1.66+i*.005,-3.05+Math.sin(a)*.045))}this.dynamic.spring=this.line(points,materials.bronze,.012);
  this.text('DRIVER',-.65,1.8,-3.04,.65);this.text('FOLLOWER',.65,1.8,-3.04,.8);
  this.equipmentAt(backing,'Training mechanism · gears, cam and interlock','mechanism',new THREE.Vector3(0,2.15,-3.2));
  this.equipmentAt(handle,'Turn the crank','crank',new THREE.Vector3(-.6,2.2,-3));this.equipmentAt(this.gears[1]!,'Change the driven gear','gear',new THREE.Vector3(.06,2.2,-3));this.equipmentAt(cam,'Set the cam angle','cam',new THREE.Vector3(.06,2.2,-3));this.equipmentAt(this.dynamic.lock!,'Release or engage the interlock','interlock',new THREE.Vector3(1.3,2.2,-3));this.equipmentAt(this.dynamic.spring!,'Attach or detach the return spring','spring',new THREE.Vector3(-1.1,1.8,-3));this.dynamic.readout=this.text('12 : 24',0,3.3,-3.2,1.4,'#f4d599');
 }
 private makeCircuit(_bench:THREE.Object3D){
  const cart=this.addAsset('ServiceCart',-4,0,-.5,1.3);cart.rotation.y=.4;
  const plate=this.box(2.9,.10,1.14,0,1.6,-3,materials.dark);const battery=this.box(.43,.4,.4,-1.05,1.85,-3,materials.green);
  this.box(.1,.07,.1,-1.05,2.075,-3,materials.bronze);this.text('6 V',-1.05,2.2,-2.96,.55);
  const fuse=this.box(.45,.13,.2,-.25,1.75,-3,materials.stone);this.box(.13,.15,.23,-.48,1.75,-3,materials.bronze);this.box(.13,.15,.23,-.02,1.75,-3,materials.bronze);
  this.cylinder(.24,.23,1,1.75,-3,materials.bronze);
  const bulb=new THREE.Mesh(new THREE.SphereGeometry(.2,20,12),new THREE.MeshStandardMaterial({color:0x989582,emissive:0x000000}));bulb.position.set(1,2,-3);this.environment.add(bulb);this.dynamic.bulb=bulb;
  this.line([new THREE.Vector3(-1.05,1.67,-2.7),new THREE.Vector3(-1.05,1.7,-2.5),new THREE.Vector3(1,1.7,-2.5),new THREE.Vector3(1,1.75,-3)],materials.red);
  this.line([new THREE.Vector3(-1.05,1.7,-3.2),new THREE.Vector3(-1.05,1.7,-3.45),new THREE.Vector3(1,1.7,-3.45),new THREE.Vector3(1,1.75,-3)],materials.green);
  this.box(.37,.11,.6,.25,1.71,-2.7,materials.bronze);this.box(.25,.012,.25,.25,1.775,-2.84,materials.teal);
  this.equipmentAt(plate,'Six-volt diagnostic bench','circuit',new THREE.Vector3(0,1.9,-3));this.equipmentAt(battery,'Measure the battery','measure-battery',new THREE.Vector3(-1,1.9,-3));
  this.equipmentAt(fuse,'Measure across the fuse','measure-fuse',new THREE.Vector3(-.25,1.8,-3));this.equipmentAt(bulb,'Measure the lamp','measure-lamp',new THREE.Vector3(1,2,-3));
 }
 private makeSpatial(_bench:THREE.Object3D){
  const assembly=new THREE.Group();assembly.position.set(0,1.6,-3);this.environment.add(assembly);this.dynamic.assembly=assembly;
  const cubes=[[0,0,0],[1,0,0],[2,0,0],[0,1,0],[0,1,1],[0,2,1]];
  cubes.forEach(([x,y,z],i)=>{const cube=new THREE.Mesh(new THREE.BoxGeometry(.47,.47,.47),i%2?materials.bronze:materials.green);cube.position.set((x!-1)*.5,y!*.5+.235,z!*.5);cube.castShadow=true;assembly.add(cube)});
  this.equipmentAt(assembly,'Spatial assembly · rotate the model','spatial',new THREE.Vector3(0,2.2,-3));this.text('FRONT',0,1.73,-2.2,1);this.text('PLAN / ELEVATION',0,3.5,-3.4,2.4);
  this.box(1.8,1.8,.08,-3,2.2,-3.5,materials.dark);for(let i=0;i<4;i++){this.box(.025,1.5,.025,-3.6+i*.4,2.2,-3.44,materials.bronze);this.box(1.5,.025,.025,-3,1.6+i*.4,-3.44,materials.bronze)}
 }
 private makePerception(bench:THREE.Object3D){
  const observations=new THREE.Group();observations.position.set(0,1.53,-3);this.environment.add(observations);this.dynamic.observations=observations;
  const orb=new THREE.Mesh(new THREE.IcosahedronGeometry(.19,0),materials.red);orb.position.set(-.8,.24,.15);observations.add(orb);
  const clock=new THREE.Mesh(new THREE.CylinderGeometry(.23,.23,.06,24),materials.bronze);clock.rotation.x=Math.PI/2;clock.position.set(.75,.28,.05);observations.add(clock);
  const face=new THREE.Mesh(new THREE.CircleGeometry(.2,24),materials.stone);face.position.set(.75,.28,.086);observations.add(face);
  const needle=new THREE.Mesh(new THREE.BoxGeometry(.018,.17,.02),materials.dark);needle.position.set(.75,.34,.10);needle.rotation.z=.7;observations.add(needle);this.dynamic.clockMinute=needle;const hour=new THREE.Mesh(new THREE.BoxGeometry(.025,.12,.025),materials.dark);hour.position.set(.75,.32,.11);observations.add(hour);this.dynamic.clockHour=hour;this.dynamic.clockLabel=this.text('08:20',.75,2.25,-2.92,.9);
  const book=this.asset('Book');book.position.set(-.23,.02,-.1);book.rotation.y=-.3;observations.add(book);
  const cup=new THREE.Mesh(new THREE.CylinderGeometry(.09,.075,.22,16),materials.green);cup.position.set(.2,.11,.3);observations.add(cup);cup.material=materials.green.clone();this.dynamic.cup=cup;this.dynamic.note=this.text('I left first',-.15,2.2,-3.2,1.5);this.dynamic.door=this.box(.65,1.3,.1,-2.3,2.12,-3.3,materials.green);
  const cover=this.box(2.6,.025,.98,0,1.95,-3,materials.dark);cover.visible=false;this.dynamic.cover=cover;
  if(this.mode!=='mission')this.equipmentAt(bench,this.week===2?'Memory route · inspect a location':'Observation table · inspect the details',this.week===2?'memory':'observation',new THREE.Vector3(0,1.9,-3));
  if(this.week===2){for(let i=0;i<4;i++){const a=i/4*Math.PI*2;const x=Math.sin(a)*4.6,z=Math.cos(a)*3.5-1;this.cylinder(.45,.12,x,.08,z,materials.bronze);this.dynamic['memorylabel'+i]=this.text(loci[i]!,x,1.4,z,2);this.dynamic['memoryitem'+i]=this.text(memoryItems.practice[i]!,x,1.15,z,1.6,'#9adbc6');const token=this.addAsset(i%2?'Book':'Archive',x,.18,z,.5);this.equipmentAt(token,'Memory location '+(i+1),'memory',new THREE.Vector3(x,.85,z));}}
  if(this.mode==='mission')this.makeArrivalProps();
 }
 private makeArrivalProps(){
  if(this.dynamic.observations)this.dynamic.observations.visible=false;
  for(const id of ['clockLabel','note','door'])if(this.dynamic[id])this.dynamic[id]!.visible=false;
  const blue=new THREE.MeshStandardMaterial({color:0x477eaf,roughness:.65});
  const white=new THREE.MeshStandardMaterial({color:0xf2eee0,roughness:.85});
  for(const [i,id] of ['lens','spool','tile','map','manifest'].entries()){
   const object=new THREE.Group();object.position.set(-1.4+i*.7,1.57,-3);this.environment.add(object);
   const part=(geometry:THREE.BufferGeometry,material:THREE.Material,x=0,y=0,z=0)=>{const mesh=new THREE.Mesh(geometry,material);mesh.position.set(x,y,z);mesh.castShadow=true;object.add(mesh);return mesh};
   if(id==='lens'){
    part(new THREE.TorusGeometry(.17,.04,8,20),materials.bronze,0,.23);
    part(new THREE.CircleGeometry(.15,20),materials.glass,0,.23,.005);
    part(new THREE.BoxGeometry(.045,.18,.035),materials.bronze,0,.025);
   }else if(id==='spool'){
    part(new THREE.CylinderGeometry(.13,.13,.26,20),blue,0,.17);
    for(const y of [.04,.30])part(new THREE.CylinderGeometry(.19,.19,.035,20),blue,0,y);
    part(new THREE.CylinderGeometry(.04,.04,.34,12),materials.dark,0,.17);
   }else if(id==='tile'){part(new THREE.BoxGeometry(.37,.055,.37),white,0,.035);}
   else{
    const paper=part(new THREE.BoxGeometry(.45,.014,.48),white,0,.012);paper.rotation.y=id==='map'?-.14:.16;
    for(let row=0;row<4;row++)part(new THREE.BoxGeometry(.28,.003,.013),id==='map'?blue:materials.dark,0,.022,-.15+row*.08);
    if(id==='map')part(new THREE.BoxGeometry(.013,.004,.34),blue,.10,.024);
   }
   this.equipmentAt(object,'Inspect '+id,id,new THREE.Vector3(object.position.x,1.82,-3));
   this.text(id.toUpperCase(),object.position.x,1.78,-2.65,.6,'#f6dfad');
  }
 }
 private makeDigital(_bench:THREE.Object3D){
  for(let i=0;i<3;i++){const terminal=this.addAsset('Console',-2.5+i*2.5,0,-3,1.3);this.equipmentAt(terminal,this.week===7?'Permission station '+(i+1):'Archive record '+String.fromCharCode(65+i),this.week===7?'permissions':'files',new THREE.Vector3(-2.5+i*2.5,1.55,-3));this.text(this.week===7?['OBSERVER','TECHNICIAN','REGISTRAR'][i]!:['RECORD A','RECORD B','RECORD C'][i]!,-2.5+i*2.5,2.4,-3,1.8,'#8ed6c4')}
  for(let i=0;i<6;i++){this.box(.55,2.7,.6,-7+i*.7,1.38,-7.5,materials.dark);for(let j=0;j<7;j++)this.box(.4,.035,.02,-7+i*.7,.5+j*.31,-7.18,j%3?materials.teal:materials.glow)}
  this.dynamic.selected=this.ring(.68,.035,0,.09,-2.75,materials.teal);this.dynamic.selected.rotation.x=-Math.PI/2;
 }
 private makeCouncil(_bench:THREE.Object3D){
  this.cylinder(1.8,.15,0,1.25,-2.8,materials.stone);
  for(let i=0;i<4;i++){const a=i*Math.PI/2;const x=Math.sin(a)*2.8,z=-2.8+Math.cos(a)*2.5;const npc=this.addAsset(i%2?'Mara':'Student',x,0,z);npc.rotation.y=a+Math.PI;this.addAsset('Stool',x,0,z);this.equipmentAt(npc,['Analyst · partial record','Operator · equipment access','Archivist · handling requirement','Coordinator · mission agreement'][i]!,this.week===9?'council':'message',new THREE.Vector3(x,1.55,z));}
  this.addAsset('Archive',0,1.34,-2.8,.48);this.text(this.week===9?'CLAIMS NEED EVIDENCE':'ASK · REPEAT · CONFIRM',0,3.6,-3.5,3);
 }
 private makeSensors(_bench:THREE.Object3D){
  const board=new THREE.Group();this.environment.add(board);board.position.set(0,.08,.5);this.dynamic.board=board;
  for(let row=0;row<5;row++)for(let col=0;col<5;col++){const tile=new THREE.Mesh(new THREE.BoxGeometry(.94,.025,.94),(row+col)%2?materials.dark:materials.wall);tile.position.set(col-2,0,row-2);board.add(tile);this.dynamic['cell'+(row*5+col)]=tile}
  const token=this.addAsset('Student',-2,.1,-1.5,.35);this.dynamic.token=token;
  for(const [x,z] of [[-3,-2],[3,2]] as const){this.cylinder(.06,2.6,x,1.3,z,materials.bronze);this.box(.3,.2,.3,x,2.65,z,materials.dark);
   const cone=new THREE.Mesh(new THREE.ConeGeometry(1.35,3,32,1,true),new THREE.MeshBasicMaterial({color:0xe4b966,transparent:true,opacity:.12,side:THREE.DoubleSide,depthWrite:false}));cone.position.set(x*.6,1.4,z*.5);cone.rotation.z=x<0?-.7:.7;this.environment.add(cone);this.dynamic['sensor'+x]=cone;
  }
  this.equipmentAt(board,'Sensor grid · advance the planned route','sensors',new THREE.Vector3(0,.5,.5));this.text('5 × 5 / PUBLISHED SENSOR RULES',0,.7,-2.5,3.5,'#d8c38f');
  this.dynamic.route=this.line([new THREE.Vector3(-2,.15,-1.5),new THREE.Vector3(-2,.15,2.5),new THREE.Vector3(2,.15,2.5)],materials.teal,.04);
 }
 private makeOperations(_bench:THREE.Object3D){
  const map=this.box(3.5,.08,2.3,0,1.58,-3,materials.dark);const blocks=[[-1,-.5],[0,-.5],[1,-.5],[-1,.5],[0,.5],[1,.5]];
  blocks.forEach(([x,z],i)=>{this.box(.75,.25,.72,x!,1.73,-3+z!,i===4?materials.bronze:materials.green);this.text(String(i+1),x!,2,-3+z!+.2,.35)});
  const archive=this.addAsset('Archive',0,1.87,-3,.45);this.animated.push(archive);
  this.equipmentAt(map,this.mode==='mission'?'Archive recovery controls':'Rehearsal table · introduce a disruption',this.mode==='mission'?'archive':'rehearsal',new THREE.Vector3(0,1.9,-3));this.dynamic.archive=archive;this.text('MERIDIAN / SIX CONNECTED AREAS',0,3.5,-3.5,3.5);
 }

 private installControls(){
  const listen=(target:EventTarget,type:string,fn:EventListener,options?:AddEventListenerOptions)=>{target.addEventListener(type,fn,options);this.cleanups.push(()=>target.removeEventListener(type,fn,options))};const canvas=this.renderer.domElement;
  listen(canvas,'keydown',((event:KeyboardEvent)=>{const key=event.key.toLowerCase();if(['w','a','s','d','c','arrowup','arrowdown','arrowleft','arrowright','e','escape'].includes(key)){event.preventDefault();this.keys.add(key);this.target=undefined;if(key==='e')this.inspectSelected();if(key==='escape')this.leaveInspection()}}) as EventListener);
  listen(canvas,'keyup',((event:KeyboardEvent)=>{this.keys.delete(event.key.toLowerCase())}) as EventListener);
  listen(canvas,'blur',(()=>this.keys.clear()) as EventListener);listen(window,'blur',(()=>this.keys.clear()) as EventListener);
  listen(canvas,'pointerdown',((event:PointerEvent)=>{this.drag={x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY,moved:false};canvas.setPointerCapture(event.pointerId);canvas.focus({preventScroll:true})}) as EventListener);
  listen(canvas,'pointermove',((event:PointerEvent)=>{if(!this.drag)return;const dx=event.clientX-this.drag.x,dy=event.clientY-this.drag.y;if(Math.abs(event.clientX-this.drag.startX)+Math.abs(event.clientY-this.drag.startY)>7)this.drag.moved=true;if(this.drag.moved){this.azimuth-=dx*.005;this.pitch=THREE.MathUtils.clamp(this.pitch+dy*.004,.08,1);this.drag.x=event.clientX;this.drag.y=event.clientY}}) as EventListener);
  listen(canvas,'pointerup',((event:PointerEvent)=>{if(this.drag&&!this.drag.moved)this.pick(event);this.drag=undefined;try{canvas.releasePointerCapture(event.pointerId)}catch{} }) as EventListener);
  listen(canvas,'pointercancel',(()=>{this.drag=undefined}) as EventListener);
  listen(canvas,'webglcontextlost',((event:Event)=>{event.preventDefault();this.paused=true;this.status('Graphics paused. Your lab work is safe. Use the accessible controls below or reload to restore graphics.');}) as EventListener);
  listen(canvas,'webglcontextrestored',(()=>{this.paused=false;this.status('Graphics restored. Your lab work is unchanged.')}) as EventListener);
  listen(document,'visibilitychange',(()=>{this.keys.clear();this.last=performance.now()}) as EventListener);
  listen(window,'mastermind:scene-state',((event:CustomEvent<SceneUpdate>)=>{
   if(event.detail.kind==='mission'&&this.mode==='mission'){this.state=event.detail;if(event.detail.zone&&event.detail.zone in ZONES&&event.detail.zone!==this.zone){this.zone=event.detail.zone;this.room=ZONE_ROOMS[this.zone]!;this.buildRoom();this.root.querySelector<HTMLSelectElement>('[data-world-travel]')!.value=this.zone;}this.updateModels();if(event.detail.feedback)this.status(event.detail.feedback);}
   else if(event.detail.week===this.week){this.state=event.detail;this.updateModels();if(event.detail.feedback)this.status(event.detail.feedback);}
  }) as EventListener);
  const button=(selector:string,fn:()=>void)=>listen(this.root.querySelector(selector)!,'click',fn);
  button('[data-world-inspect]',()=>this.inspectSelected());button('[data-world-use]',()=>this.useSelected());button('[data-world-exit-inspect]',()=>this.leaveInspection());
  button('[data-world-reset-camera]',()=>{this.leaveInspection();this.azimuth=0;this.pitch=.36;this.status('Camera reset.');});
  button('[data-world-pause]',()=>{this.paused=!this.paused;this.keys.clear();const b=this.root.querySelector<HTMLButtonElement>('[data-world-pause]')!;b.textContent=this.paused?'Resume':'Pause';b.setAttribute('aria-pressed',String(this.paused));this.status(this.paused?'Scene paused. Course controls remain available.':'Scene resumed.');});
  listen(this.root.querySelector('[data-world-quality]')!,'change',((e:Event)=>this.setQuality((e.target as HTMLSelectElement).value)) as EventListener);
  listen(this.root.querySelector('[data-world-equipment]')!,'change',((event:Event)=>{const item=this.equipment[Number((event.target as HTMLSelectElement).value)];if(item){this.select(item);this.inspectSelected()}}) as EventListener);const travel=this.root.querySelector<HTMLSelectElement>('[data-world-travel]')!;const entries=this.mode==='mission'?Object.entries(ZONES):Object.entries(ROOMS).map(([key,value])=>[key,value.name]);
  for(const [value,label] of entries){const option=document.createElement('option');option.value=value!;option.textContent=label!;travel.append(option)}travel.value=this.mode==='mission'?this.zone:this.room;listen(travel,'change',()=>this.travel(travel.value));
 }
 private travel(destination:string){
  if(this.mode==='mission'){const zones=Object.keys(ZONES);this.zone=destination==='next'?zones[(zones.indexOf(this.zone)+1)%zones.length]!:destination;this.room=ZONE_ROOMS[this.zone]||'perception';window.dispatchEvent(new CustomEvent('mastermind:mission-zone',{detail:{zone:this.zone}}));}
  else{this.room=(destination in ROOMS?destination:'atrium') as RoomId;if(this.mode==='academy'||this.mode==='hero')this.week=ROOMS[this.room].week;}
  this.root.querySelector<HTMLSelectElement>('[data-world-travel]')!.value=this.mode==='mission'?this.zone:this.room;if(this.mode!=='mission')this.state={};this.buildRoom();this.status('Entered '+(this.mode==='mission'?ZONES[this.zone as keyof typeof ZONES]:ROOMS[this.room].name)+'.');
 }
 private pick(event:PointerEvent){
  const rect=this.renderer.domElement.getBoundingClientRect();this.pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);this.ray.setFromCamera(this.pointer,this.camera);
  const hits=this.ray.intersectObjects(this.equipment.map(e=>e.mesh),true);
  if(hits.length){let target:THREE.Object3D|null=hits[0]!.object;while(target){const item=this.equipment.find(e=>e.mesh===target);if(item){this.select(item);this.inspectSelected();return}target=target.parent}}
  if(this.inspect)return;const ground=new THREE.Plane(new THREE.Vector3(0,1,0),0);const dest=new THREE.Vector3();
  if(this.ray.ray.intersectPlane(ground,dest)){dest.x=THREE.MathUtils.clamp(dest.x,-9,9);dest.z=THREE.MathUtils.clamp(dest.z,-7.7,8);this.target=dest;this.status('Walking to the selected position.');}
 }
 private select(item:Equipment){if(this.selectionHelper){this.selectionHelper.removeFromParent();this.selectionHelper.geometry.dispose();(this.selectionHelper.material as THREE.Material).dispose();}this.selectionHelper=new THREE.BoxHelper(item.mesh,0xe7c680);this.scene.add(this.selectionHelper);this.selected=item;this.root.querySelector<HTMLSelectElement>('[data-world-equipment]')!.value=String(this.equipment.indexOf(item));this.root.querySelector<HTMLElement>('[data-world-object]')!.hidden=false;this.root.querySelector<HTMLElement>('[data-world-object-label]')!.textContent=item.label;this.root.querySelector<HTMLButtonElement>('[data-world-use]')!.textContent=item.travel?'Enter room':'Use equipment';}
 private inspectSelected(){if(!this.selected)return;if(this.selected.travel){this.travel(this.selected.travel);return}this.inspect=true;this.player.visible=false;this.keys.clear();this.target=undefined;this.root.querySelector<HTMLElement>('[data-world-exit-inspect]')!.hidden=false;this.status('Inspection view. Use equipment to perform the lesson action.');}
 private leaveInspection(){this.inspect=false;this.player.visible=true;this.root.querySelector<HTMLElement>('[data-world-exit-inspect]')!.hidden=true;}
 private useSelected(){
  if(!this.selected)return;if(this.selected.travel){this.travel(this.selected.travel);return}
  this.actionTime=.65;window.dispatchEvent(new CustomEvent('mastermind:interact',{detail:{week:this.week,objectId:this.selected.id,room:this.room}}));
  if(this.mode==='academy'||this.mode==='hero'){const previous=this.state.values||{};this.state={week:this.week,kind:'training',values:{...previous,turns:Number(previous.turns||0)+1,power:!previous.power,repaired:true,rotation:(Number(previous.rotation||0)+90)%360,covered:!previous.covered,position:(Number(previous.position||0)+1)%25},sequence:[]};this.updateModels();this.status(this.room==='atrium'?'Eight specialist rooms. Choose a portal or use Travel.':'Equipment demonstration. Open this week’s lab for guided practice, a fresh challenge and saved evidence.');}
  else this.status('Equipment action recorded. The lab controls show its result and explanation.');
 }
 private rewriteText(object:THREE.Object3D|undefined,label:string){
  if(!(object instanceof THREE.Mesh)||!(object.material instanceof THREE.MeshBasicMaterial)||object.userData.label===label)return;
  object.userData.label=label;const canvas=document.createElement('canvas');canvas.width=768;canvas.height=128;
  const ctx=canvas.getContext('2d')!;ctx.fillStyle='#f5dfb0';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='600 42px system-ui, sans-serif';ctx.fillText(label,384,64,730);
  object.material.map?.dispose();const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;object.material.map=texture;object.material.needsUpdate=true;
 }
 private updateModels(){
  const values=this.state.values||this.state as Record<string,unknown>;  const phase:TrainingPhase=this.state.phase==='check'||this.state.phase==='transfer'?this.state.phase:'practice';
  for(let i=0;i<25;i++){const cell=this.dynamic['cell'+i];if(cell instanceof THREE.Mesh)cell.material=sensorCells(phase).includes(i)?materials.bronze:(i+Math.floor(i/5))%2?materials.dark:materials.wall}
  for(let i=0;i<4;i++){const label=this.dynamic['memoryitem'+i];if(label){this.rewriteText(label,memoryItems[phase][i]!);label.visible=!values.covered}}
  if(this.dynamic.clockLabel&&this.mode!=='mission'){
   const times={practice:[8,20],check:[9,40],transfer:[14,10]}[phase]!;
   this.rewriteText(this.dynamic.clockLabel,String(times[0]).padStart(2,'0')+':'+String(times[1]).padStart(2,'0'));
   const minute=times[1]!/60*Math.PI*2,hour=(times[0]!%12+times[1]!/60)/12*Math.PI*2;
   this.dynamic.clockMinute!.rotation.z=-minute;this.dynamic.clockMinute!.position.set(.75+Math.sin(minute)*.07,.28+Math.cos(minute)*.07,.10);
   this.dynamic.clockHour!.rotation.z=-hour;this.dynamic.clockHour!.position.set(.75+Math.sin(hour)*.045,.28+Math.cos(hour)*.045,.11);
   const cup=this.dynamic.cup as THREE.Mesh;const material=cup.material as THREE.MeshStandardMaterial;material.color.set(phase==='practice'?0x538fc2:phase==='check'?0xc79548:0xbfc7c8);cup.rotation.z=phase==='practice'?Math.PI/2:0;
   cup.position.set(phase==='check'?-.8:.2,.11,.3);
   this.dynamic.door!.rotation.y=phase==='check'?0:-1;
   this.rewriteText(this.dynamic.note,phase==='practice'?'Note: “I left first”':phase==='check'?'Note: “The sample is intact”':'Operator: “Power failure”');
   for(const name of ['clockLabel','note','door'])this.dynamic[name]!.visible=!values.covered;
  }

  if(this.gears.length){const gear=Number(values.gear||values.follower||24),turns=Number(values.turns||0);const angle=turns*Math.PI*2;this.gearTargets=this.mode==='mission'?[angle,-angle*12/gear]:[angle*gear/12,-angle];if(this.reduced){this.gears[0]!.rotation.z=angle*gear/12;this.gears[1]!.rotation.z=-angle;}if(this.gears[1]!.userData.teeth!==gear){this.gears[1]!.removeFromParent();const g=this.addAsset('Gear'+gear,-.64+(12+gear)*.018+.05,2.2,-3.19);g.userData.teeth=gear;this.gears[1]=g;const item=this.equipment.find(e=>e.id==='gear');if(item){item.mesh=g;item.at.x=g.position.x;}}if(this.dynamic.cam)this.dynamic.cam.position.x=this.gears[1]!.position.x;this.rewriteText(this.dynamic.readout,'12 : '+gear);if(this.dynamic.cam)this.dynamic.cam.rotation.z=Number(values.cam||0)*Math.PI/180;if(this.dynamic.lock)this.dynamic.lock.position.y=values.interlock||values.brake?2.2:2.65;if(this.dynamic.spring)this.dynamic.spring.scale.y=values.spring===false?.6:1;}
  if(this.dynamic.bulb instanceof THREE.Mesh){const lit=Boolean((values.power||values.switchClosed)&&(values.repaired||values.fuse==='sound'||values.fuse==='intact'));const m=this.dynamic.bulb.material as THREE.MeshStandardMaterial;m.color.set(lit?0xffe3a1:0x8b9388);m.emissive.set(lit?0xffbf5e:0);m.emissiveIntensity=lit?1.7:0}
  if(this.dynamic.assembly){this.dynamic.assembly.rotation.y=Number(values.rotation||0)*Math.PI/180;this.dynamic.assembly.position.y=1.6+Number(values.level||0)*.3;}
  if(this.dynamic.cover)this.dynamic.cover.visible=Boolean(values.covered);if(this.dynamic.observations)this.dynamic.observations.visible=this.mode!=='mission'&&!Boolean(values.covered);
  if(this.dynamic.token){const p=Number(values.position||0);this.dynamic.token.position.set(p%5-2,.1,Math.floor(p/5)-1.5)}if(this.dynamic.route)this.dynamic.route.visible=!values.detected;
  if(this.dynamic.selected){const selected=String(values.archive||'B');this.dynamic.selected.position.x=({A:-2.5,B:0,C:2.5} as Record<string,number>)[selected]||0}
  if(this.dynamic.archive)this.dynamic.archive.rotation.z=values.disrupted?.3:0;if(this.selectionHelper&&this.selected)this.selectionHelper.setFromObject(this.selected.mesh);if(this.state.complete)this.status('Skill check complete. Your evidence is available in the lab record.');
 }
 private setQuality(value:string){this.low=value==='low'||(value==='auto'&&(innerWidth<700||(navigator.hardwareConcurrency||4)<4));this.renderer.setPixelRatio(this.low?Math.min(devicePixelRatio,1.2):Math.min(devicePixelRatio,1.8));this.renderer.shadowMap.enabled=!this.low;this.resizeView();}
 private resizeView(){const w=this.stage.clientWidth||640,h=this.stage.clientHeight||400;this.renderer.setSize(w,h,false);this.camera.aspect=w/h;this.camera.updateProjectionMatrix()}
 private status(message:string){if(message===this.statusText)return;this.statusText=message;this.root.querySelector<HTMLElement>('[data-world-status]')!.textContent=message;}
 private tick=(time:number)=>{if(this.disposed)return;const dt=Math.min((time-this.last)/1000||.016,.045);this.last=time;this.elapsed+=dt;if(!this.paused&&!document.hidden){this.move(dt);this.updateCamera(dt);this.gears.forEach((g,i)=>g.rotation.z+=(this.gearTargets[i]!-g.rotation.z)*Math.min(dt*5,1));if(!this.reduced)this.animated.forEach((o,i)=>o.rotation.y+=dt*(.18+i*.05));this.renderer.render(this.scene,this.camera);this.root.dataset.worldDrawCalls=String(this.renderer.info.render.calls);this.root.dataset.worldGeometries=String(this.renderer.info.memory.geometries);this.root.dataset.worldRoom=this.room;this.root.dataset.worldPosition=this.player.position.x.toFixed(2)+','+this.player.position.z.toFixed(2);}this.frame=requestAnimationFrame(this.tick);}
 private move(dt:number){
  const movement=new THREE.Vector3();
  if(!this.inspect){const forward=Number(this.keys.has('s')||this.keys.has('arrowdown'))-Number(this.keys.has('w')||this.keys.has('arrowup'));const side=Number(this.keys.has('d')||this.keys.has('arrowright'))-Number(this.keys.has('a')||this.keys.has('arrowleft'));movement.set(side,0,forward).applyAxisAngle(new THREE.Vector3(0,1,0),this.azimuth);
   if(this.target){movement.copy(this.target).sub(this.player.position);movement.y=0;if(movement.length()<.18){this.target=undefined;movement.set(0,0,0)}}if(movement.lengthSq()>0)movement.normalize().multiplyScalar(this.keys.has('c')?1.5:3.15);
  }
  this.moving=movement.lengthSq()>0;this.controller.computeColliderMovement(this.collider,{x:movement.x*dt,y:-.12,z:movement.z*dt});const next=this.controller.computedMovement(),position=this.body.translation();
  this.body.setNextKinematicTranslation({x:position.x+next.x,y:position.y+next.y,z:position.z+next.z});this.physics.timestep=dt;this.physics.step();const actual=this.body.translation();this.player.position.set(actual.x,actual.y-.8,actual.z);
  if(this.moving){const targetAngle=Math.atan2(movement.x,movement.z);let diff=targetAngle-this.player.rotation.y;diff=Math.atan2(Math.sin(diff),Math.cos(diff));this.player.rotation.y+=diff*Math.min(dt*12,1)}
  const cycle=this.elapsed*(this.keys.has('c')?5:9),swing=this.moving?Math.sin(cycle)*.48:0;
  for(const [name,sign] of [['LegL',1],['LegR',-1],['ArmL',-1],['ArmR',1]] as const){const limb=this.player.getObjectByName(name);if(limb)limb.rotation.x=swing*sign}this.player.scale.y=this.keys.has('c')?.72:1;this.actionTime=Math.max(0,this.actionTime-dt);if(this.actionTime>0){const arm=this.player.getObjectByName('ArmR');if(arm)arm.rotation.x=-.9;}
  if(!this.inspect&&this.moving){const closest=this.equipment.reduce<Equipment|undefined>((best,e)=>!best||e.at.distanceTo(this.player.position)<best.at.distanceTo(this.player.position)?e:best,undefined);if(closest&&closest.at.distanceTo(this.player.position)<3.5&&closest!==this.selected)this.select(closest)}
 }
 private updateCamera(dt:number){
  const target=this.inspect&&this.selected?this.selected.at.clone():this.player.position.clone().add(new THREE.Vector3(0,1.15,0));const portrait=this.camera.aspect<1.1;
  const distance=this.inspect?(portrait?4.3:3.6):(portrait?7:6);const desired=target.clone().add(new THREE.Vector3(Math.sin(this.azimuth)*distance,Math.sin(this.pitch)*distance+(this.inspect?.1:.3),Math.cos(this.azimuth)*distance));
  desired.x=THREE.MathUtils.clamp(desired.x,-9.5,9.5);desired.z=THREE.MathUtils.clamp(desired.z,-8.1,8.55);desired.y=Math.max(.5,desired.y);const delta=desired.clone().sub(target),length=delta.length();delta.normalize();const hit=this.physics.castRay(new RAPIER.Ray(target,delta),length,true,undefined,undefined,this.collider,this.body);if(hit&&hit.timeOfImpact>.1)desired.copy(target).addScaledVector(delta,Math.max(.5,hit.timeOfImpact-.18));const alpha=this.reduced?1:1-Math.exp(-dt*7);this.camera.position.lerp(desired,alpha);this.camera.lookAt(target);
 }
 dispose(){
  this.disposed=true;cancelAnimationFrame(this.frame);this.resize?.disconnect();this.cleanups.forEach(fn=>fn());
  this.scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();for(const m of Array.isArray(o.material)?o.material:[o.material]){if(m instanceof THREE.MeshStandardMaterial||m instanceof THREE.MeshBasicMaterial)m.map?.dispose();m.dispose();}}});
  if(this.selectionHelper){this.selectionHelper.geometry.dispose();(this.selectionHelper.material as THREE.Material).dispose();}this.physics?.free();this.renderer?.dispose();this.renderer?.forceContextLoss();this.stage.replaceChildren();this.root.querySelector<HTMLElement>('.world-poster')!.hidden=false;
  for(const selector of ['[data-world-canvas]','[data-world-hud]','[data-world-toolbar]','[data-world-object]'])this.root.querySelector<HTMLElement>(selector)!.hidden=true;
  this.root.querySelector<HTMLButtonElement>('[data-world-launch]')!.disabled=false;this.root.querySelector<HTMLSelectElement>('[data-world-travel]')!.replaceChildren();
 }
}
