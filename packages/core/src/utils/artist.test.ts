import { formatArtistNames } from './artist';

describe('formatArtistNames', () => {
  it('returns a plain string unchanged', () => {
    expect(formatArtistNames('Adele')).toBe('Adele');
  });

  it('returns an empty string for empty string input', () => {
    expect(formatArtistNames('')).toBe('');
  });

  it('returns empty string for empty array', () => {
    expect(formatArtistNames([])).toBe('');
  });

  it('joins array with default delimiter', () => {
    expect(formatArtistNames(['A', 'B', 'C'])).toBe('A, B, C');
  });

  it('joins array with custom delimiter', () => {
    expect(formatArtistNames(['A', 'B'], ' & ')).toBe('A & B');
  });

  it('filters out empty strings', () => {
    expect(formatArtistNames(['A', '', 'B'])).toBe('A, B');
  });

  it('filters out whitespace-only strings', () => {
    expect(formatArtistNames(['A', '   ', 'B'])).toBe('A, B');
  });

  it('returns empty string when all entries are empty/whitespace', () => {
    expect(formatArtistNames(['', '   '])).toBe('');
  });

  it('does not trim non-empty entries', () => {
    expect(formatArtistNames([' A '])).toBe(' A ');
  });
});
