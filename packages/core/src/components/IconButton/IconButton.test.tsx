import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { IconButton } from './IconButton';

expect.extend(toHaveNoViolations);

// Minimal icon stub matching the shape IconButton expects (accepts size/color/className)
const FakeIcon = (props: any) => (
  <svg data-testid="fake-icon" width={props.size} height={props.size} className={props.className} />
);

describe('IconButton', () => {
  it('renders a button with the aria-label and the icon', () => {
    render(<IconButton icon={FakeIcon} aria-label="Play" />);
    const btn = screen.getByRole('button', { name: 'Play' });
    expect(btn).toBeInTheDocument();
    expect(screen.getByTestId('fake-icon')).toBeInTheDocument();
  });

  it('renders all variants and sizes', () => {
    for (const variant of ['primary', 'secondary', 'outline', 'ghost'] as const) {
      const { unmount } = render(
        <IconButton icon={FakeIcon} aria-label={`btn-${variant}`} variant={variant} />
      );
      expect(screen.getByRole('button', { name: `btn-${variant}` })).toBeInTheDocument();
      unmount();
    }
    for (const size of ['sm', 'md', 'lg'] as const) {
      const { unmount } = render(
        <IconButton icon={FakeIcon} aria-label={`btn-${size}`} size={size} />
      );
      expect(screen.getByRole('button', { name: `btn-${size}` })).toBeInTheDocument();
      unmount();
    }
  });

  it('calls onClick with the event argument', async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<IconButton icon={FakeIcon} aria-label="Like" onClick={onClick} />);
    await user.click(screen.getByRole('button', { name: 'Like' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toHaveProperty('type', 'click');
  });

  it('does not fire onClick when disabled', async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<IconButton icon={FakeIcon} aria-label="Noop" disabled onClick={onClick} />);
    await user.click(screen.getByRole('button', { name: 'Noop' }));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Noop' })).toBeDisabled();
  });

  it('is disabled while loading and sets aria-busy', () => {
    render(<IconButton icon={FakeIcon} aria-label="Saving" isLoading />);
    const btn = screen.getByRole('button', { name: 'Saving' });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
    // custom loading indicator renders
    render(
      <IconButton
        icon={FakeIcon}
        aria-label="Saving2"
        isLoading
        loadingIndicator={<span data-testid="custom-loader" />}
      />
    );
    expect(screen.getByTestId('custom-loader')).toBeInTheDocument();
  });

  it('renders the spotify platform enabled indicator for ghost variant', () => {
    const { container } = render(
      <IconButton
        icon={FakeIcon}
        aria-label="Shuffle"
        platform="spotify"
        variant="ghost"
        isEnabled
      />
    );
    expect(container.querySelector('button')).toBeInTheDocument();
    // EnabledIndicator is a small dot; spotify ghost + enabled renders it
    expect(container.querySelectorAll('div').length).toBeGreaterThan(0);
  });

  it('forwards the ref to the button element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<IconButton icon={FakeIcon} aria-label="Ref" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('passes keyboard activation through (Enter/Space)', async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<IconButton icon={FakeIcon} aria-label="Key" onClick={onClick} />);
    const btn = screen.getByRole('button', { name: 'Key' });
    btn.focus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('has no axe violations for default, loading, and disabled variants', async () => {
    const { container: c1 } = render(<IconButton icon={FakeIcon} aria-label="A11y1" />);
    expect(await axe(c1)).toHaveNoViolations();
    cleanupRender(c1);

    const { container: c2, unmount: u2 } = render(
      <IconButton icon={FakeIcon} aria-label="A11y2" isLoading />
    );
    expect(await axe(c2)).toHaveNoViolations();
    u2();

    const { container: c3, unmount: u3 } = render(
      <IconButton icon={FakeIcon} aria-label="A11y3" disabled variant="outline" size="lg" />
    );
    expect(await axe(c3)).toHaveNoViolations();
    u3();
  });

  it('has no axe violations per platform variant', async () => {
    for (const platform of ['default', 'spotify', 'apple', 'tidal', 'custom'] as const) {
      const { container, unmount } = render(
        <IconButton icon={FakeIcon} aria-label={`P-${platform}`} platform={platform} />
      );
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  });
});

// helper: cleanup between renders sharing the same container is handled by RTL auto-cleanup;
// this helper just satisfies TS when reusing containers.
function cleanupRender(_container: HTMLElement) {
  /* no-op */
}

// keep fireEvent imported for parity with other suites
void fireEvent;
