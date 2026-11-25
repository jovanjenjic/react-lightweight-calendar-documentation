# React Lightweight Calendar – Documentation

Source of [calendar-react.com](https://calendar-react.com), the documentation for
[react-lightweight-calendar](https://www.npmjs.com/package/react-lightweight-calendar).

Built with [Next.js](https://nextjs.org) and [Nextra](https://nextra.site). Every page
has live demos that use the published package.

## Development

Requires Node 20.9 or newer.

```bash
npm install
npm run dev
```

Then open [http://localhost:3003](http://localhost:3003).

## Scripts

| Script              | What it does                                                    |
| ------------------- | --------------------------------------------------------------- |
| `npm run dev`       | Starts the dev server on port 3003.                             |
| `npm run build`     | Builds the static site and the search index (Pagefind).         |
| `npm start`         | Serves the production build on port 3003.                       |
| `npm run typecheck` | Type-checks the project.                                        |

## Structure

| Path               | Contents                                                        |
| ------------------ | --------------------------------------------------------------- |
| `content/`         | The pages, as MDX. `_meta.js` sets the order and the navigation. |
| `components/demos/`| The live calendar demos used in the pages.                      |
| `app/`             | Next.js App Router: layout, catch-all page, sitemap, robots.    |
| `public/`          | Static files: favicon, Open Graph image, manifest.              |

## Environment

| Variable                       | Purpose                                         |
| ------------------------------ | ----------------------------------------------- |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics ID. Analytics is off if unset. |

## Notes

`zod` is pinned to 4.1.x through `overrides` in `package.json`. Nextra 4.6.1 fails to
build with zod 4.6, which rejects a layout prop it leaves out. Remove the override once
a newer Nextra release supports it.

`npm audit` reports advisories in `zod`, `katex`, `mermaid` and `minimatch`. All of
them come from Nextra and run only at build time on this repository's own content;
the deployed site is static HTML. They clear once Nextra updates its dependencies.

`app/globals.css` undoes a global `* { margin: 0; padding: 0 }` reset that
react-lightweight-calendar 2.0.0 ships in its stylesheet. Remove that rule once the
package scopes the reset to the calendar.
