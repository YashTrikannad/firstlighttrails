# Hiking Site — Project Context

## What this is
A personal hiking guide + landscape photography website. The goal is curated, in-depth trail guides paired with the owner's own photography. Depth over breadth — fewer trails, detailed guides, strong photo gallery per location.

## About the owner
- Landscape photographer and hiker, based in New England, travels frequently across the US
- Full-time robotics engineer — strong CS background, comfortable with terminal and Git
- No prior web development experience — learning as we build

## Tech stack
- **Framework:** Astro (static site generator, minimal template)
- **Language:** TypeScript (strict)
- **Hosting:** Cloudflare Pages (planned)
- **Photo storage:** Cloudflare R2 (planned) — photos stored externally, referenced by URL in Markdown
- **Node:** v25.9.0, npm 11.12.1

## Project structure
```
src/
  pages/         — each file = a URL route
    index.astro  — home page (done, dark forest theme, "Trail & Frame")
public/          — static assets (favicon etc.)
astro.config.mjs
```

## Planned site structure
- `/` — Home page (done)
- `/trails` — Trail index listing all guides
- `/trails/[slug]` — Individual trail guide (detailed: conditions, gear, seasons, GPS)
- `/gallery` — Photo gallery
- `/about` — About the photographer

## Design
- Dark forest color scheme: background `#0f1a0f`, accent `#c8b89a`, muted green `#a0b09a`
- Font: Georgia (serif) for headings/body, system-ui for nav/labels
- Site name: "Trail & Frame"

## Where we left off
- Home page is built and running locally (`npm run dev` → localhost:4321)
- Next steps: build the trails section (index page + individual trail guide template using Astro's content collections)
- After that: set up GitHub repo + Cloudflare Pages deployment
