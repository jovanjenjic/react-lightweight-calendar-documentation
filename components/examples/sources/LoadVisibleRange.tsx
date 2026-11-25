'use client';

import { useEffect, useState } from 'react';
import Calendar, {
  getViewRange,
  toDate,
  toDateKey,
  type CalendarView,
} from 'react-lightweight-calendar';
import { createEvents, type Event } from './data';

/** Stands in for your API: answers after 600 ms with the events in a range. */
async function fetchEvents(
  from: string,
  to: string,
  signal: AbortSignal,
): Promise<Event[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  signal.throwIfAborted();
  const day = (value: string) => toDateKey(toDate(value)!);
  return createEvents().filter(
    (event) => day(event.start) <= to && day(event.end) >= from,
  );
}

export default function LoadVisibleRange() {
  const [view, setView] = useState<CalendarView>('WEEK_TIME');
  const [date, setDate] = useState<string | Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  // The days on screen, from the same helper the calendar uses.
  const range = getViewRange(view, toDate(date) ?? new Date(), 1);
  const from = toDateKey(range.start);
  const to = toDateKey(range.end);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetchEvents(from, to, controller.signal)
      .then((loaded) => {
        setEvents(loaded);
        setLoading(false);
      })
      .catch(() => {}); // Aborted: a newer range is already loading.
    return () => controller.abort();
  }, [from, to]);

  return (
    <>
      <p style={{ margin: '0 0 12px' }}>
        {loading ? 'Loading' : 'Loaded'} {from} to {to}
        {loading ? '…' : `: ${events.length} events`}
      </p>

      <div
        style={{
          height: 560,
          opacity: loading ? 0.6 : 1,
          transition: 'opacity 0.2s',
        }}
      >
        <Calendar
          data={events}
          activeTimeDateField="start-end"
          currentView={view}
          onViewChange={setView}
          views={['MONTH', 'WEEK_TIME', 'DAY']}
          currentDate={date}
          setCurrentDate={setDate}
          weekStartsOn={1}
        />
      </div>
    </>
  );
}
