import React from 'react';
import { storiesOf } from '@storybook/react';
import { RecipeMicrodata } from '../index';
import dataSource from './mocks/recipeMicrodata.json';

storiesOf('Components/Recipe microdata', module).add('Recipe microdata', () => (
  // @ts-ignore
  <RecipeMicrodata recipe={dataSource} showAsText={true} />
));
