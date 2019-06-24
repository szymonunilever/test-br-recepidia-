import React from 'react';
import { storiesOf } from '@storybook/react';
import Tabs, { Tab } from 'src/components/lib/components/Tabs';

const content: AppContent.TabsContent = {
  titles: ['Ingredients', 'Methods', 'Cooking'],
};

storiesOf('Components/Tabs', module).add(
  'Tabs',
  () => (
    <Tabs content={content}>
      <Tab>
        <p>This will be Ingredients Tab content.</p>
      </Tab>
      <Tab>
        <p>This will be Methods Tab content.</p>
      </Tab>
      <Tab>
        <p>This will be Cooking Tab content.</p>
      </Tab>
    </Tabs>
  ),
  { inline: false }
);
