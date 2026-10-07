import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MetadataLabel } from './MetadataLabel';

expect.extend(toHaveNoViolations);

// Radix tooltip content uses ResizeObserver (not implemented in jsdom)
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as any).ResizeObserver = (globalThis as any).ResizeObserver || ResizeObserverStub;

describe('MetadataLabel', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the text in a span by default', () => {
    render(<MetadataLabel text="Some text content" />);
    expect(screen.getByText('Some text content')).toBeInTheDocument();
    expect(screen.getByText('Some text content').tagName).toBe('SPAN');
  });

  it('renders as the element passed via the as prop', () => {
    render(<MetadataLabel text="Hello" as="div" />);
    expect(screen.getByText('Hello').tagName).toBe('DIV');
  });

  it('exposes the full text via data-full-text', () => {
    render(<MetadataLabel text="Some text content" />);
    expect(screen.getByText('Some text content')).toHaveAttribute(
      'data-full-text',
      'Some text content'
    );
  });

  it('applies the metadata-label class plus a custom className', () => {
    const { container } = render(<MetadataLabel text="Hello" className="extra" />);
    const el = container.querySelector('.metadata-label');
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('extra');
  });

  it('applies inline style', () => {
    render(<MetadataLabel text="Hello" style={{ color: 'rgb(29, 185, 84)' }} />);
    expect(screen.getByText('Hello')).toHaveStyle({ color: 'rgb(29, 185, 84)' });
  });

  it('keeps ellipsis overflow styles by default', () => {
    render(<MetadataLabel text="Hello" />);
    const el = screen.getByText('Hello');
    expect(el).toHaveStyle({
      'white-space': 'nowrap',
      'text-overflow': 'ellipsis',
    });
  });

  describe('truncation', () => {
    const longText = 'A very long text that will be truncated by the component';

    it('truncates long text at maxLength with the default end type', () => {
      render(<MetadataLabel text={longText} maxLength={20} />);
      const el = screen.getByText(/…/);
      expect(el.textContent!.length).toBeLessThanOrEqual(20);
    });

    it('truncates in the middle when truncationType is middle', () => {
      render(<MetadataLabel text={longText} maxLength={20} truncationType="middle" />);
      const el = screen.getByText(/…/);
      const text = el.textContent!;
      // middle truncation keeps both a head and a tail around the ellipsis
      expect(text).toMatch(/…/);
      expect(text.indexOf('…')).toBeGreaterThan(0);
      expect(text.indexOf('…')).toBeLessThan(text.length - 1);
    });

    it('does not truncate when truncate is false', () => {
      render(<MetadataLabel text={longText} maxLength={20} truncate={false} />);
      expect(screen.getByText(longText)).toBeInTheDocument();
      expect(screen.queryByText(/…/)).not.toBeInTheDocument();
    });

    it('does not truncate when text fits within maxLength', () => {
      render(<MetadataLabel text="short" maxLength={20} />);
      expect(screen.getByText('short')).toBeInTheDocument();
      expect(screen.queryByText(/…/)).not.toBeInTheDocument();
    });

    it('does not truncate when truncationType is none', () => {
      render(<MetadataLabel text={longText} maxLength={20} truncationType="none" />);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('preserves the full text in data-full-text when truncated', () => {
      render(<MetadataLabel text={longText} maxLength={20} />);
      const el = screen.getByText(/…/);
      expect(el).toHaveAttribute('data-full-text', longText);
    });

    it('shows the full text in a tooltip after the hover delay', async () => {
      jest.useFakeTimers();
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<MetadataLabel text={longText} maxLength={20} />);
      const trigger = screen.getByText(/…/);
      await user.hover(trigger);
      // Radix Tooltip default delayDuration is 700ms; flush the timer inside act
      await act(async () => {
        jest.advanceTimersByTime(800);
      });
      expect(screen.getByRole('tooltip')).toHaveTextContent(longText);
    }, 10000);
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<MetadataLabel text="Hello" onClick={onClick} />);
    await user.click(screen.getByText('Hello'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('passes additional props through to the rendered element', () => {
    render(<MetadataLabel text="Hello" data-testid="meta" />);
    expect(screen.getByTestId('meta')).toHaveTextContent('Hello');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<MetadataLabel text="Some text content" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
