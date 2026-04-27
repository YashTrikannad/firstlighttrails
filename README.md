# First Light Trails

Personal hiking and photography guides for New England and beyond.

## Local development

```sh
npm install
npm run dev       # → http://localhost:4321
npm run build     # production build to ./dist/
npm run preview   # preview the build locally
```

---

## Adding a trail guide

### 1. Scaffold the file

```sh
npm run new-trail trail-name
# e.g. npm run new-trail mt-chocorua
#      npm run new-trail "Kearsarge North"   ← converts to kebab-case automatically
```

This creates `src/content/trails/<slug>.mdx` from the template with your slug pre-filled.

### 2. Fill in the frontmatter

Open the new file and edit the fields at the top. The template has a comment on every field. The required ones:

| Field | Description |
| ----- | ----------- |
| `title` | Trail name as shown on the site |
| `location` | Range and state, e.g. `"White Mountains, NH"` |
| `summary` | One sentence for the trail card |
| `difficulty` | `easy` / `moderate` / `hard` / `strenuous` |
| `scenicRating` | 1–5 |
| `routes` | At least one entry with distance, elevation gain, and type |
| `bestSeason` | Array of month names |

Optional but recommended:

| Field | Description |
| ----- | ----------- |
| `peakCoords` | Enables the Sunrise & Light section (see below) |
| `coverPhoto` | Hero image base filename, e.g. `"mt-chocorua-cover"` |
| `hikingLists` | e.g. `["52wav"]` if the peak is on a list |

### 3. Get peak coordinates

`peakCoords` unlocks the sunrise/sunset times section on the trail page. To get them:

1. Open Google Maps and navigate to the summit
2. Right-click → **Copy coordinates**
3. Google gives you `lat, lng` — **swap the order** for the file: `[longitude, latitude]`

```yaml
peakCoords: [-71.273300, 43.954350]
#            ^^^^^^^^^^  ^^^^^^^^^^
#            longitude   latitude
#            (negative   (positive
#            for NH)     for NH)
```

### 4. Upload photos to R2

Photos live in Cloudflare R2 under `/photos/`. Use the existing photo script:

```sh
npm run photo:add <path-to-photo.jpg> <desired-name>
# e.g. npm run photo:add ~/Desktop/summit.jpg mt-chocorua-cover
```

Reference photos in the MDX with `<TrailPhoto photo="mt-chocorua-cover" caption="..." />`.

### 5. Add a GPS track (optional)

Export a GeoJSON from AllTrails (or convert a GPX with [gpx.studio](https://gpx.studio)) and place it in:

```
public/tracks/<slug>-route.geojson
```

Then add the filename (without extension) to the route in the frontmatter:

```yaml
routes:
  - name: "Northern Approach"
    distance: 4
    elevationGain: 1800
    type: "out-and-back"
    track: "mt-chocorua-route"   ← add this line
```

The track will appear on the trail page map and show on hover on the home page map.

### 6. Link to the home page map (optional)

To make the map marker popup show a photo and link to your guide, add `trailSlug` to the matching peak in `src/data/hikingLists.ts`:

```ts
{ name: "Mt. Chocorua", elevation: 3490, coords: [-71.273300, 43.954350], trailSlug: 'mt-chocorua' },
```

The trail page works fine without this step — it only affects the home page map popup.

---

## MDX components

Use these inside the trail guide prose:

### `<TrailPhoto>`

```mdx
<TrailPhoto
  photo="mt-chocorua-1"
  caption="Looking north from the summit cone"
/>

<TrailPhoto
  photo="mt-chocorua-2"
  caption="The approach through Carter Ledge Trail"
  wide={true}
/>
```

`wide={true}` makes the image break out of the text column.

### `<PhotoSpot>`

A callout block with photographer-specific notes about a shooting location.

```mdx
<PhotoSpot
  name="Summit Cone — Southeast Face"
  facing="southeast"
  bestTime="At sunrise, late September through October"
  notes="The open rock face catches the first light directly. Stand near the
         benchmark for an unobstructed view of the Sandwich Range. The
         foreground slabs make a strong leading line toward the horizon."
/>
```

All props except `name` are optional.

---

## Environment variables

Set these in `.env` locally and in the Cloudflare Pages dashboard for production:

```
PUBLIC_MAPBOX_TOKEN=pk.eyJ1...
PUBLIC_PHOTOS_BASE=https://your-r2-bucket.example.com
```

Both are baked in at build time. The `PUBLIC_` prefix is required for them to be accessible in the browser.
