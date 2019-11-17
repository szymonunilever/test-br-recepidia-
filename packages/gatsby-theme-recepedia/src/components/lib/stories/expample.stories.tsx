import { storiesOf } from '@storybook/react';
import React from 'react';
import { Example } from '../index';

storiesOf('Example', module)
  .add('with text', () => <Example text="Hello Example" />, {
    info: { inline: true },
  })
  .add(
    'with text and class',
    () => <Example text="Example with class" className="exampleClass" />,
    {
      info: { inline: true },
    }
  );
