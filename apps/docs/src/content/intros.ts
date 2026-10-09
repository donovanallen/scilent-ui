/**
 * Hand-authored intro prose for each component page.
 *
 * The generated `components.json` carries extracted facts (props, stories,
 * a11y notes); this file carries the human voice: what the component is for,
 * when to reach for it, and the gotcha worth knowing before you use it.
 * Keep each entry to one tight paragraph — specific beats breathless.
 */

export const intros: Record<string, string> = {
  'music-player':
    'MusicPlayer composes the rest of the library — artwork, labels, timestamp, slider, icon buttons — into a working playback surface in one import. Use it when you want a credible player UI without wiring the pieces yourself; customize it when your layout diverges from one of the four variants (default, minimal, compact, expanded). Gotcha: it drives a real <audio> element, so browsers enforce autoplay policy — set autoPlay only where a user gesture precedes it. The platform prop restyles the chrome (Spotify, Apple Music, Tidal looks) but does not integrate with any service.',
  'album-artwork':
    'AlbumArtwork renders cover art with sensible fallbacks: a placeholder icon when no image is supplied, and graceful cropping at every size token from xs to lg. Use it anywhere a track, album, or playlist needs visual identity. Gotcha: square crops are assumed — if your source art is non-square, pre-crop it rather than relying on object-fit behavior.',
  'artist-label':
    'ArtistLabel displays one or more artist names, handling the multi-artist join for you and truncating predictably when space is tight. Reach for it whenever artist credit appears — player metadata rows, track lists, now-playing bars. Gotcha: truncation is character-based (maxLength), not measured against the container, so pick maxLength per layout width rather than expecting automatic fit.',
  'metadata-label':
    'MetadataLabel is the general-purpose text display for track metadata — album, year, genre, bitrate, anything short and factual. Use it for any labeled string that should sit consistently alongside ArtistLabel and Timestamp. Gotcha: it renders text only; if you need interactive metadata (clickable artist pages, editable tags), compose it inside a button or link at the layout level.',
  timestamp:
    'Timestamp formats durations and clock times consistently — elapsed/remaining counters, track lengths, timestamps on activity feeds. Use it anywhere raw seconds would otherwise be formatted by hand. Gotcha: pass seconds, not a Date or string; formatting beyond mm:ss/h:mm:ss (e.g. countdown styling) is a prop-level concern handled via variant.',
  slider:
    'Slider is the workhorse scrubber — progress bars, volume faders, and any bounded continuous input, built on Radix primitives with keyboard and pointer interaction for free. Use it for anything a user drags along an axis. Gotcha: it is uncontrolled-friendly but expects value as an array ([value]) per the Radix range API; a single-thumb slider still takes an array of one.',
  card: 'Card is the generic surface: a bordered, elevated container for grouping related content — track tiles, playlist summaries, settings panels. Use it whenever content needs visual containment without opinionated music semantics. Gotcha: it ships deliberately unstyled beyond the surface tokens; spacing and internal layout are yours to compose.',
  'icon-button':
    'IconButton wraps an icon in an accessible button — play/pause, skip, mute, favorite. Use it wherever an icon needs to be clickable and keyboard-navigable with a proper accessible name. Gotcha: it will not invent a label for you — always pass aria-label, and remember the icon prop accepts any react-icons component as well as a custom component with the same signature.',
};
