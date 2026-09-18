import {readFileSync,writeFileSync} from "node:fs";
import sharp from "sharp";
const art=readFileSync("src/components/AcademyMark.astro","utf8").replace('<svg viewBox="0 0 560 430"','<svg x="630" y="60" width="540" height="440" viewBox="0 0 560 430"');
const svg='<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#112821"/><path d="M50 65H590M50 565H1150" stroke="#bd9c61"/><g fill="#e3c994" font-family="sans-serif"><text x="55" y="115" font-size="18" letter-spacing="4">SLOP UNIVERSITY / SLOP4408</text><text x="50" y="215" fill="#f5f0df" font-size="66" font-weight="800" letter-spacing="-3">MASTERMIND</text><text x="55" y="285" font-size="32">The Academy of</text><text x="55" y="329" font-size="32">Impossible Skills</text><text x="55" y="409" fill="#d5dfcd" font-size="22">Notice. Understand. Recover.</text><text x="55" y="518" font-size="16" letter-spacing="2">12 WEEKS · ONE IMPOSSIBLE MISSION</text></g>'+art+'</svg>';
writeFileSync("src/assets/images/academy-card.svg",svg);
await sharp(Buffer.from(svg)).png().toFile("src/assets/images/card.png");
console.log("Generated original 1200×630 academy social card.");
