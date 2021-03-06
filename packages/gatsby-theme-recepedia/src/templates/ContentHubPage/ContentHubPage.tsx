import React, { useCallback } from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql } from 'gatsby';
import SEO from 'src/components/Seo';
import { findPageComponentContent, getImageAlt } from 'src/utils';
import {
  RecipeCard,
  CardLinkWrapper,
  Button,
  Hero,
  LoadMoreType,
  PageListing,
  PageListingViewTypes,
  RatingAndReviewsProvider,
  RecipeListing,
  RecipeListViewType,
  Tags,
} from 'gatsby-awd-components/src';

import cx from 'classnames';
import { favoriteButtonDefaults } from '../../themeDefaultComponentProps';
import theme from './ContentHubPage.module.scss';
import { ReactComponent as ArrowIcon } from 'src/svgs/inline/arrow-down.svg';
import DigitalData from '../../../integrations/DigitalData';
import { WindowLocation } from '@reach/router';
import { getUserProfileByKey, updateFavorites } from 'src/utils/browserStorage';
import { ProfileKey } from 'src/utils/browserStorage/models';
// Component Styles
import '../../scss/pages/_contentHub.scss';
//TODO: add this part to main page json and remove this import
import useMedia from 'src/utils/useMedia';
import withRecipeAsyncLoadMore from 'src/components/withRecipeAsyncLoadMore';
import { WithRecipeAsyncLoadMore } from 'src/components/withRecipeAsyncLoadMore/models';
import useFavorite from 'src/utils/useFavorite';
import { IMAGE_SIZES } from 'src/constants';
import { getPagePath } from '../../utils/getPagePath';

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
  const brandLogoLink = getPagePath('Search');

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
    // @ts-ignore
    return onLoadMoreRecipes([], { creationTime: { order: 'DESC' } }, 4, {
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

      <section className={cx(theme.contentHubRecipes, 'bg--half wrapper')}>
        <RecipeListing
          content={{
            ...recipesListingContent,
            title: recipesListingContent.title
              .replace('{numRes}', recipeResultsCount)
              .replace('{categoryName}', `\n${tag.title}`),
          }}
          list={recipeResultsList}
          ratingProvider={RatingAndReviewsProvider.inline}
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
          brandLogoLink={brandLogoLink}
        >
          {recipeResultsList
            ? recipeResultsList.map(recipe => (
                <CardLinkWrapper
                  title={recipe.title}
                  key={recipe.id}
                  slug={recipe.fields.slug}
                  cardKey={recipe.id}
                >
                  <RecipeCard
                    key={recipe.id}
                    {...recipe}
                    slug={recipe.fields.slug}
                    ratingProvider={RatingAndReviewsProvider.inline}
                    imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
                    content={{ title: recipe.title }}
                  >
                    <Button
                      {...favoriteButtonDefaults}
                      isSelected={favorites.indexOf(recipe.recipeId) !== -1}
                      onClick={updateFavoriteState}
                    />
                  </RecipeCard>
                </CardLinkWrapper>
              ))
            : []}
        </RecipeListing>
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

export default withRecipeAsyncLoadMore<ContentHubPageProps>(ContentHubPage);

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

interface ContentHubPageProps extends WithRecipeAsyncLoadMore {
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
