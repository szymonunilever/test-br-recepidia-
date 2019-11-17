import React from 'react';
import SEO from 'src/components/Seo';
import { findPageComponentContent } from 'src/utils';
import DigitalData from '../../../integrations/DigitalData';
import Layout from '../../components/Layout/Layout';
import { Card, TagName, Text } from 'src/components/lib';
import theme from './ContactUs.module.scss';
import { ReactComponent as MapMarker } from 'src/svgs/inline/map-marker.svg';
import { WindowLocation } from '@reach/router';
// Component Styles
import '../../scss/pages/_contactUs.scss';

const ContactUsPage = ({ pageContext, location }: ContactUsPageProps) => {
  const {
    page: { seo, components, type },
  } = pageContext;
  return (
    <Layout>
      <SEO {...seo} canonical={location.href} />
      <DigitalData title={seo.title} type={type} />
      <section className={theme.contactUs}>
        <Text
          tag={TagName['h1']}
          text={findPageComponentContent(components, 'Text', 'PageTitle').text}
        />
        <Text
          tag={TagName.p}
          className="contact-us__description"
          text={
            findPageComponentContent(components, 'Text', 'Description').text
          }
        />
        <div className={theme.cardholder}>
          <div className={theme.cardholderItem}>
            <Card
              className="card"
              titleLevel={2}
              content={findPageComponentContent(components, 'Card', 'Address')}
              Icon={MapMarker}
            />
          </div>
          {/*<div className={theme.cardholderItem}>
            <Card
              className={cx(theme.cardStretch, 'card')}
              titleLevel={2}
              content={findPageComponentContent(components, 'Card', 'Contact')}
              Icon={MapMarker}
            />
          </div>*/}
        </div>
      </section>
    </Layout>
  );
};

export default ContactUsPage;
export interface ContactUsPageProps {
  pageContext: {
    page: AppContent.Page;
  };
  location: WindowLocation;
}
