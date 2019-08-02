import React from 'react';
import { DigitalDataProps } from './models';
// import { isMobile } from './utils';
// TODO: maybe we need to use isMobile, but will see.
import { findPageComponentContent } from 'src/utils';
import { Helmet } from 'react-helmet';
import keys from 'integrations/keys.json';

const DigitalData = ({
  pageContext = { type: 'Page' },
  data,
  title,
  type,
}: DigitalDataProps) => {
  const pageType = type ? type : pageContext.type; //TODO: When we will know where to get Title of the page, we need fix this and use only type instead get all components inside this integration.
  const pageName = title
    ? title
    : /Detail$/.test(pageType)
    ? data.title
    : findPageComponentContent(pageContext.components, 'Text', 'PageTitle')
        .text;

  return process.env.NODE_ENV !== 'development' ? (
    <Helmet>
      <script type="text/javascript">{`
      var channelVal = 'Brand Site'; 
      var digitalData = ${JSON.stringify(keys.digitalData)};
      digitalData.siteInfo['channel'] = channelVal;
      digitalData.page.category = {
         pageType: '${pageType}',
         primaryCategory: channelVal,
      };
      digitalData.privacy = { accessCategories: [{ domains: [] }] };
      digitalData.page.pageInfo = {
        pageName: '${pageName}',
        destinationURL: window.location.href,
      };
      digitalData.page.attributes.contentType = '${pageType}';
      if (${type} === 'ArticleDetail') {
        digitalData.page.attributes.articleName = '${pageName}';
      }
      `}</script>
    </Helmet>
  ) : (
    <></>
  );
};

export default DigitalData;
