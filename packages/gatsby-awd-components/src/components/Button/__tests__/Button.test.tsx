import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
/** Attention: now "src" is webpack alias for the folder "src/components/lib/stories" for storybook app.
 * It was done for compatibility with site app.
 * So for storybook "src" - it's  "src/components/lib/stories" and for gatsby site src it's "src" folder*/
import Icon from 'src/svgs/inline/plus.svg';
import { Button, ButtonViewType } from '../index';

describe('Button', () => {
  let testClick: boolean | null = null;
  const callbackFunction = (val: boolean) => {
    testClick = val;
  };
  const buttonClassic: ReactWrapper = mount(
    <Button
      className="button-test"
      onClick={callbackFunction}
      content={{ label: 'Test' }}
    />
  );

  const buttonIcon: ReactWrapper = mount(
    <Button
      viewType={ButtonViewType.icon}
      Icon={Icon}
      isToggle
      onClick={callbackFunction}
    />
  );
  const buttonIconPreSelected: ReactWrapper = mount(
    <Button viewType={ButtonViewType.icon} Icon={Icon} isSelected isToggle />
  );

  it('Render classic button with className', () => {
    expect(
      buttonClassic.find('button[data-componentname="button"]')
    ).toBeTruthy();
    expect(buttonClassic.contains('Test')).toEqual(true);
    expect(buttonClassic.hasClass('button-test')).toBeTruthy();
  });

  it('Check callback of classic button should return false', () => {
    buttonClassic.simulate('click');
    expect(testClick).toEqual(false);
  });

  it('Render Icon button', () => {
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

    expect(buttonIconPreSelected.find('.button__selected')).toHaveLength(1);
  });

  it('Toggle Button with "tab" role should have "aria-selected" attribute with proper value', () => {
    const toggleTabButton: ReactWrapper = mount(<Button role="tab" isToggle />);

    expect(toggleTabButton.prop('role')).toEqual('tab');
    expect(toggleTabButton.prop('isToggle')).toEqual(true);
    expect(toggleTabButton.find('button[aria-selected]')).toHaveLength(1);
    expect(
      toggleTabButton.find('button[aria-selected]').prop('aria-selected')
    ).toEqual(false);

    toggleTabButton.simulate('click');

    expect(
      toggleTabButton.find('button[aria-selected]').prop('aria-selected')
    ).toEqual(true);
  });

  it('Buton with "tab" role should not have "aria-selected" attribute', () => {
    const tabButton = mount(<Button role="tab" />);

    expect(tabButton.prop('role')).toEqual('tab');
    expect(tabButton.find('button[componentname="button"]')).toBeTruthy();
    expect(tabButton.find('button[aria-selected]')).toHaveLength(0);
  });

  it('Toggle Button classic should have "aria-pressed" attribute with proper value', () => {
    const toggleButton: ReactWrapper = mount(<Button isToggle />);

    expect(toggleButton.prop('isToggle')).toEqual(true);
    expect(toggleButton.find('button[aria-pressed]')).toBeTruthy();
    expect(
      toggleButton.find('button[aria-pressed]').prop('aria-pressed')
    ).toEqual(false);

    toggleButton.simulate('click');

    expect(
      toggleButton.find('button[aria-pressed]').prop('aria-pressed')
    ).toEqual(true);
  });

  it('Disabled button should have "button__disabled" class', () => {
    const disabledButton: ReactWrapper = mount(<Button isDisabled />);

    expect(disabledButton.prop('isDisabled')).toEqual(true);
    expect(disabledButton.find('.button__disabled')).toHaveLength(1);
  });
});
