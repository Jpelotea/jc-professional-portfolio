#!/usr/bin/env bash
set -euo pipefail

npm run build

# Keep existing verified portfolio assets and host-level static files.
cp -R assets dist/assets
cp -R resume dist/resume
cp favicon.svg favicon.ico favicon-16.png favicon-32.png favicon-48.png favicon-64.png apple-touch-icon.png icon-192.png icon-512.png site.webmanifest robots.txt _headers dist/

# Generate conventional raster Open Graph cards from the version-controlled SVG sources.
node scripts/generate-social-images.mjs

# Add explicit social-crawler metadata to the homepage preview card.
node scripts/harden-link-preview.mjs

# Cloudflare static-assets 404 handling expects a root 404.html file.
cp 404.html dist/404.html

# Inject optional account-side observability tags only when build variables are configured.
npm run inject:observability

echo "Astro portfolio prepared in ./dist"
