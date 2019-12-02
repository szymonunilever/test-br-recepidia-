import { mount } from 'enzyme';
import React from 'react';
import Tabs from '../index';
import toJson from 'enzyme-to-json';

describe('<Tabs />', () => {
  let wrapper: any;
  const tabsHeaderContent = {
    contents: [
      {
        heading: 'Heading',
        subheading: 'subheading',
        view: 'RecipeTabMethods',
        defaultSubheading: 'defaultSubheading',
      },
      {
        heading: 'Heading',
        subheading: '',
        view: 'RecipeTabCooking',
        defaultSubheading: 'defaultSubheading',
      },
    ],
  };

  const props: any = {
    children: [
      {
        view: 'RecipeTabMethods',
        active: true,
        props: {
          view: 'RecipeTabMethods',
          children: <div>RecipeTabMethods</div>,
        },
      },
      {
        view: 'RecipeTabCooking',
        props: {
          view: 'RecipeTabCooking',
          children: <div>RecipeTabCooking</div>,
        },
      },
      {
        view: 'RecipeTabIngredients',
        props: {
          view: 'RecipeTabIngredients',
          children: <div>RecipeTabIngredients</div>,
        },
      },
      {
        view: 'Empty',
        props: {
          view: 'Empty',
          children: <div>Empty</div>,
        },
      },
    ],
    content: {
      tabs: [
        {
          title: 'Recipe',
          view: 'RecipeTabMethods',
        },
        {
          title: 'Cooking',
          view: 'RecipeTabCooking',
        },
        {
          title: 'Ingredients',
          view: 'RecipeTabIngredients',
        },
        {
          title: '',
          view: 'Empty',
        },
      ],
    },
    tabsHeaderContent,
  };

  beforeEach(() => {
    wrapper = mount(<Tabs {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should change tab', () => {
    expect(wrapper.find('#RecipeTabMethods').hasClass('button__selected')).toBe(
      true
    );
    expect(wrapper.find('#RecipeTabCooking').hasClass('button__selected')).toBe(
      false
    );
    wrapper.find('#RecipeTabCooking').simulate('click');
    expect(wrapper.find('#RecipeTabMethods').hasClass('button__selected')).toBe(
      false
    );
    expect(wrapper.find('#RecipeTabCooking').hasClass('button__selected')).toBe(
      true
    );
  });
});
