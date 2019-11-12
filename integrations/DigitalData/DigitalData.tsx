import React from 'react';
import { DigitalDataProps } from './models';
import { Helmet } from 'react-helmet';

const DigitalData = ({ title, type }: DigitalDataProps) => {
  // use JSON.stringify for string variables to avoid bugs
  // 'let' and 'const' do not work for SPAs, only 'var'

  return process.env.NODE_ENV !== 'development' ? (
    <Helmet>
      <script type="text/javascript">{`
      var pageTitle = ${JSON.stringify(title)};
      var pageType = ${JSON.stringify(type)};
      digitalData.page.category.pageType = pageType;
      digitalData.page.pageInfo = {
        pageName: pageTitle,
        destinationURL: window.location.href,
      };
      digitalData.page.attributes.contentType = pageType;
      if (pageType === "ArticleDetail") {
        digitalData.page.attributes.articleName = pageTitle;
      }
      `}</script>
    </Helmet>
  ) : (
    <></>
  );
};

export default DigitalData;
