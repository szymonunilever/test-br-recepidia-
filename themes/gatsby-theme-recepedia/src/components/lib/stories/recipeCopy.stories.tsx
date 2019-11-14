import { storiesOf } from '@storybook/react';
import React from 'react';
import { RecipeCopy, RecipeCopyViewType } from '../index';
import dataSource from './mocks/recipe.json';

const recipe = {
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
        //@ts-ignore
        recipe={recipe}
        viewType={RecipeCopyViewType.Title}
        content={{}}
      />
    ),
    { inline: false }
  )
  .add(
    'viewType: Description',
    () => (
      <RecipeCopy
        //@ts-ignore
        recipe={recipe}
        viewType={RecipeCopyViewType.Description}
        content={{}}
      />
    ),
    { inline: false }
  )
  .add(
    'viewType: Ingredients',
    () => (
      <RecipeCopy
        //@ts-ignore
        recipe={recipe}
        viewType={RecipeCopyViewType.Ingredients}
        content={content}
        titleLevel={1} // Title level of main title, all subtitles will go by hierarchy. Default value 1.
      />
    ),
    { inline: false }
  );
