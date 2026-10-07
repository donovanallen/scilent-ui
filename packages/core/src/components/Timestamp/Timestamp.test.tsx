import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Timestamp } from './Timestamp';

expect.extend(toHaveNoViolations);

// Reference date used for deterministic date assertions.
// We compare the rendered output against the same Intl formatters the
// component uses internally, so the test is locale/zone independent.
const DATE = new Date('2024-03-15T14:30:00Z');

const formatWith = (options: Intl.DateTimeFormatOptions, locale = 'en-US'): string =>
  new Intl.DateTimeFormat(locale, options).format(DATE);

describe('Timestamp', () => {
  describe('duration formatting (numeric value)', () => {
    it('formats a numeric value as MM:SS by default', () => {
      render(<Timestamp value={225} />);
      expect(screen.getByText('03:45')).toBeInTheDocument();
    });

    it('pads minutes and seconds to two digits', () => {
      render(<Timestamp value={65} />);
      expect(screen.getByText('01:05')).toBeInTheDocument();
    });

    it('switches to HH:MM:SS for values of an hour or more', () => {
      render(<Timestamp value={3754} />);
      expect(screen.getByText('01:02:34')).toBeInTheDocument();
    });

    it('renders 00:00 for negative or invalid values', () => {
      render(<Timestamp value={-10} />);
      expect(screen.getByText('00:00')).toBeInTheDocument();
    });
  });

  describe('date formatting', () => {
    it('formats a Date object as relative time by default', () => {
      render(<Timestamp value={DATE} />);
      // Relative output depends on "now"; just assert it rendered non-empty text
      expect(screen.getByText(/ago|in |now|just/i)).toBeInTheDocument();
    });

    it('renders an invalid date string verbatim', () => {
      render(<Timestamp value="not-a-date" />);
      expect(screen.getByText('not-a-date')).toBeInTheDocument();
    });

    it('formats an ISO string with the date preset', () => {
      render(<Timestamp value={DATE.toISOString()} format="date" locale="en-US" />);
      expect(
        screen.getByText(formatWith({ year: 'numeric', month: 'short', day: 'numeric' }))
      ).toBeInTheDocument();
    });

    it('supports the shortDate preset', () => {
      render(<Timestamp value={DATE.toISOString()} format="shortDate" locale="en-US" />);
      expect(
        screen.getByText(formatWith({ month: 'numeric', day: 'numeric', year: '2-digit' }))
      ).toBeInTheDocument();
    });

    it('supports the time preset', () => {
      render(<Timestamp value={DATE.toISOString()} format="time" locale="en-US" />);
      expect(
        screen.getByText(formatWith({ hour: 'numeric', minute: 'numeric' }))
      ).toBeInTheDocument();
    });

    it('supports the weekday preset', () => {
      render(<Timestamp value={DATE.toISOString()} format="weekday" locale="en-US" />);
      expect(screen.getByText(formatWith({ weekday: 'long' }))).toBeInTheDocument();
    });

    it('supports the custom format preset with Intl options', () => {
      render(
        <Timestamp
          value={DATE.toISOString()}
          format="custom"
          locale="en-US"
          customFormat={{ year: 'numeric', month: 'long', day: 'numeric' }}
        />
      );
      expect(
        screen.getByText(formatWith({ year: 'numeric', month: 'long', day: 'numeric' }))
      ).toBeInTheDocument();
    });

    it('treats a numeric value as a millisecond timestamp when format is a date preset', () => {
      const asMs = DATE.getTime();
      render(<Timestamp value={asMs} format="date" locale="en-US" />);
      expect(
        screen.getByText(formatWith({ year: 'numeric', month: 'short', day: 'numeric' }))
      ).toBeInTheDocument();
    });
  });

  describe('rendering variants', () => {
    it('renders a span with the timestamp class by default', () => {
      const { container } = render(<Timestamp value={225} />);
      const el = container.querySelector('.timestamp');
      expect(el).toBeInTheDocument();
      expect(el?.tagName).toBe('SPAN');
    });

    it('applies a custom className', () => {
      const { container } = render(<Timestamp value={225} className="extra" />);
      expect(container.querySelector('.timestamp')).toHaveClass('timestamp', 'extra');
    });

    it('applies inline styles', () => {
      render(<Timestamp value={225} style={{ color: 'rgb(255, 0, 0)' }} />);
      expect(screen.getByText('03:45')).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    });

    it('forwards a ref to the rendered span', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Timestamp ref={ref} value={225} />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current?.textContent).toBe('03:45');
    });

    it('passes additional props through to the rendered element', () => {
      render(<Timestamp value={225} data-testid="ts" />);
      expect(screen.getByTestId('ts')).toHaveTextContent('03:45');
    });

    it('renders each variant/size combination without crashing', () => {
      const variants = ['default', 'muted', 'highlight', 'contrast'] as const;
      const sizes = ['sm', 'md', 'lg'] as const;
      variants.forEach(variant => {
        sizes.forEach(size => {
          const { unmount } = render(
            <Timestamp
              value={225}
              variant={variant}
              size={size}
              data-testid={`ts-${variant}-${size}`}
            />
          );
          expect(screen.getByTestId(`ts-${variant}-${size}`)).toHaveTextContent('03:45');
          unmount();
        });
      });
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations (duration)', async () => {
      const { container } = render(<Timestamp value={225} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no accessibility violations (relative date)', async () => {
      const { container } = render(<Timestamp value={DATE} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no accessibility violations (formatted date, custom class/style)', async () => {
      const { container } = render(
        <Timestamp
          value={DATE.toISOString()}
          format="date"
          className="extra"
          style={{ color: '#333' }}
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
