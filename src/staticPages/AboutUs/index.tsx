import React from 'react';
import { Text, TagName } from 'src/components/lib/components/Text';
import AdaptiveImage from 'src/components/lib/components/AdaptiveImage';
import RichText from 'src/components/lib/components/RichText';
import { findPageComponentContent } from 'src/utils';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo';
import { WindowLocation } from '@reach/router';
import DigitalData from '../../../integrations/DigitalData';

const AboutUs = ({
  pageContext: {
    page: { seo, components, type },
  },
  location,
}: AboutUsProps) => (
  <Layout>
    <SEO {...seo} canonical={location.href} />
    <DigitalData title={seo.title} type={type} />
    <div className="about-us">
      <Text
        className="about-us__title"
        tag={TagName.h2}
        text={findPageComponentContent(components, 'Text', 'Title').text}
      />
      <Text
        className="about-us__subtitle"
        tag={TagName.h3}
        text={findPageComponentContent(components, 'Text', 'Subtitle').text}
      />
      <AdaptiveImage
        className="about-us__image"
        {...findPageComponentContent(components, 'AdaptiveImage').image}
      />
      <RichText
        className="about-us__text"
        content={findPageComponentContent(components, 'RichText')}
      />
    </div>
  </Layout>
);

export default AboutUs;

interface AboutUsProps {
  pageContext: {
    page: AppContent.Page;
  };
  location: WindowLocation;
}
