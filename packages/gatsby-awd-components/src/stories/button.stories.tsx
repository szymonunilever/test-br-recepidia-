import { storiesOf } from '@storybook/react';
import React from 'react';
import { Button, ButtonViewType } from '../index';
import { ReactComponent as Facebook } from '../svgs/inline/facebook.svg';
import { ReactComponent as Facebook2 } from '../svgs/inline/facebook2.svg';

const onClick = () => alert('on click button action');

storiesOf('Generic/Button', module)
  .add('with text label', () => (
    <>
      <Button {...{ onClick }} className="button--small">
        small
      </Button>
      <Button {...{ onClick }} className="button--medium">
        medium
      </Button>
      <Button {...{ onClick }} className="button--large">
        large
      </Button>
    </>
  ))
  .add('with text label disabled', () => (
    <Button {...{ onClick }} className="custom-class" isDisabled>
      Click me
    </Button>
  ))
  .add('with icon viewType', () => (
    <div style={{ fontSize: '3rem' }}>
      <Button
        {...{ onClick }}
        Icon={Facebook}
        className="custom-class"
        viewType={ButtonViewType.icon}
      />
    </div>
  ))
  .add('with different icons for toggled states', () => (
    <div style={{ fontSize: '3rem' }}>
      <Button
        Icon={Facebook}
        IconSelected={Facebook2}
        className="custom-class"
        isToggle
        viewType={ButtonViewType.icon}
      />
    </div>
  ))
  .add('with icon and text', () => (
    <Button Icon={Facebook} {...{ onClick }} className="custom-class">
      Click me
    </Button>
  ));
