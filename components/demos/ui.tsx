'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createSampleEvents, toDateKey, type CalendarEvent } from './sampleData';

export type View =
  | 'MONTH'
  | 'WEEK'
  | 'WEEK_TIME'
  | 'DAY'
  | 'DAY_REVERSE'
  | 'WEEK_IN_PLACE'
  | 'DAY_IN_PLACE';

export const VIEWS: { value: View; label: string }[] = [
  { value: 'MONTH', label: 'Month' },
  { value: 'WEEK', label: 'Week' },
  { value: 'WEEK_TIME', label: 'Week time' },
  { value: 'DAY', label: 'Day' },
  { value: 'DAY_REVERSE', label: 'Day reverse' },
  { value: 'WEEK_IN_PLACE', label: 'Week in place' },
  { value: 'DAY_IN_PLACE', label: 'Day in place' },
];

/** Sample events and a navigable current date, starting at today. */
export function useDemoState() {
  const [events, setEvents] = useState<CalendarEvent[]>(() => createSampleEvents());
  const [currentDate, setCurrentDate] = useState<string | Date>(() => toDateKey(new Date()));
  return { events, setEvents, currentDate, setCurrentDate };
}

/** Hour labels of the hour-based views, in the order they appear. */
const HOUR_LABELS = [
  '.week-time-week__border-bottom-hour-unit',
  '.day-hour-rows__border-bottom-hour-unit',
  '.week-in-place-row__hour-cell-hour-number',
  '.day-in-place-hour-row__hour-cell-hour-number',
].join(', ');

/**
 * Hour-based views start at midnight. Scroll the demo to the morning whenever such a
 * view is rendered, so the sample events are in sight.
 */
function useScrollToHour(hour: number | undefined) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || hour === undefined) return;
    let scrolledTo: Element | null = null;
    const apply = () => {
      const target = canvas.querySelectorAll(HOUR_LABELS)[hour];
      if (!target || target === scrolledTo) return;
      scrolledTo = target;
      const offset = target.getBoundingClientRect().top - canvas.getBoundingClientRect().top;
      canvas.scrollTop += offset - 24;
    };
    const observer = new MutationObserver(apply);
    observer.observe(canvas, { childList: true, subtree: true });
    apply();
    return () => observer.disconnect();
  }, [hour]);
  return ref;
}

export function DemoFrame({
  toolbar,
  footer,
  maxHeight,
  scrollToHour = 7,
  className,
  style,
  children,
}: {
  toolbar?: ReactNode;
  footer?: ReactNode;
  maxHeight?: number;
  /** Hour to scroll hour-based views to; only applies with `maxHeight`. */
  scrollToHour?: number;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  const canvasRef = useScrollToHour(maxHeight ? scrollToHour : undefined);
  return (
    // Demo controls and calendar labels are not documentation; keep them out of search.
    <div className={`rlc-demo ${className ?? ''}`} style={style} data-pagefind-ignore="all">
      {toolbar && <div className="rlc-demo__toolbar">{toolbar}</div>}
      <div
        ref={canvasRef}
        className="rlc-demo__canvas"
        style={maxHeight ? { maxHeight } : undefined}
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
