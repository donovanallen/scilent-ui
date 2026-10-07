import { truncateTextEnd, truncateTextMiddle, truncateText } from './metadata';

describe('truncateTextEnd', () => {
  it('returns empty string unchanged', () => {
    expect(truncateTextEnd('', 5)).toBe('');
  });

  it('returns text at or below maxLength unchanged', () => {
    expect(truncateTextEnd('abcde', 5)).toBe('abcde');
    expect(truncateTextEnd('abcd', 5)).toBe('abcd');
  });

  it('truncates longer text with ellipsis keeping maxLength-1 chars', () => {
    expect(truncateTextEnd('abcdefgh', 5)).toBe('abcd…');
  });

  it('handles maxLength 1', () => {
    expect(truncateTextEnd('abcdef', 1)).toBe('…');
  });
});

describe('truncateTextMiddle', () => {
  it('returns empty string unchanged', () => {
    expect(truncateTextMiddle('', 5)).toBe('');
  });

  it('returns text at or below maxLength unchanged', () => {
    expect(truncateTextMiddle('abcde', 5)).toBe('abcde');
  });

  it('truncates long text with middle ellipsis', () => {
    const result = truncateTextMiddle('abcdefghij', 8);
    // startChars = ceil(8*0.6)=5, endChars = 8-5-1=2
    expect(result).toBe('abcde…ij');
    expect(result.length).toBe(8);
  });

  it('keeps more characters at the start than at the end', () => {
    const result = truncateTextMiddle('abcdefghijklmno', 10);
    expect(result.startsWith('abcdef')).toBe(true);
    expect(result).toContain('…');
  });
});

describe('truncateText', () => {
  const long = 'abcdefghij';

  it('returns text unchanged for type none', () => {
    expect(truncateText(long, 3, 'none')).toBe(long);
  });

  it('returns text unchanged when within maxLength', () => {
    expect(truncateText('abc', 5, 'end')).toBe('abc');
    expect(truncateText('abc', 5, 'middle')).toBe('abc');
  });

  it('returns text unchanged for empty string', () => {
    expect(truncateText('', 3, 'end')).toBe('');
  });

  it('defaults to end truncation', () => {
    expect(truncateText(long, 5)).toBe('abcd…');
  });

  it('uses end truncation explicitly', () => {
    expect(truncateText(long, 5, 'end')).toBe('abcd…');
  });

  it('uses middle truncation when specified', () => {
    expect(truncateText(long, 6, 'middle')).toBe(truncateTextMiddle(long, 6));
  });
});
