import { storiesOf } from '@storybook/react';
import React from 'react';
import { ReactComponent as FavoriteIcon } from 'src/svgs/inline/favorite.svg';
import { Button, ButtonViewType } from '../components/Button';
import { IMAGE_SIZES } from '../components/constants';
import { RecipeCard } from '../components/RecipeListing/partials';
import { recipe } from '../mocks/RecipeListing';

const onFavoriteToggle = (val:boolean, recipeId: number) => {
console.log(val, recipeId);
};
const props = {id: recipe.id,
  recipeId: recipe.recipeId,
  slug: recipe.fields.slug,
  ratingProvider:2,
  localImage: recipe.localImage,
  imageSizes: IMAGE_SIZES.RECIPE_LISTINGS.STANDARD,
  content: recipe,
};
storiesOf('Recipe related/Recipe Card', module)
  .add('default', () => <RecipeCard {...props}/>, { info : { inline : false } })
  .add('with favorite', () => <RecipeCard {...props}>
    <Button
      className="recipe-card__favorite"
      Icon={FavoriteIcon}
      onClick={onFavoriteToggle}
      isToggle={true}
      viewType={ButtonViewType.icon}
      attributes={{ 'aria-label' : 'favorite toggle', name: 'favorite' }}
    />
  </RecipeCard>, { info : { inline : false } });
