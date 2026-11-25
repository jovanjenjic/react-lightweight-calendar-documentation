'use client';

import { useState } from 'react';
import Calendar, {
  type CalendarView,
  type CellDisplayModeState,
} from 'react-lightweight-calendar';
import { createEvents } from './data';

type State = `${CellDisplayModeState}`;
const STATES: State[] = ['CUSTOM', 'ALL_COLLAPSED', 'ALL_EXPANDED'];

export default function CollapsingCells() {
  const [events] = useState(createEvents);
  const [view, setView] = useState<CalendarView>('MONTH');
  const [date, setDate] = useState<string | Date>(new Date());
  const [state, setState] = useState<State>('CUSTOM');
  // Collapsed cells: `yyyy-MM-dd`, or `yyyy-MM-dd HH:mm:ss` in the hour views.
  const [inactiveCells, setInactiveCells] = useState<string[]>([]);

  const toggle = (cell: string) =>
    setInactiveCells((cells) =>
      cells.includes(cell) ? cells.filter((c) => c !== cell) : [...cells, cell],
    );

  return (
    <>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}
      >
        {STATES.map((s) => (
          <button
            key={s}
            aria-pressed={s === state}
            onClick={() => setState(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div style={{ height: 600 }}>
        {/* A collapsed cell shows only its last item. */}
        <Calendar
          data={events}
          activeTimeDateField="start-end"
          currentView={view}
          onViewChange={setView}
          views={['MONTH', 'WEEK', 'WEEK_IN_PLACE']}
          currentDate={date}
          setCurrentDate={setDate}
          cellDisplayMode={{ [view]: { state, inactiveCells } }}
          onCellClick={({ timeDate }) => state === 'CUSTOM' && toggle(timeDate)}
        />
      </div>
    </>
  );
}
