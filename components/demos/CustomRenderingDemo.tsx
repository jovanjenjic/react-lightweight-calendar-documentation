'use client';

import { useState } from 'react';
import Calendar from './Calendar';
import { DemoFrame, Segmented, Toggle, useDemoState, type View } from './ui';

const time = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

/** renderItem / renderItemText / renderHeaderItem side by side with the defaults. */
export default function CustomRenderingDemo() {
  const { events, currentDate, setCurrentDate } = useDemoState();
  const [view, setView] = useState<View>('WEEK_TIME');
  const [customItem, setCustomItem] = useState(true);
  const [customText, setCustomText] = useState(false);
  const [customHeader, setCustomHeader] = useState(true);

  return (
    <DemoFrame
      height={560}
      toolbar={
        <>
          <Segmented
            label="View"
            value={view}
            options={[
              { value: 'WEEK_TIME', label: 'Week time' },
              { value: 'MONTH', label: 'Month' },
            ]}
            onChange={setView}
          />
          <Toggle label="renderItem" checked={customItem} onChange={setCustomItem} />
          <Toggle label="renderItemText" checked={customText} onChange={setCustomText} />
          <Toggle label="renderHeaderItem" checked={customHeader} onChange={setCustomHeader} />
        </>
      }
      footer={
        <span className="rlc-demo__muted">
          renderItem replaces the whole item; renderItemText only its content. renderItem wins when
          both are set.
        </span>
      }
    >
      <Calendar
        data={events}
        currentView={view}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        activeTimeDateField="startTime-endTime"
        renderItem={
          customItem
            ? (item, isHovered) => (
                <div
                  style={{
                    height: '100%',
                    padding: '2px 6px',
                    borderLeft: `3px solid ${item.textColor ?? '#1d4ed8'}`,
                    borderRadius: 4,
                    background: item.bgColor ?? '#dbeafe',
                    color: item.textColor ?? '#1e3a8a',
                    fontSize: 11,
                    lineHeight: '14px',
                    overflow: 'hidden',
                    boxShadow: isHovered ? '0 2px 8px rgb(0 0 0 / 0.2)' : 'none',
                  }}
                >
                  <strong>{item.title}</strong>
                  <div>
                    {time(item.startTime)}–{time(item.endTime)}
                  </div>
                </div>
              )
            : undefined
        }
        renderItemText={customText ? (item) => <em>★ {item.title}</em> : undefined}
        renderHeaderItem={
          customHeader
            ? (item, { isFromPrevious, isFromNext }) => (
                <div
                  style={{
                    padding: '2px 8px',
                    borderRadius: 4,
                    background: '#312e81',
                    color: '#fff',
                    fontSize: 11,
                  }}
                >
                  {isFromPrevious && '← '}
                  {item.title}
                  {isFromNext && ' →'}
                </div>
              )
            : undefined
        }
      />
    </DemoFrame>
  );
}
