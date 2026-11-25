'use client';

import { useState } from 'react';
import Calendar, { type CalendarView } from 'react-lightweight-calendar';
import { createEvents } from './data';

export default function AllViews() {
  const [events] = useState(createEvents);
  const [view, setView] = useState<CalendarView>('MONTH');
  const [date, setDate] = useState<string | Date>(new Date());

  return (
    <div style={{ height: 620 }}>
      {/* Without `views`, the switcher offers all seven views. */}
      <Calendar
        data={events}
        activeTimeDateField="start-end"
        currentView={view}
        onViewChange={setView}
        currentDate={date}
        setCurrentDate={setDate}
      />
    </div>
  );
}
