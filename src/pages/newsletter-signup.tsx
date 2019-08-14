import React from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo';

const NewletterSignupPage = () => {
  return (
    <Layout>
      <SEO title="Newletter Sign Up">
        <script src="//cdn.gigya-ext.com/gy.js" defer type="text/javascript" />
        <script
          defer
          type="text/javascript"
          src="https://cdns.gigya.com/JS/gigya.js?apiKey=3_xJpjsTH3hOzfTezsJ6c1rWXEQlaOV6LYx3u6nrLuY_RgP67medDBPWJILD_Rx3YS&lang=en-at"
        />
      </SEO>
      <section>
        <div className="container">
          <div
            className="gy-ui-screen-set"
            data-screen-set="ULVR_newsletter_v1"
          />
        </div>
      </section>
    </Layout>
  );
};

export default NewletterSignupPage;
