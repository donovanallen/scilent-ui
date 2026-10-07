import type { MusicTrack } from '../types';

/**
 * Sample album artwork URLs from reliable sources
 * Using Unsplash and Placeholder.com for consistent availability
 */
export const ALBUM_ARTWORK = {
  // Unsplash images (reliable, high quality)
  pop: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop',
  rock: 'https://images.unsplash.com/photo-1598387846148-47e82ee3d7a1?q=80&w=300&auto=format&fit=crop',
  electronic:
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300&auto=format&fit=crop',
  hiphop:
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300&auto=format&fit=crop',
  jazz: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop',
  classical:
    'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=300&auto=format&fit=crop',

  // Artist-specific images
  weeknd:
    'https://images.unsplash.com/photo-1644517238230-c5c371e78d84?q=80&w=300&auto=format&fit=crop',
  kendrick:
    'https://images.unsplash.com/photo-1544656376-ffe19d4b7353?q=80&w=300&auto=format&fit=crop',
  taylor:
    'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop',
  billie:
    'https://images.unsplash.com/photo-1618609377864-68609b857e90?q=80&w=300&auto=format&fit=crop',

  // Platform-specific styling examples
  spotify:
    'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?q=80&w=300&auto=format&fit=crop',
  apple:
    'https://images.unsplash.com/photo-1525362081669-2b476bb628c3?q=80&w=300&auto=format&fit=crop',
  tidal:
    'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=300&auto=format&fit=crop',

  // Fallback images (placeholder.com - extremely reliable)
  placeholder1: 'https://via.placeholder.com/300/1DB954/FFFFFF?text=Album+Cover',
  placeholder2: 'https://via.placeholder.com/300/FA586A/FFFFFF?text=Album+Cover',
  placeholder3: 'https://via.placeholder.com/300/000000/FFFFFF?text=Album+Cover',
  default: 'https://via.placeholder.com/300/3B82F6/FFFFFF?text=Album+Cover',

  // Broken image URLs for testing error handling
  broken: 'https://example.com/non-existent-image.jpg',
  broken2: 'https://broken-url-for-testing.com/image.png',
};

/**
 * Sample tracks for use in stories and examples
 */
export const SAMPLE_TRACKS: Record<string, MusicTrack> = {
  pop: {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    coverArt: ALBUM_ARTWORK.weeknd,
    duration: 200,
    src: 'https://example.com/audio.mp3',
  },
  rock: {
    id: '2',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    coverArt: ALBUM_ARTWORK.rock,
    duration: 354,
    src: 'https://example.com/audio2.mp3',
  },
  hiphop: {
    id: '3',
    title: 'N95',
    artist: 'Kendrick Lamar',
    album: 'Mr. Morale & The Big Steppers',
    coverArt: ALBUM_ARTWORK.kendrick,
    duration: 224,
    src: 'https://example.com/audio3.mp3',
  },
  electronic: {
    id: '4',
    title: 'Strobe',
    artist: 'deadmau5',
    album: 'For Lack of a Better Name',
    coverArt: ALBUM_ARTWORK.electronic,
    duration: 603,
    src: 'https://example.com/audio4.mp3',
  },
  jazz: {
    id: '5',
    title: 'Take Five',
    artist: 'Dave Brubeck',
    album: 'Time Out',
    coverArt: ALBUM_ARTWORK.jazz,
    duration: 325,
    src: 'https://example.com/audio5.mp3',
  },
  classical: {
    id: '6',
    title: 'Symphony No. 5 in C minor',
    artist: 'Ludwig van Beethoven',
    album: 'Beethoven: Complete Symphonies',
    coverArt: ALBUM_ARTWORK.classical,
    duration: 1864,
    src: 'https://example.com/audio6.mp3',
  },
  taylor: {
    id: '7',
    title: 'Anti-Hero',
    artist: 'Taylor Swift',
    album: 'Midnights',
    coverArt: ALBUM_ARTWORK.taylor,
    duration: 200,
    src: 'https://example.com/audio7.mp3',
  },
  billie: {
    id: '8',
    title: 'What Was I Made For?',
    artist: 'Billie Eilish',
    album: 'Barbie The Album',
    coverArt: ALBUM_ARTWORK.billie,
    duration: 217,
    src: 'https://example.com/audio8.mp3',
  },
  // Track with broken image for testing error handling
  broken: {
    id: '9',
    title: 'Missing Artwork',
    artist: 'Test Artist',
    album: 'Test Album',
    coverArt: ALBUM_ARTWORK.broken,
    duration: 180,
    src: 'https://example.com/audio9.mp3',
  },
};

/**
 * Platform-specific sample tracks
 */
export const PLATFORM_TRACKS = {
  spotify: {
    id: 'spotify-1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    coverArt: ALBUM_ARTWORK.spotify,
    duration: 200,
    src: 'https://example.com/spotify-track.mp3',
  },
  apple: {
    id: 'apple-1',
    title: 'Lavender Haze',
    artist: 'Taylor Swift',
    album: 'Midnights',
    coverArt: ALBUM_ARTWORK.apple,
    duration: 202,
    src: 'https://example.com/apple-track.mp3',
  },
  tidal: {
    id: 'tidal-1',
    title: 'N95',
    artist: 'Kendrick Lamar',
    album: 'Mr. Morale & The Big Steppers',
    coverArt: ALBUM_ARTWORK.tidal,
    duration: 195,
    src: 'https://example.com/tidal-track.mp3',
  },
  // Platform tracks with broken images for testing
  broken: {
    id: 'broken-1',
    title: 'Broken Image Test',
    artist: 'Various Artists',
    album: 'Error Handling',
    coverArt: ALBUM_ARTWORK.broken,
    duration: 180,
    src: 'https://example.com/broken-track.mp3',
  },
};
