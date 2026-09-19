import {demonstrations} from '../src/data/demonstrations.ts';
for(const d of demonstrations)console.log(JSON.stringify({id:d.id,frames:d.steps.map(s=>({id:s.id,b:s.before,a:s.after}))}));
