'use client';

import { useState } from 'react';
import Calendar from 'react-lightweight-calendar';
import { createEvents } from './data';

const LIMITS = [2, 3, 'auto'] as const;

export default function BusyMonth() {
  const [events] = useState(createEvents);
  const [date, setDate] = useState<string | Date>(new Date());
  const [dayMaxItems, setDayMaxItems] = useState<number | 'auto'>('auto');

  return (
    <>
      <label style={{ display: 'inline-flex', gap: 8, marginBottom: 12 }}>
        dayMaxItems
        <select
          value={dayMaxItems}
          onChange={(event) => {
            const value = event.target.value;
            setDayMaxItems(value === 'auto' ? 'auto' : Number(value));
          }}
        >
          {LIMITS.map((limit) => (
            <option key={limit}>{limit}</option>
          ))}
        </select>
      </label>

      <div style={{ height: 600 }}>
        {/* Busy days end with "+N more", which opens the list of the day.
            'auto' fits as many items as the cell height allows. */}
        <Calendar
          data={events}
          activeTimeDateField="start-end"
          currentView="MONTH"
          currentDate={date}
          setCurrentDate={setDate}
          dayMaxItems={dayMaxItems}
        />
      </div>
    </>
  );
}
