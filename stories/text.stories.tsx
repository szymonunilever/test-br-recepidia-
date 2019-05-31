import { storiesOf } from '@storybook/react';
import React from 'react';
import { Text, TagName } from '../src/components/lib/Text';

const headingTag = 'h1';
const headingClassName = 'heading';
const headingText = 'This is a heading <h1> with class';
const paragraphTag = 'p';
const paragraphText = 'This is a paragraph <p>';
storiesOf('Components/Text', module)
  .add(
    'heading with class',
    () => (
      <Text
        className={headingClassName}
        tag={TagName[headingTag]}
        text={headingText}
      />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'paragraph without class',
    () => <Text tag={TagName[paragraphTag]} text={paragraphText} />,
    {
      info: { inline: false },
    }
  );
