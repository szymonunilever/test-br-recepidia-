import React from 'react';
import {
  Accordion,
  AccordionTitle,
  RichText,
  TagName,
  Text,
} from 'gatsby-awd-components/src';
import { findPageComponentContent } from 'src/utils';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo';
import { WindowLocation } from '@reach/router';
import DigitalData from '../../../integrations/DigitalData';
import '../../scss/pages/_default.scss';
import theme from './FAQ.module.scss';
import cx from 'classnames';
import { ReactComponent as ArrowDownIcon } from 'src/svgs/inline/arrow-down.svg';

const FAQPage = ({
  pageContext: {
    page: { seo, components, type },
  },
  location,
}: FAQPageProps) => {
  const faqs = findPageComponentContent(components, 'FAQs');
  const questions = faqs.questions.map((item: FAQProps, i: number) => (
    <li className={theme.faq__listItem} key={i}>
      <Accordion
        title={item.question}
        isOpen={false}
        className={theme.faq__question}
        Icon={ArrowDownIcon}
      >
        <RichText content={item.answer} className={theme.faq__answer} />
      </Accordion>
    </li>
  ));
  return (
    <Layout>
      <SEO {...seo} canonical={location.href} />
      <DigitalData title={seo.title} type={type} />
      <section className={cx(theme.faq, '_pt--40')}>
        <Text
          className={theme.faq__title}
          tag={TagName.h1}
          text={findPageComponentContent(components, 'Text', 'Title').text}
        />
        <ul className={theme.faq__list}>{questions}</ul>
      </section>
    </Layout>
  );
};

export default FAQPage;

interface FAQPageProps {
  pageContext: {
    page: AppContent.Page;
  };
  location: WindowLocation;
}
interface FAQProps {
  question: AccordionTitle;
  answer: AppContent.RichTextContent;
}
