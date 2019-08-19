import { storiesOf } from '@storybook/react';
import React from 'react';
import Button from 'src/components/lib/components/Button';
import { ReactComponent as Facebook } from 'src/svgs/inline/facebook.svg';

const onClick = () => alert('on click button action');

storiesOf('Components/Button', module)
  .add('Button with text label', () => (
    <Button {...{ onClick }}>Click me</Button>
  ))
  .add('Button with text label disabled', () => (
    <Button {...{ onClick }} isDisabled={true}>
      Click me
    </Button>
  ))
  .add('Button with icon', () => <Button {...{ onClick }} Icon={Facebook} />)
  .add('Button with icon and text', () => (
    <Button Icon={Facebook} {...{ onClick }}>
      Click me
    </Button>
  ));
