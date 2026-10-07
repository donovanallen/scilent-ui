import { ALBUM_ARTWORK, SAMPLE_TRACKS, PLATFORM_TRACKS } from './sampleData';
import type { MusicTrack } from '../types';

const REQUIRED_TRACK_FIELDS: Array<keyof MusicTrack> = [
  'id',
  'title',
  'artist',
  'album',
  'coverArt',
  'duration',
  'src',
];

function expectValidTrack(track: MusicTrack) {
  for (const field of REQUIRED_TRACK_FIELDS) {
    expect(track[field]).toBeDefined();
  }
  expect(typeof track.id).toBe('string');
  expect(typeof track.title).toBe('string');
  expect(typeof track.artist).toBe('string');
  expect(typeof track.album).toBe('string');
  expect(typeof track.coverArt).toBe('string');
  expect(typeof track.duration).toBe('number');
  expect(Number.isFinite(track.duration)).toBe(true);
  expect(track.duration).toBeGreaterThanOrEqual(0);
  expect(typeof track.src).toBe('string');
  expect(track.src).toMatch(/^https?:\/\//);
}

describe('ALBUM_ARTWORK', () => {
  it('contains only valid URL strings for every key', () => {
    for (const [key, url] of Object.entries(ALBUM_ARTWORK)) {
      expect(typeof url).toBe('string');
      expect(url).toMatch(/^https?:\/\//);
      expect(key.length).toBeGreaterThan(0);
    }
  });

  it('includes genre, artist, platform, placeholder, and broken entries', () => {
    for (const key of [
      'pop',
      'rock',
      'electronic',
      'hiphop',
      'jazz',
      'classical',
      'weeknd',
      'kendrick',
      'taylor',
      'billie',
      'spotify',
      'apple',
      'tidal',
      'placeholder1',
      'placeholder2',
      'placeholder3',
      'default',
      'broken',
      'broken2',
    ]) {
      expect(ALBUM_ARTWORK).toHaveProperty(key);
    }
  });
});

describe('SAMPLE_TRACKS', () => {
  it('has entries and each satisfies the MusicTrack shape', () => {
    const keys = Object.keys(SAMPLE_TRACKS);
    expect(keys.length).toBeGreaterThan(0);
    for (const key of keys) {
      expectValidTrack(SAMPLE_TRACKS[key]);
    }
  });

  it('uses known artwork entries for coverArt', () => {
    for (const track of Object.values(SAMPLE_TRACKS)) {
      expect(Object.values(ALBUM_ARTWORK)).toContain(track.coverArt);
    }
  });

  it('has unique track ids', () => {
    const ids = Object.values(SAMPLE_TRACKS).map(t => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('includes a broken-artwork track for error-handling tests', () => {
    expect(SAMPLE_TRACKS.broken.coverArt).toBe(ALBUM_ARTWORK.broken);
  });
});

describe('PLATFORM_TRACKS', () => {
  it('covers each platform key with a valid track', () => {
    for (const key of ['spotify', 'apple', 'tidal', 'broken']) {
      const track = (PLATFORM_TRACKS as Record<string, MusicTrack>)[key];
      expect(track).toBeDefined();
      expectValidTrack(track);
    }
  });

  it('maps each platform track to the correct artwork source', () => {
    expect(PLATFORM_TRACKS.spotify.coverArt).toBe(ALBUM_ARTWORK.spotify);
    expect(PLATFORM_TRACKS.apple.coverArt).toBe(ALBUM_ARTWORK.apple);
    expect(PLATFORM_TRACKS.tidal.coverArt).toBe(ALBUM_ARTWORK.tidal);
    expect(PLATFORM_TRACKS.broken.coverArt).toBe(ALBUM_ARTWORK.broken);
  });

  it('uses platform-prefixed ids', () => {
    expect(PLATFORM_TRACKS.spotify.id).toBe('spotify-1');
    expect(PLATFORM_TRACKS.apple.id).toBe('apple-1');
    expect(PLATFORM_TRACKS.tidal.id).toBe('tidal-1');
    expect(PLATFORM_TRACKS.broken.id).toBe('broken-1');
  });
});
