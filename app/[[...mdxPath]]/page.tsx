import type { Metadata } from 'next';
import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { useMDXComponents as getMDXComponents } from '../../mdx-components';

export const generateStaticParams = generateStaticParamsFor('mdxPath');

type PageProps = Readonly<{
  params: Promise<{ mdxPath?: string[] }>;
}>;

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  const url = `/${params.mdxPath?.join('/') ?? ''}`;
  const description = metadata.description ?? undefined;
  return {
    ...metadata,
    alternates: { canonical: url },
    // Page-level Open Graph replaces the root one, so repeat the shared fields.
    openGraph: {
      type: 'website',
      siteName: 'React Lightweight Calendar',
      url,
      description,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'React Lightweight Calendar' }],
    },
    twitter: { card: 'summary_large_image', description },
  };
}

const Wrapper = getMDXComponents().wrapper!;

export default async function Page(props: PageProps) {
  const params = await props.params;
  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode,
  } = await importPage(params.mdxPath);
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
