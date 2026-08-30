import { readFile, writeFile } from 'node:fs/promises';

const file = 'dist/index.html';
let html = await readFile(file, 'utf8');

const titleMatch = html.match(/<meta property="og:title" content="([^"]+)"\s*\/>/);
const imageMatch = html.match(/<meta property="og:image" content="([^"]+)"\s*\/>/);

if (!titleMatch || !imageMatch) {
  throw new Error('Homepage Open Graph title/image metadata was not found.');
}

const title = titleMatch[1];
const imageUrl = imageMatch[1];

const additions = [
  `<meta property="og:image:secure_url" content="${imageUrl}" />`,
  '<meta property="og:image:width" content="1200" />',
  '<meta property="og:image:height" content="630" />',
  `<meta property="og:image:alt" content="${title} social preview" />`
].join('');

if (!html.includes('property="og:image:width"')) {
  html = html.replace(imageMatch[0], `${imageMatch[0]}${additions}`);
}

if (!html.includes('name="twitter:image:alt"')) {
  html = html.replace(
    /(<meta name="twitter:image" content="[^"]+"\s*\/>)/,
    `$1<meta name="twitter:image:alt" content="${title} social preview" />`
  );
}

if (!html.includes('property="og:locale"')) {
  html = html.replace(
    /(<meta property="og:type" content="website"\s*\/>)/,
    '$1<meta property="og:locale" content="en_US" />'
  );
}

await writeFile(file, html);
console.log('Hardened homepage Open Graph metadata for social-link crawlers.');
