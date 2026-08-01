import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const root = 'src/assets/img';

async function toWebp(input, output, opts = {}) {
  await fs.mkdir(path.dirname(output), { recursive: true });
  await sharp(input).webp(opts).toFile(output);
  const inStat = await fs.stat(input);
  const outStat = await fs.stat(output);
  console.log(
    path.basename(output),
    Math.round(inStat.size / 1024) + 'KB ->',
    Math.round(outStat.size / 1024) + 'KB',
  );
}

for (let i = 1; i <= 6; i++) {
  await toWebp(
    path.join(root, `destination-${i}.jpg`),
    path.join(root, `destination-${i}.webp`),
    { quality: 72, effort: 5 },
  );
}

await sharp(path.join(root, 'logos/2.png'))
  .resize(112, 112, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .webp({ quality: 80, effort: 5 })
  .toFile(path.join(root, 'logos/logo-112.webp'));
console.log(
  'logo-112.webp',
  Math.round((await fs.stat(path.join(root, 'logos/logo-112.webp'))).size / 1024) +
    'KB',
);

await sharp(path.join(root, 'mainpage/6.jpeg'))
  .resize(1600, null, { withoutEnlargement: true })
  .webp({ quality: 68, effort: 5 })
  .toFile(path.join(root, 'mainpage/6.webp'));

await sharp(path.join(root, 'mainpage/6.jpeg'))
  .resize(800, null, { withoutEnlargement: true })
  .webp({ quality: 68, effort: 5 })
  .toFile(path.join(root, 'mainpage/6-800.webp'));

await sharp(path.join(root, 'mainpage/hero.webp'))
  .resize(480, null, { withoutEnlargement: true })
  .webp({ quality: 70, effort: 5 })
  .toFile(path.join(root, 'mainpage/hero-480.webp'));

const optPath = path.join(root, 'mainpage/hero-800-opt.webp');
const hero800 = path.join(root, 'mainpage/hero-800.webp');
await sharp(hero800).webp({ quality: 68, effort: 5 }).toFile(optPath);
const a = await fs.stat(hero800);
const b = await fs.stat(optPath);
if (b.size < a.size) {
  await fs.rename(optPath, hero800);
  console.log('replaced hero-800.webp', Math.round(b.size / 1024) + 'KB');
} else {
  await fs.unlink(optPath);
  console.log('kept hero-800.webp', Math.round(a.size / 1024) + 'KB');
}

for (const f of ['6.webp', '6-800.webp', 'hero-480.webp']) {
  const s = await fs.stat(path.join(root, 'mainpage', f));
  console.log(f, Math.round(s.size / 1024) + 'KB');
}
