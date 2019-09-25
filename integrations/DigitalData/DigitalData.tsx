import React from 'react';
import { DigitalDataProps } from './models';
// import { isMobile } from './utils';
// TODO: maybe we need to use isMobile, but will see.
import { Helmet } from 'react-helmet';

const DigitalData = ({ title, type }: DigitalDataProps) => {
  const config = {
    digitalData: {
      siteInfo: {
        sitetype: process.env['digitalData_siteInfo_sitetype'],
        category: process.env['digitalData_siteInfo_category'],
        country: process.env['digitalData_siteInfo_country'],
        globalbrand: process.env['digitalData_siteInfo_globalbrand'],
        localbrand: process.env['digitalData_siteInfo_localbrand'],
      },
      // eslint-disable-next-line @typescript-eslint/camelcase
      page: {
        attributes: {
          brandCategory:
            process.env['digitalData_page_attributes_brandCategory'],
          country: process.env['digitalData_page_attributes_country'],
          globalbrand: process.env['digitalData_page_attributes_globalbrand'],
          localbrand: process.env['digitalData_page_attributes_localbrand'],
        },
      },
      trackingInfo: {
        GID: process.env['digitalData_trackingInfo_GID'],
        tool: process.env['digitalData_trackingInfo_tool'],
      },
    },
    UDM: {
      globalbrand: process.env['UDM_globalbrand'],
      localbrand: process.env['UDM_localbrand'],
      category: process.env['UDM_category'],
      channel: process.env['UDM_channel'],
      country: process.env['UDM_country'],
      sitetype: process.env['UDM_sitetype'],
      evq: process.env['UDM_evq'],
      gid: process.env['UDM_gid'],
      gaa: process.env['UDM_gaa'],
    },
  };

  return process.env.NODE_ENV !== 'development' ? (
    <Helmet>
      <script type="text/javascript">{`
      var channelVal = 'Brand Site'; 
      var digitalData = digitalData ? Object.assign(digitalData, ${JSON.stringify(
        config.digitalData
      )}) : ${JSON.stringify(config.digitalData)};      
      var UDM = UDM ? Object.assign(UDM, ${JSON.stringify(
        config.UDM
      )}): ${JSON.stringify(config.UDM)};  
      digitalData.siteInfo['channel'] = channelVal;  
      digitalData.page.category = {
         pageType: '${type}',
         primaryCategory: channelVal,
      };
      digitalData.privacy = { accessCategories: [{ domains: [] }] };
      digitalData.page.pageInfo = {
        pageName: '${title}',
        destinationURL: window.location.href,
      };
      digitalData.page.attributes.contentType = '${type}';
      if ('${type}' === 'ArticleDetail') {
        digitalData.page.attributes.articleName = '${title}';
      }
      `}</script>
    </Helmet>
  ) : (
    <></>
  );
}; //TODO: test

export default DigitalData;
