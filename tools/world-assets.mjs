/**
 * Original MASTERMIND asset source. Rebuild with: node tools/world-assets.mjs
 * Geometry is authored here; no external models, textures or network assets.
 * The binary glTF retains named pivot joints for procedural character animation.
 */
import * as T from 'three';
import { mkdir, writeFile } from 'node:fs/promises';
const root = new T.Group(); root.name='MASTERMINDS_Original_Kit';
const mat = {
 stone:new T.MeshStandardMaterial({color:0xd1c3a9,roughness:.83}),
 ink:new T.MeshStandardMaterial({color:0x243b43,roughness:.65}),
 bronze:new T.MeshStandardMaterial({color:0xbd9250,metalness:.68,roughness:.3}),
 pale:new T.MeshStandardMaterial({color:0xf1e5cd,roughness:.7}),
 skin:new T.MeshStandardMaterial({color:0xc99876,roughness:.8}),
 hair:new T.MeshStandardMaterial({color:0x26303a,roughness:.9}),
 shoe:new T.MeshStandardMaterial({color:0x263034,roughness:.8}),
 green:new T.MeshStandardMaterial({color:0x537c78,roughness:.65}),
 light:new T.MeshStandardMaterial({color:0xade8d2,emissive:0x5ba491,emissiveIntensity:.55}),
 red:new T.MeshStandardMaterial({color:0xcc774f,roughness:.5}),
 white:new T.MeshStandardMaterial({color:0xfffff0,roughness:.6}),
 glass:new T.MeshStandardMaterial({color:0x365e69,metalness:.45,roughness:.19}),
};
function mesh(parent,name,geo,m,x=0,y=0,z=0){const v=new T.Mesh(geo,m);v.name=name;v.position.set(x,y,z);parent.add(v);return v}
function box(p,n,s,m,x=0,y=0,z=0){return mesh(p,n,new T.BoxGeometry(...s),m,x,y,z)}
function sphere(p,n,s,m,x=0,y=0,z=0){const v=mesh(p,n,new T.SphereGeometry(1,12,8),m,x,y,z);v.scale.set(...s);return v}
function cyl(p,n,r,h,m,x=0,y=0,z=0){return mesh(p,n,new T.CylinderGeometry(r,r,h,16),m,x,y,z)}
function group(name,parent=root,x=0,y=0,z=0){const g=new T.Group();g.name=name;g.position.set(x,y,z);parent.add(g);return g}
function character(name,coat){
const c=group(name);
box(c,'Jacket',[.52,.6,.3],coat,0,1.02,0);
box(c,'Collar',[.28,.1,.32],mat.pale,0,1.32,0);
box(c,'Belt',[.54,.06,.32],mat.bronze,0,.73,0);
box(c,'Zip',[.018,.5,.012],mat.bronze,0,1.04,.16);
box(c,'Insignia',[.10,.12,.015],mat.bronze,.15,1.18,.16);
sphere(c,'Head',[.215,.255,.19],mat.skin,0,1.61,0);
sphere(c,'Hair',[.225,.135,.2],mat.hair,0,1.78,-.018);
box(c,'HairSide',[.075,.23,.21],mat.hair,-.17,1.67,-.055);
sphere(c,'Nose',[.05,.055,.055],mat.skin,0,1.61,.19);
for(const sign of [-1,1]){
 sphere(c,'Ear'+sign,[.05,.075,.045],mat.skin,.21*sign,1.61,0);
 sphere(c,'EyeWhite'+sign,[.047,.035,.018],mat.white,.077*sign,1.665,.174);
 sphere(c,'Iris'+sign,[.020,.023,.012],mat.hair,.075*sign,1.663,.192);
 box(c,'Eyebrow'+sign,[.08,.018,.02],mat.hair,.076*sign,1.712,.174);
 const arm=group('Arm'+(sign<0?'L':'R'),c,.34*sign,1.22,0);
 box(arm,'Sleeve',[.17,.38,.22],coat,0,-.16,0);
 sphere(arm,'Elbow',[.10,.1,.105],mat.bronze,0,-.34,0);
 box(arm,'Forearm',[.13,.25,.16],coat,0,-.47,.015);
 sphere(arm,'Hand',[.083,.12,.073],mat.skin,0,-.64,.018);
 const leg=group('Leg'+(sign<0?'L':'R'),c,.145*sign,.72,0);
 box(leg,'Trouser',[.21,.52,.23],mat.ink,0,-.26,0);
 box(leg,'KneePanel',[.15,.14,.025],mat.bronze,0,-.32,.125);
 box(leg,'Boot',[.23,.15,.36],mat.shoe,0,-.62,.065);
}
box(c,'Mouth',[.075,.017,.016],mat.red,0,1.51,.173);
return c}
character('Student',mat.ink);
character('Mara',mat.green);
const bench=group('Workbench');
box(bench,'Top',[2.8,.16,1.2],mat.stone,0,1.12,0);
box(bench,'Apron',[2.6,.28,1.02],mat.ink,0,.94,0);
for(const x of [-1.12,1.12])for(const z of [-.42,.42])box(bench,'Leg',[.12,1,.12],mat.bronze,x,.5,z);
box(bench,'Shelf',[2.3,.07,.85],mat.ink,0,.34,0);
for(let i=0;i<3;i++) {box(bench,'Drawer',[.7,.18,.03],mat.green,-.82+i*.82,.96,.535);box(bench,'Pull',[.22,.025,.035],mat.bronze,-.82+i*.82,.96,.56);}
const terminal=group('Console');
box(terminal,'Base',[1.3,.18,.95],mat.ink,0,.1,0);
box(terminal,'Stand',[.55,.72,.44],mat.ink,0,.55,0);
const panel=box(terminal,'Panel',[1.25,.75,.1],mat.bronze,0,1.23,-.1);panel.rotation.x=-.18;
const screen=box(terminal,'Screen',[1.07,.58,.015],mat.glass,0,1.23,-.025);screen.rotation.x=-.18;
for(let i=0;i<4;i++)box(terminal,'StatusBar',[.55-(i%2)*.12,.025,.02],mat.light,-.15,1.4-i*.11,.04-i*.02);
box(terminal,'Keyboard',[1.03,.06,.44],mat.ink,0,.93,.37);
for(let x=0;x<8;x++)for(let z=0;z<3;z++)box(terminal,'Key',[.08,.025,.06],mat.stone,-.4+x*.11,.97,.23+z*.11);
const archive=group('Archive');
cyl(archive,'Plinth',.8,.18,mat.ink,0,.09,0);
cyl(archive,'BaseRing',.65,.12,mat.bronze,0,.24,0);
for(let i=0;i<6;i++){const a=i*Math.PI/3;box(archive,'Support',[.06,1.15,.06],mat.bronze,Math.cos(a)*.53,.86,Math.sin(a)*.53)}
cyl(archive,'UpperRing',.64,.09,mat.bronze,0,1.48,0);
const core=mesh(archive,'Core',new T.IcosahedronGeometry(.35,1),mat.light,0,.87,0);core.scale.y=1.4;
for(let i=0;i<4;i++)cyl(archive,'Disk',.43,.025,mat.glass,0,.48+i*.25,0);
const cart=group('ServiceCart');
box(cart,'Chassis',[1.5,.3,1.05],mat.ink,0,.4,0);
box(cart,'Hood',[.95,.3,1.02],mat.green,-.2,.7,0);
box(cart,'Battery',[.35,.4,.62],mat.bronze,.63,.67,0);
for(const x of [-.57,.57])for(const z of [-.58,.58]){const w=cyl(cart,'Wheel',.25,.12,mat.shoe,x,.25,z);w.rotation.x=Math.PI/2;const hub=cyl(cart,'Hub',.09,.14,mat.bronze,x,.25,z);hub.rotation.x=Math.PI/2}
box(cart,'Handle',[.06,.8,.06],mat.bronze,.7,1.04,-.35);
box(cart,'Handle',[.06,.8,.06],mat.bronze,.7,1.04,.35);
const handle=box(cart,'HandleGrip',[.06,.06,.75],mat.ink,.7,1.43,0);
const gear=group('Gear');
const wheel=cyl(gear,'Hub',.38,.12,mat.bronze);wheel.rotation.x=Math.PI/2;
const center=cyl(gear,'Shaft',.095,.22,mat.ink);center.rotation.x=Math.PI/2;
for(let i=0;i<16;i++){const a=i*Math.PI/8;const tooth=box(gear,'Tooth',[.16,.14,.13],mat.bronze,Math.cos(a)*.42,Math.sin(a)*.42,0);tooth.rotation.z=a}
for(let i=0;i<6;i++){const a=i*Math.PI/3;const cut=cyl(gear,'Inset',.068,.125,mat.ink,Math.cos(a)*.23,Math.sin(a)*.23,0);cut.rotation.x=Math.PI/2}
// Accurate teaching wheels: visible tooth counts match the authored models.
for(const teeth of [12,24,36]){
 const g=group('Gear'+teeth);const radius=teeth*.018;
 const wheel=cyl(g,'Wheel',radius,.1,mat.bronze);wheel.rotation.x=Math.PI/2;
 const shaft=cyl(g,'Shaft',.07,.16,mat.ink);shaft.rotation.x=Math.PI/2;
 for(let i=0;i<teeth;i++){const a=i*Math.PI*2/teeth;const tooth=box(g,'Tooth'+i,[.075,.068,.11],mat.bronze,Math.cos(a)*(radius+.025),Math.sin(a)*(radius+.025),0);tooth.rotation.z=a}
 for(let i=0;i<6;i++){const a=i*Math.PI/3;const hole=cyl(g,'Inset',radius*.14,.105,mat.ink,Math.cos(a)*radius*.6,Math.sin(a)*radius*.6,0);hole.rotation.x=Math.PI/2}
}
const stool=group('Stool');
cyl(stool,'Seat',.34,.12,mat.green,0,.73,0);
for(let i=0;i<3;i++){let a=i*Math.PI*2/3;box(stool,'Leg',[.07,.68,.07],mat.bronze,Math.cos(a)*.22,.35,Math.sin(a)*.22)}
const planter=group('Planter');
cyl(planter,'Pot',.38,.55,mat.stone,0,.275,0);cyl(planter,'Soil',.32,.015,mat.ink,0,.56,0);
for(let i=0;i<8;i++){let a=i*2.4;const leaf=sphere(planter,'Leaf',[.10,.46,.055],mat.green,Math.cos(a)*.18,.94+Math.sin(i)*.1,Math.sin(a)*.18);leaf.rotation.z=Math.sin(a)*.55;leaf.rotation.x=Math.cos(a)*.55}
const book=group('Book');
box(book,'Pages',[.27,.065,.4],mat.pale,0,.045,0);box(book,'Cover',[.29,.014,.42],mat.green,0,.085,0);box(book,'Back',[.29,.014,.42],mat.green,0,.007,0);box(book,'Spine',[.025,.08,.42],mat.bronze,-.14,.045,0);
// Compact standards-compliant binary glTF writer, retaining mesh instances and pivots.
const gltf={asset:{version:'2.0',generator:'MASTERMIND original procedural assets'},scene:0,scenes:[{nodes:[]}],nodes:[],meshes:[],materials:[],accessors:[],bufferViews:[],buffers:[{byteLength:0}]};
let parts=[],offset=0;const geoMap=new Map(),matMap=new Map();
function buffer(arr,target){const pad=(4-offset%4)%4;if(pad){parts.push(Buffer.alloc(pad));offset+=pad}const data=Buffer.from(arr.buffer,arr.byteOffset,arr.byteLength);const id=gltf.bufferViews.length;gltf.bufferViews.push({buffer:0,byteOffset:offset,byteLength:data.length,target});parts.push(data);offset+=data.length;return id}
function accessor(arr,size,target,minmax=false){const id=gltf.accessors.length;const componentType=arr instanceof Float32Array?5126:arr instanceof Uint32Array?5125:5123;const a={bufferView:buffer(arr,target),componentType,count:arr.length/size,type:{1:'SCALAR',2:'VEC2',3:'VEC3',4:'VEC4'}[size]};if(minmax){a.min=Array(size).fill(Infinity);a.max=Array(size).fill(-Infinity);for(let i=0;i<arr.length;i++){const j=i%size;a.min[j]=Math.min(a.min[j],arr[i]);a.max[j]=Math.max(a.max[j],arr[i])}}gltf.accessors.push(a);return id}
function material(m){if(matMap.has(m))return matMap.get(m);const id=gltf.materials.length;matMap.set(m,id);gltf.materials.push({name:Object.entries(mat).find(x=>x[1]===m)?.[0]??'surface',pbrMetallicRoughness:{baseColorFactor:[m.color.r,m.color.g,m.color.b,1],metallicFactor:m.metalness,roughnessFactor:m.roughness},emissiveFactor:m.emissive.toArray().map(v=>v*m.emissiveIntensity)});return id}
function node(o){const n={name:o.name,translation:o.position.toArray(),rotation:o.quaternion.toArray(),scale:o.scale.toArray()};const id=gltf.nodes.length;gltf.nodes.push(n);if(o.isMesh){const key=o.geometry.uuid+o.material.uuid;if(!geoMap.has(key)){const g=o.geometry;const p={attributes:{POSITION:accessor(g.attributes.position.array,3,34962,true),NORMAL:accessor(g.attributes.normal.array,3,34962)},material:material(o.material)};if(g.index)p.indices=accessor(g.index.array,1,34963);geoMap.set(key,gltf.meshes.length);gltf.meshes.push({name:o.name,primitives:[p]})}n.mesh=geoMap.get(key)}if(o.children.length)n.children=o.children.map(node);return id}
gltf.scenes[0].nodes=[node(root)];gltf.buffers[0].byteLength=offset;
let json=Buffer.from(JSON.stringify(gltf));json=Buffer.concat([json,Buffer.alloc((4-json.length%4)%4,0x20)]);
let bin=Buffer.concat(parts);bin=Buffer.concat([bin,Buffer.alloc((4-bin.length%4)%4)]);
const header=Buffer.alloc(12);header.writeUInt32LE(0x46546c67,0);header.writeUInt32LE(2,4);header.writeUInt32LE(12+8+json.length+8+bin.length,8);
const jh=Buffer.alloc(8);jh.writeUInt32LE(json.length);jh.writeUInt32LE(0x4e4f534a,4);
const bh=Buffer.alloc(8);bh.writeUInt32LE(bin.length);bh.writeUInt32LE(0x004e4942,4);
await mkdir('public/world',{recursive:true});
await writeFile('public/world/academy-kit.glb',Buffer.concat([header,jh,json,bh,bin]));
await writeFile('public/world/asset-manifest.json',JSON.stringify({title:'MASTERMIND original world kit',author:'Course project',source:'tools/world-assets.mjs',format:'glTF 2.0 binary',license:'Original project artwork',assets:root.children.map(x=>x.name),joints:['ArmL','ArmR','LegL','LegR'],externalAssets:[],bytes:12+8+json.length+8+bin.length},null,2)+'\n');
console.log('Original academy GLB generated:',12+8+json.length+8+bin.length,'bytes');



