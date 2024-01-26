/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */

import { Highlight, themes } from 'prism-react-renderer';

import { TCodeBlock } from '@/types';

export default function CodeBlock({
  code,
  filename,
  highlightedLines,
  language,
}: TCodeBlock) {
  return code ? (
    <Highlight
      theme={themes.shadesOfPurple}
      code={code}
      language={language || 'tsx'}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style}>
          <p className="opacity-70">{filename}</p>
          {tokens.map((line, i) => (
            <div
              key={i}
              {...getLineProps({ line })}
              className={
                highlightedLines?.includes(i + 1)
                  ? 'bg-background/50'
                  : undefined
              }
            >
              <span className="inline-block w-8 select-none">{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  ) : null;
}
