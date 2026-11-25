'use client';

import { useState } from 'react';
import Calendar, { type CalendarView } from 'react-lightweight-calendar';
import { createEvents } from './data';

export default function WorkingHours() {
  const [events] = useState(createEvents);
  const [view, setView] = useState<CalendarView>('WEEK_TIME');
  const [date, setDate] = useState<string | Date>(new Date());

  return (
    <div style={{ height: 560 }}>
      <Calendar
        data={events}
        activeTimeDateField="start-end"
        currentView={view}
        onViewChange={setView}
        views={['WEEK_TIME', 'DAY', 'DAY_REVERSE']}
        currentDate={date}
        setCurrentDate={setDate}
        // Show 7:00 to 20:00 only; items outside are cut at the edges.
        startHour={7}
        endHour={20}
        // Sunday first, and a 24-hour clock.
        weekStartsOn={0}
        timeDateFormat={{ hour: 'HH:mm', time: 'HH:mm' }}
      />
    </div>
  );
}
