import { mount } from 'enzyme';
import React from 'react';
import { GlobalNavigation, GlobalNavigationProps } from '../index';
import toJson from 'enzyme-to-json';
import list from 'src/mocks/globalNavigationMenu.json';
import { KeyCode } from '../../constants';

const generateEvent = (e: any) => ({
  preventDefault: () => {},
  key: e,
  keyCode: KeyCode[e],
  which: KeyCode[e],
});

describe('<GlobalNavigation />', () => {
  let wrapper: any;
  const props: GlobalNavigationProps = {
    logo: {
      icon: <div>Icon</div>,
      path: '/',
    },
    dropDownIcon: <div>Arrow</div>,
    buttonCloseIcon: <div>Close</div>,
    content: {
      list,
    },
  };

  beforeEach(() => {
    wrapper = mount(<GlobalNavigation {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('has open menu on click', () => {
    expect(wrapper.find('.globalNavigation').hasClass('open')).toBe(false);
    wrapper
      .find('.burger-button')
      .first()
      .simulate('click');
    expect(wrapper.find('.globalNavigation').hasClass('open')).toBe(true);
  });

  it('has open menu on Enter and close menu on Escape', () => {
    wrapper
      .find('.burger-button')
      .first()
      .simulate('keyDown', generateEvent('Enter'));
    expect(wrapper.find('.globalNavigation').hasClass('open')).toBe(true);
    wrapper
      .find('.burger-button')
      .first()
      .simulate('keyDown', generateEvent('Escape'));
    expect(wrapper.find('.globalNavigation').hasClass('open')).toBe(false);
  });

  it('has open menu on Space', () => {
    expect(wrapper.find('.globalNavigation').hasClass('open')).toBe(false);
    wrapper
      .find('.burger-button')
      .first()
      .simulate('keyDown', generateEvent('Space'));
    expect(wrapper.find('.globalNavigation').hasClass('open')).toBe(true);
  });

  it('has no open menu on Tab', () => {
    expect(wrapper.find('.globalNavigation').hasClass('open')).toBe(false);
    wrapper
      .find('.burger-button')
      .first()
      .simulate('keyDown', generateEvent('Tab'));
    expect(wrapper.find('.globalNavigation').hasClass('open')).toBe(false);
  });

  it('has close on CLOSE MENU button click', () => {
    expect(wrapper.find('.globalNavigation').hasClass('open')).toBe(false);
    wrapper
      .find('.burger-button')
      .first()
      .simulate('click');
    expect(wrapper.find('.globalNavigation').hasClass('open')).toBe(true);
    wrapper
      .find('nav')
      .find('button')
      .simulate('click');
    expect(wrapper.find('.globalNavigation').hasClass('open')).toBe(false);
  });

  it('has close on CLOSE MENU button Enter', () => {
    expect(wrapper.find('.globalNavigation').hasClass('open')).toBe(false);
    wrapper
      .find('.burger-button')
      .first()
      .simulate('click');
    expect(wrapper.find('.globalNavigation').hasClass('open')).toBe(true);
    wrapper
      .find('nav')
      .find('button')
      .simulate('keyDown', generateEvent('Space'));
    expect(wrapper.find('.globalNavigation').hasClass('open')).toBe(false);
  });

  it('has close on CLOSE MENU button Space', () => {
    expect(wrapper.find('.globalNavigation').hasClass('open')).toBe(false);
    wrapper
      .find('.burger-button')
      .first()
      .simulate('click');
    expect(wrapper.find('.globalNavigation').hasClass('open')).toBe(true);
    wrapper
      .find('nav')
      .find('button')
      .simulate('keyDown', generateEvent('Enter'));
    expect(wrapper.find('.globalNavigation').hasClass('open')).toBe(false);
  });

  it('has open menu level 1 on click', () => {
    expect(
      wrapper
        .find('.has-submenu')
        .first()
        .hasClass('active')
    ).toBe(false);
    expect(
      wrapper
        .find('.has-submenu')
        .first()
        .find('ul.submenu')
        .hasClass('is-opened')
    ).toBe(false);
    wrapper
      .find('.has-submenu')
      .first()
      .find('a')
      .first()
      .simulate('click');
    expect(
      wrapper
        .find('.has-submenu')
        .first()
        .hasClass('active')
    ).toBe(true);
    expect(
      wrapper
        .find('.has-submenu')
        .first()
        .find('ul.submenu')
        .hasClass('is-opened')
    ).toBe(true);
  });

  describe('Menu Tests', () => {
    beforeEach(() => {
      wrapper = mount(<GlobalNavigation {...props} />, {
        attachTo: document.body,
      });
    });

    afterEach(() => {
      wrapper.unmount();
      jest.clearAllMocks();
    });

    it('should close menu on Escape', () => {
      wrapper
        .find('.burger-button')
        .first()
        .simulate('click');
      expect(wrapper.find('.globalNavigation').hasClass('open')).toBe(true);
      wrapper
        .find('.has-submenu')
        .first()
        .find('a')
        .first()
        .simulate('keyDown', generateEvent('Escape'));
      expect(wrapper.find('.globalNavigation').hasClass('open')).toBe(false);
    });

    it('has open menu level 1 on ArrowDown', () => {
      wrapper
        .find('.burger-button')
        .first()
        .simulate('click');
      wrapper
        .find('.has-submenu')
        .first()
        .find('a')
        .first()
        .simulate('keyDown', generateEvent('ArrowDown'));
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('has open menu level 1 on ArrowRight', () => {
      wrapper
        .find('.burger-button')
        .first()
        .simulate('click');
      wrapper
        .find('.has-submenu')
        .first()
        .find('a')
        .first()
        .simulate('keyDown', generateEvent('ArrowRight'));
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('has open menu level 1 on ArrowLeft', () => {
      wrapper
        .find('.burger-button')
        .first()
        .simulate('click');
      wrapper
        .find('.has-submenu')
        .first()
        .find('a')
        .first()
        .simulate('keyDown', generateEvent('ArrowLeft'));
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('Submenu Tests', () => {
    beforeEach(() => {
      wrapper = mount(<GlobalNavigation {...props} />, {
        attachTo: document.body,
      });
    });

    afterEach(() => {
      wrapper.unmount();
      jest.clearAllMocks();
    });

    it('has open menu level 1 on ArrowUp', () => {
      wrapper
        .find('.burger-button')
        .first()
        .simulate('click');
      wrapper
        .find('.has-submenu')
        .first()
        .find('a.submenu__link')
        .last()
        .simulate('keyDown', generateEvent('ArrowUp'));
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('has handle ArrowDown on submenu', () => {
      wrapper
        .find('.burger-button')
        .first()
        .simulate('click');
      wrapper
        .find('.has-submenu')
        .first()
        .find('a.submenu__link')
        .last()
        .simulate('keyDown', generateEvent('ArrowDown'));
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('has handle ArrowRight on submenu', () => {
      wrapper
        .find('.burger-button')
        .first()
        .simulate('click');
      wrapper
        .find('.has-submenu')
        .first()
        .find('a.submenu__link')
        .last()
        .simulate('keyDown', generateEvent('ArrowRight'));
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('has handle ArrowLeft on submenu', () => {
      wrapper
        .find('.burger-button')
        .first()
        .simulate('click');
      wrapper
        .find('.has-submenu')
        .first()
        .find('a.submenu__link')
        .last()
        .simulate('keyDown', generateEvent('ArrowLeft'));
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
