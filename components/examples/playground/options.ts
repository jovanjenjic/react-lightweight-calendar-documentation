import type { Locale } from 'date-fns';
import { de, enUS, es, fr, ja, srLatn } from 'date-fns/locale';
import type {
  CalendarLabels,
  CalendarTheme,
  CalendarView,
  WeekDay,
} from 'react-lightweight-calendar';

/** Everything the playground lets you change. */
export interface PlaygroundOptions {
  view: CalendarView;
  theme: CalendarTheme;
  language: LanguageKey;
  weekStartsOn: WeekDay;
  hours: HoursKey;
  dayMaxItems: number | 'auto';
  clock: '12h' | '24h';
  accent: AccentKey;
  density: 'regular' | 'compact';
  navigation: boolean;
  viewSwitcher: boolean;
  colorDots: boolean;
  hoverEffect: boolean;
}

/** The calendar's own defaults: options left here add nothing to the code. */
export const DEFAULT_OPTIONS: PlaygroundOptions = {
  view: 'WEEK_TIME',
  theme: 'light',
  language: 'en',
  weekStartsOn: 1,
  hours: 'all',
  dayMaxItems: 3,
  clock: '12h',
  accent: 'blue',
  density: 'regular',
  navigation: true,
  viewSwitcher: true,
  colorDots: false,
  hoverEffect: true,
};

export const VIEW_OPTIONS: { value: CalendarView; label: string }[] = [
  { value: 'MONTH', label: 'Month' },
  { value: 'WEEK', label: 'Week' },
  { value: 'WEEK_TIME', label: 'Week schedule' },
  { value: 'DAY', label: 'Day' },
  { value: 'DAY_REVERSE', label: 'Day timeline' },
  { value: 'WEEK_IN_PLACE', label: 'Week by hour' },
  { value: 'DAY_IN_PLACE', label: 'Day by hour' },
];

export interface Language {
  label: string;
  /** Import name in `date-fns/locale`. */
  importName: string;
  locale: Locale;
  labels?: CalendarLabels;
  /** Source of `labels.more`, for the generated code. */
  moreSource?: string;
}

export const LANGUAGES = {
  en: { label: 'English', importName: 'enUS', locale: enUS },
  de: {
    label: 'Deutsch',
    importName: 'de',
    locale: de,
    labels: {
      today: 'Heute',
      allDay: 'Ganztägig',
      more: (n) => `+${n} weitere`,
    },
    moreSource: '(n) => `+${n} weitere`',
  },
  fr: {
    label: 'Français',
    importName: 'fr',
    locale: fr,
    labels: {
      today: "Aujourd'hui",
      allDay: 'Journée',
      more: (n) => `+${n} autres`,
    },
    moreSource: '(n) => `+${n} autres`',
  },
  es: {
    label: 'Español',
    importName: 'es',
    locale: es,
    labels: { today: 'Hoy', allDay: 'Todo el día', more: (n) => `+${n} más` },
    moreSource: '(n) => `+${n} más`',
  },
  sr: {
    label: 'Srpski',
    importName: 'srLatn',
    locale: srLatn,
    labels: { today: 'Danas', allDay: 'Ceo dan', more: (n) => `još ${n}` },
    moreSource: '(n) => `još ${n}`',
  },
  ja: {
    label: '日本語',
    importName: 'ja',
    locale: ja,
    labels: { today: '今日', allDay: '終日' },
  },
} satisfies Record<string, Language>;

export type LanguageKey = keyof typeof LANGUAGES;

export const HOURS = {
  all: { label: 'Whole day', startHour: 0, endHour: 24 },
  work: { label: '7:00 – 20:00', startHour: 7, endHour: 20 },
  office: { label: '9:00 – 17:00', startHour: 9, endHour: 17 },
};

export type HoursKey = keyof typeof HOURS;

/** Accent colors. `blue` is the calendar's default and needs no CSS. */
export const ACCENTS = {
  blue: { label: 'Blue', color: '#1a73e8' },
  purple: { label: 'Purple', color: '#7c3aed' },
  green: { label: 'Green', color: '#0b8043' },
  orange: { label: 'Orange', color: '#e8710a' },
  pink: { label: 'Pink', color: '#d81b60' },
};

export type AccentKey = keyof typeof ACCENTS;

/** CSS variables of the compact density. */
export const COMPACT_VARIABLES = {
  '--rlc-font-size': '13px',
  '--rlc-hour-height': '36px',
  '--rlc-item-height': '18px',
};

/** The CSS variables the options set, in the order they appear in the code. */
export function styleVariables(
  options: PlaygroundOptions,
): Record<string, string> {
  return {
    ...(options.accent !== 'blue' && {
      '--rlc-primary': ACCENTS[options.accent].color,
      '--rlc-event-bg': ACCENTS[options.accent].color,
    }),
    ...(options.density === 'compact' && COMPACT_VARIABLES),
  };
}
