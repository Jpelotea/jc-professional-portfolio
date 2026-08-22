import sharp from 'sharp';

const cards = ['og-default', 'og-ice-zeta', 'og-konnevia', 'avodah-ops', 'avodah-creative', 'openready'];

await Promise.all(
  cards.map(async (name) => {
    const input = `dist/assets/${name}.svg`;
    const output = `dist/assets/${name}.png`;
    await sharp(input, { density: 144 }).resize(1200, 630).png({ compressionLevel: 9 }).toFile(output);
    console.log(`Generated ${output}`);
  })
);
