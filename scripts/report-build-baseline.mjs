import { appendFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const distRoot = path.resolve('dist');
const files = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(absolute);
    else if (entry.isFile()) files.push(absolute);
  }
}

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / 1024 ** 2).toFixed(2)} MiB`;
};

await walk(distRoot);

const rows = [];
let totalBytes = 0;
let imageBytes = 0;
let jsBytes = 0;
let cssBytes = 0;

for (const file of files) {
  const { size } = await stat(file);
  totalBytes += size;
  const extension = path.extname(file).toLowerCase();
  if (['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg', '.ico'].includes(extension)) imageBytes += size;
  if (extension === '.js') jsBytes += size;
  if (extension === '.css') cssBytes += size;
}

rows.push(['Generated files', String(files.length)]);
rows.push(['Total dist size', formatBytes(totalBytes)]);
rows.push(['Images/icons', formatBytes(imageBytes)]);
rows.push(['JavaScript', formatBytes(jsBytes)]);
rows.push(['CSS', formatBytes(cssBytes)]);

const markdown = [
  '## Production build footprint',
  '',
  '| Metric | Current build |',
  '| --- | ---: |',
  ...rows.map(([label, value]) => `| ${label} | ${value} |`),
  '',
  '_This v1.0.1 report records the current build footprint as a no-regression reference; it does not enforce arbitrary Lighthouse score targets._',
  ''
].join('\n');

console.log(markdown);
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, markdown);
