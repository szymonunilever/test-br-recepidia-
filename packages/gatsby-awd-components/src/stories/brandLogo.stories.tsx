import { storiesOf } from '@storybook/react';
import React from 'react';
import { BrandLogo } from '../index';

const brandList = ['knorr', 'hellmanns', 'maizena'];

storiesOf('Generic/BrandLogo', module)
  .add('Default view', () => (
    <>{brandList.map(brand => <BrandLogo brand={brand} linkTo={'/'} />)}</>
  ));
