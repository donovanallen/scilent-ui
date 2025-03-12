/**
 * Truncate text at the end with ellipsis
 * @param text Text to truncate
 * @param maxLength Maximum length before truncation
 * @returns Truncated text
 */
export function truncateTextEnd(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1)}…`;
}

/**
 * Truncate text in the middle with ellipsis
 * @param text Text to truncate
 * @param maxLength Maximum length before truncation
 * @returns Truncated text
 */
export function truncateTextMiddle(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) {
    return text;
  }

  // Keep more characters at the beginning than at the end
  const startChars = Math.ceil(maxLength * 0.6);
  const endChars = maxLength - startChars - 1; // -1 for the ellipsis

  return `${text.slice(0, startChars)}…${text.slice(text.length - endChars)}`;
}

/**
 * Truncate text based on specified truncation type
 * @param text Text to truncate
 * @param maxLength Maximum length before truncation
 * @param type Type of truncation to apply
 * @returns Truncated text
 */
export function truncateText(
  text: string,
  maxLength: number,
  type: 'none' | 'end' | 'middle' = 'end'
): string {
  if (type === 'none' || !text || text.length <= maxLength) {
    return text;
  }

  if (type === 'middle') {
    return truncateTextMiddle(text, maxLength);
  }

  return truncateTextEnd(text, maxLength);
}
