import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const distRoot = path.resolve('dist');
const cloudflareToken = process.env.CF_WEB_ANALYTICS_TOKEN?.trim() || '';
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim() || '';
const eventClientSource = path.join(distRoot, 'assets', 'analytics-events.js');
const eventClient = await readFile(eventClientSource);
const eventClientHash = createHash('sha256').update(eventClient).digest('hex').slice(0, 12);
const eventClientFilename = `analytics-events.${eventClientHash}.js`;
const eventClientOutput = path.join(distRoot, 'assets', eventClientFilename);
const eventClientSrc = `/assets/${eventClientFilename}`;
const htmlFiles = [];

await writeFile(eventClientOutput, eventClient);

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(absolute);
    else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(absolute);
  }
}

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function assertToken(name, value, pattern) {
  if (!value) return;
  if (!pattern.test(value)) throw new Error(`${name} contains unexpected characters.`);
}

assertToken('CF_WEB_ANALYTICS_TOKEN', cloudflareToken, /^[A-Za-z0-9_-]{16,128}$/);
assertToken('GOOGLE_SITE_VERIFICATION', googleVerification, /^[A-Za-z0-9._-]{8,256}$/);

await walk(distRoot);

let eventClientPages = 0;
let cloudflarePages = 0;
let googlePages = 0;

for (const htmlFile of htmlFiles) {
  let html = await readFile(htmlFile, 'utf8');
  let changed = false;
  const additions = [];

  if (!html.includes(eventClientSrc)) {
    additions.push(`<script src="${eventClientSrc}" defer></script>`);
    eventClientPages += 1;
    changed = true;
  }

  if (cloudflareToken && !html.includes('<!-- Cloudflare Web Analytics -->')) {
    const beaconConfig = JSON.stringify({ token: cloudflareToken });
    additions.push(
      `<!-- Cloudflare Web Analytics -->\n<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${beaconConfig}'></script>\n<!-- End Cloudflare Web Analytics -->`
    );
    cloudflarePages += 1;
    changed = true;
  }

  const isHomepage = path.resolve(htmlFile) === path.join(distRoot, 'index.html');
  if (isHomepage && googleVerification && !html.includes('name="google-site-verification"')) {
    additions.unshift(`<meta name="google-site-verification" content="${escapeAttribute(googleVerification)}" />`);
    googlePages += 1;
    changed = true;
  }

  if (changed) {
    if (!html.includes('</head>')) throw new Error(`Unable to find </head> in ${htmlFile}`);
    html = html.replace('</head>', `${additions.join('\n')}\n</head>`);
    await writeFile(htmlFile, html);
  }
}

console.log(`Prepared fingerprinted CTA event client ${eventClientSrc}.`);
console.log(`Injected first-party CTA event client into ${eventClientPages} HTML page${eventClientPages === 1 ? '' : 's'}.`);

if (cloudflareToken) console.log(`Injected Cloudflare Web Analytics into ${cloudflarePages} HTML page${cloudflarePages === 1 ? '' : 's'}.`);
else console.log('CF_WEB_ANALYTICS_TOKEN is not set; Cloudflare Web Analytics injection skipped.');

if (googleVerification) console.log(`Injected Google Search Console verification into ${googlePages} homepage.`);
else console.log('GOOGLE_SITE_VERIFICATION is not set; Search Console verification injection skipped.');
