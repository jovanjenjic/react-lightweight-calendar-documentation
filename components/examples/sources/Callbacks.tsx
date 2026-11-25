'use client';

import { useState } from 'react';
import Calendar, {
  toDateKey,
  type CalendarView,
} from 'react-lightweight-calendar';
import { COLORS, createEvents } from './data';

export default function Callbacks() {
  const [events] = useState(createEvents);
  const [view, setView] = useState<CalendarView>('WEEK_TIME');
  const [date, setDate] = useState<string | Date>(new Date());
  const [log, setLog] = useState<string[]>([]);
  const print = (entry: string) =>
    setLog((list) => [entry, ...list].slice(0, 6));

  return (
    <>
      <div style={{ height: 520 }}>
        <Calendar
          data={events}
          activeTimeDateField="start-end"
          currentView={view}
          onViewChange={(next) => {
            print(`onViewChange("${next}")`);
            setView(next);
          }}
          views={['MONTH', 'WEEK_TIME', 'DAY', 'WEEK_IN_PLACE']}
          currentDate={date}
          setCurrentDate={(next) => {
            print(`setCurrentDate("${next}")`);
            setDate(next);
          }}
          dayMaxItems={2}
          colorDots={[
            {
              color: COLORS.red,
              text: 'Deadline',
              date: toDateKey(new Date()),
            },
          ]}
          onItemClick={(item) =>
            print(`onItemClick({ title: "${item.title}" })`)
          }
          onCellClick={(info) =>
            print(`onCellClick({ timeDate: "${info.timeDate}" })`)
          }
          onCellHeaderClick={(info) =>
            print(`onCellHeaderClick({ date: "${info.date}" })`)
          }
          onDayNumberClick={(day) => print(`onDayNumberClick("${day}")`)}
          onDayStringClick={(day) => print(`onDayStringClick("${day}")`)}
          onHourClick={(value) =>
            print(
              `onHourClick(${typeof value === 'number' ? value : `"${value.timeDate}"`})`,
            )
          }
          onColorDotClick={(dot) =>
            print(`onColorDotClick({ text: "${dot.text}" })`)
          }
          onMoreClick={(day, items) =>
            print(`onMoreClick("${toDateKey(day)}", ${items.length} items)`)
          }
        />
      </div>

      <ol
        style={{
          minHeight: 140,
          margin: '12px 0 0',
          fontFamily: 'monospace',
          fontSize: 13,
        }}
      >
        {log.length ? (
          log.map((entry, i) => <li key={`${i}-${entry}`}>{entry}</li>)
        ) : (
          <li>
            Click items, slots, day names, day numbers, hours or the red dot.
          </li>
        )}
      </ol>
    </>
  );
}
