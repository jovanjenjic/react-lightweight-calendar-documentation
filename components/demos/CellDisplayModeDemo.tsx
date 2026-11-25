'use client';

import { useState } from 'react';
import type { CellDisplayMode, CellDisplayState } from 'react-lightweight-calendar';
import Calendar from './Calendar';
import { DemoFrame, Segmented, useDemoState, type View } from './ui';

type State = CellDisplayState;
const STATES: State[] = ['ALL_EXPANDED', 'ALL_COLLAPSED', 'CUSTOM'];

/** Collapse cells for the whole view, or toggle single cells by clicking them. */
export default function CellDisplayModeDemo() {
  const { events, currentDate, setCurrentDate } = useDemoState();
  const [view, setView] = useState<View>('MONTH');
  const [state, setState] = useState<State>(STATES[2]);
  const [inactiveCells, setInactiveCells] = useState<string[]>([]);

  const cellDisplayMode: CellDisplayMode = { [view]: { state, inactiveCells } };

  return (
    <DemoFrame
      height={640}
      toolbar={
        <>
          <Segmented
            label="View"
            value={view}
            options={[
              { value: 'MONTH', label: 'Month' },
              { value: 'WEEK', label: 'Week' },
              { value: 'WEEK_IN_PLACE', label: 'Week in place' },
              { value: 'DAY_IN_PLACE', label: 'Day in place' },
            ]}
            onChange={(next) => {
              setView(next);
              setInactiveCells([]);
            }}
          />
          <Segmented
            label="state"
            value={state}
            options={STATES.map((value) => ({ value, label: value }))}
            onChange={setState}
          />
        </>
      }
      footer={
        <>
          <div className="rlc-demo__muted" style={{ marginBottom: 4 }}>
            {state === STATES[2]
              ? 'Click a cell to collapse or expand it.'
              : 'Switch to CUSTOM to toggle single cells.'}
          </div>
          <code>{`cellDisplayMode={${JSON.stringify(cellDisplayMode)}}`}</code>
        </>
      }
    >
      <Calendar
        data={events}
        currentView={view}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        activeTimeDateField="startTime-endTime"
        cellDisplayMode={cellDisplayMode}
        onCellClick={({ timeDate }) => {
          if (state !== STATES[2]) return;
          setInactiveCells((cells) =>
            cells.includes(timeDate)
              ? cells.filter((cell) => cell !== timeDate)
              : [...cells, timeDate],
          );
        }}
      />
    </DemoFrame>
  );
}
