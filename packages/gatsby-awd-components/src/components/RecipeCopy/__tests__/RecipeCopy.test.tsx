import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { RecipeCopy } from '../index';
import toJson from 'enzyme-to-json';
import dataSource from '../../../mocks/recipe.json';

describe('<RecipeCopy />', () => {
  let wrapper: ReactWrapper;
  const props: any = {
    recipe: {
      ...dataSource,
      creationTime: new Date(dataSource.creationTime),
    },
    viewType: 0,
    content: {
      title: 'Title',
      subtitle: 'Subtitle',
    },
  };

  beforeEach(() => {
    wrapper = mount(<RecipeCopy {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render description', () => {
    wrapper = mount(<RecipeCopy {...props} viewType={1} />);
    expect(wrapper.find('.recipeCopyDescription')).toHaveLength(2);
  });

  it('should render ingredients', () => {
    wrapper = mount(<RecipeCopy {...props} viewType={2} />);
    expect(wrapper.find('.recipeCopyIngredients')).toHaveLength(1);
    expect(wrapper.find('.recipe-ingredients__group-title')).toHaveLength(2);
  });

  it("shouldn't render ingredients title and subtitle and ingredients", () => {
    wrapper = mount(
      <RecipeCopy
        {...props}
        viewType={2}
        content={{}}
        recipe={{ ingredients: [] }}
      />
    );
    expect(wrapper.find('.recipe-copy-ingredients__title')).toHaveLength(0);
    expect(wrapper.find('.recipe-copy-ingredients__subtitle')).toHaveLength(0);
    expect(wrapper.find('.recipe-ingredients__group-title')).toHaveLength(0);
  });
});
