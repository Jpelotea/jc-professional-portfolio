import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const dist = 'dist';
const basePath = '/jc-professional-portfolio';
const cloudflareOrigin = 'https://portfolio.jcpelotea.workers.dev';
const pagesOrigin = 'https://jpelotea.github.io';
const pagesBaseUrl = `${pagesOrigin}${basePath}`;
const cloudflareCardLabel = 'portfolio.jcpelotea.workers.dev';
const pagesCardLabel = 'jpelotea.github.io/jc-professional-portfolio';
const defaultCardUrl = `${pagesBaseUrl}/assets/og-default.png`;
const pagesCardUrl = `${pagesBaseUrl}/assets/og-default-pages.png`;

const textExtensions = new Set(['.html', '.css', '.json', '.xml', '.txt', '.webmanifest']);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

const sourceCardSvg = await readFile(`${dist}/assets/og-default.svg`, 'utf8');
if (!sourceCardSvg.includes(cloudflareCardLabel)) {
  throw new Error('Default social card no longer contains the expected Cloudflare URL label.');
}

const pagesCardSvg = sourceCardSvg.replaceAll(cloudflareCardLabel, pagesCardLabel);
await sharp(Buffer.from(pagesCardSvg), { density: 144 })
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(`${dist}/assets/og-default-pages.png`);

for (const file of await walk(dist)) {
  const ext = extname(file);
  if (!textExtensions.has(ext) && !file.endsWith('.webmanifest')) continue;

  let text = await readFile(file, 'utf8');
  text = text.replaceAll(cloudflareOrigin, pagesBaseUrl);
  text = text.replaceAll(defaultCardUrl, pagesCardUrl);

  if (ext === '.html') {
    text = text.replace(/<script[^>]+src=["'][^"']*analytics-events[^"']*["'][^>]*><\/script>/gi, '');
    text = text.replace(/([="'])\/(?!\/|jc-professional-portfolio\/)/g, `$1${basePath}/`);
  }

  if (ext === '.css') {
    text = text.replace(/url\((["']?)\/(?!\/|jc-professional-portfolio\/)/g, `url($1${basePath}/`);
  }

  if (file.endsWith('.webmanifest')) {
    const manifest = JSON.parse(text);
    manifest.start_url = `${basePath}/`;
    manifest.icons = (manifest.icons || []).map((icon) => ({
      ...icon,
      src: icon.src?.startsWith('/') ? `${basePath}${icon.src}` : icon.src
    }));
    text = JSON.stringify(manifest);
  }

  await writeFile(file, text);
}

await writeFile(`${dist}/.nojekyll`, '');

const homepage = await readFile(`${dist}/index.html`, 'utf8');
if (!homepage.includes(pagesCardUrl)) {
  throw new Error('GitHub Pages Open Graph image URL was not rewritten to the Pages-specific card.');
}
if (!homepage.includes(`href="${basePath}/work/"`)) {
  throw new Error('GitHub Pages internal links were not rewritten correctly.');
}

console.log(`Prepared GitHub Pages mirror at ${pagesBaseUrl}/ with a Pages-specific social card.`);
