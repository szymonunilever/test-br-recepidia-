import React from 'react';
import { storiesOf } from '@storybook/react';
import { ProductHero, ProductHeroProps } from '../index';
import dataSource from '../mocks/product.json';
import { localImage } from 'gatsby-awd-components/src/mocks/global';

const config: ProductHeroProps = {
  // @ts-ignore
  content: {
    ...dataSource
  },
  localImage: localImage,
  imageSizes: '(max-width: 1366px) 100vw, 800px'
};

storiesOf('Product related/ProductHero', module).add(
  'default',

  () => {
    return (
      <div>
        <ProductHero {...config} />
      </div>
    );
  }
);
