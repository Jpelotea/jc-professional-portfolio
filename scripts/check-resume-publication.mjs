import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

// Accept a disposable output directory for negative tests; never inspect source strings.
const root = path.resolve(process.argv[2] || 'dist');
const prohibited = '/resume/jc-pelotea-resume.pdf';
const origin = 'https://portfolio.jcpelotea.workers.dev';
const failures = [];
let pages = 0;

const decode = value => value.replace(/&(?:#(x[0-9a-f]+|\d+)|amp|quot|apos|colon|sol);/gi, (entity, number) => {
  if (number) return String.fromCodePoint(Number.parseInt(number.replace(/^x/i, ''), /^x/i.test(number) ? 16 : 10));
  return ({ '&amp;': '&', '&quot;': '"', '&apos;': "'", '&colon;': ':', '&sol;': '/' })[entity.toLowerCase()];
});

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Unexpected symlink in prepared output: ${file}`);
    if (entry.isDirectory()) { await walk(file); continue; }
    if (entry.name.toLowerCase() === 'jc-pelotea-resume.pdf') failures.push(`${file}: prohibited PDF`);
    if (!entry.name.endsWith('.html')) continue;
    pages++;
    const html = (await readFile(file, 'utf8')).replace(/<!--[^]*?-->|<script\b[^>]*>[^]*?<\/script>/gi, '');
    for (const match of html.matchAll(/<a\b([^>]*?)>([^]*?)<\/a\s*>/gi)) {
      const attributes = new Map();
      for (const attr of match[1].matchAll(/([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
        attributes.set(attr[1].toLowerCase(), decode(attr[2] ?? attr[3] ?? attr[4] ?? ''));
      }
      const href = attributes.get('href')?.trim() ?? '';
      const label = decode(`${attributes.get('aria-label') || ''} ${match[2].replace(/<[^>]*>/g, ' ')}`).normalize('NFD').replace(/\p{M}/gu, '');
      let url;
      try { url = new URL(href, `${origin}/${path.relative(root, file).replaceAll(path.sep, '/')}`); } catch { /* handled below */ }
      let pathname = url?.pathname || '';
      try { pathname = decodeURIComponent(pathname); } catch { /* malformed résumé destination fails below */ }
      if (pathname.endsWith(prohibited)) failures.push(`${file}: prohibited résumé link ${href}`);
      const resumeLink = /\bresume\b/i.test(label) || /\/resume\//i.test(pathname);
      if (!resumeLink) continue;
      if (!href || /^(?:#|null|undefined|\[object Object\])/i.test(href) || !url || !['https:', 'http:'].includes(url.protocol)) {
        failures.push(`${file}: malformed résumé destination ${JSON.stringify(href)}`);
        continue;
      }
      // Public résumé destinations are local PDFs; mailto fallbacks have contact labels.
      if (url.origin !== origin || !pathname.startsWith('/resume/') || !pathname.toLowerCase().endsWith('.pdf')) {
        failures.push(`${file}: résumé destination must be a local /resume/ PDF: ${href}`);
        continue;
      }
      const target = path.resolve(root, `.${pathname}`);
      if (!target.startsWith(`${root}${path.sep}`)) { failures.push(`${file}: destination escapes output`); continue; }
      try { await access(target); } catch { failures.push(`${file}: missing résumé asset ${href}`); }
    }
  }
}

await walk(root);
if (!pages) failures.push('No generated HTML pages found; prepare production output first.');
if (failures.length) {
  console.error(`Résumé publication check failed:\n${failures.map(item => `- ${item}`).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Résumé publication check passed across ${pages} prepared HTML pages.`);
}
