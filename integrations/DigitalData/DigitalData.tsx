import React, { useEffect } from 'react';
import { DigitalDataProps } from './models';
import { isMobile } from './utils';
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

  const channelVal = isMobile() ? 'Mobile Site' : 'Brand Site';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dd: any = keys.digitalData;
  dd.siteInfo['channel'] = channelVal;
  dd.page.category = {
    pageType,
    primaryCategory: channelVal,
  };
  dd.privacy = { accessCategories: [{ domains: [] }] };
  dd.page.pageInfo = {
    pageName,
    destinationURL: window.location.href,
  };
  dd.page.attributes.contentType = pageType;
  if (type === 'ArticleDetail') {
    dd.page.attributes.articleName = pageName;
  }
  return process.env.NODE_ENV !== 'development' ? (
    <Helmet
      script={[
        {
          type: 'text/javascript',
          innerHtml: `
            window['digitalData'] = ${JSON.stringify(dd)};
        `,
        },
        { src: keys.analytics.adobe.url, type: 'text/javascript', async: true },
      ]}
    />
  ) : (
    <></>
  );
  // return (
  //   <Helmet
  //     script={[
  //       {
  //         type: 'text/javascript',
  //         innerHtml: `
  //           window['digitalData'] = ${JSON.stringify(dd)};
  //       `,
  //       },
  //       { src: keys.analytics.adobe.url, type: 'text/javascript', async: true },
  //     ]}
  //   />
  // );
};

export default DigitalData;
