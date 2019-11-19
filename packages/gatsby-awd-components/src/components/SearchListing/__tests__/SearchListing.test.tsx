import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { SearchListing } from '../index';
import toJson from 'enzyme-to-json';
import { content } from '../../../stories/searchListing.stories';
import recipes from '../../../mocks/newRecipes.json';
import articles from '../../../mocks/articleList.json';
import { RecipeListViewType } from '../../RecipeListing';
import { action } from '@storybook/addon-actions';

describe('<SearchListing />', () => {
  let wrapper: ReactWrapper;
  const getSearchData = async () => {};
  const getSearchSuggestionData = async () => {};

  const recipeConfig = {
    viewType: RecipeListViewType.Base,
    icons: { favorite: <div>FavoriteIcon</div>, close: <div>CloseSvg</div> },
    withFavorite: true,
    initialCount: 2,
    recipePerLoad: 2,
    favorites: [],
    onFavoriteChange: action('favorites were changed'),
    imageSizes: '(min-width: 768px) 25vw, 50vw',
    getRecipeSearchData: async () => {},
  };

  const searchInputConfig = {
    searchResultsCount: 8,
    labelIcon: <div>LabelIcon</div>,
    buttonResetIcon: <div>buttonResetIcon</div>,
    buttonSubmitIcon: <div>buttonSubmitIcon</div>,
    getSearchSuggestionData: async () => {},
    onSubmit: () => {},
  };

  const articleConfig = {
    getArticleSearchData: async () => {},
  };

  const config = {
    recipeConfig,
    articleConfig,
    searchInputConfig,
  };

  const recipeResults = {
    list: recipes,
    count: 4,
  };

  const searchInputResults = {
    list: [],
    count: 0,
  };

  const articleResults = {
    list: articles,
    count: 10,
  };

  const recipeNoResults = {
    list: [],
    count: 0,
  };

  const searchNoInputResults = {
    list: [],
    count: 0,
  };

  const articleNoResults = {
    list: [],
    count: 0,
  };

  const searchNoResults = {
    recipeResults: recipeNoResults,
    searchInputResults: searchNoInputResults,
    articleResults: articleNoResults,
    resultsFetched: false,
  };

  const props: any = {
    searchQuery: '',
    searchResults: {
      recipeResults,
      searchInputResults,
      articleResults,
    },
    content,
    config,
    getSearchData,
    getSearchSuggestionData,
  };

  beforeEach(() => {
    wrapper = mount(<SearchListing {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should load more articles', () => {
    const input = wrapper.find('.form__input');
    const e = { target: { value: 'Burger' } };
    input.props().value = 'burger';
    input.simulate('change', { ...e });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("shouldn't show results", () => {
    wrapper = mount(
      <SearchListing
        {...props}
        searchResults={searchNoResults}
        searchResultTitleLevel={2}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
