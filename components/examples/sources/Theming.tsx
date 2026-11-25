'use client';

import { useState, type CSSProperties } from 'react';
import Calendar, {
  type CalendarTheme,
  type CalendarView,
} from 'react-lightweight-calendar';
import { createEvents } from './data';

// A theme is `theme` ('light', 'dark' or 'auto') plus any --rlc-* variables.
// Set the variables with `style`, or in CSS on `.rlc` or any parent.
const PRESETS: Record<string, { theme: CalendarTheme; style?: CSSProperties }> =
  {
    Light: { theme: 'light' },
    Dark: { theme: 'dark' },
    Brand: {
      theme: 'light',
      style: {
        '--rlc-primary': '#7c3aed',
        '--rlc-event-bg': '#7c3aed',
        '--rlc-border': '#e9e3f7',
        '--rlc-radius': '16px',
      } as CSSProperties,
    },
    Ocean: {
      theme: 'dark',
      style: {
        '--rlc-bg': '#0b1e2d',
        '--rlc-surface': '#12324a',
        '--rlc-border': '#1d3f58',
        '--rlc-primary': '#5eead4',
        '--rlc-today-text': '#05231f',
        '--rlc-event-bg': '#0f766e',
        '--rlc-now-color': '#fbbf24',
      } as CSSProperties,
    },
    Compact: {
      theme: 'light',
      style: {
        '--rlc-font-size': '12px',
        '--rlc-hour-height': '32px',
        '--rlc-item-height': '18px',
      } as CSSProperties,
    },
  };

export default function Theming() {
  // Without `bgColor` on the items, they all use --rlc-event-bg.
  const [events] = useState(() =>
    createEvents().map(({ bgColor, ...event }) => event),
  );
  const [view, setView] = useState<CalendarView>('WEEK_TIME');
  const [date, setDate] = useState<string | Date>(new Date());
  const [preset, setPreset] = useState('Ocean');

  return (
    <>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}
      >
        {Object.keys(PRESETS).map((name) => (
          <button
            key={name}
            aria-pressed={name === preset}
            onClick={() => setPreset(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <div style={{ height: 560 }}>
        <Calendar
          theme={PRESETS[preset].theme}
          style={PRESETS[preset].style}
          data={events}
          activeTimeDateField="start-end"
          currentView={view}
          onViewChange={setView}
          views={['MONTH', 'WEEK_TIME', 'DAY']}
          currentDate={date}
          setCurrentDate={setDate}
        />
      </div>
    </>
  );
}
