/**
 * Converts a raw photo into 3 WebP sizes ready for upload to R2.
 *
 * Usage:
 *   node scripts/process-photo.mjs <input-file> <output-name>
 *
 * Example:
 *   node scripts/process-photo.mjs ~/Photos/imp-face-ledges-raw.jpg imp-face-ledges
 *
 * Output (in photos-processed/):
 *   imp-face-ledges-400w.webp   ~80-150 KB   (mobile)
 *   imp-face-ledges-900w.webp   ~200-400 KB  (tablet / small desktop)
 *   imp-face-ledges-1800w.webp  ~500-900 KB  (full desktop / retina)
 *
 * After running, upload with:
 *   node scripts/upload-photo.mjs imp-face-ledges
 */

import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { resolve, basename, extname } from 'path';

const SIZES = [
  { width: 400,  suffix: '400w' },
  { width: 900,  suffix: '900w' },
  { width: 1800, suffix: '1800w' },
];
const QUALITY = 82;
const OUT_DIR = './photos-processed';

const [,, inputArg, outputName] = process.argv;

if (!inputArg || !outputName) {
  console.error('Usage: node scripts/process-photo.mjs <input-file> <output-name>');
  console.error('Example: node scripts/process-photo.mjs ~/Photos/my-shot.jpg imp-face-ledges');
  process.exit(1);
}

const inputPath = resolve(inputArg.replace(/^~/, process.env.HOME));

await mkdir(OUT_DIR, { recursive: true });

console.log(`Processing: ${basename(inputPath)} → ${outputName}`);

for (const { width, suffix } of SIZES) {
  const outPath = `${OUT_DIR}/${outputName}-${suffix}.webp`;
  await sharp(inputPath)
    .resize(width, null, { withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outPath);

  const { size } = await import('fs').then(fs =>
    fs.promises.stat(outPath)
  );
  const kb = Math.round(size / 1024);
  console.log(`  ✓ ${suffix}  →  ${outPath}  (${kb} KB)`);
}

console.log('\nDone. Run upload-photo.mjs to push to R2.');
