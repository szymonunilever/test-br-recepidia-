/* global describe, it, expect */
import { mount, ReactWrapper } from 'enzyme';
import { remove } from 'lodash';
import React from 'react';
import recipes from 'src/components/data/recipes.json';
import pages from 'src/components/data/pageListing.json';
import { Carousel } from '../index';
import PageListingItem from '../../PageListing/partials/PageListingItem/PageListingItem';
import RecipeCard from '../../RecipeListing/partials/RecipeCard';
import { RatingAndReviewsProvider } from 'src/components/lib/models/ratings&reviews';

const recipeList = recipes.data.allRecipe.edges.map(item => item.node);
const pageList = pages;
const config = {
  breakpoints: [
    {
      width: 1366,
      switchElementsBelowBreakpoint: 1,
      switchElementsAfterBreakpoint: 2,
      visibleElementsBelowBreakpoint: 2,
      visibleElementsAboveBreakpoint: 4,
    },
  ],
};
const carouselConfig = {
  breakpoints: [
    {
      width: 1366,
      switchElementsBelowBreakpoint: 1,
      switchElementsAfterBreakpoint: 2,
      visibleElementsBelowBreakpoint: 2,
      visibleElementsAboveBreakpoint: 4,
    },
  ],
};
const getPageItem = () => {
  return (
    <div className="carousel__item">
      <PageListingItem
        page={{
          title: 'Title',
          path: 'Path',
          image: {
            alt: 'image',
          },
          localImage: pageList[0].localImage,
        }}
      />
    </div>
  );
};

let favorites: string[] = [];
const getRecipeItem = () => {
  const changeFavorites = ({ id, val }: { id: string; val: boolean }) => {
    val ? favorites.push(id) : remove(favorites, n => n === id);
  };
  return (
    <div className="carousel__item">
      <RecipeCard
        id={recipeList[0].id}
        inFavorite={false}
        enableSelectFavorite={true}
        titleLevel={1}
        slug={recipeList[0].fields.slug}
        onFavoriteChange={changeFavorites}
        content={{ title: recipeList[0].title }}
        recipeId={recipeList[0].id}
        ratingProvider={RatingAndReviewsProvider.none}
        imageSizes={'(min-width: 768px) 25vw, 50vw'}
      />
    </div>
  );
};

describe('Carousel Component', () => {
  it('Pages Carousel default', () => {
    const defaultPagesCarousel: ReactWrapper = mount(
      <Carousel
        list={pageList}
        createElementFunction={getPageItem}
        config={carouselConfig}
      />
    );
    expect(defaultPagesCarousel.find('div[className="carousel"]')).toBeTruthy();
    expect(
      defaultPagesCarousel.find('div[className="carousel__image"]')
    ).toBeTruthy();
  });

  it('Recipes Carousel default', () => {
    const defaultRecipesCarousel: ReactWrapper = mount(
      <Carousel
        list={pageList}
        createElementFunction={getRecipeItem}
        config={config}
      />
    );
    expect(
      defaultRecipesCarousel.find('div[className="carousel"]')
    ).toBeTruthy();
    expect(
      defaultRecipesCarousel.find('div[className="carousel__image"]')
    ).toBeTruthy();
  });

  it('Recipes Carousel with favorite', () => {
    favorites = [];
    const recipeCarouselWithFavorite: ReactWrapper = mount(
      <Carousel
        list={recipeList}
        createElementFunction={getRecipeItem}
        config={config}
      />
    );
    expect(
      recipeCarouselWithFavorite.find('div[className="carousel"]')
    ).toBeTruthy();
    expect(
      recipeCarouselWithFavorite.find('div[className="carousel-image"]')
    ).toBeTruthy();

    expect(recipeCarouselWithFavorite.find('.icon')).toBeTruthy();
    recipeCarouselWithFavorite
      .find('.icon')
      .first()
      .simulate('click');

    expect(favorites.length).toEqual(1);
    expect(favorites[0]).toEqual(recipeList[0].id);
    recipeCarouselWithFavorite
      .find('.icon')
      .first()
      .simulate('click');
    expect(favorites.length).toEqual(0);
  });
});
