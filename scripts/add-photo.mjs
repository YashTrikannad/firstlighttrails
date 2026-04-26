/**
 * Process and upload a single photo to Cloudflare R2.
 *
 * Usage:
 *   node scripts/add-photo.mjs <input-path> <name>
 *
 * Examples:
 *   node scripts/add-photo.mjs ~/Photos/summit.jpg imp-face-summit
 *   node scripts/add-photo.mjs "path with spaces/photo.jpg" imp-face-approach
 *
 * What it does:
 *   1. Resizes to 1600px wide (preserves aspect ratio), converts to WebP at 82% quality
 *   2. Uploads to R2 bucket as photos/<name>.webp
 *   3. Prints the <TrailPhoto> tag to paste into your MDX file
 */

import sharp from 'sharp';
import { execSync } from 'child_process';
import { mkdirSync, statSync, unlinkSync } from 'fs';
import { resolve, basename, extname } from 'path';
import { tmpdir } from 'os';

const BUCKET = 'firstlighttrails-photos';
const WIDTH = 1600;
const QUALITY = 82;

const [,, inputArg, name] = process.argv;

if (!inputArg || !name) {
  console.error('Usage: node scripts/add-photo.mjs <input-path> <name>');
  console.error('Example: node scripts/add-photo.mjs ~/Photos/summit.jpg imp-face-summit');
  process.exit(1);
}

const inputPath = resolve(inputArg.replace(/^~/, process.env.HOME));
const tmpFile = `${tmpdir()}/${name}.webp`;

// --- Process ---
console.log(`Processing ${basename(inputPath)}...`);
const meta = await sharp(inputPath).metadata();
const w = meta.width ?? 0;
const h = meta.height ?? 0;
console.log(`  Original: ${w}×${h}px  (${(statSync(inputPath).size / 1024 / 1024).toFixed(1)} MB)`);

await sharp(inputPath)
  .resize(WIDTH, null, { withoutEnlargement: true })
  .webp({ quality: QUALITY })
  .toFile(tmpFile);

const outSize = statSync(tmpFile).size;
console.log(`  Output:   ${Math.min(w, WIDTH)}px wide  (${Math.round(outSize / 1024)} KB)`);

// --- Upload ---
console.log(`Uploading to r2://${BUCKET}/photos/${name}.webp ...`);
execSync(
  `npx wrangler r2 object put "${BUCKET}/photos/${name}.webp" --file "${tmpFile}" --content-type image/webp --remote`,
  { stdio: 'inherit' }
);

unlinkSync(tmpFile);

// --- Done ---
console.log(`
Done! Paste this into your MDX file:

  <TrailPhoto photo="${name}" caption="Your caption here" />

`);
