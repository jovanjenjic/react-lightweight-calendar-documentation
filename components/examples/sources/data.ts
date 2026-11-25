import { addDays, setHours, setMinutes, startOfWeek } from 'date-fns';
import { toDateKey } from 'react-lightweight-calendar';

/**
 * The calendar takes any objects. It reads `id`, `title`, `bgColor`, `textColor`,
 * `allDay` and the date fields you name in `activeTimeDateField`; every other field
 * comes back to you untouched in the callbacks.
 */
export interface Event {
  id: string;
  title: string;
  /** ISO 8601: `2025-06-02T09:00:00Z`, or `2025-06-02` for a whole day. */
  start: string;
  end: string;
  bgColor?: string;
  location?: string;
}

export const COLORS = {
  blue: '#039be5',
  green: '#33b679',
  purple: '#8e24aa',
  orange: '#f4511e',
  red: '#d50000',
  teal: '#009688',
  yellow: '#f6bf26',
  indigo: '#3f51b5',
};

/** A busy week around `reference`, so every example has something to show. */
export function createEvents(reference = new Date()): Event[] {
  const monday = startOfWeek(reference, { weekStartsOn: 1 });
  const day = (offset: number) => addDays(monday, offset);
  const at = (offset: number, hour: number, minute = 0) =>
    setMinutes(setHours(day(offset), hour), minute).toISOString();

  return [
    // Monday to Friday
    ...[0, 1, 2, 3, 4].map((offset) => ({
      id: `standup-${offset}`,
      title: 'Daily standup',
      start: at(offset, 9),
      end: at(offset, 9, 15),
      bgColor: COLORS.green,
      location: 'Zoom',
    })),

    // Whole days: date-only values, the end day included
    {
      id: 'summit',
      title: 'React Summit',
      start: toDateKey(day(0)),
      end: toDateKey(day(2)),
      bgColor: COLORS.purple,
      location: 'Amsterdam',
    },
    {
      id: 'offsite',
      title: 'Team offsite',
      start: toDateKey(day(4)),
      end: toDateKey(day(4)),
      bgColor: COLORS.teal,
    },
    {
      id: 'trip',
      title: 'Trip to Berlin',
      start: toDateKey(day(10)),
      end: toDateKey(day(12)),
      bgColor: COLORS.orange,
    },

    // Timed events, some of them overlapping
    {
      id: 'planning',
      title: 'Sprint planning',
      start: at(0, 10),
      end: at(0, 11, 30),
    },
    {
      id: 'one-on-one',
      title: '1:1 with Ana',
      start: at(0, 14),
      end: at(0, 14, 30),
    },
    {
      id: 'design',
      title: 'Design review',
      start: at(1, 11),
      end: at(1, 12, 30),
      bgColor: COLORS.indigo,
      location: 'Room 4',
    },
    {
      id: 'gym',
      title: 'Gym',
      start: at(1, 18),
      end: at(1, 19),
      bgColor: COLORS.teal,
    },
    { id: 'dentist', title: 'Dentist', start: at(2, 8), end: at(2, 8, 45) },
    {
      id: 'lunch',
      title: 'Team lunch',
      start: at(2, 12),
      end: at(2, 13, 30),
      bgColor: COLORS.orange,
      location: 'Pizzeria',
    },
    { id: 'interview', title: 'Interview', start: at(3, 10), end: at(3, 11) },
    {
      id: 'pairing',
      title: 'Pair programming',
      start: at(3, 10, 30),
      end: at(3, 12),
      bgColor: COLORS.yellow,
    },
    {
      id: 'review',
      title: 'Code review',
      start: at(3, 11),
      end: at(3, 11, 45),
      bgColor: COLORS.indigo,
    },
    {
      id: 'release',
      title: 'Release 3.0',
      start: at(3, 15),
      end: at(3, 16),
      bgColor: COLORS.red,
    },
    { id: 'retro', title: 'Retrospective', start: at(4, 15), end: at(4, 16) },

    // Crosses midnight: drawn on both days
    {
      id: 'deploy',
      title: 'Night deploy',
      start: at(4, 22),
      end: at(5, 2),
      bgColor: COLORS.indigo,
    },
    {
      id: 'hike',
      title: 'Weekend hike',
      start: at(5, 10),
      end: at(5, 14),
      bgColor: COLORS.teal,
    },

    // Last and next week, for the navigation
    {
      id: 'kickoff',
      title: 'Project kickoff',
      start: at(-4, 10),
      end: at(-4, 12),
    },
    {
      id: 'demo',
      title: 'Sprint demo',
      start: at(8, 14),
      end: at(8, 15),
      bgColor: COLORS.red,
    },
  ];
}
