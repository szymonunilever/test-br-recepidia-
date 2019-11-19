import React from 'react';
import { storiesOf } from '@storybook/react';
import { RecipeCookingMethod } from '../index';
import recipe from '../mocks/recipe.json';

const methods: RMSData.CookingMethodGroup[] = recipe.methods as RMSData.CookingMethodGroup[];

const content1: AppContent.RecipeCookingMethodContent = {
  title: undefined,
  subtitle: undefined,
};
const content2: AppContent.RecipeCookingMethodContent = {
  title: 'Cooking Method',
  subtitle: undefined,
};
const content3: AppContent.RecipeCookingMethodContent = {
  title: 'Cooking Method',
  subtitle: 'test data for cooking method',
};

storiesOf('Recipe related/Recipe Cooking Method', module)
  .add(
    'without title and subtitle',
    () => <RecipeCookingMethod methodList={methods} content={content1} />,
    { inline: false }
  )
  .add(
    'with title',
    () => <RecipeCookingMethod methodList={methods} content={content2} />,
    { inline: false }
  )
  .add(
    'with title & subtitle',
    () => <RecipeCookingMethod methodList={methods} content={content3} />,
    { inline: false }
  );
