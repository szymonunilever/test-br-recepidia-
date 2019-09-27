import React, { useState, useEffect } from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo';
import DigitalData from '../../../integrations/DigitalData';
import { WindowLocation } from '@reach/router';
import '../../scss/pages/_newsletterSignUp.scss';
import { isBrowser } from 'src/utils';

const GIGYA_CONFIG_SCRIPT_ID = 'gigya-config-script';
const SCREENSET_CONTAINER_ID = 'gigya-newsletter-screenset';
const SCREENSET_NAME = 'ULVR_newsletter_v1';

const NewsletterSignupPage: React.FunctionComponent<
  NewsletterSignupPageProps
> = ({ pageContext, location }) => {
  const {
    page: { seo, type },
  } = pageContext;

  const [configScriptLoaded, setConfigScriptLoaded] = useState<boolean | null>(
    null
  );
  const isGigyaLoaded = () =>
    // @ts-ignore
    isBrowser() && window.gigya && window.gigya.isGigya && window.gigya.isReady;

  useEffect(() => {
    isGigyaLoaded() &&
      // @ts-ignore
      window.gigya.accounts.showScreenSet({
        screenSet: SCREENSET_NAME,
        containerID: SCREENSET_CONTAINER_ID,
      });
  }, []);

  return (
    <Layout>
      <SEO
        {...seo}
        canonical={location.href}
        onChangeClientState={newState => {
          const scriptLoaded = !!newState.scriptTags.find(
            ({ id }: { id: string }) => id === GIGYA_CONFIG_SCRIPT_ID
          );

          if (scriptLoaded && !configScriptLoaded) {
            setConfigScriptLoaded(true);
          }
        }}
      >
        {!isGigyaLoaded() && [
          <script
            type="text/javascript"
            src="https://cdns.gigya.com/JS/gigya.js?apiKey=3_7pA4Ft7DjM3NIJlI1lTxmVtq3FH3LAOiheGTmpDe6gUcGq-mYuR0PF6yBDFg8ACt&lang=pt-pt"
            id={GIGYA_CONFIG_SCRIPT_ID}
            key={GIGYA_CONFIG_SCRIPT_ID}
          />,
          configScriptLoaded && (
            <script
              type="text/javascript"
              src="//cdn.gigya-ext.com/gy.js"
              key="gigya_source"
            />
          ),
        ]}
      </SEO>
      <DigitalData title={seo.title} type={type} />
      <section className="gigya-content">
        <div className="container">
          <div
            className="gy-ui-screen-set"
            data-screen-set={SCREENSET_NAME}
            id={SCREENSET_CONTAINER_ID}
          />
        </div>
      </section>
    </Layout>
  );
};
export interface NewsletterSignupPageProps {
  pageContext: {
    page: AppContent.Page;
  };
  location: WindowLocation;
}

export default NewsletterSignupPage;
