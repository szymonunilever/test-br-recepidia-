import { storiesOf } from '@storybook/react';
import React from 'react';
import RichText from '../src/components/lib/RichText/RichText';

storiesOf('RichText', module)
  .add('with html', () => <RichText html="<h1>test</h1>" />, {
    info: { inline: false },
  })
  .add(
    'with html and class',
    () => <RichText html="<h1>test</h1>" className="rich-text" />,
    {
      info: { inline: false },
    }
  );
