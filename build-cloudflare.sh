#!/usr/bin/env bash
set -euo pipefail

rm -rf dist
mkdir -p dist

cp index.html 404.html styles.css script.js favicon.svg site.webmanifest robots.txt dist/
cp -R projects assets dist/

echo "Cloudflare static bundle prepared in ./dist"
