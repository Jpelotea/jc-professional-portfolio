import { readFile, writeFile } from 'node:fs/promises';

const file = 'dist/index.html';
let html = await readFile(file, 'utf8');

const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);

const getAttribute = (tag, name) => {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'));
  return match?.[1];
};

const findMeta = (attribute, value) =>
  metaTags.find((tag) => getAttribute(tag, attribute)?.toLowerCase() === value.toLowerCase());

const titleTag = findMeta('property', 'og:title');
const imageTag = findMeta('property', 'og:image');

if (!titleTag || !imageTag) {
  throw new Error('Homepage Open Graph title/image metadata was not found.');
}

const title = getAttribute(titleTag, 'content');
const imageUrl = getAttribute(imageTag, 'content');

if (!title || !imageUrl) {
  throw new Error('Homepage Open Graph title/image content was empty.');
}

const additions = [
  `<meta property="og:image:secure_url" content="${imageUrl}">`,
  '<meta property="og:image:width" content="1200">',
  '<meta property="og:image:height" content="630">',
  `<meta property="og:image:alt" content="${title} social preview">`
].join('');

if (!findMeta('property', 'og:image:width')) {
  html = html.replace(imageTag, `${imageTag}${additions}`);
}

if (!findMeta('name', 'twitter:image:alt')) {
  const twitterImageTag = findMeta('name', 'twitter:image');
  if (twitterImageTag) {
    html = html.replace(
      twitterImageTag,
      `${twitterImageTag}<meta name="twitter:image:alt" content="${title} social preview">`
    );
  }
}

if (!findMeta('property', 'og:locale')) {
  const ogTypeTag = findMeta('property', 'og:type');
  if (ogTypeTag) {
    html = html.replace(ogTypeTag, `${ogTypeTag}<meta property="og:locale" content="en_US">`);
  }
}

await writeFile(file, html);
console.log('Hardened homepage Open Graph metadata for social-link crawlers.');
