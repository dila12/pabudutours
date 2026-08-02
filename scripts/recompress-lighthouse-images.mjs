import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const root = 'src/assets/img';

async function report(label, file) {
  const size = (await fs.stat(file)).size;
  console.log(`${label}: ${Math.round(size / 1024)} KB`);
}

// Mobile hero must stay sharp on full-bleed phones (~2–3x DPR).
const heroSrc = path.join(root, 'mainpage/hero-master.jpg');
const heroFallback = path.join(root, 'mainpage/4.jpeg');
const heroIn = await fs
  .access(heroSrc)
  .then(() => heroSrc)
  .catch(() => heroFallback);

await sharp(heroIn)
  .rotate()
  .resize(1200, 1600, { fit: 'cover', position: 'centre' })
  .webp({ quality: 86, effort: 6, smartSubsample: true })
  .toFile(path.join(root, 'mainpage/hero-800.webp'));
await report('hero-800.webp', path.join(root, 'mainpage/hero-800.webp'));
await sharp(heroIn)
  .rotate()
  .resize(1200, 1600, { fit: 'cover', position: 'centre' })
  .avif({ quality: 58, effort: 6 })
  .toFile(path.join(root, 'mainpage/hero-800.avif'));
await report('hero-800.avif', path.join(root, 'mainpage/hero-800.avif'));

await sharp(path.join(root, 'mainpage/6.jpeg'))
  .rotate()
  .resize(1400, 900, { fit: 'cover', withoutEnlargement: true })
  .webp({ quality: 82, effort: 6, smartSubsample: true })
  .toFile(path.join(root, 'mainpage/6-800.webp'));
await report('6-800.webp', path.join(root, 'mainpage/6-800.webp'));

await sharp(path.join(root, 'mainpage/6.jpeg'))
  .rotate()
  .resize(1400, 900, { fit: 'cover', withoutEnlargement: true })
  .avif({ quality: 55, effort: 6 })
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