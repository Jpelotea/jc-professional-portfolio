import { access, readdir, readFile } from 'node:fs/promises';
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

function stripQueryAndHash(value) {
  return value.split('#', 1)[0].split('?', 1)[0];
}

function isIgnored(value) {
  if (!value || value.startsWith('#') || value.startsWith('//')) return true;
  return /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(value);
}

function candidatePaths(value, htmlFile) {
  const cleaned = stripQueryAndHash(value);
  if (!cleaned) return [];

  const relativePageDir = path.relative(distRoot, path.dirname(htmlFile));
  const base = cleaned.startsWith('/')
    ? path.join(distRoot, cleaned.slice(1))
    : path.resolve(distRoot, relativePageDir, cleaned);

  const resolved = path.resolve(base);
  if (resolved !== distRoot && !resolved.startsWith(`${distRoot}${path.sep}`)) return [];

  if (cleaned.endsWith('/')) return [path.join(resolved, 'index.html')];
  if (path.extname(cleaned)) return [resolved];
  return [resolved, `${resolved}.html`, path.join(resolved, 'index.html')];
}

async function exists(candidate) {
  try {
    await access(candidate);
    return true;
  } catch {
    return false;
  }
}

await walk(distRoot);

const failures = [];
const attributePattern = /\b(?:href|src|poster|action)\s*=\s*["']([^"']*)["']/gi;
const srcsetPattern = /\bsrcset\s*=\s*["']([^"']*)["']/gi;

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, 'utf8');
  const values = [];

  for (const match of html.matchAll(attributePattern)) values.push(match[1]);
  for (const match of html.matchAll(srcsetPattern)) {
    for (const item of match[1].split(',')) values.push(item.trim().split(/\s+/)[0]);
  }

  for (const value of values) {
    if (isIgnored(value)) continue;
    const candidates = candidatePaths(value, htmlFile);
    if (!candidates.length) continue;

    let found = false;
    for (const candidate of candidates) {
      if (await exists(candidate)) {
        found = true;
        break;
      }
    }

    if (!found) {
      failures.push({
        page: `/${path.relative(distRoot, htmlFile).replaceAll(path.sep, '/')}`,
        target: value
      });
    }
  }
}

if (failures.length) {
  console.error(`Found ${failures.length} broken internal reference${failures.length === 1 ? '' : 's'}:`);
  for (const failure of failures) console.error(`- ${failure.page} -> ${failure.target}`);
  process.exit(1);
}

console.log(`Internal link check passed across ${htmlFiles.length} generated HTML pages.`);
