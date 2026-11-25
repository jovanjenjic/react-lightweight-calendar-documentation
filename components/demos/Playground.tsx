'use client';

import { useState } from 'react';
import Calendar from './Calendar';
import { DemoFrame, SelectField, Segmented, Toggle, VIEWS, useDemoState, type View } from './ui';

/** Interactive overview: switch views and the main options. */
export default function Playground({ initialView = 'WEEK_TIME' }: { initialView?: View }) {
  const { events, currentDate, setCurrentDate } = useDemoState();
  const [view, setView] = useState<View>(initialView);
  const [weekStartsOn, setWeekStartsOn] = useState(1);
  const [field, setField] = useState('startTime-endTime');
  const [disableHoverEffect, setDisableHoverEffect] = useState(false);
  const [clicked, setClicked] = useState<string | null>(null);

  return (
    <DemoFrame
      height={600}
      toolbar={
        <>
          <Segmented label="View" value={view} options={VIEWS} onChange={setView} />
          <SelectField
            label="Week starts on"
            value={weekStartsOn}
            options={[
              { value: 1, label: 'Monday' },
              { value: 0, label: 'Sunday' },
              { value: 6, label: 'Saturday' },
            ]}
            onChange={setWeekStartsOn}
          />
          <SelectField
            label="activeTimeDateField"
            value={field}
            options={[
              { value: 'startTime-endTime', label: 'startTime-endTime' },
              { value: 'startTime', label: 'startTime' },
              { value: 'endTime', label: 'endTime' },
            ]}
            onChange={setField}
          />
          <Toggle
            label="disableHoverEffect"
            checked={disableHoverEffect}
            onChange={setDisableHoverEffect}
          />
        </>
      }
      footer={
        clicked ? (
          <>
            Clicked item: <strong>{clicked}</strong>
          </>
        ) : (
          <span className="rlc-demo__muted">
            Click an item. Scroll the calendar for more hours and for the navigation.
          </span>
        )
      }
    >
      <Calendar
        data={events}
        currentView={view}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        activeTimeDateField={field}
        weekStartsOn={weekStartsOn}
        disableHoverEffect={disableHoverEffect}
        onItemClick={(item) => setClicked(item.title)}
      />
    </DemoFrame>
  );
}
