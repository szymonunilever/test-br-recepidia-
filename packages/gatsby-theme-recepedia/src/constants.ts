/**
 * RecipePersonalizationFormula
 * template - query string which using for Recipe Personalization result.
 * where:
 * Q - intro Quiz Answers
 * MP - meal Planer Answers
 * #(digit) - number of question
 * ^(digit) - weight of condition
 * searchAttributes - fields identifications
 * */
export const RecipePersonalizationFormula: RecipePersonalizationFormulaProps = {
  template: ['(Q#2^3) AND (Q#4^2 OR Q#1)', '(Q#2^3)'],
  searchAttributes: {
    tags: 'tagGroups.tags.id',
    cookTime: 'recipeDetails.cookTime',
    serves: 'recipeDetails.serves',
  },
};

export const MealPlannerPersonalizationFormula = {
  template: [
    'MP#2 AND MP#1 AND MP#3 AND MP#5 AND MP#4',
    'MP#2 AND MP#1 AND MP#3 AND MP#5',
    'MP#2 AND MP#1 AND MP#3',
    'MP#2 AND MP#1',
  ],
  searchAttributes: RecipePersonalizationFormula.searchAttributes,
};

export interface RecipePersonalizationFormulaProps {
  template: string[];
  searchAttributes: {
    [key: string]: string;
  };
}

export const IMAGE_SIZES = {
  QUIZ_OPTIONS: {
    QUIZ_SMALL: '(max-width: 768px) 50vw, (max-width: 1366px) 30vw, 400px',
    QUIZ_BIG: '(max-width: 1366px) 50vw, 800px',
  },
  RECIPE_LISTINGS: {
    STANDARD: '(max-width: 768px) 50vw, (max-width: 1366px) 30vw, 400px',
    NON_STANDARD: '(max-width: 768px) 100vw, (max-width: 1366px) 50vw, 500px',
    MEAL_PLANNER: '(max-width: 768px) 50vw, (max-width: 1366px) 30vw, 400px',
  },
  PAGE_LISTINGS: {
    CAROUSEL: '(max-width: 768px) 30vw, (max-width: 1366px) 25vw, 300px',
    TILES: '(max-width: 1366px) 50vw, 350px',
  },
};
