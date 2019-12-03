import React from 'react';
import Layout from '../../components/Layout/Layout';
import SEO from 'src/components/Seo';
import theme from './BrandProductsPage.module.scss';
import cx from 'classnames';
import { findPageComponentContent } from 'src/utils';
import DigitalData from '../../../integrations/DigitalData';
import { WindowLocation } from '@reach/router';

const BrandProductsPage: React.FunctionComponent<BrandProductsPageProps> = ({
  pageContext,
  location,
}) => {
  const {
    page: { components, seo, type },
  } = pageContext;
  const classWrapper = cx(theme.BrandProductsPage, 'recipe-page header--bg');

  return (
    <Layout className={classWrapper}>
      <SEO {...seo} canonical={location.href} />
      <DigitalData title={seo.title} type={type} />
      <section>
        <div>some content for brand products page</div>
      </section>
    </Layout>
  );
};

export default BrandProductsPage;

interface BrandProductsPageProps {
  pageContext: {
    page: AppContent.Page;
  };
  location: WindowLocation;
}
