import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ArtistLabel } from './ArtistLabel';

describe('ArtistLabel', () => {
  it('renders a single artist name', () => {
    render(<ArtistLabel artists="Taylor Swift" data-testid="artist-label" />);
    expect(screen.getByText('Taylor Swift')).toBeInTheDocument();
  });

  it('renders multiple artist names with default delimiter', () => {
    render(<ArtistLabel artists={['Drake', 'Future']} data-testid="artist-label" />);
    expect(screen.getByText('Drake, Future')).toBeInTheDocument();
  });

  it('renders multiple artist names with custom delimiter', () => {
    render(
      <ArtistLabel artists={['Kendrick Lamar', 'SZA']} delimiter=" & " data-testid="artist-label" />
    );
    expect(screen.getByText('Kendrick Lamar & SZA')).toBeInTheDocument();
  });
});
