import { storiesOf } from '@storybook/react';
import React from 'react';
import { RichText } from '../index';

const content: AppContent.RichTextContent = {
  text: `
    <h1>Header 1</h1>
    <h2>Header 2</h2>
    <p>
    Paragraph
    <a href="http://test.html">Test link</a>
    </p>
    `,
};
const content2: AppContent.RichTextContent = {
  text: `
  # H1 Text from markdown
  ## H2 Text from markdown
  ### H3 Text from markdown
  #### H4 Text from markdown
  ##### H5 Text from markdown
  ###### H6 Text from markdown
  ** Bold Text **
  
  Text
  
  
  1. List item
  2. List item
  3. List item 
 - List item
 - List item`,
};

storiesOf('Generic/RichText', module)
  .add('with text', () => <RichText content={content} />, {
    info: { inline: false },
  })
  .add(
    'with text from Markdown string',
    () => <RichText content={content2} type="md" />,
    {
      info: { inline: false },
    }
  )
  .add(
    'with text and class',
    () => <RichText content={content} className="rich-text" />,
    {
      info: { inline: false },
    }
  );
