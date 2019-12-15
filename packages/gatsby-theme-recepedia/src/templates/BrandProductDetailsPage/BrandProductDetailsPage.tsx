import React from 'react';
import Layout from '../../components/Layout/Layout';
import SEO from 'src/components/Seo';
import theme from './BrandProductDetailsPage.module.scss';
import cx from 'classnames';
import { findPageComponentContent } from 'src/utils';
import DigitalData from '../../../integrations/DigitalData';
import { WindowLocation } from '@reach/router';

const BrandProductDetailsPage: React.FunctionComponent<
  BrandProductDetailsPageProps
> = ({ pageContext, location }) => {
  const {
    page: { components, seo, type },
    product,
  } = pageContext;
  const classWrapper = cx(
    theme.BrandProductDetailsPage,
    'recipe-page header--bg'
  );

  return (
    <Layout className={classWrapper}>
      <SEO {...seo} canonical={location.href} />
      <DigitalData title={seo.title} type={type} />
      <section>
        <div>
          some content for {product.productName} (brand product details page)
        </div>
      </section>
    </Layout>
  );
};

export default BrandProductDetailsPage;

interface BrandProductDetailsPageProps {
  pageContext: {
    page: AppContent.Page;
    product: Internal.Product;
  };
  location: WindowLocation;
}
