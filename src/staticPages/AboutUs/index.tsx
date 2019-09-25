import React from 'react';
import { Text, TagName } from 'src/components/lib/components/Text';
import AdaptiveImage from 'src/components/lib/components/AdaptiveImage';
import RichText from 'src/components/lib/components/RichText';
import { findPageComponentContent } from 'src/utils';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo';
import { WindowLocation } from '@reach/router';
import DigitalData from '../../../integrations/DigitalData';
import theme from './AboutUs.module.scss';
import cx from 'classnames';
// Component Styles
import '../../scss/pages/_default.scss';
const AboutUs = ({
  pageContext: {
    page: { seo, components, type },
  },
  location,
}: AboutUsProps) => (
  <Layout>
    <SEO {...seo} canonical={location.href} />
    <DigitalData title={seo.title} type={type} />
    <div className={cx(theme.aboutUs, 'container')}>
      <Text
        className={theme.aboutUs__title}
        tag={TagName.h1}
        text={findPageComponentContent(components, 'Text', 'Title').text}
      />
      <Text
        className={theme.aboutUs__subtitle}
        tag={TagName.p}
        text={findPageComponentContent(components, 'Text', 'Subtitle').text}
      />
      <AdaptiveImage
        className={theme.aboutUs__image}
        {...findPageComponentContent(components, 'AdaptiveImage').image}
      />
      <RichText
        className={theme.aboutUs__text}
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
