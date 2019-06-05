/* global describe, it, expect */
import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';

import { RecipeCard } from '../index';
import imageItem from 'src/components/data/localImage.json';

describe('RecipeCard', () => {
  let recipeCardDefault: ReactWrapper;
  it('Render default view with favorite button', () => {
    recipeCardDefault = mount(
      <RecipeCard
        enableSelectFavorite={true}
        imgObject={imageItem}
        title="Test recipe"
        slug="/"
      />
    );
    expect(
      recipeCardDefault.find('div[data-componentname="recipeCard"]')
    ).toBeTruthy();
    expect(recipeCardDefault.find('Button').exists()).toBeTruthy();
  });

  it('Render view with favorite button already selected', () => {
    const recipeCard = mount(
      <RecipeCard
        enableSelectFavorite={true}
        imgObject={imageItem}
        title="Test recipe"
        slug="/"
        inFavorite
      />
    );
    expect(
      recipeCard.find('div[data-componentname="recipeCard"]')
    ).toBeTruthy();
    expect(recipeCard.find('Button').exists()).toBeTruthy();
    expect(
      recipeCard
        .find('button[data-componentname="button"]')
        .hasClass('button__selected')
    ).toEqual(true);
  });

  it('Render default view without favorite button', () => {
    const recipeCard = shallow(
      <RecipeCard
        enableSelectFavorite={false}
        imgObject={imageItem}
        title="Test recipe"
        slug="/"
      />
    );
    expect(
      recipeCard.find('div[data-componentname="recipeCard"]')
    ).toBeTruthy();
    expect(recipeCard.find('Button').exists()).toBeFalsy();
  });
  it('Test add to favorite', () => {
    expect(recipeCardDefault.find('.button__selected').length).toEqual(0);

    recipeCardDefault
      .find('button[data-componentname="button"]')
      .simulate('click');

    expect(recipeCardDefault.find('.button__selected').length).toEqual(1);
  });
});
