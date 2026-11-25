'use client';

import { de, enUS, es, fr, ja, srLatn } from 'date-fns/locale';
import type { Locale } from 'date-fns';
import { useState } from 'react';
import Calendar from './Calendar';
import { DemoFrame, SelectField, Segmented, useDemoState, type View } from './ui';

const LOCALES: Record<string, { locale: Locale; today: string; label: string }> = {
  enUS: { locale: enUS, today: 'Today', label: 'English (US)' },
  de: { locale: de, today: 'Heute', label: 'Deutsch' },
  fr: { locale: fr, today: "Aujourd'hui", label: 'Français' },
  es: { locale: es, today: 'Hoy', label: 'Español' },
  srLatn: { locale: srLatn, today: 'Danas', label: 'Srpski (latinica)' },
  ja: { locale: ja, today: '今日', label: '日本語' },
};

const FORMATS = {
  default: { label: 'Defaults', value: undefined },
  short: {
    label: 'Two-letter days, 24h',
    value: { day: 'EEEEEE', hour: 'HH:mm', monthYear: 'LLLL yyyy' },
  },
  compact: {
    label: 'Compact',
    value: { day: 'EEEEE', hour: 'H', monthYear: 'MMM yy' },
  },
} as const;

type FormatKey = keyof typeof FORMATS;

/** locale, todayLabel, timeDateFormat and weekStartsOn together. */
export default function LocalizationDemo() {
  const { events, currentDate, setCurrentDate } = useDemoState();
  const [localeKey, setLocaleKey] = useState('de');
  const [formatKey, setFormatKey] = useState<FormatKey>('short');
  const [view, setView] = useState<View>('WEEK_TIME');
  const { locale, today } = LOCALES[localeKey];

  return (
    <DemoFrame
      height={540}
      toolbar={
        <>
          <SelectField
            label="locale"
            value={localeKey}
            options={Object.entries(LOCALES).map(([value, { label }]) => ({ value, label }))}
            onChange={setLocaleKey}
          />
          <SelectField
            label="timeDateFormat"
            value={formatKey}
            options={Object.entries(FORMATS).map(([value, { label }]) => ({
              value: value as FormatKey,
              label,
            }))}
            onChange={setFormatKey}
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
      footer={
        <code>
          {`locale={${localeKey}} todayLabel="${today}" timeDateFormat={${JSON.stringify(
            FORMATS[formatKey].value ?? {},
          )}}`}
        </code>
      }
    >
      <Calendar
        data={events}
        currentView={view}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        activeTimeDateField="startTime-endTime"
        locale={locale}
        todayLabel={today}
        timeDateFormat={FORMATS[formatKey].value}
        weekStartsOn={locale.options?.weekStartsOn ?? 1}
      />
    </DemoFrame>
  );
}
