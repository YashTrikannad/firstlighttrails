#!/usr/bin/env node
/**
 * Scaffold a new trail guide from the template.
 *
 * Usage:
 *   node scripts/new-trail.mjs mt-chocorua
 *   node scripts/new-trail.mjs "Kearsarge North"   ← converts to kebab-case slug
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const input = process.argv[2];
if (!input) {
  console.error('Usage: node scripts/new-trail.mjs <trail-name-or-slug>');
  process.exit(1);
}

const slug = toSlug(input);
const dest = path.join(root, 'src', 'content', 'trails', `${slug}.mdx`);
const template = path.join(root, 'src', 'content', 'trails', '_template.mdx');

if (!fs.existsSync(template)) {
  console.error(`Template not found at ${template}`);
  process.exit(1);
}

if (fs.existsSync(dest)) {
  console.error(`Trail already exists: ${dest}`);
  process.exit(1);
}

let content = fs.readFileSync(template, 'utf8');

// Pre-fill the coverPhoto and track fields with the slug as a sensible default
content = content.replace(/coverPhoto: "trail-name-cover"/, `coverPhoto: "${slug}-cover"`);
content = content.replace(/photo="trail-name-(\d+)"/g, `photo="${slug}-$1"`);
content = content.replace(/track: "trail-name-route"/, `track: "${slug}-route"`);

fs.writeFileSync(dest, content);

console.log(`\n✓ Created: src/content/trails/${slug}.mdx\n`);
console.log('Next steps:');
console.log(`  1. Edit the frontmatter in ${slug}.mdx (title, location, difficulty, etc.)`);
console.log(`  2. Add peakCoords — right-click the summit in Google Maps → "Copy coordinates"`);
console.log(`     Format: peakCoords: [longitude, latitude]  ← longitude is negative for NH`);
console.log(`  3. Upload photos to R2 as /photos/${slug}-1.webp, /photos/${slug}-2.webp, ...`);
console.log(`  4. (Optional) Export GeoJSON from AllTrails → public/tracks/${slug}-route.geojson`);
console.log(`  5. (Optional) Add trailSlug: '${slug}' to the matching peak in src/data/hikingLists.ts`);
console.log(`     — this links the map marker popup to your guide\n`);
