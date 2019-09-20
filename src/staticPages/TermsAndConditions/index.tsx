import React from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo';
import DigitalData from '../../../integrations/DigitalData';
import { WindowLocation } from '@reach/router';
import { TagName, Text } from 'src/components/lib/components/Text';
import { findPageComponentContent } from 'src/utils';
import { RichText } from 'src/components/lib/components/RichText';

const TermsAndConditionsPage = ({
  pageContext: {
    page: { components, seo, type },
  },
  location,
}: TermsAndConditionsPageProps) => {
  return (
    <Layout>
      <SEO {...seo} canonical={location.href} />
      <DigitalData title={seo.title} type={type} />
      <section className="_pt--40 wrapper">
        <Text
          tag={TagName['h1']}
          text={findPageComponentContent(components, 'Text', 'Title').text}
        />
        <Text
          tag={TagName['h2']}
          text={findPageComponentContent(components, 'Text', 'Subtitle').text}
        />
        <RichText content={findPageComponentContent(components, 'RichText')} />
      </section>
    </Layout>
  );
};

interface TermsAndConditionsPageProps {
  pageContext: {
    page: AppContent.Page;
  };
  location: WindowLocation;
}
export default TermsAndConditionsPage;
