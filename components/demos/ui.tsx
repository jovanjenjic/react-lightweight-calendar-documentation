'use client';

import { useState, type ReactNode } from 'react';
import { createSampleEvents, toDateKey, type CalendarEvent } from './sampleData';

export type View =
  'MONTH' | 'WEEK' | 'WEEK_TIME' | 'DAY' | 'DAY_REVERSE' | 'WEEK_IN_PLACE' | 'DAY_IN_PLACE';

export const VIEWS: { value: View; label: string }[] = [
  { value: 'MONTH', label: 'Month' },
  { value: 'WEEK', label: 'Week' },
  { value: 'WEEK_TIME', label: 'Week schedule' },
  { value: 'DAY', label: 'Day' },
  { value: 'DAY_REVERSE', label: 'Day timeline' },
  { value: 'WEEK_IN_PLACE', label: 'Week by hour' },
  { value: 'DAY_IN_PLACE', label: 'Day by hour' },
];

/** Sample events and a navigable current date, starting at today. */
export function useDemoState() {
  const [events, setEvents] = useState<CalendarEvent[]>(() => createSampleEvents());
  const [currentDate, setCurrentDate] = useState<string | Date>(() => toDateKey(new Date()));
  return { events, setEvents, currentDate, setCurrentDate };
}

export function DemoFrame({
  toolbar,
  footer,
  height = 560,
  fixedTheme = false,
  className,
  style,
  children,
}: {
  toolbar?: ReactNode;
  footer?: ReactNode;
  /** Height of the calendar, in px. The hour views scroll inside it. */
  height?: number;
  /** The demo picks its own theme: do not follow the site's dark mode. */
  fixedTheme?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  return (
    // Demo controls and calendar labels are not documentation; keep them out of search.
    <div className={`rlc-demo ${className ?? ''}`} style={style} data-pagefind-ignore="all">
      {toolbar && <div className="rlc-demo__toolbar">{toolbar}</div>}
      <div
        className="rlc-demo__canvas"
        style={{ height }}
        data-fixed-theme={fixedTheme || undefined}
      >
        {children}
      </div>
      {footer && <div className="rlc-demo__footer">{footer}</div>}
    </div>
  );
}

export function Segmented<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="rlc-demo__field" role="group" aria-label={label}>
      <span className="rlc-demo__label">{label}</span>
      <div className="rlc-demo__segmented">
        {options.map((option) => (
          <button
            key={String(option.value)}
            type="button"
            aria-pressed={option.value === value}
            className={option.value === value ? 'is-active' : undefined}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SelectField<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <label className="rlc-demo__field">
      <span className="rlc-demo__label">{label}</span>
      <select
        className="rlc-demo__select"
        value={String(value)}
        onChange={(e) => {
          const match = options.find((o) => String(o.value) === e.target.value);
          if (match) onChange(match.value);
        }}
      >
        {options.map((option) => (
          <option key={String(option.value)} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="rlc-demo__toggle">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

/** A short, newest-first list of what the calendar reported. */
export function EventLog({ entries, empty }: { entries: string[]; empty: string }) {
  return (
    <div className="rlc-demo__log" aria-live="polite">
      {entries.length === 0 ? (
        <span className="rlc-demo__muted">{empty}</span>
      ) : (
        <ol>
          {entries.map((entry, i) => (
            <li key={`${i}-${entry}`}>
              <code>{entry}</code>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
