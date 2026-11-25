'use client';

import { addDays, startOfWeek } from 'date-fns';
import { useMemo, useState } from 'react';
import Calendar from './Calendar';
import { DemoFrame, useDemoState } from './ui';
import { toDateKey } from './sampleData';

/** Color dots mark days; the legend below the calendar is generated from them. */
export default function ColorDotsDemo() {
  const { events, currentDate, setCurrentDate } = useDemoState();
  const [selected, setSelected] = useState<string | null>(null);

  const colorDots = useMemo(() => {
    const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
    const day = (offset: number) => toDateKey(addDays(monday, offset));
    return [
      { color: '#ef4444', text: 'Deadline', date: day(3) },
      { color: '#22c55e', text: 'Public holiday', date: day(12) },
      { color: '#f59e0b', text: 'On call', date: day(1) },
      { color: '#f59e0b', text: 'On call', date: day(8) },
    ];
  }, []);

  return (
    <DemoFrame
      height={640}
      footer={
        selected ? (
          <>
            onColorDotClick: <strong>{selected}</strong>
          </>
        ) : (
          <span className="rlc-demo__muted">
            Click a dot in the calendar or an entry in the legend.
          </span>
        )
      }
    >
      <Calendar
        data={events}
        currentView="MONTH"
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        activeTimeDateField="startTime-endTime"
        colorDots={colorDots}
        onColorDotClick={(dot) => setSelected(`${dot.text} (${dot.date})`)}
      />
    </DemoFrame>
  );
}
