#!/usr/bin/env node
/**
 * scilent-ui registry generator.
 * Source of truth: packages/core/src (and packages/icons deps via package.json).
 * Run: node packages/registry/scripts/generate-registry.mjs
 * Writes: packages/registry/registry.json + packages/registry/r/<name>.json
 * (shadcn registry-item format, content inlined, deps resolved from imports).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const CORE = join(ROOT, 'packages/core/src');
const OUT = join(ROOT, 'packages/registry');
const REG_URL = 'https://scilent-ui.dev/r';

/** external package -> install spec (empty string = package itself) */
const EXTERNAL_DEPS = {
  react: null, // peer dep, never installed by registry
  'styled-components': '^6.1.15',
  '@radix-ui/react-dialog': '^1.1.4',
  '@radix-ui/react-primitive': '^2.0.2',
  '@radix-ui/react-slider': '^1.2.1',
  '@radix-ui/react-tooltip': '^1.1.6',
  '@scilent/icons': '^1.1.0',
  'react-icons': '^5.4.0',
};

const slug = (s) =>
  s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/** collect the transitive closure of relative imports of a src file (within core/src) */
function collectFiles(srcPath, seen = new Set()) {
  const abs = resolve(CORE, srcPath);
  if (seen.has(srcPath) || !existsSync(abs)) return seen;
  const st = statSync(abs);
  if (!st.isFile()) {
    // directory import: include the whole directory (barrels + siblings) so
    // bare imports like '@/lib/scilent/types' resolve after install
    const base = resolve(CORE, srcPath);
    for (const entry of readdirSync(base)) {
      if (!/\.(ts|tsx)$/.test(entry)) continue;
      if (/\.stories\.|\.test\./.test(entry)) continue;
      collectFiles(join(srcPath, entry), seen);
    }
    return seen;
  }
  if (srcPath.startsWith('components/') && (srcPath.endsWith('/index.ts') || srcPath.endsWith('/index.tsx')))
    return seen; // component barrels import unshipped components — skip
  seen.add(srcPath);
  const src = readFileSync(abs, 'utf8');
  for (const m of src.matchAll(/from\s+['"](\.[^'"]+)['"]/g)) {
    let rel = m[1];
    let base = rel.startsWith('@/') ? rel.slice(2) : join(dirname(srcPath), rel);
    for (const cand of [base, `${base}.tsx`, `${base}.ts`, join(base, 'index.ts'), join(base, 'index.tsx')]) {
      const c = cand.replace(/\\/g, '/');
      if (existsSync(join(CORE, c)) && !c.endsWith('.stories.') && !c.endsWith('.test.')) {
        collectFiles(c, seen);
        break;
      }
    }
  }
  return seen;
}

function buildItem({ name, type, title, description, entry }) {
  const files = [...collectFiles(entry)].sort();
  const dependencies = new Set();
  // Component name -> registry slug (for cross-component imports)
  const COMPONENT_SLUGS = {
    ArtistLabel: 'artist-label',
    MetadataLabel: 'metadata-label',
    AlbumArtwork: 'album-artwork',
    IconButton: 'icon-button',
    Slider: 'slider',
    Timestamp: 'timestamp',
    Card: 'card',
    MusicPlayer: 'music-player',
  };
  const registryDeps = new Set();
  const payloadFiles = [];
  for (const f of files) {
    const src = readFileSync(join(CORE, f), 'utf8');
    for (const m of src.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
      const spec = m[1];
      if (spec.startsWith('.') || spec.startsWith('@/')) continue;
      if (spec === 'react') continue; // peer
      const pkg = spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0];
      const dep = EXTERNAL_DEPS[pkg];
      if (dep === undefined) throw new Error(`Unmapped external import '${spec}' in ${f}`);
      if (dep) dependencies.add(`${pkg}@${dep}`);
    }
    // target layout: components/scilent/<slug>/<File> for component files,
    // lib/scilent/{types,utils}/<file> for support files
    let target;
    if (f.startsWith('components/')) {
      const [, dir, file] = f.split('/');
      target = `components/scilent/${slug(COMPONENT_SLUGS[dir] || dir)}/${file}`;
    } else if (f.startsWith('types/')) {
      target = `lib/scilent/types/${f.slice('types/'.length)}`;
    } else {
      target = `lib/scilent/utils/${f.slice('utils/'.length)}`;
    }
    let content = src
      // cross-component imports -> registry item targets
      .replace(
        /from\s+'(\.\.\/)+((?:[A-Za-z]+\/)*)([A-Za-z]+)'/g,
        (full, _, mid, file) => {
          const comp = file.replace(/\.tsx?$/, '');
          const s = COMPONENT_SLUGS[comp];
          if (!s) return full;
          registryDeps.add(`${REG_URL}/${s}.json`);
          return `from '@/components/scilent/${s}/${file}'`;
        }
      )
      // types -> @/lib/scilent/types, utils -> @/lib/scilent/utils
      .replace(/from\s+'(\.\.\/)+types\/([a-z]+)'/g, "from '@/lib/scilent/types/$2'")
      .replace(/from\s+'(\.\.\/)+types'/g, "from '@/lib/scilent/types'")
      .replace(/from\s+'(\.\.\/)+utils\/([a-z]+)'/g, "from '@/lib/scilent/utils/$2'")
      .replace(/from\s+'@\/types\/([a-z/]+)'/g, "from '@/lib/scilent/types/$1'")
      // same-component sibling imports stay relative (folder target keeps them working)
      ;
    payloadFiles.push({ path: `src/${f}`, target, type: 'registry:ui', content });
  }
  const item = {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name,
    type,
    title,
    description,
    dependencies: [...dependencies],
    registryDependencies: [...registryDeps],
    files: payloadFiles,
    meta: { source: 'generated from packages/core/src by packages/registry/scripts/generate-registry.mjs — do not edit by hand' },
  };
  return item;
}

const SINGLES = [
  ['artist-label', 'ArtistLabel', 'components/ArtistLabel/ArtistLabel.tsx', 'Formatted artist name list with custom delimiters.'],
  ['album-artwork', 'AlbumArtwork', 'components/Artwork/AlbumArtwork.tsx', 'Album artwork image with placeholder, fallback, and expandable dialog modes.'],
  ['card', 'Card', 'components/Card/Card.tsx', 'Album/track card with artwork, metadata, and optional play overlay.'],
  ['icon-button', 'IconButton', 'components/IconButton/IconButton.tsx', 'Platform-aware icon button with variants, sizes, loading and enabled states.'],
  ['metadata-label', 'MetadataLabel', 'components/MetadataLabel/MetadataLabel.tsx', 'Ellipsizing metadata label with hover tooltip.'],
  ['slider', 'Slider', 'components/Slider/Slider.tsx', 'Radix-based slider with platform themes, buffer display, ticks, labels, and tooltips.'],
  ['timestamp', 'Timestamp', 'components/Timestamp/Timestamp.tsx', 'Duration/relative-time formatting with Intl presets.'],
];

mkdirSync(join(OUT, 'r'), { recursive: true });
const index = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: 'scilent-ui',
  homepage: 'https://scilent-ui.dev',
  items: [],
};

for (const [name, title, entry, description] of SINGLES) {
  const item = buildItem({ name, type: 'registry:ui', title, description, entry });
  writeFileSync(join(OUT, 'r', `${name}.json`), JSON.stringify(item, null, 2) + '\n');
  index.items.push({ name, type: 'registry:ui', title, description, files: item.files.map((f) => f.path) });
  console.log(`✓ ${name} (${item.files.length} files, deps: ${item.dependencies.join(', ') || 'none'})`);
}

// MusicPlayer — registry:block, deps resolved from its own imports
const mp = buildItem({
  name: 'music-player',
  type: 'registry:block',
  title: 'MusicPlayer',
  description: 'Full-featured music player block: transport, progress, volume, track metadata.',
  entry: 'components/MusicPlayer/MusicPlayer.tsx',
});
writeFileSync(join(OUT, 'r', 'music-player.json'), JSON.stringify(mp, null, 2) + '\n');
index.items.push({ name: 'music-player', type: 'registry:block', title: 'MusicPlayer', description: mp.description, files: mp.files.map((f) => f.path) });
console.log(`✓ music-player (block, ${mp.files.length} files, registryDeps: 6)`);

writeFileSync(join(OUT, 'registry.json'), JSON.stringify(index, null, 2) + '\n');
console.log(`\nregistry.json: ${index.items.length} items (themes held until real; Auth skipped — no source)`);

// Mirror into apps/docs/public/r/ so /r/<name> serves statically (docs hosting stub)
const DOCS_R = join(ROOT, 'apps/docs/public/r');
mkdirSync(DOCS_R, { recursive: true });
writeFileSync(join(DOCS_R, 'registry.json'), JSON.stringify(index, null, 2) + '\n');
for (const f of readdirSync(join(OUT, 'r'))) {
  writeFileSync(join(DOCS_R, f), readFileSync(join(OUT, 'r', f)));
}
console.log(`mirrored to apps/docs/public/r/ (${index.items.length + 1} files)`);
