import React from 'react';
import { storiesOf } from '@storybook/react';
import { RecipeMicrodata } from 'src/components/lib';
import dataSource from 'src/components/data/recipeMicrodata.json';

storiesOf('Components/Recipe microdata', module).add('Recipe microdata', () => (
  // @ts-ignore
  <RecipeMicrodata recipe={dataSource} showAsText={true} />
));
