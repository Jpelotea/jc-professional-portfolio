#!/usr/bin/env bash
set -euo pipefail

npm run build

# Keep existing verified portfolio assets and host-level static files.
cp -R assets dist/assets
cp favicon.svg favicon.ico favicon-16.png favicon-32.png favicon-48.png favicon-64.png apple-touch-icon.png icon-192.png icon-512.png site.webmanifest robots.txt _headers dist/

# Generate conventional raster Open Graph cards from the version-controlled SVG sources.
node scripts/generate-social-images.mjs

# Cloudflare static-assets 404 handling expects a root 404.html file.
cp 404.html dist/404.html

echo "Astro portfolio prepared in ./dist"
