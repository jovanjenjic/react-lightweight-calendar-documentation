'use client';

import { useState } from 'react';
import Calendar from './Calendar';
import { DemoFrame, Segmented, useDemoState, type View } from './ui';
import { THEMES, type ThemeKey } from './themes';

/** The same calendar with different CSS custom properties on its wrapper. */
export default function ThemingDemo() {
  const { events, currentDate, setCurrentDate } = useDemoState();
  const [themeKey, setThemeKey] = useState<ThemeKey>('dark');
  const [view, setView] = useState<View>('WEEK_TIME');
  const theme = THEMES[themeKey];

  return (
    <DemoFrame
      maxHeight={520}
      toolbar={
        <>
          <Segmented
            label="Theme"
            value={themeKey}
            options={(Object.keys(THEMES) as ThemeKey[]).map((key) => ({
              value: key,
              label: THEMES[key].label,
            }))}
            onChange={setThemeKey}
          />
          <Segmented
            label="View"
            value={view}
            options={[
              { value: 'WEEK_TIME', label: 'Week time' },
              { value: 'MONTH', label: 'Month' },
            ]}
            onChange={setView}
          />
        </>
      }
    >
      <div
        className={`rlc-theme-${themeKey}`}
        style={{
          ...(theme.vars as React.CSSProperties),
          background: theme.canvas,
          margin: -16,
          padding: 16,
        }}
      >
        <Calendar
          data={events.map(({ bgColor, textColor, ...event }) =>
            themeKey === 'default' ? { ...event, bgColor, textColor } : event,
          )}
          currentView={view}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          activeTimeDateField="startTime-endTime"
        />
      </div>
    </DemoFrame>
  );
}
