'use client';

import Calendar from './Calendar';
import { DemoFrame, useDemoState, type View } from './ui';

/** One view with sample data and the built-in navigation. */
export default function ViewDemo({ view, maxHeight = 520 }: { view: View; maxHeight?: number }) {
  const { events, currentDate, setCurrentDate } = useDemoState();
  return (
    <DemoFrame maxHeight={maxHeight}>
      <Calendar
        data={events}
        currentView={view}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        activeTimeDateField="startTime-endTime"
      />
    </DemoFrame>
  );
}
