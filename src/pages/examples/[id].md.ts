import type {APIRoute} from "astro";
import {demonstrations} from "../../data/demonstrations";
export function getStaticPaths(){return demonstrations.map(demo=>({params:{id:demo.id},props:{artifact:demo.artifact}}));}
export const GET:APIRoute=({props})=>new Response(props.artifact.markdown,{headers:{"Content-Type":"text/markdown; charset=utf-8"}});
