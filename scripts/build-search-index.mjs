/**
 * Builds the Pagefind search index from the pages prerendered by `next build`.
 *
 * Next.js writes prerendered App Router pages to one of two places:
 *   - .next/server/app/<route>.html                                  (default)
 *   - .next/server/route-cache/APP_PAGE/<hash>/$/<route>.html        (with a deployment
 *     adapter, which Vercel sets through NEXT_ADAPTER_PATH)
 * The Pagefind CLI derives URLs from file paths, which breaks for the second layout,
 * so this script reads both and passes each page's URL explicitly.
 */
import { readdir, readFile, rm } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import * as pagefind from 'pagefind';

const SERVER_DIR = join('.next', 'server');
const OUTPUT_PATH = join('public', '_pagefind');

async function* htmlFiles(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return; // a layout that this build did not produce
  }
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

/** Maps a prerendered file to the URL it is served at, or null if it is not a page. */
function toUrl(file) {
  const rel = relative(SERVER_DIR, file).split(sep).join('/');
  const match = rel.match(/^app\/(.+)\.html$/) ?? rel.match(/^route-cache\/APP_PAGE\/[^/]+\/\$\/(.+)\.html$/);
  if (!match) return null;
  const route = match[1];
  // Internal routes such as _not-found and _global-error
  if (route.split('/').some((segment) => segment.startsWith('_'))) return null;
  if (route === 'index') return '/';
  return `/${route.replace(/\/index$/, '')}`;
}

async function main() {
  const pages = new Map();
  for await (const file of htmlFiles(SERVER_DIR)) {
    const url = toUrl(file);
    if (url && !pages.has(url)) pages.set(url, file);
  }
  if (pages.size === 0) {
    throw new Error(
      `No prerendered pages found under ${SERVER_DIR}. Run "next build" first, or check ` +
        'whether Next.js changed where it writes prerendered HTML.',
    );
  }

  await rm(OUTPUT_PATH, { recursive: true, force: true });
  const { index, errors } = await pagefind.createIndex();
  if (!index) throw new Error(`Pagefind could not start: ${errors.join(', ')}`);

  for (const [url, file] of [...pages].sort(([a], [b]) => a.localeCompare(b))) {
    const response = await index.addHTMLFile({ url, content: await readFile(file, 'utf8') });
    if (response.errors.length) throw new Error(`${url}: ${response.errors.join(', ')}`);
  }

  const written = await index.writeFiles({ outputPath: OUTPUT_PATH });
  if (written.errors.length) throw new Error(written.errors.join(', '));
  await pagefind.close();

  console.log(`Search index: ${pages.size} pages written to ${OUTPUT_PATH}`);
}

main().catch(async (error) => {
  console.error(`Search index failed: ${error.message}`);
  await pagefind.close().catch(() => {});
  process.exit(1);
});
