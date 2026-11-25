'use client';

import type { Locale } from 'date-fns';
import { de, enUS, fr, ja, srLatn } from 'date-fns/locale';
import { useState } from 'react';
import Calendar, {
  type CalendarLabels,
  type CalendarView,
  type TimeFormat,
} from 'react-lightweight-calendar';
import { createEvents } from './data';

interface Language {
  name: string;
  locale: Locale;
  labels?: CalendarLabels;
  formats?: TimeFormat;
}

const LANGUAGES: Language[] = [
  { name: 'English', locale: enUS },
  {
    name: 'Deutsch',
    locale: de,
    labels: {
      today: 'Heute',
      allDay: 'Ganztägig',
      more: (count) => `+${count} weitere`,
      views: { MONTH: 'Monat', WEEK_TIME: 'Woche', DAY: 'Tag' },
    },
    formats: { hour: 'HH:mm', time: 'HH:mm' },
  },
  {
    name: 'Français',
    locale: fr,
    labels: {
      today: "Aujourd'hui",
      allDay: 'Journée',
      more: (count) => `+${count} autres`,
      views: { MONTH: 'Mois', WEEK_TIME: 'Semaine', DAY: 'Jour' },
    },
    formats: { hour: 'HH:mm', time: 'HH:mm' },
  },
  {
    name: 'Srpski',
    locale: srLatn,
    labels: {
      today: 'Danas',
      allDay: 'Ceo dan',
      more: (count) => `još ${count}`,
      views: { MONTH: 'Mesec', WEEK_TIME: 'Nedelja', DAY: 'Dan' },
    },
    formats: { hour: 'HH:mm', time: 'HH:mm' },
  },
  {
    name: '日本語',
    locale: ja,
    labels: {
      today: '今日',
      allDay: '終日',
      views: { MONTH: '月', WEEK_TIME: '週', DAY: '日' },
    },
    formats: { hour: 'H時', time: 'H:mm' },
  },
];

export default function Localization() {
  const [events] = useState(createEvents);
  const [view, setView] = useState<CalendarView>('WEEK_TIME');
  const [date, setDate] = useState<string | Date>(new Date());
  const [language, setLanguage] = useState(LANGUAGES[1]);

  return (
    <>
      <select
        aria-label="Language"
        style={{ marginBottom: 12 }}
        value={language.name}
        onChange={(e) =>
          setLanguage(LANGUAGES.find((l) => l.name === e.target.value)!)
        }
      >
        {LANGUAGES.map((l) => (
          <option key={l.name}>{l.name}</option>
        ))}
      </select>

      <div style={{ height: 560 }}>
        <Calendar
          data={events}
          activeTimeDateField="start-end"
          currentView={view}
          onViewChange={setView}
          views={['MONTH', 'WEEK_TIME', 'DAY']}
          currentDate={date}
          setCurrentDate={setDate}
          // Month and weekday names, and the first day of the week.
          locale={language.locale}
          weekStartsOn={language.locale.options?.weekStartsOn ?? 1}
          labels={language.labels}
          timeDateFormat={language.formats}
        />
      </div>
    </>
  );
}
