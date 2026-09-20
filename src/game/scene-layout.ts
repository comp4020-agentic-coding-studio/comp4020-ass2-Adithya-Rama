import type { DemoItem, DemoRoom } from '../lib/demonstration-types';

export type SceneSupport = 'wall' | 'desk' | 'shelf' | 'pedestal' | 'console' | 'floor' | 'mounted-rig' | 'role-desk' | 'planning-table';
export interface ItemPlacement { position:[number,number,number]; scale:number; support:SceneSupport; focusHeight:number; labelHeight:number; }
export const TEACHING_BAY = { x:6.4, z:.8, width:2.4, depth:2.7 } as const;
export const MEMORY_STATIONS = [[-4.2,-4.5],[-4.2,.6],[3.9,.6],[3.9,-4.5]] as const;

/** Placement expresses what the object is, rather than its index in a generic row. */
export function demonstrationPlacement(item:DemoItem,index:number,items:readonly DemoItem[],room:DemoRoom):ItemPlacement {
 const at=(position:ItemPlacement['position'],support:SceneSupport,scale=1,focusHeight=.28,labelHeight=.68):ItemPlacement=>({position,support,scale,focusHeight,labelHeight});
 if(item.shape==='clock')return at([-2.35,2.35,-6.96],'wall',1.65,.58,1.14);
 if(item.shape==='hatch')return at([2.35,.64,-6.95],'wall',2,.60,1.34);
 if(room==='perception'&&!items.some(i=>i.shape==='clock'||i.shape==='hatch')){
  const [x,z]=MEMORY_STATIONS[index%MEMORY_STATIONS.length]!;
  return at([x,1.14,z],'pedestal',1,.27,.66);
 }
 if(room==='digital')return at([items.length===2?(index===0?-2.5:2.5):(index-(items.length-1)/2)*2.5,1.32,-2.60],'console',.9,.3,.66);
 if(item.id==='ledger')return at([0,1.63,-3.15],'desk',1,.2,.62);
 if(item.shape==='paper')return at([1.05,1.63,-3.1],'desk',1,.05,.48);
 if(item.shape==='mug')return at([-1.05,1.63,-3.15],'desk',1,.22,.60);
 if(item.shape==='beacon')return at([-3.4,.96,-4.75],'pedestal',1,.34,.80);
 if(item.id==='case')return at([3.4,.96,-4.75],'pedestal',1,.12,.56);
 const spacing=Math.min(.8,2.8/Math.max(1,items.length-1));
 return at([(index-(items.length-1)/2)*spacing,room==='council'?1.63:1.63,-3],room==='council'?'role-desk':'desk',1,.28,.65);
}
