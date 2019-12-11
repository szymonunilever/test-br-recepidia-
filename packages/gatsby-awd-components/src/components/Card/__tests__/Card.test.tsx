import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { RatingAndReviewsProvider } from '../../../models';
import { IMAGE_SIZES } from '../../constants';
import { Card, RecipeCardWrapper, ProductCardWrapper } from '../index';
import { Rating } from '../../Rating';
import { Button, ButtonViewType } from '../../Button';
import recipes from '../../../mocks/recipes.json';
import products from '../../../mocks/products.json';
import {ReactComponent as FavoriteIcon} from 'src/svgs/inline/favorite.svg';

const favoriteButton = <Button
  {...{
    className: 'recipe-card__favorite action-button',
    Icon: FavoriteIcon,
    isToggle: true,
    viewType: ButtonViewType.icon,
    attributes: { 'aria-label': 'favorite toggle' },
  }}
  onClick={(e, recipeId) => {
    console.log(recipeId)
  }}
/>;
//@ts-ignore
const recipe = recipes.data.allRecipe.edges[0].node;
const [product] = products;
describe ('<Card/>', ()=>{
  let wrapper:ReactWrapper;
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('matches the snapshot default card', () => {
    wrapper = mount(<Card key={recipe.fields.slug} content={recipe} idPropertyName="recipeId" imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('matches the snapshot default card with button', () => {
    wrapper = mount(<Card key={recipe.fields.slug} content={recipe} idPropertyName="recipeId" imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}>
      {favoriteButton}
    </Card>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('matches the snapshot product card', () => {
    wrapper = mount(
      <ProductCardWrapper key={recipe.fields.slug} ratingProvider={RatingAndReviewsProvider.inline}>
        <Card key={product.fields.slug} content={product} idPropertyName="productId" imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}>{favoriteButton}</Card>
      </ProductCardWrapper>);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('.recipe-card__favorite.action-button').first().simulate('click');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('matches the snapshot recipe card', () => {
    wrapper = mount(
      <RecipeCardWrapper key={recipe.fields.slug} ratingProvider={RatingAndReviewsProvider.none}>
        <Card key={recipe.fields.slug} content={recipe} idPropertyName="recipeId" imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}>{favoriteButton}</Card>
      </RecipeCardWrapper>);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('.action-button').first().simulate('click');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

