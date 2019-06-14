/* global describe, it, expect */
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
// @ts-ignore
import dataSource from 'src/components/data/recipes.json';

import { RecipeListing, RecipeListViewType, OnFavoriteChange } from '../index';
import { RecipeItem } from '../partials';

const listing: RecipeItem[] = dataSource.data.allRecipe.edges.map(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (item: { node: RecipeItem | any }) => item.node
);
const countItems = listing.length;
const content: AppContent.RecipeListingContent = {
  title: 'Recipe listing Advanced',
  resultLabel: 'recipe',
  resultLabelPlural: 'recipes',
  sortSelectPlaceholder: 'Sort By',
  filtersCta: {
    resetLabel: { label: 'Reset filters' },
    applyLabel: { label: 'Apply filters' },
  },
  cta: { label: 'Load More Button' },
  nullResult: {
    title: 'Oops! No results',
    subtitle: 'Maybe try the following:',
    textList: [`Don't use too many filters at once`, `Try using only filters`],
  },
  optionLabels: {
    preparationTime: 'Preparation time Test',
    cookingTime: 'Cooking time',
    averageRating: 'Average rating',
    newest: 'newest',
    recentlyUpdated: 'Recently updated',
    title: 'title',
  },
};
describe('Recipe Listing Component', () => {
  it('Recipe Listing Trivial default', () => {
    const trivialRecipeListing: ReactWrapper = mount(
      <RecipeListing
        list={listing}
        viewType={RecipeListViewType.Trivial}
        content={content}
        titleLevel={1}
      />
    );
    expect(
      trivialRecipeListing.find('div[data-componentname="recipeListing"]')
    ).toBeTruthy();
    expect(trivialRecipeListing.find('h1')).toBeTruthy();
    expect(trivialRecipeListing.find('h2')).toBeTruthy();
    expect(trivialRecipeListing.find('ul')).toBeTruthy();
    expect(trivialRecipeListing.find('ul').children()).toHaveLength(4);
  });
  it('Recipe Listing Trivial allRecipes (initialCount={0})', () => {
    const trivialRecipeListing: ReactWrapper = mount(
      <RecipeListing
        list={listing}
        viewType={RecipeListViewType.Trivial}
        content={content}
        titleLevel={1}
        initialCount={0}
      />
    );
    expect(trivialRecipeListing.find('ul').children()).toHaveLength(countItems);
  });

  it('Recipe Listing Trivial with Favorite', () => {
    let favorites: string[] = [];
    const changes: OnFavoriteChange = val => {
      favorites = val;
    };
    const wrapper: ReactWrapper = mount(
      <RecipeListing
        list={listing}
        viewType={RecipeListViewType.Trivial}
        content={content}
        titleLevel={1}
        withFavorite
        onFavoriteChange={changes}
      />
    );

    expect(wrapper.find('.icon')).toBeTruthy();
    wrapper
      .find('.icon')
      .first()
      .simulate('click');

    expect(favorites.length).toEqual(1);
    expect(favorites[0]).toEqual(listing[0].id);
    wrapper
      .find('.icon')
      .first()
      .simulate('click');
    expect(favorites.length).toEqual(0);
  });

  it('Recipe Listing Base (with loadMore button)', () => {
    const wrapper = mount(
      <RecipeListing
        list={listing}
        viewType={RecipeListViewType.Base}
        content={content}
        titleLevel={1}
      />
    );

    expect(wrapper.find('button.recipe-list__load-more')).toBeTruthy();
    expect(wrapper.find('ul').children()).toHaveLength(4);
    wrapper.find('button.recipe-list__load-more').simulate('click');
    expect(wrapper.find('ul').children()).toHaveLength(8);
  });

  it('Recipe Listing Base no results', () => {
    const wrapper = mount(
      <RecipeListing
        list={[]}
        viewType={RecipeListViewType.Base}
        content={content}
        titleLevel={1}
      />
    );

    expect(wrapper.find('button.recipe-list__load-more')).toHaveLength(0);
    expect(
      wrapper
        .find('p.recipe-list__no-results')
        .contains('Recipes were not found.')
    );
  });
  it('Recipe Listing Base all recipes without loadMore', () => {
    const wrapper = mount(
      <RecipeListing
        list={listing}
        viewType={RecipeListViewType.Base}
        content={content}
        titleLevel={1}
        initialCount={0}
      />
    );

    expect(wrapper.find('button.recipe-list__load-more').length).toEqual(0);
    expect(wrapper.find('ul').children()).toHaveLength(countItems);
  });
});
