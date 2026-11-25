'use client';

import { addHours } from 'date-fns';
import { useState } from 'react';
import Calendar from './Calendar';
import { DemoFrame, Segmented, useDemoState, type View } from './ui';

/** Turns the local `timeDate` of a clicked cell into a Date. */
const fromTimeDate = (timeDate: string, defaultHour: number) =>
  timeDate.length > 10
    ? new Date(timeDate.replace(' ', 'T'))
    : new Date(`${timeDate}T${String(defaultHour).padStart(2, '0')}:00:00`);

/** Click an empty cell to add an event, click an event to remove it. */
export default function CreateEventsDemo() {
  const { events, setEvents, currentDate, setCurrentDate } = useDemoState();
  const [view, setView] = useState<View>('WEEK_TIME');
  const [counter, setCounter] = useState(1);

  return (
    <DemoFrame
      height={560}
      toolbar={
        <Segmented
          label="View"
          value={view}
          options={[
            { value: 'WEEK_TIME', label: 'Week time' },
            { value: 'DAY', label: 'Day' },
            { value: 'MONTH', label: 'Month' },
          ]}
          onChange={setView}
        />
      }
      footer={
        <span className="rlc-demo__muted">
          {events.length} events. Click an empty cell to add one, click an event to remove it.
        </span>
      }
    >
      <Calendar
        data={events}
        currentView={view}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        activeTimeDateField="startTime-endTime"
        onCellClick={({ timeDate }) => {
          const start = fromTimeDate(timeDate, 9);
          setEvents((prev) => [
            ...prev,
            {
              id: `new-${counter}`,
              title: `New event ${counter}`,
              startTime: start.toISOString(),
              endTime: addHours(start, 1).toISOString(),
              bgColor: '#c7d2fe',
              textColor: '#312e81',
            },
          ]);
          setCounter((n) => n + 1);
        }}
        onItemClick={(item) => setEvents((prev) => prev.filter((event) => event.id !== item.id))}
      />
    </DemoFrame>
  );
}
