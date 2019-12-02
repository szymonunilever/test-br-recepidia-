import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import {
  RecipeDietaryAttributes,
  RecipeDietaryAttributesProps,
} from '../index';
import toJson from 'enzyme-to-json';
import activeAttributes from '../../../mocks/dietaryAttributesActive.json';
import attributes from '../../../mocks/dietaryAttributes.json';

describe('<RecipeDietaryAttributes />', () => {
  let wrapper: ReactWrapper;
  const simpleIcons = {
    active: <div>Icon</div>,
    inActive: <div>Icon</div>,
  };
  const icons = new Array(10)
    .fill(simpleIcons, 0, 10)
    .map((e: object, i: number) => {
      return { ...e, id: i + 1 };
    });
  const config = {
    className: 'custom-class',
    icons,
    infoIcon: <div>Info</div>,
  };
  const props: RecipeDietaryAttributesProps = {
    activeAttributes,
    showInactiveAttributes: true,
    attributes,
    ...config,
  };

  beforeEach(() => {
    wrapper = mount(<RecipeDietaryAttributes {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
