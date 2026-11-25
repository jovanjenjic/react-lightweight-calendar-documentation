import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { MetadataRoute } from 'next';

const SITE_URL = 'https://calendar-react.com';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = readdirSync(join(process.cwd(), 'content'))
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));

  return pages.map((page) => ({
    url: page === 'index' ? `${SITE_URL}/` : `${SITE_URL}/${page}`,
    lastModified: new Date(),
    priority: page === 'index' ? 1 : 0.8,
  }));
}
