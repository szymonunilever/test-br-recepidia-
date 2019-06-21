import { storiesOf } from '@storybook/react';
import React from 'react';
import dataSource from 'src/components/data/recipe.json';
import RecipeCopy, { RecipeCopyViewType } from 'src/components/lib/RecipeCopy';

const recipe: RMSData.Recipe = {
  ...dataSource,
  creationTime: new Date(dataSource.creationTime),
};

const content: AppContent.RecipeCopyContent = {
  title: 'Ingredients title',
  subtitle: 'Ingredients subtitle',
};

storiesOf('Components/Recipe Copy', module)
  .add(
    'viewType: Title',
    () => (
      <RecipeCopy
        recipe={recipe}
        viewType={RecipeCopyViewType.Title}
        content={{}}
      />
    ),
    { inline: false }
  )
  .add(
    'viewType: ShortTitle',
    () => (
      <RecipeCopy
        recipe={recipe}
        viewType={RecipeCopyViewType.ShortTitle}
        content={{}}
      />
    ),
    { inline: false }
  )
  .add(
    'viewType: Description',
    () => (
      <RecipeCopy
        recipe={recipe}
        viewType={RecipeCopyViewType.Description}
        content={{}}
      />
    ),
    { inline: false }
  )
  .add(
    'viewType: ShortDescription',
    () => (
      <RecipeCopy
        recipe={recipe}
        viewType={RecipeCopyViewType.ShortDescription}
        content={{}}
      />
    ),
    { inline: false }
  )
  .add(
    'viewType: Ingredients',
    () => (
      <RecipeCopy
        recipe={recipe}
        viewType={RecipeCopyViewType.Ingredients}
        content={content}
        titleLevel={2} // Title level = 2 as default.
      />
    ),
    { inline: false }
  );
