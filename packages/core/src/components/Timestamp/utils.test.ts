import {
  formatDuration,
  formatRelativeTime,
  calculateTotalDuration,
  formatDateTime,
  msToSeconds,
  secondsToMs,
  formatDurationHuman,
} from './utils';

describe('formatDuration', () => {
  it('returns 00:00 for NaN or negative input', () => {
    expect(formatDuration(NaN)).toBe('00:00');
    expect(formatDuration(-5)).toBe('00:00');
  });

  it('formats under an hour as MM:SS', () => {
    expect(formatDuration(0)).toBe('00:00');
    expect(formatDuration(59)).toBe('00:59');
    expect(formatDuration(60)).toBe('01:00');
    expect(formatDuration(200)).toBe('03:20');
  });

  it('floors fractional seconds', () => {
    expect(formatDuration(59.9)).toBe('00:59');
  });

  it('switches to HH:MM:SS when hours > 0', () => {
    expect(formatDuration(3600)).toBe('01:00:00');
    expect(formatDuration(3661)).toBe('01:01:01');
  });

  it('shows hours when showHours is true even if zero', () => {
    expect(formatDuration(0, true)).toBe('00:00:00');
    expect(formatDuration(125, true)).toBe('00:02:05');
  });

  it('pads hours beyond 99', () => {
    expect(formatDuration(360000)).toBe('100:00:00');
  });
});

describe('formatRelativeTime', () => {
  const now = new Date();

  it('formats recent seconds ago', () => {
    const d = new Date(now.getTime() - 10_000);
    expect(formatRelativeTime(d)).toBe('10 seconds ago');
  });

  it('formats now via numeric auto', () => {
    expect(formatRelativeTime(now)).toBe('now');
  });

  it('formats minutes ago', () => {
    const d = new Date(now.getTime() - 5 * 60_000);
    expect(formatRelativeTime(d)).toBe('5 minutes ago');
  });

  it('formats hours ago', () => {
    const d = new Date(now.getTime() - 3 * 3_600_000);
    expect(formatRelativeTime(d)).toBe('3 hours ago');
  });

  it('formats days ago', () => {
    const d = new Date(now.getTime() - 2 * 86_400_000);
    expect(formatRelativeTime(d)).toBe('2 days ago');
  });

  it('formats future times', () => {
    const d = new Date(now.getTime() + 10.5 * 86_400_000);
    expect(formatRelativeTime(d)).toBe('in 10 days');
  });

  it('formats months and years', () => {
    const monthsAgo = new Date(now);
    monthsAgo.setMonth(monthsAgo.getMonth() - 2);
    expect(formatRelativeTime(monthsAgo)).toBe('2 months ago');

    const yearsAgo = new Date(now);
    yearsAgo.setFullYear(yearsAgo.getFullYear() - 3);
    expect(formatRelativeTime(yearsAgo)).toBe('3 years ago');
  });

  it('honors locale', () => {
    const d = new Date(now.getTime() - 2 * 86_400_000);
    const result = formatRelativeTime(d, 'es');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result).not.toBe('2 days ago');
  });
});

describe('calculateTotalDuration', () => {
  it('returns 0 for empty array', () => {
    expect(calculateTotalDuration([])).toBe(0);
  });

  it('sums durations', () => {
    expect(calculateTotalDuration([1, 2, 3])).toBe(6);
  });

  it('handles a single value', () => {
    expect(calculateTotalDuration([200])).toBe(200);
  });

  it('handles fractional values', () => {
    expect(calculateTotalDuration([1.5, 2.5])).toBe(4);
  });
});

describe('formatDateTime', () => {
  const date = new Date('2026-03-15T14:30:00Z');

  it('formats each preset without throwing', () => {
    for (const preset of [
      'date',
      'time',
      'datetime',
      'shortDate',
      'shortTime',
      'shortDatetime',
      'yearMonth',
      'monthDay',
      'weekday',
    ] as const) {
      const result = formatDateTime(date, preset, 'en-US');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    }
  });

  it('defaults to datetime preset', () => {
    expect(formatDateTime(date, undefined as never, 'en-US')).toBe(
      formatDateTime(date, 'datetime', 'en-US')
    );
  });

  it('date preset contains year, month and day', () => {
    const result = formatDateTime(date, 'date', 'en-US');
    expect(result).toContain('2026');
    expect(result).toContain('Mar');
    expect(result).toContain('15');
  });

  it('weekday preset yields a weekday name', () => {
    const result = formatDateTime(date, 'weekday', 'en-US');
    expect([
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]).toContain(result);
  });

  it('relative delegates to formatRelativeTime', () => {
    const recent = new Date(Date.now() - 30_000);
    expect(formatDateTime(recent, 'relative')).toBe('30 seconds ago');
  });

  it('duration formats the date epoch as a duration', () => {
    const d = new Date(125_000); // 125 seconds
    expect(formatDateTime(d, 'duration')).toBe('02:05');
  });

  it('custom uses provided Intl options', () => {
    expect(formatDateTime(date, 'custom', 'en-US', { year: 'numeric', month: 'long' })).toBe(
      'March 2026'
    );
  });

  it('custom without options falls back to a date preset', () => {
    const result = formatDateTime(date, 'custom', 'en-US');
    expect(result).toBe(formatDateTime(date, 'date', 'en-US'));
  });

  it('honors locale', () => {
    const result = formatDateTime(date, 'yearMonth', 'de-DE');
    expect(result).toContain('2026');
    expect(result.toLowerCase()).toContain('märz');
  });
});

describe('msToSeconds / secondsToMs', () => {
  it('converts ms to floored seconds', () => {
    expect(msToSeconds(1500)).toBe(1);
    expect(msToSeconds(999)).toBe(0);
    expect(msToSeconds(0)).toBe(0);
  });

  it('converts seconds to ms', () => {
    expect(secondsToMs(2)).toBe(2000);
    expect(secondsToMs(0)).toBe(0);
  });

  it('round-trips', () => {
    expect(secondsToMs(msToSeconds(4321))).toBe(4000);
  });
});

describe('formatDurationHuman', () => {
  it('returns 0s for NaN or negative input', () => {
    expect(formatDurationHuman(NaN)).toBe('0s');
    expect(formatDurationHuman(-1)).toBe('0s');
  });

  it('formats seconds only', () => {
    expect(formatDurationHuman(0)).toBe('0s');
    expect(formatDurationHuman(45)).toBe('45s');
  });

  it('formats minutes and seconds', () => {
    expect(formatDurationHuman(125)).toBe('2m 5s');
  });

  it('formats hours, minutes and seconds', () => {
    expect(formatDurationHuman(8100)).toBe('2h 15m');
  });

  it('omits zero-minute segment within an hour-long duration when secs is 0', () => {
    expect(formatDurationHuman(3600)).toBe('1h');
  });

  it('includes minutes when hours>0 and secs>0', () => {
    expect(formatDurationHuman(3605)).toBe('1h 0m 5s');
  });

  it('floors fractional seconds', () => {
    expect(formatDurationHuman(45.9)).toBe('45s');
  });
});
