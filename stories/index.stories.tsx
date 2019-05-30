import React from 'react';
import { storiesOf } from '@storybook/react';
import Example from '../src/components/lib/Example/Example';

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
