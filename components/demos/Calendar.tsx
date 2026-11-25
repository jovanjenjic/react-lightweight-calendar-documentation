'use client';

import dynamic from 'next/dynamic';

/**
 * The calendar is rendered only in the browser: it highlights "today" and positions
 * items in the visitor's time zone, which a statically generated page cannot know.
 */
const Calendar = dynamic(() => import('react-lightweight-calendar'), {
  ssr: false,
  loading: () => <div className="rlc-demo__loading">Loading calendar…</div>,
});

export type CalendarProps = React.ComponentProps<
  typeof import('react-lightweight-calendar').default
>;

export default Calendar;
