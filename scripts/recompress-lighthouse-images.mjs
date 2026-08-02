import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const root = 'src/assets/img';

async function report(label, file) {
  const size = (await fs.stat(file)).size;
  console.log(`${label}: ${Math.round(size / 1024)} KB`);
}

// Mobile hero must stay sharp on full-bleed phones (~3x DPR) do not shrink to 400px.
const heroSrc = path.join(root, 'mainpage/4.jpeg');
await sharp(heroSrc)
  .rotate()
  .resize(960, 1280, { fit: 'cover', position: 'centre' })
  .webp({ quality: 76, effort: 6, smartSubsample: true })
  .toFile(path.join(root, 'mainpage/hero-480.webp'));
await report('hero-480.webp', path.join(root, 'mainpage/hero-480.webp'));
await sharp(heroSrc)
  .rotate()
  .resize(960, 1280, { fit: 'cover', position: 'centre' })
  .avif({ quality: 52, effort: 6 })
  .toFile(path.join(root, 'mainpage/hero-480.avif'));
await report('hero-480.avif', path.join(root, 'mainpage/hero-480.avif'));

await sharp(path.join(root, 'mainpage/6.jpeg'))
  .rotate()
  .resize(640, 400, { fit: 'cover' })
  .webp({ quality: 42, effort: 6, smartSubsample: true })
  .toFile(path.join(root, 'mainpage/6-800.webp'));
await report('6-800.webp', path.join(root, 'mainpage/6-800.webp'));

await sharp(path.join(root, 'mainpage/6.jpeg'))
  .rotate()
  .resize(640, 400, { fit: 'cover' })
  .avif({ quality: 38, effort: 6 })
  .toFile(path.join(root, 'mainpage/6-800.avif'));
await report('6-800.avif', path.join(root, 'mainpage/6-800.avif'));

for (let i = 1; i <= 6; i++) {
  const out = path.join(root, `destination-${i}.webp`);
  await sharp(path.join(root, `destination-${i}.jpg`))
    .resize(480, 336, { fit: 'cover' })
    .webp({ quality: 55, effort: 6, smartSubsample: true })
    .toFile(out);
  await report(`destination-${i}.webp`, out);
}