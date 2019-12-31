import React from 'react';
import Layout from '../../components/Layout/Layout';
import BrandHero from '../../components/BrandHero';
import SEO from 'src/components/Seo';
import cx from 'classnames';
import { graphql } from 'gatsby';
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
  BrandSocialChannels,
  TagName,
} from 'gatsby-awd-components/src';
import { ReactComponent as FacebookIcon } from 'src/svgs/inline/facebook.svg';
import { ReactComponent as InstagramIcon } from 'src/svgs/inline/instagram.svg';
import { ReactComponent as TwitterIcon } from 'src/svgs/inline/twitter.svg';
import { ReactComponent as YoutubeIcon } from 'src/svgs/inline/youtube.svg';
import { IMAGE_SIZES } from 'src/constants';
import { localImage } from 'gatsby-awd-components/src/mocks/global';
import BrandPromiseHellmanns from 'src/components/BrandPromise/BrandPromiseHellmanns';
import BrandPromiseKnorr from 'src/components/BrandPromise/BrandPromiseKnorr';
import BrandPromiseMaizena from 'src/components/BrandPromise/BrandPromiseMaizena';

const BrandPromisePage: React.FunctionComponent<BrandPromisePageProps> = ({
  data: {
    allArticle: { nodes },
  },
  pageContext,
  location,
}) => {
  const {
    page: { components, seo, type, brand },
  } = pageContext;

  const brandArticles = nodes.map(article => {
    const newArticle = {
      title: article.title,
      fields: {
        slug: article.fields.slug,
      },
      localImage,
      section: article.section,
    };
    return newArticle;
  });

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

  const brandPromiseComponents = {
    knorr: <BrandPromiseKnorr {...{ components, brandArticles }} />,
    hellmanns: <BrandPromiseHellmanns {...{ components, brandArticles }} />,
    maizena: <BrandPromiseMaizena {...{ components }} />,
  };

  return (
    <Layout className={classWrapper}>
      <SEO {...seo} canonical={location.href} />
      <DigitalData title={seo.title} type={type} />
      <section>
        <BrandHero
          content={findPageComponentContent(components, 'BrandHero')}
          titleLevel={1}
          brandLogo={BrandLogo}
        />
      </section>
      {/*
      // @ts-ignore */}
      {brand && brandPromiseComponents[brand]}
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
            twitter: <TwitterIcon />,
            facebook: <FacebookIcon />,
            instagram: <InstagramIcon />,
            youtube: <YoutubeIcon />,
          }}
        />
      </section>

      <section className="_pb--40">
        <Hero
          content={findPageComponentContent(components, 'Hero')}
          viewType="Image"
          imageIsLink={false}
          className="hero--planner color--inverted bg-primary"
          imageSizes={IMAGE_SIZES.HERO}
        />
      </section>
    </Layout>
  );
};

export default BrandPromisePage;

export const pageQuery = graphql`
  query($regexpBrand: String) {
    allArticle(filter: { brand: { regex: $regexpBrand } }) {
      nodes {
        ...ArticleFields
        section
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
