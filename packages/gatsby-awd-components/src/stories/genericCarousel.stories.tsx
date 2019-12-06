import React, { ReactElement } from 'react';
import { storiesOf } from '@storybook/react';
import Button, { ButtonViewType } from '../components/Button';
import {
  Card,
  CardProps, ProductCardWrapper,
  ProductCardWrapperProps,
  RecipeCardWrapper,
  RecipeCardWrapperProps,
} from '../components/Card';
import { CardLinkWrapper, CardLinkWrapperProps } from '../components/CardLinkWrapper';
import { IMAGE_SIZES } from '../components/constants';
import { GenericCarousel } from '../components/GenericCarousel';
import { Listing } from '../components/Listing';
import RecipeAddPlaceholder from '../components/RecipeListing/partials';
import recipes from '../mocks/recipes';
import products from '../mocks/products.json';
import { ReactComponent as FavoriteIcon } from 'src/svgs/inline/favorite.svg';
import { ReactComponent as Plus } from 'src/svgs/inline/plus.svg';

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
const productCards: ReactElement<ProductCardWrapperProps>[] = products.map(product=>(
  <ProductCardWrapper key={product.fields.slug} ratingProvider={2}>
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
    <RecipeCardWrapper key={node.fields.slug} ratingProvider={2}>
      <Card key={node.fields.slug}
        content={node}
        imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
        idPropertyName="recipeId"
      >{favoriteButton}</Card>
    </RecipeCardWrapper>
  </CardLinkWrapper>
));
//@ts-ignore
const recipeCards: ReactElement<RecipeCardWrapperProps>[] = recipes.data.allRecipe.edges.slice(3,5).map(({node})=>(
  <RecipeCardWrapper key={node.fields.slug} ratingProvider={2}>
    <Card
      key={node.fields.slug}
      content={node}
      imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
      idPropertyName="recipeId"
    >{favoriteButton}</Card>
  </RecipeCardWrapper>
));
//@ts-ignore
const cards: ReactElement<CardProps>[] = recipes.data.allRecipe.edges.slice(6,9).map(({node})=>(
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

storiesOf('Generic/GenericCarousel', module).add('default', ()=>
  <GenericCarousel content={content}>
      {recipesWithLink}
      {recipeCards}
      {productCards}
      {placeholders}
</GenericCarousel>, {inline:false});
