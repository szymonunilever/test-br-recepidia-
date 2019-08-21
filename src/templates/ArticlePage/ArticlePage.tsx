import { graphql, Link } from 'gatsby';
import React from 'react';
import { TagName, Text } from 'src/components/lib/components/Text';
import SEO from 'src/components/Seo/Seo';
import { ReactComponent as FacebookIcon } from 'src/svgs/inline/facebook.svg';
import { ReactComponent as TwitterIcon } from 'src/svgs/inline/twitter.svg';
import { ReactComponent as CloseButton } from 'src/svgs/inline/x-mark.svg';
import { ReactComponent as PlayIcon } from 'src/svgs/inline/arrow-right.svg';
import theme from 'src/templates/ArticlePage/ArticlePage.module.scss';
import cx from 'classnames';
import { findPageComponentContent } from 'src/utils';
import AddThis from '../../../integrations/AddThis';
import Layout from '../../components/Layout/Layout';
import Hero from '../../components/lib/components/Hero';
import RichText from '../../components/lib/components/RichText';
import get from 'lodash/get';
import SocialSharing, {
  SocialIcons,
  SocialSharingViewType,
} from '../../components/lib/components/SocialSharing';
import { VideoPlayer } from '../../components/lib/components/VideoPlayer';
import DigitalData from '../../../integrations/DigitalData';
import { WindowLocation } from '@reach/router';

const socialIcons: SocialIcons = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
};
const ArticlePage: React.FunctionComponent<ArticlePageProps> = ({
  data: { article, next },
  pageContext,
  location,
}) => {
  const {
    page: { seo, components, type },
  } = pageContext;
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

  if (mainImageHero) {
    const seoImage = seo.meta.find(item => {
      return item.name == 'og:image';
    });
    seoImage && (seoImage.content = mainImageHero.image.url);
  }

  return (
    <Layout className={theme.articleWrap}>
      <SEO
        {...seo}
        canonical={location.href}
        title={article.title}
        description={article.shortDescription}
      />
      <DigitalData title={article.title} type={type} />
      <section className={theme.articleTitle}>
        <div className="container">
          <Text tag={TagName.h1} text={article.title} />
        </div>
      </section>
      {mainImageHero && (
        <section className={cx(theme.articleImage, 'bg--half')}>
          <div className="article-image__wrap">
            <Hero viewType="Image" content={mainImageHero} />
            <SocialSharing
              content={findPageComponentContent(components, 'SocialSharing')}
              className={theme.articleSocial}
              icons={socialIcons}
              viewType={SocialSharingViewType.Modal}
              CloseButtonIcon={CloseButton}
              WidgetScript={AddThis}
            />
          </div>
        </section>
      )}

      <section className={cx(theme.articleText, 'container')}>
        <RichText content={article.articleText} type="md" />
      </section>
      {/* TODO: add component for image carousel if it will be approved. */}
      {video && (
        <section className={theme.articleVideo}>
          <div className="container">
            <VideoPlayer content={video} PlayIcon={PlayIcon} />
            {video.description ? (
              <Text tag={TagName.p} text={video.description} />
            ) : null}
          </div>
        </section>
      )}
      {next && next.fields && next.fields.slug && nextMainImageHero && (
        <section className={theme.articleNext}>
          <div className="container">
            <Text
              tag={TagName.h2}
              text={
                findPageComponentContent(components, 'Text', 'NextTitle').text
              }
            />
            <Link to={next.fields.slug}>
              <Hero
                content={{
                  image: nextMainImageHero,
                  shortSubheader: next.title,
                  longSubheader: next.shortDescription,
                }}
                viewType="Image"
                titleLevel={2}
              />
            </Link>
          </div>
        </section>
      )}
      <section>
        <Hero
          content={findPageComponentContent(components, 'Hero')}
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
    page: AppContent.Page;
    nextSlug: string | null;
    previousSlug: string | null;
    edge: object;
  };
  location: WindowLocation;
}
