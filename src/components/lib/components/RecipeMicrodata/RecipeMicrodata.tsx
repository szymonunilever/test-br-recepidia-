import React, { useCallback, FunctionComponent } from 'react';
import { RecipeMicrodataProps } from './index';
import flatten from 'lodash/flatten';

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

  const ingredients = flatten(
    recipe.ingredients
      .filter(ingredientsGroup => ingredientsGroup.list.length)
      .map(ingredientsGroup =>
        ingredientsGroup.list.map(
          ingredientsGroup => ingredientsGroup.description
        )
      )
  );

  const instructions = flatten(
    recipe.methods
      .filter(methodsGroup => methodsGroup.list.length)
      .map(methodsGroup =>
        methodsGroup.list
          .sort((a, b) => a.position - b.position)
          .map(method => method.description)
      )
  );

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
