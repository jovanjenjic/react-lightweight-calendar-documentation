'use client';

import { useState, type ReactNode } from 'react';
import { LazyMount } from './LazyMount';

export interface ExampleFile {
  name: string;
  /** The file on GitHub. */
  url: string;
  lines: number;
  /** Highlighted on the server. */
  code: ReactNode;
}

/** Files longer than this start collapsed. */
const COLLAPSE_AFTER_LINES = 24;

/** A running example above its source files. */
export function ExampleFrame({
  files,
  height,
  fixedTheme,
  children,
}: {
  files: ExampleFile[];
  height: number;
  fixedTheme: boolean;
  children: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [run, setRun] = useState(0);
  const file = files[active];
  const collapsible = file.lines > COLLAPSE_AFTER_LINES;

  return (
    <figure className="ex" data-pagefind-ignore="all">
      <div className="ex-stage" data-fixed-theme={fixedTheme || undefined}>
        <LazyMount minHeight={height}>
          <div key={run}>{children}</div>
        </LazyMount>
      </div>

      <div className="ex-bar">
        <div className="ex-tabs" role="tablist" aria-label="Source files">
          {files.map((f, i) => (
            <button
              key={f.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              className="ex-tab"
              onClick={() => setActive(i)}
            >
              {f.name}
            </button>
          ))}
        </div>
        <div className="ex-actions">
          <button
            type="button"
            className="ex-action"
            onClick={() => setRun((n) => n + 1)}
            title="Start the example again with its initial data"
          >
            <ResetIcon /> Reset
          </button>
          <a
            className="ex-action"
            href={file.url}
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon /> Source
          </a>
        </div>
      </div>

      <div
        className="ex-code"
        role="tabpanel"
        data-collapsed={collapsible && !expanded ? '' : undefined}
      >
        {file.code}
      </div>
      {collapsible && (
        <button
          type="button"
          className="ex-expand"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? 'Show less' : `Show all ${file.lines} lines`}
        </button>
      )}
    </figure>
  );
}

function ResetIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z"
      />
    </svg>
  );
}
