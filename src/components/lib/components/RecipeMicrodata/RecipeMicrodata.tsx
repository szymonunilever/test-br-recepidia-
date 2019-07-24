import React, { useCallback, FunctionComponent } from 'react';
import { RecipeMicrodataProps } from './index';

const RecipeMicrodata: FunctionComponent<RecipeMicrodataProps> = ({
  recipe,
  showAsText = false,
}) => {
  const getNutrientPropDescription = useCallback(
    (prop: string) =>
      // @ts-ignore
      (recipe.nutrients.find(item => item.name === prop) || {}).description,
    [recipe]
  );
  const ingredients = recipe.ingredients.map(rec => rec.description);
  const instructions = recipe.methods
    .sort((a, b) =>
      a.position > b.position ? 1 : a.position < b.position ? -1 : 0
    )
    .map(method => method.description);
  const nutritions = {
    '@type': 'NutritionInformation',
    calories: getNutrientPropDescription('energy_kcal'),
    carbohydrateContent: getNutrientPropDescription('carbohydrate_excl_fibre'),
    cholesterolContent: getNutrientPropDescription('cholesterol'),
    fatContent: getNutrientPropDescription('fat'),
    fiberContent: getNutrientPropDescription('fibre'),
    proteinContent: getNutrientPropDescription('protein'),
    saturatedFatContent: getNutrientPropDescription('saturated_fat'),
    sodiumContent: getNutrientPropDescription('sodium'),
    sugarContent: getNutrientPropDescription('sugar'),
    transFatContent: getNutrientPropDescription('trans_fat'),
    unsaturatedFatContent: getNutrientPropDescription('unsaturated_fat'),
  };

  const recipeData = {
    '@context': 'http://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    image: recipe.localImage.childImageSharp.fluid.src,
    datePublished: recipe.creationTime,
    description: recipe.description,
    recipeYield: recipe.recipeDetails.serves,
    cookTime: recipe.recipeDetails.totalTime,
    prepTime: recipe.recipeDetails.preparationTime,
    recipeIngredient: ingredients,
    recipeInstructions: instructions,
    nutrition: nutritions,
  };

  return showAsText ? (
    <div>{JSON.stringify(recipeData)}</div>
  ) : (
    <script type="application/ld+json">{JSON.stringify(recipeData)}</script>
  );
};

export default RecipeMicrodata;
