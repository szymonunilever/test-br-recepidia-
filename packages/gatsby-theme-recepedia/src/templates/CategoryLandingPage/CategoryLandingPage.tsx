import {
  Hero,
  Listing,
  Button,
  Tags,
  GenericCarousel,
} from 'gatsby-awd-components/src';
import React, { useCallback, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql, useStaticQuery } from 'gatsby';
import SEO from 'src/components/Seo';
import cx from 'classnames';
import { IMAGE_SIZES } from '../../constants';
import { ReactComponent as ArrowIcon } from '../../svgs/inline/arrow-down.svg';
import { findPageComponentContent } from '../../utils';
import useMedia from '../../utils/useMedia';
import theme from './CategoryLandingPage.module.scss';
import DigitalData from '../../../integrations/DigitalData';
import { WindowLocation } from '@reach/router';
// Component Styles
import '../../scss/pages/_recipeCategories.scss';
import { createCardsFromList, createRecipeCardsFromList } from './helpers';

const CategoryLandingPage = ({
  pageContext,
  data,
  location,
}: CategoryLandingPage) => {
  const INITIAL_COUNT = 4;
  const initialTagsCount = useMedia(undefined, [9, 5]);
  const {
    page: { components, seo, type },
    category,
  } = pageContext;
  let relatedCategoriesContent = findPageComponentContent(
    components,
    'PageListing',
    'RelatedCategories'
  );
  const { localImage, title, description } = category;
  const {
    tags: { nodes: categoryTags },
    seasonalPromo: { nodes: recipesPromo },
    searchPageUrl: { relativePath: searchPath },
  } = data;
  const tagsContent = findPageComponentContent(components, 'Tags');
  const seasonalPromotionsContent = findPageComponentContent(
    components,
    'Carousel',
    'RecipePromotions'
  );
  const heroContent = findPageComponentContent(components, 'Hero');
  const relatedCategories = data.allCategory.nodes;
  relatedCategoriesContent = {
    ...relatedCategoriesContent,
    title: relatedCategoriesContent.title.replace(
      '{categoryTitle}',
      category.titlePlural
    ),
  };
  const [relatedCategoriesDisplaing, setRelatedCategoriesDisplaing] = useState(
    relatedCategories.slice(0, INITIAL_COUNT)
  );

  const onLoadMoreCategories = useCallback(() => {
    setRelatedCategoriesDisplaing(
      relatedCategories.slice(
        0,
        relatedCategoriesDisplaing.length + INITIAL_COUNT
      )
    );
  }, [relatedCategoriesDisplaing]);

  const classWrapper = cx(theme.categoryLandingPage, 'category-landing-page');
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
        title={title}
        description={description}
        canonical={location.href}
      />
      <DigitalData title={title} type={type} />
      {relatedCategoriesContent && relatedCategories.length > 0 && (
        <section className="wrapper">
          <Listing content={relatedCategoriesContent} titleLevel={1}>
            {createCardsFromList(relatedCategoriesDisplaing)}
          </Listing>
          {relatedCategoriesDisplaing.length < relatedCategories.length && (
            <Button
              content={relatedCategoriesContent.cta}
              onClick={onLoadMoreCategories}
            />
          )}
        </section>
      )}
      {tagsContent && categoryTags.length > 0 && (
        <section className="wrapper">
          <Tags
            initialCount={initialTagsCount}
            list={categoryTags}
            content={tagsContent}
          />
        </section>
      )}
      {recipesPromo && recipesPromo.length > 0 && seasonalPromotionsContent && (
        <section className="wrapper">
          <GenericCarousel
            content={seasonalPromotionsContent}
            titleLevel={1}
            config={{
              breakpoints: [
                {
                  width: 768,
                  switchElementsBelowBreakpoint: 1,
                  switchElementsAfterBreakpoint: 1,
                  visibleElementsBelowBreakpoint: 1,
                  visibleElementsAboveBreakpoint: 2,
                },
              ],
              arrowIcon: <ArrowIcon />,
            }}
          >
            {createRecipeCardsFromList(recipesPromo, searchPath)}
          </GenericCarousel>
        </section>
      )}
      {heroContent && (
        <section className="_pb--40">
          <Hero
            content={heroContent}
            viewType="Image"
            className={'hero--planner color--inverted'}
            imageSizes={IMAGE_SIZES.HERO}
          />
        </section>
      )}
    </Layout>
  );
};

export default CategoryLandingPage;
export const query = graphql`
  query($children: [Int], $tags: [Int], $seasonalPromo: [Int]) {
    allCategory(
      filter: { categoryId: { in: $children } }
      sort: { fields: categoryOrder, order: ASC }
    ) {
      nodes {
        ...CategoryFields
      }
    }
    tags: allTag(filter: { tagId: { in: $tags } }) {
      nodes {
        ...TagFields
      }
    }
    seasonalPromo: allRecipe(
      limit: 8
      sort: { order: DESC, fields: creationTime }
      filter: {
        tagGroups: {
          elemMatch: { tags: { elemMatch: { id: { in: $seasonalPromo } } } }
        }
      }
    ) {
      nodes {
        ...RecipeFields
      }
      totalCount
    }
    searchPageUrl: page(type: { eq: "Search" }) {
      relativePath
    }
  }
`;

interface CategoryLandingPage {
  pageContext: {
    page: AppContent.Page;
    category: Internal.Category;
    tags: number[];
    slug: string;
  };
  data: {
    allCategory: {
      nodes: Internal.Category[];
    };
    tags: {
      nodes: Internal.Tag[];
    };
    seasonalPromo: {
      nodes: Internal.Recipe[];
    };
    searchPageUrl: {
      relativePath: string;
    };
  };
  location: WindowLocation;
}
