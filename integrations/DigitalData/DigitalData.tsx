import React, { useEffect } from 'react';
import { isMobile } from './utils';
import { findPageComponentContent } from 'src/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DigitalData = ({ pageContext, data }: any) => {
  useEffect(() => {
    const { type } = pageContext; //TODO: When we will know where to get Title of the page, we need fix this and use only type instead get all components inside this integration.
    const pageName = /Detail$/.test(type)
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
        pageType: pageContext.type,
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
      window.digitalData.page.attributes.contentType = pageContext.type;
      if (type === 'ArticleDetail') {
        //@ts-ignore
        window.digitalData.page.attributes.articleName = pageName;
      }
    }
  }, []);
  return <></>;
};

export default DigitalData;
