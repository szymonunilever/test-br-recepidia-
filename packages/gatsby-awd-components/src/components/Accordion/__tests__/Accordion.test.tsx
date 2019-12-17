import { mount, ReactWrapper } from 'enzyme';
import React, { ReactNode } from 'react';
import toJson from 'enzyme-to-json';

import { KeyCode } from '../../constants';
import { Accordion, AccordionProps } from '../index';

describe('<Accordion />', () => {
  let wrapper: ReactWrapper;
  const children: ReactNode = React.createElement('div', null, 'Test');
  const props: AccordionProps = {
    title: {
      name: 'Name',
      label: 'Label',
    },
    isOpen: false,
    children: [],
    className: 'className',
    Icon: 'svg',
    IconOpened: 'svg',
  };

  beforeEach(() => {
    wrapper = mount(<Accordion {...props}>{children}</Accordion>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Has to toggle menu onClick', () => {
    expect(wrapper.find('.accordion').hasClass('is-opened')).toBe(false);
    wrapper.find('.accordion__title').simulate('click');
    expect(wrapper.find('.accordion').hasClass('is-opened')).toBe(true);
  });

  it('Has to toggle menu onKeyUp with enter/space key', () => {
    const event = {
      key: 'Enter',
      keyCode: KeyCode.Enter,
      which: KeyCode.Enter,
    };

    expect(wrapper.find('.accordion').hasClass('is-opened')).toBe(false);
    wrapper.find('.accordion__title').simulate('keyUp', event);
    expect(wrapper.find('.accordion').hasClass('is-opened')).toBe(true);
  });

  it('Has no to toggle menu onKeyUp with no enter/space key', () => {
    const event = {
      preventDefault: () => {},
      key: 'Tab',
      keyCode: KeyCode.Tab,
      which: KeyCode.Tab,
    };

    expect(wrapper.find('.accordion').hasClass('is-opened')).toBe(false);
    wrapper.find('.accordion__title').simulate('keyUp', event);
    expect(wrapper.find('.accordion').hasClass('is-opened')).toBe(false);
  });
});
