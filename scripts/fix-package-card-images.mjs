import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const packageImages = [
  'src/assets/img/clientTours/58.jpg',
  'src/assets/img/clientTours/02.jpg',
  'src/assets/img/clientTours/21.jpg',
  'src/assets/img/clientTours/44.jpg',
  'src/assets/img/clientTours/55.jpg',
  'src/assets/img/clientTours/57.jpg',
  'src/assets/img/clientTours/07.jpg',
  'src/assets/img/7daystour/goayffj226ceow8zxhey.jpg',
  'src/assets/img/mainpage/4.jpeg',
  'src/assets/img/mainpage/5.jpeg',
  'src/assets/img/onedayTour/Galle/10.jpg',
];

// Hero carousel webp sources that must stay large
const heroWebpSources = [
  'src/assets/img/mainpage/1.jpeg',
  'src/assets/img/mainpage/2.jpeg',
  'src/assets/img/mainpage/3.jpeg',
  'src/assets/img/mainpage/5.jpeg',
];

async function report(file) {
  if (!fs.existsSync(file)) return;
  const m = await sharp(file).metadata();
  console.log(
    path.basename(file),
    `${m.width}x${m.height}`,
    `${(fs.statSync(file).size / 1024).toFixed(1)} KiB`,
  );
}

async function makeCards() {
  for (const src of packageImages) {
    if (!fs.existsSync(src)) {
      console.log('MISSING', src);
      continue;
    }
    const parsed = path.parse(src);
    const webpOut = path.join(parsed.dir, `${parsed.name}-card.webp`);
    const avifOut = path.join(parsed.dir, `${parsed.name}-card.avif`);

    // Remove wrongly sized siblings created earlier
    for (const bad of [
      path.join(parsed.dir, `${parsed.name}.webp`),
      path.join(parsed.dir, `${parsed.name}.avif`),
    ]) {
      // only delete if it's a package-sized overwrite of a hero-shared name;
      // we'll regenerate hero webps below for mainpage 2/3/5
    }

    await sharp(src)
      .resize(700, 460, { fit: 'cover', position: 'centre' })
      .webp({ quality: 68, effort: 6 })
      .toFile(webpOut);

    await sharp(src)
      .resize(700, 460, { fit: 'cover', position: 'centre' })
      .avif({ quality: 48, effort: 6 })
      .toFile(avifOut);

    await report(webpOut);
    await report(avifOut);
  }
}

async function restoreHeroWebps() {
  for (const src of heroWebpSources) {
    if (!fs.existsSync(src)) continue;
    const parsed = path.parse(src);
    const webpOut = path.join(parsed.dir, `${parsed.name}.webp`);
    await sharp(src)
      .resize(1400, 900, { fit: 'cover', position: 'centre' })
      .webp({ quality: 72, effort: 6 })
      .toFile(webpOut);
    await report(webpOut);
  }
}

await makeCards();
await restoreHeroWebps();
