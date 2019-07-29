import React, { useEffect } from 'react';
import keys from '../keys.json';
import { isMobile } from './utils';
import { findPageComponentContent } from 'src/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DigitalData = ({ pageContext, data }: any) => {
  const digitalDataDefaults = keys.digitalData;
  useEffect(() => {
    const { type } = pageContext;
    const pageName = /Detail$/.test(type)
      ? data.title
      : findPageComponentContent(pageContext.components, 'Text', 'PageTitle')
          .text;

    const channelVal = isMobile() ? 'Mobile Site' : 'Brand Site';
    const siteInfo = { ...digitalDataDefaults.siteInfo, channel: channelVal };
    const page = {
      ...digitalDataDefaults.page,
      pageInfo: {
        destinationURL: window.location.href,
        pageName,
      },
      category: {
        pageType: pageContext.type,
        primaryCategory: channelVal,
      },
      trackingInfo: {
        ...digitalDataDefaults.trackingInfo,
      },
    };
    // @ts-ignore
    window['digitalData'] = {
      siteInfo,
      page,
    };
  });
  return <></>;
};

export default DigitalData;
