import sharp from 'sharp';

const svgCards = ['og-default', 'og-ice-zeta', 'og-konnevia', 'openready'];
const proofCards = [
  { name: 'avodah-ops', background: '#0b1118' },
  { name: 'avodah-creative', background: '#f7f4ee' }
];

await Promise.all(
  svgCards.map(async (name) => {
    const input = `dist/assets/${name}.svg`;
    const output = `dist/assets/${name}.png`;
    await sharp(input, { density: 144 }).resize(1200, 630).png({ compressionLevel: 9 }).toFile(output);
    console.log(`Generated ${output}`);
  }),
  ...proofCards.map(async ({ name, background }) => {
    const input = `dist/assets/${name}.webp`;
    const output = `dist/assets/${name}.png`;
    await sharp(input)
      .resize({ height: 630 })
      .extend({ left: 40, right: 40, top: 0, bottom: 0, background })
      .png({ compressionLevel: 9 })
      .toFile(output);
    console.log(`Generated ${output}`);
  })
);
