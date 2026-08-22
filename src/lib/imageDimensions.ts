import path from 'node:path';
import sharp from 'sharp';

export type ImageDimensions = {
  width: number;
  height: number;
};

const cache = new Map<string, ImageDimensions>();

export async function getImageDimensions(src: string): Promise<ImageDimensions> {
  const cached = cache.get(src);
  if (cached) return cached;

  if (!src.startsWith('/assets/')) {
    throw new Error(`Image dimension helper only accepts local /assets/ paths: ${src}`);
  }

  const absolutePath = path.resolve(process.cwd(), src.slice(1));
  const metadata = await sharp(absolutePath).metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(`Unable to determine intrinsic dimensions for ${src}`);
  }

  const dimensions = { width: metadata.width, height: metadata.height };
  cache.set(src, dimensions);
  return dimensions;
}
