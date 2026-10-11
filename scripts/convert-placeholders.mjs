import sharp from 'sharp';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const folders = [
  'src/assets/images',
  'src/assets/images/destinations',
  'src/assets/images/gallery',
];

for (const folder of folders) {
  const files = (await readdir(folder)).filter((f) => f.endsWith('.webp'));
  for (const file of files) {
    const path = join(folder, file);
    const data = await readFile(path);
    if (data.subarray(0, 4).toString() === 'RIFF') {
      console.log(`= ${path} (ya es WebP)`);
      continue;
    }
    const webp = await sharp(data).webp({ quality: 80 }).toBuffer();
    await writeFile(path, webp);
    console.log(`✓ ${path}`);
  }
}
console.log('Conversión terminada.');