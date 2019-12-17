import { storiesOf } from '@storybook/react';
import React from 'react';
import { ProductNutrients } from '../index';
import dataSource from '../mocks/product.json';

const product = {
  ...dataSource,
  creationTime: new Date(),
};

const content: AppContent.ProductNutrientsContent = {
  title: 'Nutrients',
  tableTitlePer100: 'Per 100g',
  tableTitleNutrient: '*% of Reference intake of an average adult (8400 kJ / 2000 kcal), 1 portion = 230 g. ( Pack contains 4 portions )',
};

storiesOf('Product related/Product Nutrients', module)
  .add(
    'viewType: Title',
    () => (
      <div style={{ background: '#007a33', color: 'white', padding: '30px' }}>
        <ProductNutrients
          //@ts-ignore
          nutritionFacts={product.nutritionFacts}
          content={content}
        />
      </div>
    ),
    { inline: false },
  );
