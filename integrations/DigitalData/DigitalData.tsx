import React, { useEffect } from 'react';
import keys from '../keys.json';
import { isMobile } from './utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DigitalData = ({ pageContext }: any) => {
  // eslint-disable-next-line no-console
  console.log(pageContext);
  const digitalDataDefaults = keys.digitalData;
  useEffect(() => {
    const channelVal = isMobile() ? 'Mobile Site' : 'Brand Site';
    const siteInfo = { ...digitalDataDefaults.siteInfo, channel: channelVal };
    const page = {
      ...digitalDataDefaults.page,
      pageInfo: {
        destinationURL: window.location.href,
      },
      category: {
        pageType: '',
        primaryCategory: channelVal,
      },
    };
    // @ts-ignore
    window['digitalData'] = {
      siteInfo,
      page,
    };
  });
  //TODO: Need collect data for page for Adobe Analytics. Main data from config should be set in gatsby-browser.js when RouteChange.
  // useEffect(() => {
  //   const channelVal = isMobile() ? 'Mobile Site' : 'Brand Site';
  //   const siteInfo = { ...digitalDataDefaults.siteInfo, channel: channelVal };
  //
  //
  //   setDigitalData({ siteInfo, page });
  // }, [digitalData.page]);

  /* window.digitalData = {
    siteInfo: {
      channel: channelVal,
      sitetype: 'Non-Avinash/Non-D2/CMS Name',
      page: {},
      video: [],
      campaign: [],
      product: [],
      privacy: {
        accessCategories: [
          {
            domains: [],
          },
        ],
      },
      component: [],
      trackingInfo: {
        GID: '',
        un: '',
        tool: [
          {
            ids: '',
          },
        ],
      },
      promotion: [],
    },
  };*/
  return <></>;
};

export default DigitalData;
