import { addDays, setHours, setMinutes, startOfWeek } from 'date-fns';

export type CalendarEvent = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  bgColor?: string;
  textColor?: string;
};

/** Formats a local date as `yyyy-MM-dd` (the format `currentDate` expects). */
export const toDateKey = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const at = (day: Date, hours: number, minutes = 0) =>
  setMinutes(setHours(day, hours), minutes).toISOString();

/**
 * Sample events placed in the current week, so every demo shows data and the
 * built-in "Today" button lands on a week with events.
 */
export function createSampleEvents(reference = new Date()): CalendarEvent[] {
  const monday = startOfWeek(reference, { weekStartsOn: 1 });
  const day = (offset: number) => addDays(monday, offset);

  const standups: CalendarEvent[] = [0, 1, 2, 3, 4].map((offset) => ({
    id: `standup-${offset}`,
    title: 'Daily standup',
    startTime: at(day(offset), 9, 0),
    endTime: at(day(offset), 9, 15),
  }));

  return [
    ...standups,
    {
      id: 'conference',
      title: 'React Conference',
      startTime: at(day(0), 8, 0),
      endTime: at(day(2), 18, 0),
      bgColor: '#e9d5ff',
      textColor: '#4c1d95',
    },
    {
      id: 'design-review',
      title: 'Design review',
      startTime: at(day(1), 11, 0),
      endTime: at(day(1), 12, 30),
    },
    {
      id: 'lunch',
      title: 'Team lunch',
      startTime: at(day(2), 12, 0),
      endTime: at(day(2), 13, 0),
      bgColor: '#bbf7d0',
      textColor: '#14532d',
    },
    {
      id: 'interview',
      title: 'Interview',
      startTime: at(day(3), 10, 0),
      endTime: at(day(3), 11, 0),
    },
    {
      id: 'pairing',
      title: 'Pair programming',
      startTime: at(day(3), 10, 30),
      endTime: at(day(3), 12, 0),
      bgColor: '#fde68a',
      textColor: '#78350f',
    },
    {
      id: 'release',
      title: 'Release 3.0',
      startTime: at(day(3), 15, 0),
      endTime: at(day(3), 16, 0),
      bgColor: '#fecaca',
      textColor: '#7f1d1d',
    },
    {
      id: 'deploy',
      title: 'Night deploy',
      startTime: at(day(4), 22, 0),
      endTime: at(day(5), 2, 0),
    },
    {
      id: 'workshop',
      title: 'Weekend workshop',
      startTime: at(day(5), 10, 0),
      endTime: at(day(5), 14, 0),
      bgColor: '#bae6fd',
      textColor: '#0c4a6e',
    },
    {
      id: 'planning',
      title: 'Sprint planning',
      startTime: at(day(7), 10, 0),
      endTime: at(day(7), 11, 30),
    },
    {
      id: 'retro',
      title: 'Retrospective',
      startTime: at(day(-3), 14, 0),
      endTime: at(day(-3), 15, 0),
    },
  ];
}
