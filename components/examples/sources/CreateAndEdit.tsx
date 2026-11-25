'use client';

import { addHours, setHours } from 'date-fns';
import { useState } from 'react';
import Calendar, {
  type CalendarView,
  type DateInfo,
} from 'react-lightweight-calendar';
import { COLORS, createEvents, type Event } from './data';

export default function CreateAndEdit() {
  const [events, setEvents] = useState(createEvents);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<CalendarView>('WEEK_TIME');
  const [date, setDate] = useState<string | Date>(new Date());
  const selected = events.find((event) => event.id === selectedId);

  // A click on an empty slot creates a one-hour event there. Day cells of the
  // month have no hour, so those events start at 9:00.
  const create = ({ timeDateUTC, hour }: DateInfo) => {
    const cellStart = new Date(timeDateUTC);
    const start = hour === undefined ? setHours(cellStart, 9) : cellStart;
    const event: Event = {
      id: crypto.randomUUID(),
      title: 'New event',
      start: start.toISOString(),
      end: addHours(start, 1).toISOString(),
      bgColor: COLORS.blue,
    };
    setEvents((list) => [...list, event]);
    setSelectedId(event.id);
  };

  const update = (changes: Partial<Event>) =>
    setEvents((list) =>
      list.map((event) =>
        event.id === selectedId ? { ...event, ...changes } : event,
      ),
    );

  const remove = () => {
    setEvents((list) => list.filter((event) => event.id !== selectedId));
    setSelectedId(null);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          minHeight: 36,
          marginBottom: 12,
        }}
      >
        {selected ? (
          <>
            <input
              aria-label="Title"
              value={selected.title}
              onChange={(e) => update({ title: e.target.value })}
            />
            <select
              aria-label="Color"
              value={selected.bgColor}
              onChange={(e) => update({ bgColor: e.target.value })}
            >
              {Object.entries(COLORS).map(([name, color]) => (
                <option key={name} value={color}>
                  {name}
                </option>
              ))}
            </select>
            <button onClick={remove}>Delete</button>
            <button onClick={() => setSelectedId(null)}>Done</button>
          </>
        ) : (
          <span>
            Click an empty slot to add an event, or an event to edit it.
          </span>
        )}
      </div>

      <div style={{ height: 560 }}>
        {/* Calendar<Event> types the items in every callback. */}
        <Calendar<Event>
          data={events}
          activeTimeDateField="start-end"
          currentView={view}
          onViewChange={setView}
          views={['MONTH', 'WEEK_TIME', 'DAY']}
          currentDate={date}
          setCurrentDate={setDate}
          onCellClick={create}
          onItemClick={(event) => setSelectedId(event.id)}
        />
      </div>
    </>
  );
}
