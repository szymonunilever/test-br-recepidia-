/* global describe, it, expect */
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
// @ts-ignore
import Icon from 'src/svgs/inline/plus.svg';
import { Button, ButtonViewType } from '../Button';

describe('Button', () => {
  let testClick: boolean | null = null;
  const callbackFunction = (val: boolean) => {
    testClick = val;
  };
  const buttonClassic: ReactWrapper = mount(
    <Button className="button-test" onClick={callbackFunction}>
      Test
    </Button>
  );

  const buttonIcon: ReactWrapper = mount(
    <Button
      viewType={ButtonViewType.icon}
      icon={<Icon />}
      isToggle
      onClick={callbackFunction}
    />
  );
  const buttonIconPreSelected: ReactWrapper = mount(
    <Button
      viewType={ButtonViewType.icon}
      icon={<Icon />}
      isSelected
      isToggle
    />
  );

  it('Render classic button with className', () => {
    expect(
      buttonClassic.find('button[data-componentname="button"]')
    ).toBeTruthy();
    expect(buttonClassic.contains('Test')).toEqual(true);
    expect(buttonClassic.hasClass('button-test'));
  });

  it('Check callback of classic button should return false', () => {
    buttonClassic.simulate('click');
    expect(testClick).toEqual(false);
  });

  it('Render icon button', () => {
    expect(buttonIcon.find('button[componentname="button"]')).toBeTruthy();
    expect(buttonIcon.find('svg')).toBeTruthy();
  });

  it('Check toggle button callback should return', () => {
    testClick = false;
    buttonIcon.simulate('click');
    expect(testClick).toEqual(true);
    buttonIcon.simulate('click');
    expect(testClick).toEqual(false);
  });

  it('Toggle button with isSelected attribute should have "button__selected class"', () => {
    expect(
      buttonIconPreSelected.find('button[componentname="button"]')
    ).toBeTruthy();

    expect(buttonIconPreSelected.find('.button__selected').length).toEqual(1);
  });
});
