import sharp from 'sharp';

const svgCards = ['og-default', 'og-ice-zeta', 'og-konnevia', 'openready'];
const proofCards = [
  { source: 'avodah-ops-proof', socialName: 'avodah-ops', background: '#0b1118' },
  { source: 'avodah-creative-proof', socialName: 'avodah-creative', background: '#f7f4ee' },
  { source: 'avodah-website-proof', socialName: 'avodah-website', background: '#0b3f28' }
];

await Promise.all(
  svgCards.map(async (name) => {
    const input = `dist/assets/${name}.svg`;
    const output = `dist/assets/${name}.png`;
    await sharp(input, { density: 144 }).resize(1200, 630).png({ compressionLevel: 9 }).toFile(output);
    console.log(`Generated ${output}`);
  }),
  ...proofCards.map(async ({ source, socialName, background }) => {
    const input = `dist/assets/${source}.webp`;
    const output = `dist/assets/${socialName}.png`;
    await sharp(input)
      .resize({ height: 630 })
      .extend({ left: 40, right: 40, top: 0, bottom: 0, background })
      .png({ compressionLevel: 9 })
      .toFile(output);
    console.log(`Generated ${output}`);
  })
);
