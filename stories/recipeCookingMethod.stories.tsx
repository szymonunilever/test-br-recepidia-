import React from 'react';
import { storiesOf } from '@storybook/react';
import { RecipeCookingMethod } from '../src/components/lib/components/RecipeCookingMethod';
import dataSource from 'src/components/data/recipes.json';

const methods: RMSData.CookingMethod[] =
  dataSource.data.allRecipe.edges[0].node.methods;

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

storiesOf('Components/Recipe Cooking Method', module)
  .add(
    'Recipe Cooking Method without title and subtitle',
    () => <RecipeCookingMethod methodList={methods} content={content1} />,
    { inline: false }
  )
  .add(
    'Recipe Cooking Method with title',
    () => <RecipeCookingMethod methodList={methods} content={content2} />,
    { inline: false }
  )
  .add(
    'Recipe Cooking Method with title & subtitle',
    () => <RecipeCookingMethod methodList={methods} content={content3} />,
    { inline: false }
  );
