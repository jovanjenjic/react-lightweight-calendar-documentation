import { Fragment, type CSSProperties } from 'react';
import { codeToTokens, type BundledLanguage } from 'shiki';
import { useMDXComponents as getMDXComponents } from '../../mdx-components';

// The same code block, copy button and colors as the code in the pages.
const { pre: Pre, code: Code } = getMDXComponents();

/** Code highlighted on the server, with the themes Nextra uses for code blocks. */
export async function CodeBlock({
  code,
  language,
}: {
  code: string;
  language: BundledLanguage;
}) {
  const { tokens } = await codeToTokens(code, {
    lang: language,
    themes: { light: 'github-light', dark: 'github-dark' },
    // Colors as --shiki-light / --shiki-dark, which the site's CSS switches.
    defaultColor: false,
  });

  if (!Pre || !Code) throw new Error('The MDX components have no pre or code.');
  return (
    <Pre data-language={language} data-copy="">
      <Code>
        {tokens.map((line, i) => (
          <Fragment key={i}>
            {/* The lines are grid rows: an empty one needs a space. */}
            <span>
              {line.length
                ? line.map((token, j) => (
                    <span key={j} style={token.htmlStyle as CSSProperties}>
                      {token.content}
                    </span>
                  ))
                : ' '}
            </span>
            {'\n'}
          </Fragment>
        ))}
      </Code>
    </Pre>
  );
}
