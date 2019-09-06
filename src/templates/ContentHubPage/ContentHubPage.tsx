import React from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql } from 'gatsby';
import SEO from 'src/components/Seo';
import Kritique from 'integrations/Kritique';
import { findPageComponentContent, fromCamelCase } from 'src/utils';
import RecipeListing, {
  RecipeListViewType,
  LoadMoreType,
} from 'src/components/lib/components/RecipeListing';
import { RatingAndReviewsProvider } from 'src/components/lib/models/ratings&reviews';
import Hero from 'src/components/lib/components/Hero';
import PageListing from 'src/components/lib/components/PageListing';

import cx from 'classnames';
import MediaGallery from '../../components/lib/components/MediaGallery';
import theme from './ContentHubPage.module.scss';
import { ReactComponent as FavoriteIcon } from '../../svgs/inline/favorite.svg';
import { ReactComponent as ArrowIcon } from 'src/svgs/inline/arrow-down.svg';
import { PageListingViewTypes } from '../../components/lib/components/PageListing/models';
import DigitalData from '../../../integrations/DigitalData';
import { WindowLocation } from '@reach/router';
import { getUserProfileByKey, updateFavorites } from 'src/utils/browserStorage';
import { ProfileKey } from 'src/utils/browserStorage/models';
// Component Styles
import '../../scss/pages/_contentHub.scss';
//TODO: add this part to main page json and remove this import
import relatedArticlesComponent from 'src/components/data/relatedArticlesForContentHub.json';
import useMedia from 'src/utils/useMedia';
import withInitialDataAndAsyncLoadMore from 'src/components/withInitialDataAndAsyncLoadMore';
import { WithInitialDataAndAsyncLoadMore } from 'src/components/withInitialDataAndAsyncLoadMore/models';
import useFavorite from 'src/utils/useFavorite';
import { Tags } from 'src/components/lib/components/Tags';

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
  } = pageContext;
  const { tag, allArticle, allCategory } = data;
  const RecipeListingWithFavorite = useFavorite(
    (getUserProfileByKey(ProfileKey.favorites) as number[]) || [],
    updateFavorites,
    RecipeListing,
    FavoriteIcon
  );

  const pageListingData = allCategory.nodes.map(category => ({
    ...category,
    path: category.fields.slug,
  }));
  const classWrapper = cx(theme.recipeCategoryPage, 'recipe-category-page');
  const recipesListingContent = findPageComponentContent(
    components,
    'RecipeListing',
    'RecipesByCategory'
  );
  const tagLabel = tag.title || fromCamelCase(tag.name);

  return (
    <Layout className={classWrapper}>
      <SEO
        {...seo}
        title={tagLabel}
        description={tag.description}
        canonical={location.href}
      />
      <DigitalData title={tagLabel} type={type} />
      <Kritique />

      <section className={cx(theme.contentHubRecipes, 'bg--half wrapper')}>
        <RecipeListingWithFavorite
          content={{
            ...recipesListingContent,
            title: recipesListingContent.title
              .replace('{numRes}', recipeResultsCount)
              .replace('{categoryName}', `\n${tagLabel}`),
          }}
          list={recipeResultsList}
          ratingProvider={RatingAndReviewsProvider.kritique}
          viewType={RecipeListViewType.Base}
          loadMoreConfig={{
            type: LoadMoreType.async,
            onLoadMore: onLoadMoreRecipes,
            allCount: recipeResultsCount,
          }}
          initialCount={useMedia()}
          titleLevel={1}
          recipePerLoad={4}
          imageSizes={'(min-width: 768px) 300w, 300px'}
        />
      </section>
      {!!allArticle && allArticle.nodes.length > 0 && (
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
      )}
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
      tagId
    }

    allRecipe(
      limit: 8
      sort: { order: ASC, fields: creationTime }
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
    tag: {
      name: string;
      description: string;
      title: string;
      tagId: string;
      assets: {
        localImage: Internal.LocalImage;
      }[];
    };
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
  };
  location: WindowLocation;
}
