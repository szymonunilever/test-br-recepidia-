import { storiesOf } from '@storybook/react';
import React from 'react';
import { ProductCopy, ProductCopyViewType } from '../index';
import dataSource from '../mocks/product.json';

const product = {
  ...dataSource,
  creationTime: new Date(),
};

const content: AppContent.ProductCopyContent = {
  title: 'Title',
};

storiesOf('Product related/Product Copy', module)
  .add(
    'viewType: Title',
    () => (
      <ProductCopy
        //@ts-ignore
        product={product}
        viewType={ProductCopyViewType.Title}
        content={{}}
      />
    ),
    { inline: false },
  )
  .add(
    'viewType: Description',
    () => (
      <ProductCopy
        //@ts-ignore
        product={product}
        viewType={ProductCopyViewType.Description}
        content={{}}
      />
    ),
    { inline: false },
  )
  .add(
    'viewType: Ingredients',
    () => (
      <div style={{ background: '#007a33', color: 'white', padding: '30px' }}>
        <ProductCopy
          //@ts-ignore
          product={product}
          viewType={ProductCopyViewType.Ingredients}
          content={{ title: 'Ingredients' }}
        />
      </div>
    ),
    { inline: false },
  )
  .add(
    'viewType: Allergy',
    () => (
      <div style={{ background: '#007a33', color: 'white', padding: '30px' }}>
        <ProductCopy
          //@ts-ignore
          product={product}
          viewType={ProductCopyViewType.Allergy}
          content={{ title: 'Allergy' }}
        />
      </div>
    ),
    { inline: false },
  );
