'use client';

import { useState } from 'react';
import Calendar, { type CalendarView } from 'react-lightweight-calendar';
import { createEvents } from './data';

export default function DrillDown() {
  const [events] = useState(createEvents);
  const [view, setView] = useState<CalendarView>('MONTH');
  const [date, setDate] = useState<string | Date>(new Date());

  // Day numbers and weekday names report their day as `yyyy-MM-dd`.
  const openDay = (day: string | Date) => {
    setDate(day);
    setView('DAY');
  };

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
        onDayNumberClick={openDay}
        onDayStringClick={openDay}
      />
    </div>
  );
}
