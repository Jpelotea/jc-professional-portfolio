import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const siteUrl = 'https://portfolio.jcpelotea.workers.dev';
const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

const pages = [
  { file: 'dist/index.html', types: ['Person', 'WebSite'] },
  { file: 'dist/about/index.html', types: ['Person', 'ProfilePage'] },
  { file: 'dist/work/index.html', types: ['Person', 'BreadcrumbList'] },
  { file: 'dist/work/avodah/index.html', types: ['Person', 'BreadcrumbList', 'CreativeWork'], caseName: 'Avodah Wealth Advisory' },
  { file: 'dist/work/openready/index.html', types: ['Person', 'BreadcrumbList', 'CreativeWork'], caseName: 'OpenReady' },
  { file: 'dist/work/ice-zeta/index.html', types: ['Person', 'BreadcrumbList', 'CreativeWork'], caseName: 'ICE Zeta Group' },
  { file: 'dist/work/konnevia/index.html', types: ['Person', 'BreadcrumbList', 'CreativeWork'], caseName: 'Konnevia' }
];

const failures = [];

function fail(file, message) {
  failures.push(`${file}: ${message}`);
}

function getTypes(graph) {
  return graph.flatMap((entry) => Array.isArray(entry?.['@type']) ? entry['@type'] : [entry?.['@type']]).filter(Boolean);
}

for (const page of pages) {
  const absolute = path.join(root, page.file);
  const html = await readFile(absolute, 'utf8');
  const scripts = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];

  if (scripts.length !== 1) {
    fail(page.file, `expected exactly one JSON-LD script, found ${scripts.length}`);
    continue;
  }

  let data;
  try {
    data = JSON.parse(scripts[0][1]);
  } catch (error) {
    fail(page.file, `JSON-LD is not valid JSON (${error instanceof Error ? error.message : String(error)})`);
    continue;
  }

  if (data['@context'] !== 'https://schema.org') fail(page.file, 'missing schema.org @context');
  if (!Array.isArray(data['@graph'])) {
    fail(page.file, 'expected an @graph array');
    continue;
  }

  const graph = data['@graph'];
  const types = getTypes(graph);
  for (const expected of page.types) {
    if (!types.includes(expected)) fail(page.file, `missing ${expected} entity`);
  }

  const person = graph.find((entry) => entry?.['@type'] === 'Person');
  if (person?.['@id'] !== personId) fail(page.file, 'Person entity does not use the stable @id');

  if (page.file === 'dist/index.html') {
    const website = graph.find((entry) => entry?.['@type'] === 'WebSite');
    if (website?.['@id'] !== websiteId) fail(page.file, 'WebSite entity does not use the stable @id');
    if (website?.about?.['@id'] !== personId) fail(page.file, 'WebSite does not reference the Person entity');
  }

  if (page.file === 'dist/about/index.html') {
    const profile = graph.find((entry) => entry?.['@type'] === 'ProfilePage');
    if (profile?.mainEntity?.['@id'] !== personId) fail(page.file, 'ProfilePage mainEntity does not reference Person');
    if (profile?.isPartOf?.['@id'] !== websiteId) fail(page.file, 'ProfilePage isPartOf does not reference WebSite');
  }

  const breadcrumb = graph.find((entry) => entry?.['@type'] === 'BreadcrumbList');
  if (breadcrumb) {
    if (!Array.isArray(breadcrumb.itemListElement) || breadcrumb.itemListElement.length < 2) {
      fail(page.file, 'BreadcrumbList does not contain the expected items');
    }
  }

  if (page.caseName) {
    const work = graph.find((entry) => entry?.['@type'] === 'CreativeWork');
    if (work?.name !== page.caseName) fail(page.file, `CreativeWork name should be ${page.caseName}`);
    if (work?.creator?.['@id'] !== personId) fail(page.file, 'CreativeWork creator does not reference Person');
    if (work?.isPartOf?.['@id'] !== websiteId) fail(page.file, 'CreativeWork isPartOf does not reference WebSite');
  }
}

if (failures.length) {
  console.error('Structured data validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Structured data validation passed for ${pages.length} pages.`);
