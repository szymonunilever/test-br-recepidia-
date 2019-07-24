const path = require('path');
const fs = require('fs');

const templatesMap = {
  RecipeCategory: path.resolve(
    `./src/templates/RecipeCategoryPage/RecipeCategoryPage.tsx`
  ),
  ContentHub: path.resolve(`./src/templates/ContentHubPage/ContentHubPage.tsx`),
  RecipeDetail: path.resolve(`./src/templates/RecipePage/RecipePage.tsx`),
  ArticleDetail: path.resolve(`./src/templates/ArticlePage/ArticlePage.tsx`),
  default: path.resolve(`./src/templates/ContentPage/ContentPage.tsx`),
};

module.exports = pageType => {
  const staticPath = path.resolve(`./src/staticPages/${pageType}/index.tsx`);

  if (fs.existsSync(staticPath)) {
    return staticPath;
  } else if (templatesMap[pageType]) {
    return templatesMap[pageType];
  }

  return templatesMap.default;
};
