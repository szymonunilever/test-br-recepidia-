import React from 'react';
import cx from 'classnames';
import { WindowLocation } from '@reach/router';

import {
  SocialIcons,
  SocialSharing,
  SocialSharingViewType,
  ProductHero,
  ProductCopy,
  ProductCopyViewType,
  ProductNutrients,
  Button,
  CardLinkWrapper,
  ProductCardWrapper,
  RatingAndReviewsProvider,
  Card,
  Text,
  TagName,
  BrandSocialChannels,
  Hero,
  GenericCarousel,
} from 'gatsby-awd-components/src';
import { findPageComponentContent } from 'src/utils';
import BrandHero from 'src/components/BrandHero';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo';
import AddThis from '../../../integrations/AddThis';
import DigitalData from '../../../integrations/DigitalData';
import { localImage } from 'gatsby-awd-components/src/mocks/global';
import { IMAGE_SIZES } from 'src/constants';
import { graphql, navigate } from 'gatsby';

import theme from './BrandProductDetailsPage.module.scss';
import themeHellmanns from './BrandProductDetailsPageHellmanns.module.scss';
import themeKnorr from './BrandProductDetailsPageKnorr.module.scss';
import themeMaizena from './BrandProductDetailsPageMaizena.module.scss';

import { ReactComponent as KnorrLogoIcon } from '../../svgs/inline/logo-knorr.svg';
import { ReactComponent as HellmannsLogoIcon } from '../../svgs/inline/logo-hellmanns.svg';
import { ReactComponent as MaizenaLogoIcon } from '../../svgs/inline/logo-maizena.svg';
import { ReactComponent as InstagramIcon } from '../../svgs/inline/instagram.svg';
import { ReactComponent as CloseIcon } from 'gatsby-awd-components/src/svgs/inline/x-mark.svg';
import { ReactComponent as CartIcon } from 'gatsby-awd-components/src/svgs/inline/cart.svg';
import { ReactComponent as FacebookIcon } from '../../svgs/inline/facebook.svg';
import { ReactComponent as TwitterIcon } from '../../svgs/inline/twitter.svg';
import { ReactComponent as YoutubeIcon } from '../../svgs/inline/youtube.svg';
import { ReactComponent as PinterestIcon } from '../../svgs/inline/pinterest.svg';
import { ReactComponent as OpenModelButtonIcon } from '../../svgs/inline/social-sharing-circle.svg';
import { ReactComponent as ArrowIcon } from '../../svgs/inline/arrow-down.svg';

const BrandProductDetailsPage: React.FunctionComponent<
  BrandProductDetailsPageProps
> = ({ pageContext, location, data: { allProduct } }) => {
  const {
    page: { components, seo, type },
    product,
  } = pageContext;

  const currentBrand = product.brand.toLowerCase();
  const onDiscoverClick = () => {
    navigate(`${currentBrand}/products/#${product.category}`);
  };

  const carouselConfig = {
    breakpoints: [
      {
        width: 768,
        switchElementsBelowBreakpoint: 1,
        switchElementsAfterBreakpoint: 1,
        visibleElementsBelowBreakpoint: 2,
        visibleElementsAboveBreakpoint: 4,
      },
    ],
    arrowIcon: <ArrowIcon />,
  };

  const mock = {
    brand: 'Knorr',
    fields: {
      slug: '',
    },
    id: '1',
    longPageDescription: '',
    productId: '1',
    productName: 'Name',
    productTags: ['unilever:knorr/product/type/chicken'],
    ingredients: [
      'Pasta (durum WHEAT semolina, WHEAT semolina) (65%)',
      'salt',
      'potato starch, yeast extract',
      'flavourings (contain CELERY)',
      'chicken (3%)',
      'chicken fat (2.5%)',
      'toasted onion powder',
      'potassium chloride',
      'sugar',
      'palm oil',
      'spices (CELERY seeds, turmeric, pepper)',
      'parsley',
      'antioxidants (extracts of rosemary, alpha-tocopherol, ascorbyl palmitate)',
    ],
    allergy: ['allergen 1', 'Allergen 2'],
    nutritionFacts: [
      {
        position: 0,
        unit: '<20',
        displayUnit: 'mg',
        dv: 'dv',
        rawValue: 20,
        name: 'Nutrition Fact 1',
        ri: 'ri',
        description: 'description',
      },
      {
        position: 0,
        unit: '<20',
        displayUnit: 'mg',
        dv: 'dv',
        rawValue: 2,
        name: 'Nutrition Fact 2',
        ri: 'ri',
        description: 'description',
      },
      {
        position: 0,
        unit: '<20',
        displayUnit: 'mg',
        dv: 'dv',
        rawValue: 120,
        name: 'Nutrition Fact 3',
        ri: 'ri',
        description: 'description',
      },
      {
        position: 0,
        unit: '<20',
        displayUnit: 'mg',
        dv: 'dv',
        rawValue: 200,
        name: 'Nutrition Fact 4',
        ri: 'ri',
        description: 'description',
      },
    ],
  };

  const socialIcons: SocialIcons = {
    facebook: FacebookIcon,
    twitter: TwitterIcon,
    pinterest: PinterestIcon,
  };

  const featuredProductsContent = findPageComponentContent(
    components,
    'Listing',
    'FeaturedProducts'
  );

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

  // @ts-ignore
  const currentBrandContent = product.brand && brandsContent[currentBrand];
  const BrandLogo = currentBrandContent.logo;
  let brandTheme = currentBrandContent && currentBrandContent.theme;

  const classWrapper = cx(
    theme.productPage,
    brandTheme.brandProductPage,
    'brand-page',
    'product-page',
    currentBrand
  );

  let productsSorted: any = allProduct.nodes.sort((a, b) => {
    if (
      new Date(a.productLaunchDate).valueOf() <
      new Date(b.productLaunchDate).valueOf()
    )
      return 1;
    if (
      new Date(a.productLaunchDate).valueOf() >
      new Date(b.productLaunchDate).valueOf()
    )
      return -1;
    return 0;
  });

  //@ts-ignore
  const createProductCards = list =>
    //@ts-ignore
    list.map(product => (
      <CardLinkWrapper
        key={product.fields.slug}
        title={product.productName}
        slug={product.fields.slug}
      >
        <ProductCardWrapper
          key={product.fields.slug}
          ratingProvider={RatingAndReviewsProvider.none}
        >
          <Card
            showDescription
            idPropertyName="productId"
            key={product.fields.slug}
            content={{
              ...product,
              title: product.productName,
              description: product.shortPageDescription,
            }}
            imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
          />
        </ProductCardWrapper>
      </CardLinkWrapper>
    ));

  const featuredProducts = createProductCards(
    productsSorted.filter(
      //@ts-ignore
      product =>
        featuredProductsContent.staticList.indexOf(product.productId) !== -1
    )
  );

  const brandHero = (
    <section>
      <BrandHero
        content={findPageComponentContent(components, 'BrandHero')}
        titleLevel={2}
        brandLogo={BrandLogo}
      />
    </section>
  );

  const productHero = (
    <>
      <ProductHero
        content={product}
        localImage={localImage}
        imageSizes={'(max-width: 1366px) 100vw, 800px'}
      />
      <div className={theme.product__headingSocialSharing}>
        <SocialSharing
          content={findPageComponentContent(components, 'SocialSharing')}
          viewType={SocialSharingViewType.Modal}
          CloseButtonIcon={CloseIcon}
          icons={socialIcons}
          titleLevel={4}
          WidgetScript={AddThis}
          OpenModelButtonIcon={OpenModelButtonIcon}
        />
      </div>
    </>
  );

  const mealPlanner = (
    <section className="_pb--40">
      <Hero
        content={findPageComponentContent(components, 'Hero')}
        viewType="Image"
        imageIsLink={false}
        className="hero--planner color--inverted bg-primary"
      />
    </section>
  );

  const brandSocialChannels = (
    <section className="wrapper bg-primary brand-social _pt--40 _pb--40">
      <div className="bow-white" />
      <Text
        tag={TagName.h2}
        text={
          findPageComponentContent(components, 'BrandSocialChannelsTitle').title
        }
        className="brand-social__title _pt--40"
      />
      <BrandSocialChannels
        className="brand-social__list"
        content={findPageComponentContent(components, 'BrandSocialChannels')}
        listIcons={{
          facebook: <FacebookIcon />,
          instagram: <InstagramIcon />,
          twitter: <TwitterIcon />,
          youtube: <YoutubeIcon />,
        }}
      />
    </section>
  );

  const relatedProducts = (
    <>
      {featuredProductsContent && (
        <GenericCarousel
          className={cx(brandTheme.product__attributesRelated)}
          content={featuredProductsContent}
          titleLevel={3}
          config={carouselConfig}
        >
          {featuredProducts}
        </GenericCarousel>
      )}
      {featuredProducts.length >= 4 && (
        <div
          className={cx(
            theme.product__attributesRelatedButtonWrapper,
            'product__attribute-related-button-wrapper'
          )}
        >
          <Button
            className={cx(
              theme.product__attributesRelatedButton,
              brandTheme.product__attributesRelatedButton,
              'product__attributes-related-button'
            )}
            content={findPageComponentContent(
              components,
              'CTA',
              'discoverMore'
            )}
            onClick={onDiscoverClick}
          />
        </div>
      )}
    </>
  );

  const productNutrients = (
    <ProductNutrients
      titleLevel={3}
      className={cx(brandTheme.product__nutrients)}
      content={findPageComponentContent(components, 'ProductNutrients')}
      nutritionFacts={mock.nutritionFacts}
    />
  );

  const productHeader = (
    <section className={cx(theme.product__heading, 'bg-secondary wrapper')}>
      <div className={theme.product__headingTitleMobile}>
        <ProductCopy
          viewType={ProductCopyViewType.Title}
          product={product}
          content={{}}
          titleLevel={1}
          className="product-copy__title"
        />
      </div>
      <div
        className={cx(
          theme.product__headingContainer,
          brandTheme.product__headingContainer
        )}
      >
        <div className={theme.product__headingHeroWrapper}>{productHero}</div>
        <div className={theme.product__headingInfoWrapper}>
          <div
            className={cx(
              theme.product__headingTitleDesktop,
              brandTheme.product__headingTitleDesktop
            )}
          >
            <ProductCopy
              viewType={ProductCopyViewType.Title}
              product={product}
              content={{}}
              titleLevel={1}
              className="product-copy__title"
            />
          </div>
          <ProductCopy
            viewType={ProductCopyViewType.Description}
            product={product}
            content={{}}
            className="product-copy__description"
          />
          <Button
            Icon={<CartIcon />}
            content={{ label: 'Buy It Now' }}
            className={cx(
              theme.product__headingButton,
              'product__heading-button'
            )}
          />
        </div>
      </div>
    </section>
  );

  const productBody = (
    <section
      className={cx(
        theme.product__attributesWrapper,
        '_pb--40 _pt--40 bg-primary bg-primary--wave up-to wrapper'
      )}
    >
      <div
        className={cx(
          theme.product__attributes,
          brandTheme.product__attributes
        )}
      >
        <div className={cx(theme.product__attributesColumn)}>
          <ProductCopy
            viewType={ProductCopyViewType.Ingredients}
            product={mock}
            titleLevel={3}
            content={findPageComponentContent(
              components,
              'ProductCopy',
              'Ingredients'
            )}
          />
          <ProductCopy
            viewType={ProductCopyViewType.Allergy}
            product={mock}
            titleLevel={3}
            content={findPageComponentContent(
              components,
              'ProductCopy',
              'Allergy'
            )}
          />
        </div>
        <div className={cx(theme.product__attributesColumn)}>
          {productNutrients}
        </div>
      </div>
      <div className={cx(theme.product__attributesRelated)}>
        {relatedProducts}
      </div>
    </section>
  );

  if (localImage) {
    const seoImage = seo.meta.find(item => {
      return item.name == 'og:image';
    });
    seoImage && (seoImage.content = localImage.childImageSharp.fluid.src);
  }

  return (
    <Layout className={classWrapper}>
      <SEO
        {...seo}
        canonical={location.href}
        title={product.productName}
        description={product.longPageDescription}
      />
      <DigitalData title={seo.title} type={type} />
      {brandHero}
      {productHeader}
      {productBody}
      {brandSocialChannels}
      {mealPlanner}
    </Layout>
  );
};

export default BrandProductDetailsPage;
// we need have brand prop in context
export const query = graphql`
  query($regexpBrand: String) {
    allProduct(filter: { brand: { regex: $regexpBrand } }) {
      nodes {
        brand
        id
        productId
        productName
        productLaunchDate
        shortPageDescription
        productTags
        category
        fields {
          slug
        }
        images {
          childImageSharp {
            fluid {
              ...ProductImage
            }
          }
        }
      }
    }
  }
`;

interface BrandProductDetailsPageProps {
  pageContext: {
    page: AppContent.Page;
    product: Internal.Product;
  };
  data: {
    allProduct: {
      nodes: [
        {
          brand: string;
          id: string;
          productId: number;
          productName: string;
          productLaunchDate: string;
          shortPageDescription: string;
          productTags: Internal.Tag[];
          category: string;
          fields: { slug: string };
          images: Internal.LocalImage[];
        }
      ];
    };
  };
  location: WindowLocation;
}
