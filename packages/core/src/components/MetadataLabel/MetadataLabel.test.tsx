import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom for the custom matchers
import { MetadataLabel } from './MetadataLabel';

describe('MetadataLabel', () => {
  it('renders given metadata string', () => {
    render(<MetadataLabel text="Taylor Swift" data-testid="metadata-label" />);
    expect(screen.getByText('Taylor Swift')).toBeInTheDocument();
  });

  it('renders with custom element type', () => {
    render(<MetadataLabel text="The Weeknd" as="div" data-testid="metadata-label" />);
    const element = screen.getByText('The Weeknd');
    expect(element.tagName).toBe('DIV');
  });

  it('applies bold styling through style prop', () => {
    render(
      <MetadataLabel
        text="Billie Eilish"
        style={{ fontWeight: 'bold' }}
        data-testid="metadata-label"
      />
    );
    const element = screen.getByText('Billie Eilish');
    expect(element).toHaveStyle('font-weight: bold');
  });

  it('applies italic styling through style prop', () => {
    render(
      <MetadataLabel text="Adele" style={{ fontStyle: 'italic' }} data-testid="metadata-label" />
    );
    const element = screen.getByText('Adele');
    expect(element).toHaveStyle('font-style: italic');
  });

  it('applies custom color through style prop', () => {
    render(
      <MetadataLabel text="Bruno Mars" style={{ color: '#ff0000' }} data-testid="metadata-label" />
    );
    const element = screen.getByText('Bruno Mars');
    expect(element).toHaveStyle('color: #ff0000');
  });

  it('applies custom font size through style prop', () => {
    render(
      <MetadataLabel
        text="Ariana Grande"
        style={{ fontSize: '18px' }}
        data-testid="metadata-label"
      />
    );
    const element = screen.getByText('Ariana Grande');
    expect(element).toHaveStyle('font-size: 18px');
  });

  it('applies multiple styles through style prop', () => {
    render(
      <MetadataLabel
        text="Justin Bieber"
        style={{
          fontWeight: 'bold',
          fontStyle: 'italic',
          color: '#1DB954',
          fontSize: '18px',
        }}
        data-testid="metadata-label"
      />
    );
    const element = screen.getByText('Justin Bieber');
    expect(element).toHaveStyle({
      fontWeight: 'bold',
      fontStyle: 'italic',
      color: '#1DB954',
      fontSize: '18px',
    });
  });

  it('truncates text when maxLength is specified', () => {
    render(
      <MetadataLabel
        text="A very long artist name that should be truncated"
        maxLength={20}
        data-testid="metadata-label"
      />
    );
    expect(screen.getByText('A very long artist n…')).toBeInTheDocument();
  });

  it('truncates text in the middle when specified', () => {
    render(
      <MetadataLabel
        text="A very long artist name that should be truncated"
        maxLength={20}
        truncationType="middle"
        data-testid="metadata-label"
      />
    );
    // The exact truncation depends on the implementation, but we can check for the ellipsis
    const element = screen.getByTestId('metadata-label');
    expect(element.textContent).toContain('…');
  });

  it('applies custom className', () => {
    render(
      <MetadataLabel text="Justin Bieber" className="custom-class" data-testid="metadata-label" />
    );
    const element = screen.getByText('Justin Bieber');
    expect(element).toHaveClass('custom-class');
  });
});
