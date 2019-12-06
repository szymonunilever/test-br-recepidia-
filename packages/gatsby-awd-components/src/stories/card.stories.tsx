import React from 'react';
import { storiesOf } from '@storybook/react';
import Button, { ButtonViewType } from '../components/Button';
import {Card, ProductCardWrapper, RecipeCardWrapper } from '../components/Card';
import recipes from '../mocks/recipes';
import products from '../mocks/products.json';
import {IMAGE_SIZES} from '../components/constants';
import { ReactComponent as FavoriteIcon } from 'src/svgs/inline/favorite.svg';
//@ts-ignore
const recipe = recipes.data.allRecipe.edges[0].node;
const product = products[1];
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

storiesOf('Generic/Card', module)
  .add('Default card',
  ()=> <Card
    content={recipe}
    idPropertyName="recipeId"
    imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
  /> ,{inline:false})
  .add('Default card with button',
    ()=> <Card
      content={recipe}
      idPropertyName="recipeId"
      imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
    >
      {favoriteButton}
    </Card> ,{inline:false})
  .add('Recipe Wrapper card with button',
  ()=>
    <RecipeCardWrapper ratingProvider={2}>
    <Card
    content={recipe}
    idPropertyName="recipeId"
    imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
  >
    {favoriteButton}
      </Card>
    </RecipeCardWrapper> ,{inline:false})
  .add('Product Wrapper card with button',
    ()=>
      <ProductCardWrapper ratingProvider={2}>
        <Card
          content={product}
          idPropertyName="productId"
          imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
        >
          {favoriteButton}
        </Card>
      </ProductCardWrapper> ,{inline:false});
