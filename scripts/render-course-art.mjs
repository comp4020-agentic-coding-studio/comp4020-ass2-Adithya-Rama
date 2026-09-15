import sharp from "sharp";
await sharp("src/assets/images/glass-crown.svg").png().toFile("src/assets/images/card.png");
console.log("Rendered original Glass Crown social card, 1200x630.");
