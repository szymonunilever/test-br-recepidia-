import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import React, { ReactElement } from 'react';
import { ReactComponent as FavoriteIcon } from 'src/svgs/inline/favorite.svg';
import products from '../../../mocks/products.json';
import recipes from '../../../mocks/recipes.json';
import { RatingAndReviewsProvider } from '../../../models';
import { ReactComponent as Plus } from '../../../svgs/inline/plus.svg';
import Button, { ButtonViewType } from '../../Button';
import {
  Card,
  CardProps,
  ProductCardWrapper,
  ProductCardWrapperProps,
  RecipeCardWrapper,
  RecipeCardWrapperProps,
} from '../../Card';
import { CardLinkWrapper, CardLinkWrapperProps } from '../../CardLinkWrapper';
import { IMAGE_SIZES } from '../../constants';
import RecipeAddPlaceholder from '../../RecipeListing/partials';
import { GenericCarousel } from '../index';

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
const productCards: ReactElement<ProductCardWrapperProps>[] = products.map(product=>(
  <ProductCardWrapper key={product.fields.slug} ratingProvider={RatingAndReviewsProvider.inline}>
    <Card key={product.fields.slug} content={product} idPropertyName="productId" imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD} >
      {favoriteButton}
    </Card>
  </ProductCardWrapper>
));

const content: AppContent.ListingContent = {
  title: 'Listing with different children',
  resultLabel: 'item',
  resultLabelPlural: 'items',
};
//@ts-ignore
const recipesWithLink: ReactElement<CardLinkWrapperProps>[] = recipes.data.allRecipe.edges.slice(0,2).map(({node}) => (<CardLinkWrapper
    title={node.title}
    key={node.fields.slug}
    slug={node.fields.slug}>
    <RecipeCardWrapper key={node.fields.slug} ratingProvider={RatingAndReviewsProvider.none}>
      <Card key={node.fields.slug}
            content={node}
            imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
            idPropertyName="recipeId"
      >{favoriteButton}</Card>
    </RecipeCardWrapper>
  </CardLinkWrapper>
));
//@ts-ignore
const recipeCards: ReactElement<RecipeCardWrapperProps>[] = recipes.data.allRecipe.edges.map(({node})=>(
  <RecipeCardWrapper key={node.fields.slug} ratingProvider={RatingAndReviewsProvider.none}>
    <Card
      key={node.fields.slug}
      content={node}
      imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
      idPropertyName="recipeId"
    >{favoriteButton}</Card>
  </RecipeCardWrapper>
));
//@ts-ignore
const cards: ReactElement<CardProps>[] = recipes.data.allRecipe.edges.map(({node})=>(
  <Card
    key={node.fields.slug}
    content={node}
    imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
    idPropertyName="recipeId"
  >{favoriteButton}</Card>
));

const placeholders = [
  <RecipeAddPlaceholder key="placeholder1" onClick={()=>{console.log('placeholder clicked.')}} Icon={Plus} />
];

describe('<GenericCarousel />', () => {
  let wrapper: ReactWrapper;
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the Carousel of Recipes without links snapshot', () => {
    wrapper = mount(<GenericCarousel content={content}>
      {recipeCards}
    </GenericCarousel>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('matches the Carousel of Recipes with links snapshot', () => {
    wrapper = mount(<GenericCarousel content={content}>
      {recipesWithLink}
    </GenericCarousel>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('matches the Carousel of different children', () => {
    wrapper = mount(<GenericCarousel content={content}>
      {recipesWithLink.slice(0,3)}
      {recipeCards.slice(4,3)}
      {productCards}
      {placeholders}
    </GenericCarousel>);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('.slide-arrow.right');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('.slide-arrow.left');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
