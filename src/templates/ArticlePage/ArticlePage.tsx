import { graphql, Link } from 'gatsby';
import React from 'react';
import { TagName, Text } from 'src/components/lib/components/Text';
import SEO from 'src/components/Seo/Seo';
import FacebookIcon from 'src/svgs/inline/facebook.svg';
import TwitterIcon from 'src/svgs/inline/twitter.svg';
import CloseButton from 'src/svgs/inline/x-mark.svg';
import theme from 'src/templates/ArticlePage/ArticlePage.module.scss';
import { findPageComponentContent } from 'src/utils';
import AddThis from '../../../integrations/AddThis';
import Layout from '../../components/Layout/Layout';
import Hero from '../../components/lib/components/Hero';
import RichText from '../../components/lib/components/RichText';
import { get } from 'lodash';
import SocialSharing, {
  SocialIcons,
  SocialSharingViewType,
} from '../../components/lib/components/SocialSharing';
import { VideoPlayer } from '../../components/lib/components/VideoPlayer';

const socialIcons: SocialIcons = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
};
const ArticlePage: React.FunctionComponent<ArticlePageProps> = ({
  data: { article, next },
  pageContext,
}) => {
  const mainImage = article.assets.find(
    item => get(item, 'content.role') === 'main'
  );
  const mainImageHero = {
    image: get(mainImage, 'content') as AppContent.ImageContent,
  };
  const video = get(
    article.assets.find(item => item.type === 'Video'),
    'content'
  ) as AppContent.VideoPlayer.Content;

  const nextMainImage =
    next &&
    next.assets &&
    next.assets.find(item => get(item, 'content.role') === 'main');

  const nextMainImageHero = get(
    nextMainImage,
    'content'
  ) as AppContent.ImageContent;

  return (
    <Layout>
      <AddThis />
      <SEO title={article.title} description={article.shortDescription} />
      <section className="container">
        <Text tag={TagName.h1} text={article.title} />
      </section>
      {mainImageHero && (
        <section>
          <div className="container">
            <Hero viewType="Image" content={mainImageHero} />
            <SocialSharing
              content={findPageComponentContent(
                pageContext.components,
                'SocialSharing'
              )}
              className={theme.articleSocial}
              icons={socialIcons}
              viewType={SocialSharingViewType.Modal}
              CloseButtonIcon={CloseButton}
            />
          </div>
        </section>
      )}

      <section className="container">
        <RichText content={article.articleText} type="md" />
      </section>
      {/* TODO: add component for image carousel if it will be approved. */}
      {video && (
        <section>
          <div className="container">
            <VideoPlayer content={video} />
            {video.description ? (
              <Text tag={TagName.p} text={video.description} />
            ) : null}
          </div>
        </section>
      )}
      {next && next.fields && next.fields.slug && nextMainImageHero && (
        <section className="container">
          <Link to={next.fields.slug}>
            <Hero
              content={{
                image: nextMainImageHero,
                shortSubheader: next.title,
                longSubheader: next.shortDescription,
              }}
              viewType="Image"
              className="next-article"
              titleLevel={2}
            />
          </Link>
        </section>
      )}
      <section className="_pb--40">
        <Hero
          content={findPageComponentContent(pageContext.components, 'Hero')}
          viewType="Image"
          className="hero--planner color--inverted"
        />
      </section>
    </Layout>
  );
};

export default ArticlePage;

export const query = graphql`
  query($slug: String!, $nextSlug: String) {
    article(fields: { slug: { eq: $slug } }) {
      ...ArticleFields
    }
    next: article(fields: { slug: { eq: $nextSlug } }) {
      ...NextArticleFields
    }
  }
`;

interface ArticlePageProps {
  data: {
    article: Internal.Article;
    next: Partial<Internal.Article>;
  };
  pageContext: {
    id: string;
    slug: string;
    components: {
      [key: string]: string | number | boolean | object | null;
    };
    nextSlug: string | null;
    previousSlug: string | null;
    edge: object;
  };
}
