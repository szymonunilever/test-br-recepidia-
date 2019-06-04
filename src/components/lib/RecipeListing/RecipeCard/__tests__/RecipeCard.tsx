/* global describe, it, expect */
import React from 'react';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';

import { RecipeCard } from '../index';

describe('RecipeCard', () => {
  let recipeCardDefault: ReactWrapper;
  it('Render default view with favorite button', () => {
    recipeCardDefault = mount(
      <RecipeCard
        enableSelectFavorite={true}
        recipeImgPath="/static/favicon.ico"
        title="Test recipe"
        slug="/"
      />
    );
    expect(
      recipeCardDefault.find('div[data-componentname="recipeCard"]')
    ).toBeTruthy();
    expect(recipeCardDefault.find('Favorite').exists()).toBeTruthy();
  });

  it('Render view with favorite button already selected', () => {
    const recipeCard = mount(
      <RecipeCard
        enableSelectFavorite={true}
        recipeImgPath="/static/favicon.ico"
        title="Test recipe"
        slug="/"
        inFavorite
      />
    );
    expect(
      recipeCard.find('div[data-componentname="recipeCard"]')
    ).toBeTruthy();
    expect(recipeCard.find('Favorite').exists()).toBeTruthy();
    expect(
      recipeCard
        .find('button[data-componentname="favorite"]')
        .hasClass('favorite-selected')
    ).toEqual(true);
  });

  it('Render default view without favorite button', () => {
    const recipeCard = shallow(
      <RecipeCard
        enableSelectFavorite={false}
        recipeImgPath="/static/favicon.ico"
        title="Test recipe"
        slug="/"
      />
    );
    expect(
      recipeCard.find('div[data-componentname="recipeCard"]')
    ).toBeTruthy();
    expect(recipeCard.find('Favorite').exists()).toBeFalsy();
  });
  it('Test add to favorite', () => {
    expect(recipeCardDefault.find('.favorite-selected').length).toEqual(0);

    recipeCardDefault
      .find('button[data-componentname="favorite"]')
      .simulate('click');

    expect(recipeCardDefault.find('.favorite-selected').length).toEqual(1);
  });
});
