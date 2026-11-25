import {
  DEFAULT_OPTIONS,
  HOURS,
  LANGUAGES,
  styleVariables,
  type PlaygroundOptions,
} from './options';

const quote = (value: string) => `'${value.replace(/'/g, "\\'")}'`;

/** An import on one line, or one name per line when it would pass 80 columns. */
function namedImport(defaultName: string, names: string[], from: string) {
  const line = `import ${defaultName}, { ${names.join(', ')} } from '${from}';`;
  if (line.length <= 80) return line;
  return [
    `import ${defaultName}, {`,
    ...names.map((name) => `  ${name},`),
    `} from '${from}';`,
  ].join('\n');
}

/**
 * The component a reader would write for the chosen options. Options left at the
 * calendar's defaults add nothing, so the code shows only what matters.
 */
export function generateCode(
  options: PlaygroundOptions,
  colorDotDate: string,
): string {
  const language = LANGUAGES[options.language];
  const hours = HOURS[options.hours];
  const style = styleVariables(options);
  const hasStyle = Object.keys(style).length > 0;

  const props: string[] = ['data={events}', 'activeTimeDateField="start-end"'];
  if (options.viewSwitcher) {
    props.push('currentView={view}', 'onViewChange={setView}');
  } else if (options.view !== 'MONTH') {
    props.push(`currentView="${options.view}"`);
  }
  if (options.navigation)
    props.push('currentDate={date}', 'setCurrentDate={setDate}');
  if (options.theme !== DEFAULT_OPTIONS.theme)
    props.push(`theme="${options.theme}"`);
  if (options.language !== 'en') props.push(`locale={${language.importName}}`);
  if (options.weekStartsOn !== DEFAULT_OPTIONS.weekStartsOn) {
    props.push(`weekStartsOn={${options.weekStartsOn}}`);
  }
  if ('labels' in language) {
    const { today, allDay } = language.labels;
    props.push(
      [
        'labels={{',
        `  today: ${quote(today)},`,
        `  allDay: ${quote(allDay)},`,
        ...('moreSource' in language
          ? [`  more: ${language.moreSource},`]
          : []),
        '}}',
      ].join('\n'),
    );
  }
  if (options.clock === '24h')
    props.push("timeDateFormat={{ hour: 'HH:mm', time: 'HH:mm' }}");
  if (hours.startHour !== 0) props.push(`startHour={${hours.startHour}}`);
  if (hours.endHour !== 24) props.push(`endHour={${hours.endHour}}`);
  if (options.dayMaxItems !== DEFAULT_OPTIONS.dayMaxItems) {
    props.push(
      options.dayMaxItems === 'auto'
        ? 'dayMaxItems="auto"'
        : `dayMaxItems={${options.dayMaxItems}}`,
    );
  }
  if (options.colorDots) {
    props.push(
      [
        'colorDots={[',
        `  { color: '#d50000', text: 'Deadline', date: '${colorDotDate}' },`,
        ']}',
      ].join('\n'),
    );
  }
  if (!options.hoverEffect) props.push('disableHoverEffect');
  if (hasStyle) {
    const entries = Object.entries(style).map(
      ([name, value]) => `'${name}': '${value}'`,
    );
    props.push(
      [
        'style={',
        '  {',
        ...entries.map((e) => `    ${e},`),
        '  } as CSSProperties',
        '}',
      ].join('\n'),
    );
  }

  const needsState = options.viewSwitcher || options.navigation;
  const reactImport = needsState
    ? `import { useState${hasStyle ? ', type CSSProperties' : ''} } from 'react';`
    : hasStyle
      ? "import type { CSSProperties } from 'react';"
      : null;
  const calendarImports = [
    ...(options.viewSwitcher ? ['type CalendarView'] : []),
    'type CalendarItem',
  ];

  const lines = [
    ...(options.language !== 'en'
      ? [`import { ${language.importName} } from 'date-fns/locale';`]
      : []),
    ...(reactImport ? [reactImport] : []),
    namedImport('Calendar', calendarImports, 'react-lightweight-calendar'),
    '',
    'export default function MyCalendar({ events }: { events: CalendarItem[] }) {',
    ...(options.viewSwitcher
      ? [`  const [view, setView] = useState<CalendarView>('${options.view}');`]
      : []),
    ...(options.navigation
      ? ['  const [date, setDate] = useState<string | Date>(new Date());']
      : []),
    ...(needsState ? [''] : []),
    '  return (',
    '    // The calendar fills its parent, so give the parent a height.',
    '    <div style={{ height: 640 }}>',
    '      <Calendar',
    ...props.map((prop) =>
      prop
        .split('\n')
        .map((line) => `        ${line}`)
        .join('\n'),
    ),
    '      />',
    '    </div>',
    '  );',
    '}',
  ];
  return lines.join('\n');
}
