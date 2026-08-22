#!/usr/bin/env bash
set -euo pipefail

rm -rf dist
mkdir -p dist

# Copy the static source files.
cp index.html 404.html styles.css script.js favicon.svg site.webmanifest robots.txt _headers dist/
cp -R projects dist/projects

# Rehydrate optimized image assets from repository bundles.
for bundle in bundles/*.tar.gz; do
  tar -xzf "$bundle" -C dist
 done

echo "Cloudflare Pages output prepared in dist/"
