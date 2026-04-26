/**
 * Uploads processed WebP sizes for a photo to Cloudflare R2.
 *
 * Usage:
 *   node scripts/upload-photo.mjs <output-name>
 *
 * Example:
 *   node scripts/upload-photo.mjs imp-face-ledges
 *
 * Uploads:
 *   photos-processed/imp-face-ledges-400w.webp  → R2: photos/imp-face-ledges-400w.webp
 *   photos-processed/imp-face-ledges-900w.webp  → R2: photos/imp-face-ledges-900w.webp
 *   photos-processed/imp-face-ledges-1800w.webp → R2: photos/imp-face-ledges-1800w.webp
 *
 * Requires: wrangler logged in (`npx wrangler login`)
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';

const BUCKET = 'firstlighttrails-photos';
const SIZES = ['400w', '900w', '1800w'];
const IN_DIR = './photos-processed';

const [,, name] = process.argv;

if (!name) {
  console.error('Usage: node scripts/upload-photo.mjs <output-name>');
  console.error('Example: node scripts/upload-photo.mjs imp-face-ledges');
  process.exit(1);
}

for (const suffix of SIZES) {
  const file = `${IN_DIR}/${name}-${suffix}.webp`;
  const key  = `photos/${name}-${suffix}.webp`;

  if (!existsSync(file)) {
    console.error(`Missing: ${file} — run process-photo.mjs first`);
    process.exit(1);
  }

  console.log(`Uploading ${file} → r2://${BUCKET}/${key}`);
  execSync(
    `npx wrangler r2 object put ${BUCKET}/${key} --file ${file} --content-type image/webp`,
    { stdio: 'inherit' }
  );
}

console.log('\nUploaded. Photos available at:');
console.log(`  $R2_PUBLIC_URL/photos/${name}-{400w,900w,1800w}.webp`);
