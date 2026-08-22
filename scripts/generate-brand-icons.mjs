import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const source = await readFile('favicon.svg');
const sizes = [16, 32, 48, 64];

const renderPng = (size) => sharp(source, { density: 384 })
  .resize(size, size)
  .png({ compressionLevel: 9 })
  .toBuffer();

const faviconPngs = await Promise.all(sizes.map(renderPng));

await Promise.all([
  ...faviconPngs.map((buffer, index) => writeFile(`favicon-${sizes[index]}.png`, buffer)),
  renderPng(180).then((buffer) => writeFile('apple-touch-icon.png', buffer)),
  renderPng(192).then((buffer) => writeFile('icon-192.png', buffer)),
  renderPng(512).then((buffer) => writeFile('icon-512.png', buffer))
]);

const icoSizes = [16, 32, 48, 64, 256];
const icoPngs = await Promise.all(icoSizes.map(renderPng));
const headerSize = 6 + (icoPngs.length * 16);
const header = Buffer.alloc(headerSize);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoPngs.length, 4);

let offset = headerSize;
icoPngs.forEach((buffer, index) => {
  const entry = 6 + (index * 16);
  const size = icoSizes[index];
  header.writeUInt8(size === 256 ? 0 : size, entry);
  header.writeUInt8(size === 256 ? 0 : size, entry + 1);
  header.writeUInt8(0, entry + 2);
  header.writeUInt8(0, entry + 3);
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(buffer.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += buffer.length;
});

await writeFile('favicon.ico', Buffer.concat([header, ...icoPngs]));
console.log('Generated favicon and application icon family.');
