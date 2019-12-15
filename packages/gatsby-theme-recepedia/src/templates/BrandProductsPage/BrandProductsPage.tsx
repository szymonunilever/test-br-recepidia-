import { WindowLocation } from '@reach/router';
import cx from 'classnames';
import { graphql } from 'gatsby';
import {
  BrandSocialChannels,
  Button,
  Card,
  CardLinkWrapper,
  GenericCarousel,
  Hero,
  Listing,
  ProductCardWrapper,
  RatingAndReviewsProvider,
  TagName,
  Text,
} from 'gatsby-awd-components/src';
import React, { useEffect, useState } from 'react';
import SEO from 'src/components/Seo';
import { ReactComponent as FacebookIcon } from 'src/svgs/inline/facebook.svg';
import { ReactComponent as InstagramIcon } from 'src/svgs/inline/instagram.svg';
import { ReactComponent as TwitterIcon } from 'src/svgs/inline/twitter.svg';

import { findPageComponentContent, isBrowser } from 'src/utils';
import DigitalData from '../../../integrations/DigitalData';
import Layout from '../../components/Layout/Layout';
import LookByCategory from '../../components/LookByCategory';
import { IMAGE_SIZES } from '../../constants';
import theme from './BrandProductsPage.module.scss';

const BrandProductsPage: React.FunctionComponent<BrandProductsPageProps> = ({
  pageContext,
  location,
  data: { allProduct },
}) => {
  const [counter, setCounter] = useState(0);
  const {
    page: { components, seo, type, brand },
  } = pageContext;
  const classWrapper = cx(
    theme.BrandProductsPage,
    'recipe-page header--bg',
    brand
  );
  const headerContent = findPageComponentContent(components, 'Header');

  const productCarouselContent = findPageComponentContent(
    components,
    'GenericCarousel',
    'ProductCarousel'
  );
  const featuredProductsContent = findPageComponentContent(
    components,
    'Listing',
    'FeaturedProducts'
  );

  const lookByCategoryContent = findPageComponentContent(
    components,
    'Text',
    'LookByCategory'
  );

  const discoverMoreContent = findPageComponentContent(
    components,
    'CTA',
    'discoverMore'
  );

  const followUs = findPageComponentContent(components, 'Text', 'FollowUs');
  const brandSocial = findPageComponentContent(
    components,
    'BrandSocialChannels'
  );
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
            content={{ ...product, title: product.productName }}
            imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
          />
        </ProductCardWrapper>
      </CardLinkWrapper>
    ));
  const categories = Array.from(
    new Set(allProduct.nodes.map(product => product.category))
  );
  const categoriesInitial = () => {
    let initial: { [key: string]: boolean } = {};
    categories.forEach(category => {
      initial[category] = false;
    });
    return initial;
  };
  const [showFullList, setShowFullList] = useState(categoriesInitial());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  productsSorted = productsSorted.map(product => {
    return {
      ...product,
      description: product.shortPageDescription,
    };
  });
  const featuredProducts = createProductCards(
    productsSorted.filter(
      //@ts-ignore
      product =>
        featuredProductsContent.staticList.indexOf(product.productId) !== -1
    )
  );
  const newestCards = createProductCards(productsSorted.slice(0, 6));
  const categoryCards: { [key: string]: any } = [];
  categories.forEach(cat => {
    categoryCards[cat] = createProductCards(
      //@ts-ignore
      productsSorted.filter(product => product.category === cat)
    );
  });

  const openListCategory = (category: string) => {
    showFullList[category] = true;
    setShowFullList(showFullList);
    setCounter(counter + 1);
  };
  const createCarousels = (category: string) => {
    const query = isBrowser()
      ? ['(min-width: 768px)', '(max-width: 767px)'].findIndex(
          q => matchMedia(q).matches
        )
      : 0;
    if (query === 0) {
      const initialView = categoryCards[category].slice(0, 4);
      return (
        <div>
          {showFullList[category] ? (
            <Listing content={{ title: category }}>
              {categoryCards[category]}
            </Listing>
          ) : (
            <Listing content={{ title: category }}>{initialView}</Listing>
          )}
          {!showFullList[category] && categoryCards[category].length > 4 && (
            <Button
              className="discover-more"
              content={discoverMoreContent}
              onClick={() => {
                openListCategory(category);
              }}
            />
          )}
        </div>
      );
    } else {
      return (
        <GenericCarousel content={{ title: category }}>
          {categoryCards[category]}
        </GenericCarousel>
      );
    }
  };

  useEffect(() => {
    const onResize = () => {
      setCounter(counter + 1);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  return (
    <Layout className={classWrapper}>
      <SEO {...seo} canonical={location.href} />
      <DigitalData title={seo.title} type={type} />
      {headerContent && (
        <section className="wrapper">
          <div>Component Header</div>
        </section>
      )}
      {productCarouselContent && (
        <section className="wrapper">
          <GenericCarousel content={productCarouselContent}>
            {newestCards}
          </GenericCarousel>
        </section>
      )}
      {featuredProductsContent && (
        <section className="wrapper">
          <Listing content={featuredProductsContent}>
            {featuredProducts}
          </Listing>
        </section>
      )}
      {categories && lookByCategoryContent && (
        <section className="wrapper">
          <LookByCategory
            renderIteration={counter}
            categories={categories}
            title={lookByCategoryContent.text}
            createChildren={createCarousels}
          />
        </section>
      )}
      <section className="wrapper">
        {followUs && brandSocial && (
          <Text tag={TagName.h2} text={followUs.text} />
        )}
        {brandSocial && (
          <BrandSocialChannels
            content={brandSocial}
            listIcons={{
              twitter: <TwitterIcon />,
              facebook: <FacebookIcon />,
              instagram: <InstagramIcon />,
            }}
          />
        )}
      </section>
      <section className="_pt--40">
        <Hero
          content={findPageComponentContent(components, 'Hero')}
          viewType="Image"
          className="hero--planner color--inverted"
          imageSizes={IMAGE_SIZES.HERO}
        />
      </section>
    </Layout>
  );
};

export default BrandProductsPage;
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

interface BrandProductsPageProps {
  pageContext: {
    page: AppContent.Page;
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
