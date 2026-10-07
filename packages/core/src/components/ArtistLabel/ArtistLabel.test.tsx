import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ArtistLabel } from './ArtistLabel';

expect.extend(toHaveNoViolations);

describe('ArtistLabel', () => {
  it('renders a single artist string', () => {
    render(<ArtistLabel artists="Taylor Swift" />);
    expect(screen.getByText('Taylor Swift')).toBeInTheDocument();
  });

  it('joins multiple artists with the default delimiter', () => {
    render(<ArtistLabel artists={['Drake', 'Future', 'Metro Boomin']} />);
    expect(screen.getByText('Drake, Future, Metro Boomin')).toBeInTheDocument();
  });

  it('joins multiple artists with a custom delimiter', () => {
    render(<ArtistLabel artists={['Kendrick Lamar', 'SZA']} delimiter=" & " />);
    expect(screen.getByText('Kendrick Lamar & SZA')).toBeInTheDocument();
  });

  it('filters out empty artist names', () => {
    render(<ArtistLabel artists={['Drake', '', 'Future']} />);
    expect(screen.getByText('Drake, Future')).toBeInTheDocument();
  });

  it('renders an empty string for an empty artists array', () => {
    const { container } = render(<ArtistLabel artists={[]} />);
    expect(container.querySelector('.artist-label')).toBeInTheDocument();
    expect(container.querySelector('.artist-label')?.textContent).toBe('');
  });

  it('applies the artist-label class plus a custom className', () => {
    const { container } = render(<ArtistLabel artists="Drake" className="extra" />);
    const el = container.querySelector('.artist-label');
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('metadata-label', 'artist-label', 'extra');
  });

  it('renders as the element passed via the as prop', () => {
    render(<ArtistLabel artists="Drake" as="h3" />);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Drake');
  });

  it('applies inline style', () => {
    render(<ArtistLabel artists="Drake" style={{ fontWeight: 'bold' }} />);
    expect(screen.getByText('Drake')).toHaveStyle({ 'font-weight': 'bold' });
  });

  it('truncates long text when maxLength is exceeded', () => {
    const longName = 'A very long artist name that will be truncated';
    render(<ArtistLabel artists={longName} maxLength={20} />);
    const el = screen.getByText(/…/);
    // truncated display is at most maxLength chars, ends with ellipsis
    expect(el.textContent!.length).toBeLessThanOrEqual(20);
    expect(el).toHaveAttribute('data-full-text', longName);
  });

  it('does not truncate short text', () => {
    render(<ArtistLabel artists="Drake" maxLength={20} />);
    expect(screen.getByText('Drake')).toBeInTheDocument();
    expect(screen.queryByText(/…/)).not.toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<ArtistLabel artists="Drake" onClick={onClick} />);
    await user.click(screen.getByText('Drake'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('passes additional props through to the rendered element', () => {
    render(<ArtistLabel artists="Drake" data-testid="artist" />);
    expect(screen.getByTestId('artist')).toHaveTextContent('Drake');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <div>
        <ArtistLabel artists={['Drake', 'Future']} />
      </div>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
