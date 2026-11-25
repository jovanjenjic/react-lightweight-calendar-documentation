'use client';

import { useState } from 'react';
import Calendar, { type CalendarView } from 'react-lightweight-calendar';
import { createEvents } from './data';

export default function BasicCalendar() {
  const [events] = useState(createEvents);
  const [view, setView] = useState<CalendarView>('WEEK_TIME');
  const [date, setDate] = useState<string | Date>(new Date());

  return (
    // The calendar fills its parent. Give the parent a height, and the
    // hour views scroll inside it.
    <div style={{ height: 600 }}>
      <Calendar
        data={events}
        activeTimeDateField="start-end"
        currentView={view}
        onViewChange={setView}
        views={['MONTH', 'WEEK_TIME', 'DAY']}
        currentDate={date}
        setCurrentDate={setDate}
      />
    </div>
  );
}
