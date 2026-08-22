#!/usr/bin/env bash
set -euo pipefail

npm run build

# Keep existing verified portfolio assets and host-level static files.
cp -R assets dist/assets
cp favicon.svg site.webmanifest robots.txt _headers dist/

# Cloudflare static-assets 404 handling expects a root 404.html file.
cp 404.html dist/404.html

echo "Astro portfolio prepared in ./dist"
