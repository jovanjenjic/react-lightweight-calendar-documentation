'use client';

import { addDays, startOfMonth } from 'date-fns';
import { useState } from 'react';
import Calendar, { toDateKey } from 'react-lightweight-calendar';

interface Booking {
  id: string;
  title: string;
  /** Check-in and check-out days, `yyyy-MM-dd`: both days are included. */
  from: string;
  to: string;
  bgColor: string;
}

function createBookings(): Booking[] {
  const first = startOfMonth(new Date());
  const day = (offset: number) => toDateKey(addDays(first, offset));
  return [
    {
      id: 'b1',
      title: 'Smith family',
      from: day(3),
      to: day(7),
      bgColor: '#009688',
    },
    {
      id: 'b2',
      title: 'J. Novak',
      from: day(10),
      to: day(12),
      bgColor: '#3f51b5',
    },
    {
      id: 'b3',
      title: 'Conference group',
      from: day(15),
      to: day(21),
      bgColor: '#f4511e',
    },
    {
      id: 'b4',
      title: 'Weekend guests',
      from: day(25),
      to: day(27),
      bgColor: '#8e24aa',
    },
  ];
}

const PRICES = [89, 99, 99, 109, 119, 149, 149];

export default function BookingCalendar() {
  const [bookings] = useState(createBookings);
  const [date, setDate] = useState<string | Date>(new Date());
  const [selected, setSelected] = useState('');

  return (
    <>
      <p style={{ margin: '0 0 12px' }}>
        {selected
          ? `Selected night: ${selected}`
          : 'Click a free day to pick a night.'}
      </p>

      <div style={{ height: 600 }}>
        <Calendar<Booking>
          data={bookings}
          // Any field names work; date-only values make whole-day bars.
          activeTimeDateField="from-to"
          currentView="MONTH"
          currentDate={date}
          setCurrentDate={setDate}
          onCellClick={({ date: day }) => setSelected(day)}
          // Extra content in each day cell: the price of free days.
          renderCellContent={({ date: day, items, isCurrentMonth }) =>
            isCurrentMonth && items.length === 0 ? (
              <span
                style={{
                  position: 'absolute',
                  right: 6,
                  bottom: 4,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#33b679',
                }}
              >
                €{PRICES[day.getDay()]}
              </span>
            ) : null
          }
        />
      </div>
    </>
  );
}
