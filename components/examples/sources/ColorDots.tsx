'use client';

import { addDays, startOfMonth } from 'date-fns';
import { useState } from 'react';
import Calendar, { toDateKey, type ColorDot } from 'react-lightweight-calendar';
import { COLORS, createEvents } from './data';

/** One dot per day. The legend under the calendar lists each color once. */
function createDots(): ColorDot[] {
  const first = startOfMonth(new Date());
  const day = (offset: number) => toDateKey(addDays(first, offset));
  return [
    { color: COLORS.red, text: 'Deadline', date: day(11) },
    { color: COLORS.green, text: 'Public holiday', date: day(18) },
    { color: COLORS.yellow, text: 'On call', date: day(4) },
    { color: COLORS.yellow, text: 'On call', date: day(5) },
  ];
}

export default function ColorDots() {
  const [events] = useState(createEvents);
  const [dots] = useState(createDots);
  const [date, setDate] = useState<string | Date>(new Date());
  const [clicked, setClicked] = useState('');

  return (
    <>
      <p style={{ margin: '0 0 12px' }}>
        {clicked ||
          'Click a dot next to a day number, or an entry in the legend.'}
      </p>

      <div style={{ height: 600 }}>
        <Calendar
          data={events}
          activeTimeDateField="start-end"
          currentView="MONTH"
          currentDate={date}
          setCurrentDate={setDate}
          colorDots={dots}
          onColorDotClick={(dot) => setClicked(`${dot.text} on ${dot.date}`)}
        />
      </div>
    </>
  );
}
