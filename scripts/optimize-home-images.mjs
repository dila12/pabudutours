import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const packageImages = [
  'src/assets/img/onedayTour/ella/7.jpeg',
  'src/assets/img/mainpage/3.jpeg',
  'src/assets/img/mainpage/4.jpeg',
  'src/assets/img/mainpage/5.jpeg',
  'src/assets/img/mainpage/2.jpeg',
  'src/assets/img/mainpage/6.jpeg',
  'src/assets/img/5daysTours/24.jpg',
  'src/assets/img/7daystour/goayffj226ceow8zxhey.jpg',
  'src/assets/img/onedayTour/Galle/10.jpg',
  'src/assets/img/2daysTours/1.jpeg',
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

/** Cards display ~346×227 on mobile; 400×260 matches HTML attrs + slight headroom. */
async function makeCards() {
  for (const src of packageImages) {
    if (!fs.existsSync(src)) {
      console.log('MISSING', src);
      continue;
    }
    const parsed = path.parse(src);
    const webpOut = path.join(parsed.dir, `${parsed.name}-card.webp`);
    const avifOut = path.join(parsed.dir, `${parsed.name}-card.avif`);

    await sharp(src)
      .resize(400, 260, { fit: 'cover', position: 'centre' })
      .webp({ quality: 64, effort: 6 })
      .toFile(webpOut);

    await sharp(src)
      .resize(400, 260, { fit: 'cover', position: 'centre' })
      .avif({ quality: 42, effort: 6 })
      .toFile(avifOut);

    await report(webpOut);
    await report(avifOut);
  }
}

/**
 * About block: ~373×280 mobile, ~half-column desktop.
 * Mobile gets 480w; desktop gets 800w.
 */
async function makeAbout() {
  const master = fs.existsSync('src/assets/img/mainpage/2.jpeg')
    ? 'src/assets/img/mainpage/2.jpeg'
    : 'src/assets/img/mainpage/about.webp';
  if (!fs.existsSync(master)) {
    console.log('MISSING about source');
    return;
  }

  const variants = [
    { name: 'about-480', w: 480, h: 360 },
    { name: 'about', w: 800, h: 600 },
  ];

  for (const { name, w, h } of variants) {
    const webpOut = `src/assets/img/mainpage/${name}.webp`;
    const avifOut = `src/assets/img/mainpage/${name}.avif`;
    const webpBuf = await sharp(master)
      .resize(w, h, { fit: 'cover', position: 'centre' })
      .webp({ quality: 68, effort: 6 })
      .toBuffer();
    fs.writeFileSync(webpOut, webpBuf);
    await sharp(webpBuf).avif({ quality: 45, effort: 6 }).toFile(avifOut);
    await report(webpOut);
    await report(avifOut);
  }
}

await makeCards();
await makeAbout();
