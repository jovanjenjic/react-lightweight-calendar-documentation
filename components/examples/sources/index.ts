import type { ComponentType } from 'react';
import AllViews from './AllViews';
import BasicCalendar from './BasicCalendar';
import BookingCalendar from './BookingCalendar';
import BusyMonth from './BusyMonth';
import Callbacks from './Callbacks';
import CollapsingCells from './CollapsingCells';
import ColorDots from './ColorDots';
import CreateAndEdit from './CreateAndEdit';
import CustomRendering from './CustomRendering';
import CustomToolbar from './CustomToolbar';
import DrillDown from './DrillDown';
import LoadVisibleRange from './LoadVisibleRange';
import Localization from './Localization';
import Theming from './Theming';
import WorkingHours from './WorkingHours';

/**
 * Every example on the Examples page, by the name of its file in this folder. The
 * page shows the file's source next to the running component, so they never differ.
 */
export const EXAMPLES = {
  AllViews,
  BasicCalendar,
  BookingCalendar,
  BusyMonth,
  Callbacks,
  CollapsingCells,
  ColorDots,
  CreateAndEdit,
  CustomRendering,
  CustomToolbar,
  DrillDown,
  LoadVisibleRange,
  Localization,
  Theming,
  WorkingHours,
} satisfies Record<string, ComponentType>;

export type ExampleName = keyof typeof EXAMPLES;
