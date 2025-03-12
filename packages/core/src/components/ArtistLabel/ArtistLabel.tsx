import React from 'react';
import { MetadataLabel } from '../MetadataLabel';
import { formatArtistNames } from '../../utils/artist';
import { ArtistLabelProps } from '../../types/artist';

/**
 * ArtistLabel component for displaying artist names with various formatting options
 *
 * @example
 * // Single artist
 * <ArtistLabel artists="Taylor Swift" />
 *
 * @example
 * // Multiple artists
 * <ArtistLabel artists={["Drake", "Future", "Metro Boomin"]} />
 *
 * @example
 * // Custom delimiter
 * <ArtistLabel artists={["Kendrick Lamar", "SZA"]} delimiter=" & " />
 *
 * @example
 * // With truncation
 * <ArtistLabel
 *   artists="A very long artist name that will be truncated"
 *   truncate={true}
 *   truncationType="middle"
 *   maxLength={20}
 * />
 *
 * @example
 * // With custom styling
 * <ArtistLabel
 *   artists="Taylor Swift"
 *   style={{ fontWeight: 'bold', fontStyle: 'italic', color: '#1DB954', fontSize: '18px' }}
 * />
 */
export const ArtistLabel: React.FC<ArtistLabelProps> = ({
  artists,
  delimiter = ', ',
  truncate = true,
  truncationType = 'end',
  maxLength,
  as = 'span',
  className = '',
  style = {},
  onClick,
}) => {
  // Format the artist names
  const formattedArtists = formatArtistNames(artists, delimiter);

  // Use the MetadataLabel component with the formatted artist names
  return (
    <MetadataLabel
      text={formattedArtists}
      truncate={truncate}
      truncationType={truncationType}
      maxLength={maxLength}
      as={as}
      className={`artist-label ${className}`}
      style={style}
      onClick={onClick}
    />
  );
};

export default ArtistLabel;
