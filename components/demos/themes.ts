/** CSS custom properties the calendar reads. Set them on any wrapper element. */
export const THEMES = {
  default: {
    label: 'Default',
    canvas: '#ffffff',
    vars: {},
  },
  ocean: {
    label: 'Ocean',
    canvas: '#ffffff',
    vars: {
      '--b-100': '#ccfbf1',
      '--b-200': '#0d9488',
      '--gs-200': '#d5ebe8',
      '--gs-50': '#f7fdfc',
      '--gs-700': '#134e4a',
      '--gs-800': '#042f2e',
    },
  },
  dark: {
    label: 'Dark',
    canvas: '#0b1220',
    vars: {
      '--b-100': '#1e3a8a',
      '--b-200': '#3b82f6',
      '--gs-0': '#ffffff',
      '--gs-50': '#111827',
      '--gs-100': '#1f2937',
      '--gs-200': '#2b3545',
      '--gs-300': '#6b7280',
      '--gs-500': '#9ca3af',
      '--gs-600': '#9ca3af',
      '--gs-700': '#d1d5db',
      '--gs-800': '#f3f4f6',
    },
  },
} as const;

export type ThemeKey = keyof typeof THEMES;
