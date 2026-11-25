'use client';

import { useState } from 'react';
import Calendar, { type CalendarView } from 'react-lightweight-calendar';
import { createEvents } from './data';

const VIEW_NAMES: Partial<Record<CalendarView, string>> = {
  MONTH: 'Month',
  WEEK_TIME: 'Week',
  DAY: 'Day',
};

export default function CustomToolbar() {
  const [events] = useState(createEvents);
  const [view, setView] = useState<CalendarView>('WEEK_TIME');
  const [date, setDate] = useState<string | Date>(new Date());

  return (
    <div style={{ height: 600 }}>
      <Calendar
        data={events}
        activeTimeDateField="start-end"
        currentView={view}
        onViewChange={setView}
        views={['MONTH', 'WEEK_TIME', 'DAY']}
        currentDate={date}
        setCurrentDate={setDate}
        // Your own toolbar; the calendar hands over the title and the actions.
        renderNavigation={({
          title,
          goToToday,
          goToPrevious,
          goToNext,
          views,
          onViewChange,
        }) => (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <button onClick={goToPrevious} aria-label="Previous">
              ‹
            </button>
            <button onClick={goToToday}>Today</button>
            <button onClick={goToNext} aria-label="Next">
              ›
            </button>
            <strong style={{ flex: 1, fontSize: 18 }}>{title}</strong>
            <select
              aria-label="View"
              value={view}
              onChange={(e) => onViewChange?.(e.target.value as CalendarView)}
            >
              {views.map((v) => (
                <option key={v} value={v}>
                  {VIEW_NAMES[v]}
                </option>
              ))}
            </select>
          </div>
        )}
      />
    </div>
  );
}
