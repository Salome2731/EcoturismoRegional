import sharp from 'sharp';
import { readdir, writeFile } from 'node:fs/promises';
import { join, parse } from 'node:path';

const SRC = 'C:/FotosEco';
const OUT = 'src/assets/images';

// carpeta de origen, carpeta destino, ancho, alto (16:9 o 4:3)
const jobs = [
  { from: 'hero', to: OUT, w: 1920, h: 1080 },
  { from: 'destinations', to: `${OUT}/destinations`, w: 1200, h: 900 },
  { from: 'gallery', to: `${OUT}/gallery`, w: 1600, h: 900 },
];

const exts = ['.jpg', '.jpeg', '.png', '.webp'];

for (const job of jobs) {
  let files = [];
  try {
    files = await readdir(join(SRC, job.from));
  } catch {
    console.log(`! No existe la carpeta ${join(SRC, job.from)}`);
    continue;
  }
  for (const file of files) {
    const { name, ext } = parse(file);
    if (!exts.includes(ext.toLowerCase())) continue;
    try {
      const buf = await sharp(join(SRC, job.from, file))
        .rotate()
        .resize(job.w, job.h, { fit: 'cover', position: 'centre' })
        .webp({ quality: 80 })
        .toBuffer();
      await writeFile(join(job.to, `${name}.webp`), buf);
      console.log(`✓ ${name}.webp  <-  ${file}`);
    } catch (e) {
      console.log(`✗ ${file}: ${e.message}`);
    }
  }
}
console.log('Importación terminada.');