'use client';

import { addDays } from 'date-fns';
import { useTheme } from 'nextra-theme-docs';
import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import Calendar, {
  toDateKey,
  type CalendarView,
} from 'react-lightweight-calendar';
import { LazyMount } from '../LazyMount';
import { COLORS, createEvents } from '../sources/data';
import { generateCode } from './generateCode';
import { highlightTsx } from './highlight';
import {
  ACCENTS,
  DEFAULT_OPTIONS,
  HOURS,
  LANGUAGES,
  VIEW_OPTIONS,
  styleVariables,
  type AccentKey,
  type HoursKey,
  type LanguageKey,
  type PlaygroundOptions,
} from './options';

/** Try the options of the calendar and copy the code they need. */
export function Playground() {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const set =
    <K extends keyof PlaygroundOptions>(key: K) =>
    (value: PlaygroundOptions[K]) =>
      setOptions((current) => ({ ...current, [key]: value }));

  // Start in the site's color scheme, until a theme is picked.
  const { resolvedTheme } = useTheme();
  const [themePicked, setThemePicked] = useState(false);
  useEffect(() => {
    if (
      !themePicked &&
      (resolvedTheme === 'dark' || resolvedTheme === 'light')
    ) {
      setOptions((current) => ({ ...current, theme: resolvedTheme }));
    }
  }, [resolvedTheme, themePicked]);

  const [events] = useState(createEvents);
  const [date, setDate] = useState<string | Date>(() => new Date());

  const colorDotDate = useMemo(() => toDateKey(addDays(new Date(), 2)), []);
  const language = LANGUAGES[options.language];
  const hours = HOURS[options.hours];
  const code = generateCode(options, colorDotDate);

  return (
    <figure className="ex pg" data-pagefind-ignore="all">
      <div className="pg-controls">
        <Field label="View">
          <select
            value={options.view}
            onChange={(e) => set('view')(e.target.value as CalendarView)}
          >
            {VIEW_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Theme" group>
          <Segmented
            value={options.theme}
            options={['light', 'dark', 'auto'] as const}
            onChange={(theme) => {
              setThemePicked(true);
              set('theme')(theme);
            }}
          />
        </Field>
        <Field label="Language">
          <select
            value={options.language}
            onChange={(e) => set('language')(e.target.value as LanguageKey)}
          >
            {Object.entries(LANGUAGES).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Week starts on">
          <select
            value={options.weekStartsOn}
            onChange={(e) =>
              set('weekStartsOn')(Number(e.target.value) as 0 | 1 | 6)
            }
          >
            <option value={1}>Monday</option>
            <option value={0}>Sunday</option>
            <option value={6}>Saturday</option>
          </select>
        </Field>
        <Field label="Hours">
          <select
            value={options.hours}
            onChange={(e) => set('hours')(e.target.value as HoursKey)}
          >
            {Object.entries(HOURS).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Clock" group>
          <Segmented
            value={options.clock}
            options={['12h', '24h'] as const}
            onChange={set('clock')}
          />
        </Field>
        <Field label="Items per day (month)">
          <select
            value={options.dayMaxItems}
            onChange={(e) => {
              const value = e.target.value;
              set('dayMaxItems')(value === 'auto' ? 'auto' : Number(value));
            }}
          >
            {[2, 3, 4, 'auto'].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Density" group>
          <Segmented
            value={options.density}
            options={['regular', 'compact'] as const}
            onChange={set('density')}
          />
        </Field>
        <Field label="Accent" group>
          <div className="pg-swatches">
            {(Object.keys(ACCENTS) as AccentKey[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={options.accent === key}
                aria-label={ACCENTS[key].label}
                title={ACCENTS[key].label}
                className="pg-swatch"
                style={{ background: ACCENTS[key].color }}
                onClick={() => set('accent')(key)}
              />
            ))}
          </div>
        </Field>
        <fieldset className="pg-toggles">
          <legend className="pg-label">Show</legend>
          <Toggle
            label="Navigation"
            checked={options.navigation}
            onChange={set('navigation')}
          />
          <Toggle
            label="View switcher"
            checked={options.viewSwitcher}
            onChange={set('viewSwitcher')}
          />
          <Toggle
            label="Color dot"
            checked={options.colorDots}
            onChange={set('colorDots')}
          />
          <Toggle
            label="Hover effect"
            checked={options.hoverEffect}
            onChange={set('hoverEffect')}
          />
        </fieldset>
        <button
          type="button"
          className="pg-reset"
          onClick={() => {
            setThemePicked(false);
            setOptions({
              ...DEFAULT_OPTIONS,
              theme: resolvedTheme === 'dark' ? 'dark' : 'light',
            });
          }}
        >
          Reset
        </button>
      </div>

      <div className="ex-stage" data-fixed-theme="">
        <LazyMount minHeight={640}>
          <div style={{ height: 640 }}>
            <Calendar
              data={events}
              activeTimeDateField="start-end"
              currentView={options.view}
              onViewChange={options.viewSwitcher ? set('view') : undefined}
              currentDate={date}
              setCurrentDate={options.navigation ? setDate : undefined}
              theme={options.theme}
              locale={language.locale}
              weekStartsOn={options.weekStartsOn}
              labels={'labels' in language ? language.labels : undefined}
              timeDateFormat={
                options.clock === '24h'
                  ? { hour: 'HH:mm', time: 'HH:mm' }
                  : undefined
              }
              startHour={hours.startHour}
              endHour={hours.endHour}
              dayMaxItems={options.dayMaxItems}
              colorDots={
                options.colorDots
                  ? [
                      {
                        color: COLORS.red,
                        text: 'Deadline',
                        date: colorDotDate,
                      },
                    ]
                  : undefined
              }
              disableHoverEffect={!options.hoverEffect}
              style={styleVariables(options) as CSSProperties}
            />
          </div>
        </LazyMount>
      </div>

      <div className="ex-bar">
        <div className="ex-tabs">
          <span className="ex-tab" aria-selected="true">
            MyCalendar.tsx
          </span>
        </div>
        <div className="ex-actions">
          <span className="pg-hint">Updates as you change the options</span>
          <CopyButton text={code} />
        </div>
      </div>
      {/* Nextra's code classes give the same colors as the other code blocks.
          Its <Pre> is not imported: the package barrel resolves it to undefined
          in client components. */}
      <div className="ex-code">
        <pre className="pg-pre" tabIndex={0}>
          <code className="nextra-code" dir="ltr">
            {highlightTsx(code)}
          </code>
        </pre>
      </div>
    </figure>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timeout);
  }, [copied]);
  return (
    <button
      type="button"
      className="ex-action"
      onClick={() =>
        navigator.clipboard?.writeText(text).then(() => setCopied(true))
      }
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

/** A labelled control; `group` for a set of buttons, which a <label> cannot name. */
function Field({
  label,
  group = false,
  children,
}: {
  label: string;
  group?: boolean;
  children: ReactNode;
}) {
  const content = (
    <>
      <span className="pg-label">{label}</span>
      {children}
    </>
  );
  return group ? (
    <div className="pg-field" role="group" aria-label={label}>
      {content}
    </div>
  ) : (
    <label className="pg-field">{content}</label>
  );
}

function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
  return (
    <span className="pg-segmented">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={option === value}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </span>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="pg-toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}
