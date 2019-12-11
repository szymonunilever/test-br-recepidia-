import React from 'react';
import Layout from '../../components/Layout/Layout';
import SEO from 'src/components/Seo';
import theme from './BrandProductDetailsPage.module.scss';
import cx from 'classnames';
import { findPageComponentContent } from 'src/utils';
import DigitalData from '../../../integrations/DigitalData';
import { WindowLocation } from '@reach/router';
import {
  SocialIcons,
  SocialSharing,
  SocialSharingViewType,
  ProductHero,
  ProductCopy,
  ProductCopyViewType,
  ProductNutrients,
  ButtonViewType,
  Button,
} from 'gatsby-awd-components/src';
import AddThis from '../../../integrations/AddThis';
import { ReactComponent as CloseIcon } from 'gatsby-awd-components/src/svgs/inline/x-mark.svg';
import { ReactComponent as FacebookIcon } from 'gatsby-awd-components/src/svgs/inline/facebook.svg';
import { ReactComponent as TwitterIcon } from 'gatsby-awd-components/src/svgs/inline/twitter.svg';
import { ReactComponent as PinterestIcon } from 'gatsby-awd-components/src/svgs/inline/pinterest.svg';
import { ReactComponent as OpenModelButtonIcon } from 'gatsby-awd-components/src/svgs/inline/social-sharing.svg';
import { localImage } from 'gatsby-awd-components/src/mocks/global';

const BrandProductDetailsPage: React.FunctionComponent<
  BrandProductDetailsPageProps
> = ({ pageContext, location }) => {
  const {
    page: { components, seo, type },
    product,
  } = pageContext;
  const classWrapper = cx(theme.productPage, 'product-page header--bg');

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

  const productHero = (
    <>
      <ProductHero
        content={product}
        localImage={localImage}
        imageSizes={'(max-width: 1366px) 100vw, 800px'}
      />
      <div className={theme.productHeroActions}>
        <>
          <SocialSharing
            content={findPageComponentContent(components, 'SocialSharing')}
            viewType={SocialSharingViewType.Modal}
            CloseButtonIcon={CloseIcon}
            icons={socialIcons}
            titleLevel={4}
            WidgetScript={AddThis}
            OpenModelButtonIcon={OpenModelButtonIcon}
          />
        </>
      </div>
    </>
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
      <section className={cx(theme.productPageHero, '_bg--main wrapper')}>
        <div className={theme.productTopBlock}>
          <div className={theme.productTopBlockItem}>
            <div className={theme.productHeroDesktop}>{productHero}</div>
          </div>
          <div className={theme.productTopBlockItem}>
            <div className={theme.productHeroMobile}>{productHero}</div>
            <div className={theme.productBlockTitle}>
              <ProductCopy
                viewType={ProductCopyViewType.Title}
                product={product}
                content={{}}
                className="product-copy__title"
              />
            </div>
            <div className={theme.productBlockDescription}>
              <ProductCopy
                viewType={ProductCopyViewType.Description}
                product={product}
                content={{}}
                className="product-copy__description"
              />
            </div>
            <Button
              viewType={ButtonViewType.icon}
              content={{ label: 'Buy Now' }}
              className={theme.productPageButton}
            />
          </div>
        </div>
      </section>
      <section>
        <div
          className={cx(theme.productAttributes, '_pb--40 , _pt--40 wrapper')}
        >
          <div className={cx(theme.productAttributesColumn)}>
            <ProductCopy
              viewType={ProductCopyViewType.Ingredients}
              product={mock}
              content={findPageComponentContent(
                components,
                'ProductCopy',
                'Ingredients'
              )}
            />
            <ProductCopy
              viewType={ProductCopyViewType.Allergy}
              product={mock}
              content={findPageComponentContent(
                components,
                'ProductCopy',
                'Allergy'
              )}
            />
          </div>
          <div className={cx(theme.productAttributesColumn)}>
            <ProductNutrients
              content={findPageComponentContent(components, 'ProductNutrients')}
              nutritionFacts={mock.nutritionFacts}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BrandProductDetailsPage;

interface BrandProductDetailsPageProps {
  pageContext: {
    page: AppContent.Page;
    product: Internal.Product;
  };
  location: WindowLocation;
}
