import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tab, Tabs } from '../index';

export const content: AppContent.Tabs.Content = {
  // titles: ['Ingredients', 'Methods', 'Cooking'],
  tabs: [
    {
      title: 'Methods',
      view: 'RecipeTabMethods',
    },
    {
      title: 'Cooking',
      view: 'RecipeTabCooking',
    },
    {
      title: 'Ingredients',
      view: 'RecipeTabIngredients',
    },
  ],
};

storiesOf('Generic/Tabs', module).add(
  'default',
  () => (
    <Tabs content={content}>
      <Tab view="RecipeTabIngredients">
        <p>This will be Ingredients Tab content.</p>
      </Tab>
      <Tab view="RecipeTabMethods">
        <p>This will be Methods Tab content.</p>
      </Tab>
      <Tab view="RecipeTabCooking">
        <p>This will be Cooking Tab content.</p>
      </Tab>
    </Tabs>
  ),
  { inline: false }
);
