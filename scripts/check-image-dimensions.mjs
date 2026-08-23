import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const distRoot = path.resolve('dist');
const htmlFiles = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(absolute);
    else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(absolute);
  }
}

await walk(distRoot);

const failures = [];
const imagePattern = /<img\b[^>]*>/gi;

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, 'utf8');

  for (const match of html.matchAll(imagePattern)) {
    const tag = match[0];
    const src = tag.match(/\bsrc\s*=\s*["']([^"']*)["']/i)?.[1] ?? '';
    if (!src) continue;

    const hasWidth = /\bwidth\s*=\s*["'][^"']+["']/i.test(tag);
    const hasHeight = /\bheight\s*=\s*["'][^"']+["']/i.test(tag);
    if (hasWidth && hasHeight) continue;

    failures.push({
      page: `/${path.relative(distRoot, htmlFile).replaceAll(path.sep, '/')}`,
      src,
      missing: [!hasWidth ? 'width' : null, !hasHeight ? 'height' : null].filter(Boolean).join(' + ')
    });
  }
}

if (failures.length) {
  console.error(`Found ${failures.length} generated image${failures.length === 1 ? '' : 's'} without intrinsic dimensions:`);
  for (const failure of failures) console.error(`- ${failure.page} -> ${failure.src} (missing ${failure.missing})`);
  process.exit(1);
}

console.log(`Image dimension check passed across ${htmlFiles.length} generated HTML pages.`);
