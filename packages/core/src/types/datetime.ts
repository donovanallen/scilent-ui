// Timestamp types
export type TimestampVariant = 'default' | 'muted' | 'highlight' | 'contrast';
export type TimestampSize = 'sm' | 'md' | 'lg';
export type TimestampFormat =
  | 'duration' // MM:SS or HH:MM:SS format for track lengths
  | 'relative' // "2 days ago", "in 3 hours", etc.
  | 'date' // "Mar 15, 2023"
  | 'time' // "3:45 PM"
  | 'datetime' // "Mar 15, 2023, 3:45 PM"
  | 'shortDate' // "03/15/23"
  | 'shortTime' // "15:45"
  | 'shortDatetime' // "03/15 15:45"
  | 'yearMonth' // "March 2023"
  | 'monthDay' // "March 15"
  | 'weekday' // "Tuesday"
  | 'custom'; // Custom format using Intl.DateTimeFormat options
