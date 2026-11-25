'use client';

import { useState } from 'react';
import Calendar from './Calendar';
import { DemoFrame, EventLog, Segmented, VIEWS, useDemoState, type View } from './ui';

type DateInfoLike = { timeDate?: string; date?: string; hour?: number };

const describeDateInfo = (value: DateInfoLike | number) =>
  typeof value === 'number'
    ? `hour ${value}`
    : `{ timeDate: "${value.timeDate ?? value.date}"${
        value.hour !== undefined ? `, hour: ${value.hour}` : ''
      } }`;

const describeDay = (value: string | Date) =>
  typeof value === 'string' ? `"${value}"` : value.toDateString();

/** Every callback wired to a log, so you can see what each one receives. */
export default function CallbacksDemo() {
  const { events, currentDate, setCurrentDate } = useDemoState();
  const [view, setView] = useState<View>('WEEK_TIME');
  const [log, setLog] = useState<string[]>([]);
  const push = (entry: string) => setLog((prev) => [entry, ...prev].slice(0, 6));

  return (
    <DemoFrame
      maxHeight={520}
      toolbar={<Segmented label="View" value={view} options={VIEWS} onChange={setView} />}
      footer={<EventLog entries={log} empty="Click items, cells, day names, day numbers, hours or color dots." />}
    >
      <Calendar
        data={events}
        currentView={view}
        currentDate={currentDate}
        setCurrentDate={(date) => {
          push(`setCurrentDate(${describeDay(date)})`);
          setCurrentDate(date);
        }}
        activeTimeDateField="startTime-endTime"
        colorDots={[
          { color: '#ef4444', text: 'Deadline', date: String(currentDate).slice(0, 10) },
        ]}
        onItemClick={(item) => push(`onItemClick({ id: "${item.id}", title: "${item.title}" })`)}
        onCellClick={(value) => push(`onCellClick(${describeDateInfo(value)})`)}
        onCellHeaderClick={(value) => push(`onCellHeaderClick(${describeDateInfo(value)})`)}
        onDayNumberClick={(day) => push(`onDayNumberClick("${day}")`)}
        onDayStringClick={(day) => push(`onDayStringClick(${describeDay(day)})`)}
        onHourClick={(value) => push(`onHourClick(${describeDateInfo(value)})`)}
        onColorDotClick={(dot) => push(`onColorDotClick({ text: "${dot.text}", date: "${dot.date}" })`)}
      />
    </DemoFrame>
  );
}
