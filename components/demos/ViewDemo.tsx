'use client';

import Calendar from './Calendar';
import { DemoFrame, useDemoState, type View } from './ui';

/** One view with sample data and the built-in navigation. */
export default function ViewDemo({ view, height = 560 }: { view: View; height?: number }) {
  const { events, currentDate, setCurrentDate } = useDemoState();
  return (
    <DemoFrame height={height}>
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
