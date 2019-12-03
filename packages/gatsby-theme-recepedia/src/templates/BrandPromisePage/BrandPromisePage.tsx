import React from 'react';
import Layout from '../../components/Layout/Layout';
import SEO from 'src/components/Seo';
import cx from 'classnames';
import { graphql } from 'gatsby';
import { navigate, Link } from 'gatsby';
import { findPageComponentContent } from 'src/utils';
import DigitalData from '../../../integrations/DigitalData';
import { WindowLocation } from '@reach/router';
import themeKnorr from './BrandPromisePageKnorr.module.scss';
import themeHellmanns from './BrandPromisePageHellmanns.module.scss';
import themeMaizena from './BrandPromisePageMaizena.module.scss';
import { ReactComponent as KnorrLogoIcon } from 'src/svgs/inline/logo-knorr.svg';
import { ReactComponent as HellmannsLogoIcon } from 'src/svgs/inline/logo-hellmanns.svg';
import { ReactComponent as MaizenaLogoIcon } from 'src/svgs/inline/logo-maizena.svg';
import '../../scss/pages/_brand.scss';
import {
  Hero,
  Text,
  RichText,
  AdaptiveImage,
  BrandSocialChannels,
  // ListingContent,
  Listing,
  TagName,
  Button,
  CardLinkWrapper,
  Card,
} from 'gatsby-awd-components/src';
import { ReactComponent as FacebookIcon } from 'src/svgs/inline/facebook.svg';
import { ReactComponent as InstagramIcon } from 'src/svgs/inline/instagram.svg';

const BrandPromisePage: React.FunctionComponent<BrandPromisePageProps> = ({
  data: {
    allArticle: { nodes },
  },
  pageContext,
  location,
}) => {
  const {
    page: { components, seo, type, title, relativePath },
  } = pageContext;

  const allArticles = nodes.map(article => {
    const newArticle = {
      title: article.title,
      fields: {
        slug: article.fields.slug,
      },
      localImage: article.assets[0].content.localImage,
    };
    return newArticle;
  });

  const twoArticles = [...allArticles];
  twoArticles.length = 2;

  const brand = relativePath.split('/')[1];
  const brandsContent = {
    knorr: {
      theme: themeKnorr,
      logo: KnorrLogoIcon,
    },
    hellmanns: {
      theme: themeHellmanns,
      logo: HellmannsLogoIcon,
    },
    maizena: {
      theme: themeMaizena,
      logo: MaizenaLogoIcon,
    },
  };

  //@ts-ignore
  const currentBrandContent = brand && brandsContent[brand];

  let theme = currentBrandContent && currentBrandContent.theme;

  const classWrapper = cx(
    theme.brandPromisePage,
    'brand-page',
    'brand-promise-page',
    brand
  );

  const BrandLogo = currentBrandContent.logo;

  const headerContent = findPageComponentContent(components, 'Header');

  const promiseArticleContent = findPageComponentContent(
    components,
    'PromiseArticle'
  );
  const promiseArticleCta =
    promiseArticleContent.cta &&
    (promiseArticleContent.cta.linkTo ? (
      <Link
        className="promise-article__cta"
        to={promiseArticleContent.cta.linkTo}
      >
        {promiseArticleContent.cta.label}
      </Link>
    ) : (
      <Button className="promise-article__cta" onClick={() => {}}>
        {promiseArticleContent.cta.label}
      </Button>
    ));

  return (
    <Layout className={classWrapper}>
      <SEO {...seo} canonical={location.href} />
      <DigitalData title={seo.title} type={type} />
      <section className="brand-hero">
        <AdaptiveImage
          localImage={headerContent.image.localImage}
          alt={headerContent.image.alt}
          className="brand-hero__image"
        />
        <div className="wrapper brand-hero__content">
          <BrandLogo className="brand-hero__logo" />
          <h1 className="brand-hero__title">{title}</h1>
          <div className="brand-hero__links">
            {headerContent.links.map((link, index) => (
              <Link
                className={`brand-hero__link${index === 0 ? ' active' : ''}`} // first link is current Promise page
                to={link.path}
                key={`brand-hero__link-${index}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="wrapper _pt--40 bg-secondary">
        <Listing
          content={findPageComponentContent(components, 'StandForListing')}
          className="stand-for-listing"
        >
          {allArticles.map(article => (
            <CardLinkWrapper
              title={article.title}
              key={article.fields.slug}
              slug={article.fields.slug}
            >
              <Card
                content={article}
                // imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
                idPropertyName="recipeId"
              />
            </CardLinkWrapper>
          ))}
        </Listing>
      </section>

      <section className="wrapper promise-article _pb--40  bg-secondary">
        <Text
          tag={TagName.h2}
          text={promiseArticleContent.title}
          className="promise-article__title"
        />
        {promiseArticleContent.subtitle && (
          <Text
            tag={TagName.p}
            text={promiseArticleContent.subtitle}
            className="promise-article__subtitle"
          />
        )}
        {promiseArticleContent.description && (
          <Text
            tag={TagName.p}
            text={promiseArticleContent.description}
            className="promise-article__description"
          />
        )}
        {promiseArticleContent.blocks.map(block => (
          <div className="promise-article__block">
            {block.image && (
              <AdaptiveImage
                localImage={block.image.localImage}
                alt={block.image.alt}
                className="promise-article__block-image"
              />
            )}
            <RichText
              content={block.richText}
              className="promise-article__block-text"
            />
          </div>
        ))}
        {promiseArticleCta}
      </section>

      <section className="wrapper _pt--40 _pb--40 bg-primary">
        <Listing
          content={findPageComponentContent(components, 'UpToListing')}
          className="up-to-listing"
        >
          {twoArticles.map(article => (
            <CardLinkWrapper
              title={article.title}
              key={article.fields.slug}
              slug={article.fields.slug}
            >
              <Card
                content={article}
                // imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
                idPropertyName="recipeId"
              />
            </CardLinkWrapper>
          ))}
        </Listing>
      </section>
      <section className="wrapper bg-primary brand-social _pt--40 _pb--40">
        <div className="bow-white"></div>
        <Text
          tag={TagName.h2}
          text={
            findPageComponentContent(components, 'BrandSocialChannelsTitle')
              .title
          }
          className="brand-social__title _pt--40"
        />
        <BrandSocialChannels
          className="brand-social__list"
          content={findPageComponentContent(components, 'BrandSocialChannels')}
          listIcons={{
            facebook: <FacebookIcon />,
            instagram: <InstagramIcon />,
          }}
        />
      </section>

      <section className="_pb--40">
        <Hero
          content={findPageComponentContent(components, 'Hero')}
          viewType="Image"
          imageIsLink={false}
          className="hero--planner color--inverted bg-primary"
          // imageSizes={IMAGE_SIZES.HERO}
        />
      </section>
    </Layout>
  );
};

export default BrandPromisePage;

export const pageQuery = graphql`
  {
    allArticle {
      nodes {
        ...ArticleFields
      }
    }
  }
`;
interface BrandPromisePageProps {
  data: { allArticle: { nodes: Internal.Article[] } };
  pageContext: {
    page: AppContent.Page;
  };
  location: WindowLocation;
}
