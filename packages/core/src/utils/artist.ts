/**
 * Format artist names with a delimiter
 * @param artists Single artist name or array of artist names
 * @param delimiter Delimiter to use when joining multiple artist names
 * @returns Formatted artist name string
 */
export function formatArtistNames(artists: string | string[], delimiter: string = ', '): string {
  if (typeof artists === 'string') {
    return artists;
  }

  if (!artists.length) {
    return '';
  }

  // Filter out empty strings and join with delimiter
  return artists.filter(artist => artist.trim() !== '').join(delimiter);
}
