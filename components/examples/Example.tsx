import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { CodeBlock } from './CodeBlock';
import { ExampleFrame, type ExampleFile } from './ExampleFrame';
import { EXAMPLES, type ExampleName } from './sources';

const SOURCE_DIR = path.join(process.cwd(), 'components/examples/sources');
const SOURCE_URL =
  'https://github.com/jovanjenjic/react-lightweight-calendar-documentation/blob/master/components/examples/sources';

/**
 * A live example with its source code. The code is read from the same file that
 * runs in the preview, at build time, and highlighted like every other code block.
 */
export async function Example({
  name,
  height = 600,
  fixedTheme = false,
}: {
  name: ExampleName;
  /** Height the preview reserves before the example is loaded, in px. */
  height?: number;
  /** The example picks its own theme: do not follow the site's dark mode. */
  fixedTheme?: boolean;
}) {
  const Component = EXAMPLES[name];
  const main = await readSource(`${name}.tsx`);
  const fileNames = [
    `${name}.tsx`,
    ...(main.includes("from './data'") ? ['data.ts'] : []),
  ];

  const files: ExampleFile[] = await Promise.all(
    fileNames.map(async (fileName) => {
      const code =
        fileName === `${name}.tsx` ? main : await readSource(fileName);
      return {
        name: fileName,
        url: `${SOURCE_URL}/${fileName}`,
        lines: code.split('\n').length,
        code: (
          <CodeBlock
            code={code}
            language={fileName.endsWith('.ts') ? 'ts' : 'tsx'}
          />
        ),
      };
    }),
  );

  return (
    <ExampleFrame files={files} height={height} fixedTheme={fixedTheme}>
      <Component />
    </ExampleFrame>
  );
}

async function readSource(fileName: string): Promise<string> {
  const source = await readFile(path.join(SOURCE_DIR, fileName), 'utf8');
  // The directive is for this Next.js site; leave it out of the code people copy.
  return source.replace(/^'use client';\n+/, '').trimEnd();
}
