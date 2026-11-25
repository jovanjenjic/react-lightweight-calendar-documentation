import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { Banner, Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import type { ReactNode } from 'react';
import 'nextra-theme-docs/style.css';
import './globals.css';
import './examples.css';

const SITE_URL = 'https://calendar-react.com';
const DESCRIPTION =
  'A lightweight, customizable React calendar component with month, week, day and timeline views. ' +
  'Show events, bookings, reservations or any entity with ISO 8601 dates. TypeScript, React 18 and 19.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'React Lightweight Calendar',
    template: '%s – React Lightweight Calendar',
  },
  description: DESCRIPTION,
  applicationName: 'React Lightweight Calendar',
  keywords: [
    'react calendar',
    'react calendar component',
    'react event calendar',
    'react scheduler',
    'react week view',
    'react timeline calendar',
    'typescript calendar',
    'react-lightweight-calendar',
  ],
  openGraph: {
    type: 'website',
    siteName: 'React Lightweight Calendar',
    url: SITE_URL,
    description: DESCRIPTION,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'React Lightweight Calendar' }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/favicon.png', apple: '/favicon.png' },
  manifest: '/manifest.webmanifest',
};

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

const banner = (
  <Banner storageKey="rlc-v3-release">
    Version 3.0 is out: a Google Calendar style layout, themes and render props for
    every part.{' '}
    <a href="/examples" style={{ textDecoration: 'underline' }}>
      Try it in the playground →
    </a>
  </Banner>
);

const navbar = (
  <Navbar
    logo={<strong>React Lightweight Calendar</strong>}
    projectLink="https://github.com/jovanjenjic/react-lightweight-calendar"
  />
);

const footer = (
  <Footer>
    MIT {new Date().getFullYear()} ©{' '}
    <a href="https://github.com/jovanjenjic" target="_blank" rel="noreferrer">
      Jovan Jenjić
    </a>
    . React Lightweight Calendar.
  </Footer>
);

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          footer={footer}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/jovanjenjic/react-lightweight-calendar-documentation/tree/master"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
        >
          {children}
        </Layout>
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
