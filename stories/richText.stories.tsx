import { storiesOf } from '@storybook/react';
import React from 'react';
import { RichText } from '../src/components/lib/components/RichText';

const content: AppContent.RichTextContent = {
  html: `
    <h1>Header 1</h1>
    <h2>Header 2</h2>
    <p>
    Paragraph
    <a href="http://test.html">Test link</a>
    </p>
    `,
};

storiesOf('Components/RichText', module)
  .add('with html', () => <RichText content={content} />, {
    info: { inline: false },
  })
  .add(
    'with html and class',
    () => <RichText content={content} className="rich-text" />,
    {
      info: { inline: false },
    }
  );
