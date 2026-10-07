/**
 * generate-docs-data.mjs
 * Parses the JSDoc'd props interfaces, component descriptions, and jest-axe
 * test names from packages/core/src/components and emits
 * apps/docs/src/generated/components.json.
 *
 * Run from apps/docs: node scripts/generate-docs-data.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const docsRoot = resolve(here, '..');
const coreComponents = resolve(docsRoot, '../../packages/core/src/components');
const coreTypes = resolve(docsRoot, '../../packages/core/src/types');

const COMPONENTS = [
  {
    slug: 'artist-label',
    name: 'ArtistLabel',
    file: 'ArtistLabel/ArtistLabel.tsx',
    propsFile: '../types/artist.ts',
    propsInterface: 'ArtistLabelProps',
    // extends Omit<MetadataLabelProps, 'text'> — merge inherited props too
    base: { file: 'MetadataLabel/MetadataLabel.tsx', name: 'MetadataLabelProps', omit: ['text'] },
    fallbackDescription:
      'Displays one or more artist names with configurable delimiters, truncation, and element type.',
  },
  {
    slug: 'album-artwork',
    name: 'AlbumArtwork',
    file: 'Artwork/AlbumArtwork.tsx',
    propsInterface: 'AlbumArtworkProps',
    fallbackDescription:
      'Album artwork with size variants, platform-specific styling, placeholder fallback, and an optional expandable full-size dialog.',
  },
  {
    slug: 'card',
    name: 'Card',
    file: 'Card/Card.tsx',
    propsInterface: 'CardProps',
    fallbackDescription:
      'A track or album card combining artwork, metadata, and artist labels with size, layout, theme, and hover-effect variants.',
  },
  {
    slug: 'icon-button',
    name: 'IconButton',
    file: 'IconButton/IconButton.tsx',
    propsInterface: 'IconButtonProps',
    fallbackDescription: 'A compact icon-only button with variants, sizes, loading, and disabled states.',
  },
  {
    slug: 'metadata-label',
    name: 'MetadataLabel',
    file: 'MetadataLabel/MetadataLabel.tsx',
    propsInterface: 'MetadataLabelProps',
    fallbackDescription:
      'A text label for metadata (title, album, etc.) with truncation control and a configurable element type.',
  },
  {
    slug: 'slider',
    name: 'Slider',
    file: 'Slider/Slider.tsx',
    propsInterface: 'SliderProps',
    fallbackDescription:
      'An accessible slider for progress, volume, and numeric ranges with multi-thumb support, buffer display, and tooltips.',
  },
  {
    slug: 'timestamp',
    name: 'Timestamp',
    file: 'Timestamp/Timestamp.tsx',
    propsInterface: 'TimestampProps',
    fallbackDescription: 'Formats and displays playback time values (durations, elapsed time) with variant and size options.',
  },
  {
    slug: 'music-player',
    name: 'MusicPlayer',
    file: 'MusicPlayer/MusicPlayer.tsx',
    propsInterface: 'MusicPlayerProps',
    fallbackDescription:
      'A composable playback interface that combines AlbumArtwork, MetadataLabel, ArtistLabel, Slider, IconButton, and Timestamp.',
    stories: ['default', 'variantcomparison', 'sizeandthemecomparison', 'controloptions', 'platformcomparison'],
  },
];

const STORIES_DEFAULT = ['default'];

function cleanCommentLine(l) {
  let s = l.trimEnd();
  s = s.replace(/\/\*\*\s*$/, ''); // opening
  s = s.replace(/\/\*\/$/, ''); // malformed close
  s = s.replace(/\*\//, ''); // closing marker
  s = s.replace(/^\s*\*\s?/, ''); // leading asterisk
  return s.trim();
}

function stripComment(raw) {
  const text = raw
    .split('\n')
    .map(cleanCommentLine)
    .filter((l) => l && !/^@default\b/.test(l))
    .join(' ')
    .replace(/@default[\s\S]*$/, '')
    .replace(/@(example|param|returns|deprecated|see)[\s\S]*$/, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text;
}

/** Parse a /** ... *​/ block that ends immediately before source index `endIndex`. */
function parseJSDoc(source, endIndex) {
  const before = source.slice(0, endIndex);
  const start = before.lastIndexOf('/**');
  if (start === -1) return { description: '', default: undefined };
  const block = before.slice(start);
  const close = block.indexOf('*/');
  if (close === -1) return { description: '', default: undefined };
  if (block.slice(close + 2).trim() !== '') return { description: '', default: undefined };
  const dm = block.match(/@default\s+(.+?)\s*(?:\*\/|$)/s);
  return {
    description: stripComment(block).trim(),
    default: dm ? dm[1].trim().replace(/^["']|["']$/g, '') : undefined,
  };
}

/** Parse a TS interface body into prop records. */
function parseInterface(source, interfaceName) {
  const declRe = new RegExp(`export\\s+interface\\s+${interfaceName}\\b[^{]*\\{`);
  const decl = declRe.exec(source);
  if (!decl) throw new Error(`Interface ${interfaceName} not found`);
  let i = decl.index + decl[0].length;
  let depth = 1;
  let body = '';
  while (i < source.length && depth > 0) {
    const ch = source[i];
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) break;
    }
    body += ch;
    i++;
  }

  const props = [];
  const lines = body.split('\n');
  let pendingComment = [];
  let j = 0;
  while (j < lines.length) {
    const line = lines[j];
    const trimmed = line.trim();
    if (trimmed.startsWith('/**')) {
      pendingComment = [line];
      j++;
      while (j < lines.length && !lines[j].includes('*/')) {
        pendingComment.push(lines[j]);
        j++;
      }
      if (j < lines.length) pendingComment.push(lines[j]);
      j++;
      continue;
    }
    const propMatch = trimmed.match(/^(\*?&?\s*)?([a-zA-Z_$][\w$]*)\??:\s*(.*)$/);
    if (propMatch && !trimmed.startsWith('//') && !trimmed.startsWith('*')) {
      const name = propMatch[2];
      // type may span multiple lines until a line ends with ';' at depth 0
      let typeText = propMatch[3];
      let d = (typeText.match(/\{/g) || []).length - (typeText.match(/\}/g) || []).length;
      while (d > 0 || (!/;\s*$/.test(typeText) && j + 1 < lines.length)) {
        j++;
        const next = lines[j];
        typeText += ' ' + next.trim();
        d = (typeText.match(/\{/g) || []).length - (typeText.match(/\}/g) || []).length;
        if (/;\s*$/.test(typeText) && d <= 0) break;
        if (j + 1 >= lines.length) break;
      }
      typeText = typeText.replace(/;\s*$/, '').replace(/\s+/g, ' ').trim();
      const doc = pendingComment.length ? parseJSDoc(pendingComment.join('\n'), pendingComment.join('\n').length) : {};
      props.push({
        name,
        type: typeText,
        optional: /\?:/.test(trimmed.slice(0, propMatch[3].length + trimmed.indexOf(':'))),
        description: doc.description || '',
        default: doc.default,
      });
      pendingComment = [];
    } else if (!trimmed.startsWith('*') && !trimmed.startsWith('//')) {
      pendingComment = [];
    }
    j++;
  }
  return props;
}

/** Extract the component description: JSDoc right before `export const <Name>`. */
function parseComponentDescription(source, name) {
  const re = new RegExp(`export\\s+const\\s+${name}\\b`);
  const m = re.exec(source);
  if (m) {
    const doc = parseJSDoc(source, m.index);
    if (doc.description) return doc.description;
  }
  return null;
}

/** Extract a11y notes: `it('...')` names mentioning axe, plus general coverage info. */
function parseA11yNotes(testPath) {
  let src = '';
  try {
    src = readFileSync(testPath, 'utf8');
  } catch {
    return ['A11y test file not found.'];
  }
  const notes = [];
  const itRe = /\bit\(\s*['"`]([^'"`]*(?:axe|a11y|accessib)[^'"`]*)['"`]/gi;
  let m;
  while ((m = itRe.exec(src))) notes.push(m[1]);
  if (notes.length === 0 && /jest-axe/.test(src)) notes.push('Verified with jest-axe (assertion present; see test suite for variants).');
  return notes;
}

function readComponent(config) {
  const filePath = join(coreComponents, config.file);
  const source = readFileSync(filePath, 'utf8');
  const propsSource = config.propsFile ? readFileSync(join(coreComponents, config.propsFile), 'utf8') : source;
  let props = parseInterface(propsSource, config.propsInterface);
  let inherited = 0;
  if (config.base) {
    const baseSource = readFileSync(join(coreComponents, config.base.file), 'utf8');
    const baseProps = parseInterface(baseSource, config.base.name).filter(
      (p) => !(config.base.omit || []).includes(p.name),
    );
    const have = new Set(props.map((p) => p.name));
    for (const bp of baseProps) {
      if (!have.has(bp.name)) {
        props.push({ ...bp, inherited: true });
        inherited++;
      }
    }
    // keep document order: re-sort by nothing — appended inherited props go last, fine
  }
  const description = parseComponentDescription(source, config.name) || config.fallbackDescription;
  const testFile = config.file.replace(/\.tsx$/, '.test.tsx');
  return {
    slug: config.slug,
    name: config.name,
    description,
    stories: config.stories || STORIES_DEFAULT,
    props,
    a11yNotes: parseA11yNotes(join(coreComponents, testFile)),
  };
}

const data = COMPONENTS.map(readComponent);
const outDir = join(docsRoot, 'src', 'generated');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'components.json'), JSON.stringify(data, null, 2) + '\n');

const propCount = data.reduce((n, c) => n + c.props.length, 0);
console.log(`components.json written: ${data.length} components, ${propCount} props.`);
for (const c of data) {
  console.log(`  ${c.slug}: ${c.props.length} props (${c.props.filter((p) => p.inherited).length} inherited), ${c.a11yNotes.length} a11y notes`);
}
