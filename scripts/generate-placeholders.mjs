/**
 * T13: generate-placeholders.mjs
 * Generates local SVG placeholder images for all assets referenced in the JSON data files.
 * No external dependencies – uses Node.js built-in fs module only.
 *
 * Output:
 *   src/assets/images/hero-bg.svg           (16:9 – 1280×720)
 *   src/assets/images/destinations/*.svg    (4:3  – 800×600) x8
 *   src/assets/images/gallery/*.svg         (16:9 – 800×450) x12
 *
 * NOTE: Astro's <Image /> requires WebP/JPEG/PNG; these SVGs are
 * development placeholders only and will be replaced in T35.
 * The components will reference these files by name with .webp extension
 * in the JSON, but during development the actual files have .svg extension.
 * We rename them to .webp here so the filenames match exactly what the JSON expects.
 * SVGs saved as .webp are NOT valid WebP but will be replaced by real photos in T35.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const BASE = 'src/assets/images';

/**
 * Generates an SVG string that looks like a labeled photo placeholder.
 * @param {number} width
 * @param {number} height
 * @param {string} label
 * @param {string} sublabel
 * @param {string} bgColor  – Tailwind-inspired hex
 * @param {string} textColor
 */
function makeSVG(width, height, label, sublabel, bgColor, textColor) {
  const fontSize = Math.round(width / 20);
  const subFontSize = Math.round(width / 32);
  const aspectLabel = `${width}×${height}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  <!-- Grid lines for aspect-ratio context -->
  <line x1="${width/3}" y1="0" x2="${width/3}" y2="${height}" stroke="${textColor}" stroke-opacity="0.08" stroke-width="1"/>
  <line x1="${2*width/3}" y1="0" x2="${2*width/3}" y2="${height}" stroke="${textColor}" stroke-opacity="0.08" stroke-width="1"/>
  <line x1="0" y1="${height/3}" x2="${width}" y2="${height/3}" stroke="${textColor}" stroke-opacity="0.08" stroke-width="1"/>
  <line x1="0" y1="${2*height/3}" x2="${width}" y2="${2*height/3}" stroke="${textColor}" stroke-opacity="0.08" stroke-width="1"/>
  <!-- Center crosshair -->
  <line x1="${width/2-30}" y1="${height/2}" x2="${width/2+30}" y2="${height/2}" stroke="${textColor}" stroke-opacity="0.3" stroke-width="2"/>
  <line x1="${width/2}" y1="${height/2-30}" x2="${width/2}" y2="${height/2+30}" stroke="${textColor}" stroke-opacity="0.3" stroke-width="2"/>
  <circle cx="${width/2}" cy="${height/2}" r="6" fill="none" stroke="${textColor}" stroke-opacity="0.3" stroke-width="2"/>
  <!-- Label -->
  <text x="${width/2}" y="${height/2 - fontSize * 0.6}" font-family="system-ui, sans-serif" font-size="${fontSize}" font-weight="700"
        fill="${textColor}" fill-opacity="0.85" text-anchor="middle" dominant-baseline="middle">${label}</text>
  <text x="${width/2}" y="${height/2 + fontSize * 0.8}" font-family="system-ui, sans-serif" font-size="${subFontSize}"
        fill="${textColor}" fill-opacity="0.55" text-anchor="middle" dominant-baseline="middle">${sublabel}</text>
  <!-- Aspect ratio badge -->
  <rect x="12" y="12" width="${aspectLabel.length * subFontSize * 0.6 + 16}" height="${subFontSize + 12}" rx="4" fill="${textColor}" fill-opacity="0.12"/>
  <text x="20" y="${subFontSize + 14}" font-family="monospace" font-size="${subFontSize - 2}" fill="${textColor}" fill-opacity="0.7">${aspectLabel}</text>
  <!-- PLACEHOLDER watermark -->
  <text x="${width - 16}" y="${height - 12}" font-family="monospace" font-size="${subFontSize - 4}"
        fill="${textColor}" fill-opacity="0.35" text-anchor="end">PLACEHOLDER · T35</text>
</svg>`;
}

function write(filePath, content) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, content, 'utf8');
  console.log(`  ✓  ${filePath}`);
}

// ── Hero (16:9 · 1280×720) ─────────────────────────────────────────────────
write(
  `${BASE}/hero-bg.webp`,
  makeSVG(1280, 720,
    'Ecoturismo Antioquia',
    'hero-bg · 16:9 · placeholder',
    '#052e16', '#d1fae5')
);

// ── Destinations (4:3 · 800×600) ─────────────────────────────────────────
const destinations = [
  { file: 'santa-fe-antioquia.webp', label: 'Santa Fe de Antioquia', sub: 'Occidente' },
  { file: 'ebejico.webp',            label: 'Ebéjico',               sub: 'Occidente' },
  { file: 'san-jeronimo.webp',       label: 'San Jerónimo',          sub: 'Occidente' },
  { file: 'abriaqui.webp',           label: 'Abriaquí',              sub: 'Occidente' },
  { file: 'peque.webp',              label: 'Peque',                  sub: 'Occidente' },
  { file: 'toledo.webp',             label: 'Toledo',                 sub: 'Norte' },
  { file: 'ituango.webp',            label: 'Ituango',               sub: 'Norte' },
  { file: 'san-jose-montana.webp',   label: 'San José de la Montaña', sub: 'Norte' },
];

destinations.forEach(({ file, label, sub }) => {
  const bg    = sub === 'Occidente' ? '#78350f' : '#064e3b';
  const text  = sub === 'Occidente' ? '#fef3c7' : '#d1fae5';
  write(
    `${BASE}/destinations/${file}`,
    makeSVG(800, 600, label, `${sub} · 4:3 · placeholder`, bg, text)
  );
});

// ── Gallery (16:9 · 800×450) ──────────────────────────────────────────────
const gallery = [
  { file: 'gal-01.webp', label: 'Calle Empedrada Colonial',         sub: 'cultural · Santa Fe' },
  { file: 'gal-02.webp', label: 'Plaza Central y Templo',           sub: 'cultural · Santa Fe' },
  { file: 'gal-03.webp', label: 'Feria Campesina',                  sub: 'cultural · San Jerónimo' },
  { file: 'gal-04.webp', label: 'Bosque de Niebla Andino',          sub: 'naturaleza · San José Montaña' },
  { file: 'gal-05.webp', label: 'Páramo en Neblina',                sub: 'naturaleza · Toledo' },
  { file: 'gal-06.webp', label: 'Corredor de Biodiversidad',        sub: 'naturaleza · Ebéjico' },
  { file: 'gal-07.webp', label: 'Senderismo en Serranía',           sub: 'aventura · Peque' },
  { file: 'gal-08.webp', label: 'Trekking de Alta Montaña',         sub: 'aventura · Abriaquí' },
  { file: 'gal-09.webp', label: 'Cañón del Río Cauca',              sub: 'aventura · Ituango' },
  { file: 'gal-10.webp', label: 'Cascada en Quebrada',              sub: 'aguas · Ebéjico' },
  { file: 'gal-11.webp', label: 'Ribera del Río Cauca',             sub: 'aguas · Santa Fe' },
  { file: 'gal-12.webp', label: 'Cuencas Hídricas del Norte',       sub: 'aguas · San José Montaña' },
];

const categoryColors = {
  cultural:   { bg: '#1e1b4b', text: '#e0e7ff' },
  naturaleza: { bg: '#052e16', text: '#d1fae5' },
  aventura:   { bg: '#431407', text: '#fef3c7' },
  aguas:      { bg: '#0c4a6e', text: '#e0f2fe' },
};

gallery.forEach(({ file, label, sub }) => {
  const category = sub.split(' · ')[0];
  const { bg, text } = categoryColors[category] ?? { bg: '#1c1917', text: '#f5f5f4' };
  write(
    `${BASE}/gallery/${file}`,
    makeSVG(800, 450, label, sub + ' · 16:9 · placeholder', bg, text)
  );
});

console.log('\n✅ All placeholder images generated successfully.');
