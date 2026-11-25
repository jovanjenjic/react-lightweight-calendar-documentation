import type { CSSProperties } from 'react';
import type { CalendarTheme } from 'react-lightweight-calendar';

/** `theme` plus --rlc-* CSS variables, set with the `style` prop. */
export const THEMES: Record<
  string,
  { label: string; theme: CalendarTheme; style?: CSSProperties }
> = {
  default: { label: 'Default', theme: 'light' },
  dark: { label: 'Dark', theme: 'dark' },
  brand: {
    label: 'Brand',
    theme: 'light',
    style: {
      '--rlc-primary': '#7c3aed',
      '--rlc-event-bg': '#7c3aed',
      '--rlc-border': '#e9e3f7',
      '--rlc-radius': '16px',
    } as CSSProperties,
  },
  ocean: {
    label: 'Ocean',
    theme: 'dark',
    style: {
      '--rlc-bg': '#0b1e2d',
      '--rlc-surface': '#12324a',
      '--rlc-border': '#1d3f58',
      '--rlc-primary': '#5eead4',
      '--rlc-today-text': '#05231f',
      '--rlc-event-bg': '#0f766e',
      '--rlc-now-color': '#fbbf24',
    } as CSSProperties,
  },
};

export type ThemeKey = keyof typeof THEMES;
