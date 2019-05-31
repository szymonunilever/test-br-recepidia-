import { storiesOf } from '@storybook/react';
import React from 'react';
import { RichText } from '../src/components/lib/RichText';

const contentHtm = `
<h1>Header 1</h1>
<h2>Header 2</h2>
<p>
Paragraph
<a href="http://test.html">Test link</a>
</p>
`;
storiesOf('Components/RichText', module)
  .add('with html', () => <RichText html={contentHtm} />, {
    info: { inline: false },
  })
  .add(
    'with html and class',
    () => <RichText html={contentHtm} className="rich-text" />,
    {
      info: { inline: false },
    }
  );
