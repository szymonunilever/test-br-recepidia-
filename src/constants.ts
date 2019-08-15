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
  template: 'Q#2^4 AND (MP#1^3 OR MP#3^3 OR MP#2^2 OR Q#4^2 OR MP#4)',
  searchAttributes: {
    tags: 'tagGroups.tags.id',
    cookTime: 'recipeDetails.cookTime',
    serves: 'recipeDetails.serves',
  },
};

export interface RecipePersonalizationFormulaProps {
  template: string;
  searchAttributes: {
    [key: string]: string;
  };
}
