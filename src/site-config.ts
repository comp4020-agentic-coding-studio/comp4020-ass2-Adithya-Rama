import {defineSiteConfig} from "astro-theme-university/types";
import {slopBranding} from "astro-theme-slop";
import {courseMeta} from "./course-config";
export const sessionLabels={singular:"Lab",plural:"Labs"} as const;
export const graphCollections=["sessions","assessments","lectures","people"];
export const courseApiCollections=[...graphCollections.map(key=>({key})),{key:"policies",dir:"pages/policies"}];
export const siteConfig=defineSiteConfig({
 ...slopBranding,name:"Slop University",
 links:[{text:"Overview",href:"/"},{text:"Weeks",href:"/lectures/"},{text:"Labs",href:"/sessions/"},{text:"Assessments",href:"/assessments/"},{text:"Academy",href:"/academy/"},{text:"Final Mission",href:"/operation/"}],
 licence:"CC-BY-NC-SA-4.0",socialImage:"/src/assets/images/card.png",
 socialImageAlt:"The original Meridian academy for "+courseMeta.code+" — "+courseMeta.title,
});
