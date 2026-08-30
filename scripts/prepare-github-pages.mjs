import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const dist = 'dist';
const basePath = '/jc-professional-portfolio';
const cloudflareOrigin = 'https://portfolio.jcpelotea.workers.dev';
const pagesOrigin = 'https://jpelotea.github.io';
const pagesBaseUrl = `${pagesOrigin}${basePath}`;

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

for (const file of await walk(dist)) {
  const ext = extname(file);
  if (!textExtensions.has(ext) && !file.endsWith('.webmanifest')) continue;

  let text = await readFile(file, 'utf8');
  text = text.replaceAll(cloudflareOrigin, pagesBaseUrl);

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
if (!homepage.includes(`${pagesBaseUrl}/assets/og-default.png`)) {
  throw new Error('GitHub Pages Open Graph image URL was not rewritten correctly.');
}
if (!homepage.includes(`href="${basePath}/work/"`)) {
  throw new Error('GitHub Pages internal links were not rewritten correctly.');
}

console.log(`Prepared GitHub Pages mirror at ${pagesBaseUrl}/`);
