import React from 'react';
import { DigitalDataProps } from './models';
// import { isMobile } from './utils';
// TODO: maybe we need to use isMobile, but will see.
import { Helmet } from 'react-helmet';
import keys from 'integrations/keys.json';

const DigitalData = ({ title, type }: DigitalDataProps) => {
  return process.env.NODE_ENV !== 'development' ? (
    <Helmet>
      <script type="text/javascript">{`
      var channelVal = 'Brand Site'; 
      var digitalData = digitalData ? Object.assign(digitalData, ${JSON.stringify(
        keys.digitalData
      )}) : ${JSON.stringify(keys.digitalData)};    
      var UDM = ${JSON.stringify(keys.UDM)};  
      )}) : ${JSON.stringify(keys.digitalData)};    
      var UDM = UDM ? Object.assign(UDM, ${JSON.stringify(
        keys.UDM
      )}): ${JSON.stringify(keys.UDM)};  
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
