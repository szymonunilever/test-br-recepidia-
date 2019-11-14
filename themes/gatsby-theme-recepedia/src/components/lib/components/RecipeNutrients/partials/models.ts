export interface RecipeNutrientsBodyProps {
  className?: string;
  content: AppContent.RecipeNutrientsContent;
  recipe: RMSData.Recipe;
}

export interface RecipeNutrientsTable100Props {
  className?: string;
  label: string;
  nutrients: RMSData.RecipeNutrient[];
}

export interface RecipeNutrientsTableProps {
  className?: string;
  labelServing: string;
  labelTotal: string;
  nutrients: RMSData.RecipeNutrient[];
  nutrientsServing: RMSData.RecipeNutrient[];
}
