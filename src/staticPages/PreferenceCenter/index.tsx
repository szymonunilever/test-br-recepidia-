import React from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo';
import { WindowLocation } from '@reach/router';
import DigitalData from '../../../integrations/DigitalData';
import '../../scss/pages/_preferenceCenter.scss';

const PreferenceCenterPage: React.FunctionComponent<
  PreferenceCenterPageProps
> = ({ pageContext, location }) => {
  const {
    page: { seo, type },
  } = pageContext;

  return (
    <Layout>
      <SEO {...seo} canonical={location.href}>
        <script
          type="text/javascript"
          src="https://cdns.gigya.com/JS/gigya.js?apiKey=3_7pA4Ft7DjM3NIJlI1lTxmVtq3FH3LAOiheGTmpDe6gUcGq-mYuR0PF6yBDFg8ACt&lang=pt-pt"
        />
        <script src="//cdn.gigya-ext.com/gy.js" type="text/javascript" />
      </SEO>
      <DigitalData title={seo.title} type={type} />
      <section className="gigya-content">
        <div className="container">
          <div
            className="gy-ui-screen-set"
            data-screen-set="ULVR_prefCentre_v1"
          />
        </div>
      </section>
    </Layout>
  );
};
export interface PreferenceCenterPageProps {
  pageContext: {
    page: AppContent.Page;
  };
  location: WindowLocation;
}

export default PreferenceCenterPage;
