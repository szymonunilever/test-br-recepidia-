import React from 'react';
import ReactMarkdown from 'react-markdown';
import { RichTextProps } from './models';

export const RichText = ({
  content: { text },
  type = 'html',
  className,
}: RichTextProps) => {
  return type === 'html' ? (
    <div
      data-componentname="richText"
      className={className}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  ) : (
    <ReactMarkdown data-componentname="richText" className={className}>
      {text}
    </ReactMarkdown>
  );
};

export default RichText;
