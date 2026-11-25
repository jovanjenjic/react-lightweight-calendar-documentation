'use client';

import { useState } from 'react';
import Calendar from './Calendar';
import { DemoFrame, Segmented, useDemoState, type View } from './ui';
import { THEMES, type ThemeKey } from './themes';

/** The same calendar with `theme` and different --rlc-* CSS variables. */
export default function ThemingDemo() {
  const { events, currentDate, setCurrentDate } = useDemoState();
  const [themeKey, setThemeKey] = useState<ThemeKey>('ocean');
  const [view, setView] = useState<View>('WEEK_TIME');
  const preset = THEMES[themeKey];

  return (
    <DemoFrame
      height={560}
      fixedTheme
      toolbar={
        <>
          <Segmented
            label="Theme"
            value={themeKey}
            options={Object.keys(THEMES).map((key) => ({ value: key, label: THEMES[key].label }))}
            onChange={setThemeKey}
          />
          <Segmented
            label="View"
            value={view}
            options={[
              { value: 'WEEK_TIME', label: 'Week schedule' },
              { value: 'MONTH', label: 'Month' },
            ]}
            onChange={setView}
          />
        </>
      }
    >
      <Calendar
        theme={preset.theme}
        style={preset.style}
        // Items without bgColor use --rlc-event-bg.
        data={events.map(({ bgColor, textColor, ...event }) =>
          themeKey === 'default' ? { ...event, bgColor, textColor } : event,
        )}
        currentView={view}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        activeTimeDateField="startTime-endTime"
      />
    </DemoFrame>
  );
}
