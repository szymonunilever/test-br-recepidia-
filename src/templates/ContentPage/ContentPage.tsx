import React from 'react';
import Layout from '../../components/Layout/Layout';

const ContentPage = ({ pageContext }: ContentPageProps) => {
  return (
    <Layout>
      <h1>Content page</h1>
      <div>{pageContext.slug}</div>
    </Layout>
  );
};

export default ContentPage;

interface ContentPageProps {
  pageContext: {
    slug: string;
  };
}
