'use client';

import { useState } from 'react';
import Calendar, { type CalendarView } from 'react-lightweight-calendar';
import { COLORS, createEvents, type Event } from './data';

export default function CustomRendering() {
  const [events] = useState(createEvents);
  const [view, setView] = useState<CalendarView>('WEEK_TIME');
  const [date, setDate] = useState<string | Date>(new Date());

  return (
    <div style={{ height: 620 }}>
      <Calendar<Event>
        data={events}
        activeTimeDateField="start-end"
        currentView={view}
        onViewChange={setView}
        views={['MONTH', 'WEEK_TIME', 'DAY']}
        currentDate={date}
        setCurrentDate={setDate}
        // Every item outside the all-day row. The calendar positions and sizes
        // it, and what you return fills it; `info` says where it is drawn and
        // how much room it has.
        renderItem={(event, isHovered, info) => {
          const roomy = info.view !== 'MONTH' && !info.isCompact;
          return (
            <div
              style={{
                padding: '2px 6px',
                overflow: 'hidden',
                borderLeft: `4px solid ${event.bgColor ?? COLORS.blue}`,
                borderRadius: 6,
                // The item color mixed into the calendar background, so it
                // works in light and dark themes. Overlapping items stay opaque.
                background: `color-mix(in srgb, ${event.bgColor ?? COLORS.blue} 22%, var(--rlc-bg, Canvas))`,
                fontSize: 12,
                lineHeight: 1.3,
                boxShadow: isHovered
                  ? '0 4px 12px rgb(0 0 0 / 0.2)'
                  : undefined,
              }}
            >
              <strong>{event.title}</strong>
              {roomy && <div>{info.timeLabel}</div>}
              {roomy && event.location && <div>📍 {event.location}</div>}
            </div>
          );
        }}
        // All-day and multi-day bars.
        renderHeaderItem={(event, { continuesBefore, continuesAfter }) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 8px',
              borderRadius: 999,
              background: event.bgColor ?? COLORS.blue,
              color: '#fff',
              fontSize: 12,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {continuesBefore && '← '}
            {event.title}
            {continuesAfter && ' →'}
          </div>
        )}
        // Column headers of the hour views.
        renderDayHeader={({
          weekdayLabel,
          dayNumber,
          isToday,
          onDayNumberClick,
        }) => (
          <button
            onClick={onDayNumberClick}
            style={{
              display: 'grid',
              justifyItems: 'center',
              width: '100%',
              padding: '6px 0',
              border: 0,
              background: 'none',
              color: isToday ? COLORS.red : 'inherit',
              cursor: 'pointer',
            }}
          >
            <small style={{ textTransform: 'uppercase' }}>{weekdayLabel}</small>
            <span style={{ fontSize: 22, fontWeight: isToday ? 700 : 400 }}>
              {dayNumber}
            </span>
          </button>
        )}
        renderHourLabel={({ hour }) => `${String(hour).padStart(2, '0')}h`}
      />
    </div>
  );
}
