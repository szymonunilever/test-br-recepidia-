import React, { useEffect } from 'react';
import { DigitalDataProps } from './models';
import { isMobile } from './utils';
import { findPageComponentContent } from 'src/utils';
import { Helmet } from 'react-helmet';
import keys from 'integrations/keys.json';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DigitalData = ({
  pageContext = { type: 'Page' },
  data,
  title,
  type,
}: DigitalDataProps) => {
  useEffect(() => {
    const pageType = type ? type : pageContext.type; //TODO: When we will know where to get Title of the page, we need fix this and use only type instead get all components inside this integration.
    const pageName = title
      ? title
      : /Detail$/.test(pageType)
      ? data.title
      : findPageComponentContent(pageContext.components, 'Text', 'PageTitle')
          .text;

    const channelVal = isMobile() ? 'Mobile Site' : 'Brand Site';
    //@ts-ignore
    if (window && window.digitalData) {
      //@ts-ignore
      window.digitalData.siteInfo['channel'] = channelVal;
      //@ts-ignore
      window.digitalData.page.category = {
        pageType,
        primaryCategory: channelVal,
      };
      //@ts-ignore
      window.digitalData.privacy = { accessCategories: [{ domains: [] }] };
      //@ts-ignore
      window.digitalData.page.pageInfo = {
        pageName,
        destinationURL: window.location.href,
      };
      //@ts-ignore
      window.digitalData.page.attributes.contentType = pageType;
      if (type === 'ArticleDetail') {
        //@ts-ignore
        window.digitalData.page.attributes.articleName = pageName;
      }
    }
  }, []);
  return (
    <Helmet
      script={[
        { src: keys.analytics.adobe.url, type: 'text/javascript', async: true },
      ]}
    />
  );
};

export default DigitalData;
