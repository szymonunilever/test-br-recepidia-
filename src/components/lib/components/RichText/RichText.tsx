import React from 'react';
import ReactMarkdown from 'react-markdown';
import { RichTextProps } from './models';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';

export const RichText = ({
  content,
  content: { text },
  type = 'html',
  className,
}: RichTextProps) => {
  return type === 'html' ? (
    <div
      {...getComponentDataAttrs('richText', content)}
      className={className}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  ) : (
    <ReactMarkdown
      {...getComponentDataAttrs('richText', content)}
      className={className}
    >
      {text}
    </ReactMarkdown>
  );
};

export default RichText;
