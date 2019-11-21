import React, { useCallback } from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql } from 'gatsby';
import SEO from 'src/components/Seo';
import Kritique from 'integrations/Kritique';
import { findPageComponentContent, getImageAlt } from 'src/utils';
import {
  Hero,
  LoadMoreType,
  PageListing,
  PageListingViewTypes,
  RatingAndReviewsProvider,
  RecipeListing,
  RecipeListViewType,
  Tags,
} from 'src/components/lib';

import cx from 'classnames';
// import MediaGallery from '../../components/lib/components/MediaGallery';
import theme from './ContentHubPage.module.scss';
import { ReactComponent as FavoriteIcon } from 'src/svgs/inline/favorite.svg';
import { ReactComponent as ArrowIcon } from 'src/svgs/inline/arrow-down.svg';
import DigitalData from '../../../integrations/DigitalData';
import { WindowLocation } from '@reach/router';
import { getUserProfileByKey, updateFavorites } from 'src/utils/browserStorage';
import { ProfileKey } from 'src/utils/browserStorage/models';
// Component Styles
import '../../scss/pages/_contentHub.scss';
//TODO: add this part to main page json and remove this import
import useMedia from 'src/utils/useMedia';
import withInitialDataAndAsyncLoadMore from 'src/components/withInitialDataAndAsyncLoadMore';
import { WithInitialDataAndAsyncLoadMore } from 'src/components/withInitialDataAndAsyncLoadMore/models';
import useFavorite from 'src/utils/useFavorite';
import { IMAGE_SIZES } from 'src/constants';

const ContentHubPage: React.FunctionComponent<ContentHubPageProps> = ({
  data,
  pageContext,
  location,
  tagList,
  recipeResultsList,
  recipeResultsCount,
  onLoadMoreRecipes,
}) => {
  const {
    page: { components, seo, type },
    name,
  } = pageContext;
  const { tag, allArticle, allCategory } = data;
  const { updateFavoriteState, favorites } = useFavorite(
    () => getUserProfileByKey(ProfileKey.favorites) as number[],
    updateFavorites
  );

  const pageListingData = allCategory.nodes.map(category => ({
    ...category,
    path: category.fields.slug,
    image: {
      alt: getImageAlt(category.title, category.fields.slug),
    },
  }));

  const classWrapper = cx(theme.recipeCategoryPage, 'recipe-category-page');
  const recipesListingContent = findPageComponentContent(
    components,
    'RecipeListing',
    'RecipesByCategory'
  );

  const onLoadMore = useCallback(() => {
    return onLoadMoreRecipes([], 'creationTime', 4, {
      query: name,
      fields: ['tagGroups.tags.name'],
    });
  }, [recipeResultsList]);

  return (
    <Layout className={classWrapper}>
      <SEO
        {...seo}
        title={tag.title}
        description={`Receitas - ${tag.title}`}
        canonical={location.href}
      />
      <DigitalData title={tag.title} type={type} />
      <Kritique />

      <section className={cx(theme.contentHubRecipes, 'bg--half wrapper')}>
        <RecipeListing
          content={{
            ...recipesListingContent,
            title: recipesListingContent.title
              .replace('{numRes}', recipeResultsCount)
              .replace('{categoryName}', `\n${tag.title}`),
          }}
          favorites={Array.isArray(favorites) ? favorites : []}
          onFavoriteChange={updateFavoriteState}
          FavoriteIcon={FavoriteIcon}
          withFavorite={true}
          list={recipeResultsList}
          ratingProvider={RatingAndReviewsProvider.kritique}
          viewType={RecipeListViewType.Base}
          loadMoreConfig={{
            type: LoadMoreType.async,
            onLoadMore,
            allCount: recipeResultsCount,
          }}
          initialCount={useMedia()}
          titleLevel={1}
          recipePerLoad={4}
          imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
        />
      </section>
      {/* {!!allArticle && allArticle.nodes.length > 0 && (
        <section className="_pb--40 _pt--40 wrapper">
          <MediaGallery
            // content={findPageComponentContent(
            //   components,
            //   'MediaGallery',
            //   'RelatedArticles'
            // )}
            content={relatedArticlesComponent.content}
            list={allArticle.nodes}
            allCount={allArticle.nodes.length}
            onLoadMore={() => {}}
          />
        </section>
      )} */}
      <section className={theme.tagList}>
        <Tags
          list={tagList}
          content={findPageComponentContent(components, 'Tags')}
          initialCount={useMedia(undefined, [9, 5])}
        />
      </section>

      <section className="_pb--40">
        <Hero
          content={findPageComponentContent(components, 'Hero')}
          viewType="Image"
          className="hero--planner color--inverted"
          imageSizes={IMAGE_SIZES.HERO}
        />
      </section>

      <section className="_pb--40 _pt--40 wrapper">
        <PageListing
          content={findPageComponentContent(
            components,
            'PageListing',
            'RecipeCategories'
          )}
          viewType={PageListingViewTypes.carousel}
          list={pageListingData}
          carouselConfig={{
            arrowIcon: <ArrowIcon />,
          }}
          imageSizes={IMAGE_SIZES.PAGE_LISTINGS.CAROUSEL}
        />
      </section>
    </Layout>
  );
};

export default withInitialDataAndAsyncLoadMore<ContentHubPageProps>(
  ContentHubPage
);

export const query = graphql`
  query($slug: String, $name: String) {
    tag(fields: { slug: { eq: $slug } }) {
      name
      title
      tagId
      id
    }

    allRecipe(
      limit: 8
      sort: { order: DESC, fields: creationTime }
      filter: {
        tagGroups: {
          elemMatch: { tags: { elemMatch: { name: { eq: $name } } } }
        }
      }
    ) {
      nodes {
        ...RecipeFields
      }
      totalCount
    }

    allTag {
      nodes {
        ...TagFields
      }
    }

    allCategory(
      limit: 15
      filter: { showOnHomepage: { ne: 0 } }
      sort: { order: ASC, fields: showOnHomepage }
    ) {
      nodes {
        ...CategoryFields
      }
    }
  }
`;
// @todo use when articles are there
// allArticle(
//   filter: {
//     tagGroups: { elemMatch: { tags: { elemMatch: { id: { eq: $id } } } } }
//   }
//   limit: 4
//   sort: { order: DESC, fields: id }
// ) {
//   nodes {
//     ...ArticleFields
//   }
// }

interface ContentHubPageProps extends WithInitialDataAndAsyncLoadMore {
  data: {
    tag: Internal.Tag;
    allRecipe: {
      nodes: Internal.Recipe[];
    };
    allTag: {
      nodes: Internal.Tag[];
    };
    allArticle: {
      nodes: Internal.Article[];
    };
    allCategory: {
      nodes: Internal.Category[];
    };
  };
  pageContext: {
    page: AppContent.Page;
    name: string;
  };
  location: WindowLocation;
}
