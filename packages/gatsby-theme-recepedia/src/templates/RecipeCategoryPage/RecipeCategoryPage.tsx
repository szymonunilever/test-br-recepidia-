import React from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql } from 'gatsby';
import SEO from 'src/components/Seo';
import {
  RecipeCard,
  RecipeCardLinkWrapper,
  AdaptiveImage,
  Hero,
  LoadMoreType,
  PageListing,
  RecipeListing,
  RecipeListViewType,
  TagName,
  Tags,
  Text,
  RatingAndReviewsProvider,
  RichText,
  PageListingViewTypes,
  Button,
} from 'gatsby-awd-components/src';
import { findPageComponentContent, getImageAlt } from 'src/utils';
import cx from 'classnames';
import {
  favoriteButtonDefaults,
  RecipeListingIcons as recipeListingIcons,
} from '../../themeDefaultComponentProps';
import theme from '../RecipeCategoryPage/RecipeCategoryPage.module.scss';
import DigitalData from '../../../integrations/DigitalData';
import { ReactComponent as ArrowIcon } from 'src/svgs/inline/arrow-down.svg';
import useMedia from 'src/utils/useMedia';
import { WindowLocation } from '@reach/router';
// Component Styles
import '../../scss/pages/_recipeCategories.scss';
//TODO: add this part to main page json and remove this import
import withInitialDataAndAsyncLoadMore from 'src/components/withInitialDataAndAsyncLoadMore';
import { WithInitialDataAndAsyncLoadMore } from 'src/components/withInitialDataAndAsyncLoadMore/models';
import { getUserProfileByKey, updateFavorites } from 'src/utils/browserStorage';
import { ProfileKey } from 'src/utils/browserStorage/models';
import useFavorite from 'src/utils/useFavorite';
import { IMAGE_SIZES } from 'src/constants';

const RecipeCategoryPage = ({
  data,
  pageContext,
  location,
  recipeResultsList,
  recipeResultsCount,
  onLoadMoreRecipes,
}: RecipeCategoryPageProps) => {
  const {
    page: { components, seo, type },
    category,
  } = pageContext;

  const { localImage, title, description } = category;
  const {
    tags: { nodes: categoryTags },
    allArticle,
    allCategory,
  } = data;
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
  const initialTagsCount = useMedia(undefined, [9, 5]);
  const { updateFavoriteState, favorites } = useFavorite(
    () => getUserProfileByKey(ProfileKey.favorites) as number[],
    updateFavorites
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
        title={title}
        description={description}
        canonical={location.href}
      />
      <DigitalData title={title} type={type} />
      <section className="_pt--40">
        <Text
          className={cx(theme.heroTitle, 'wrapper')}
          tag={TagName['h1']}
          text={title}
        />
      </section>
      <section>
        <div className="container">
          <RichText
            type="html"
            className={cx(theme.heroDescription, 'wrapper')}
            content={{ text: description }}
          />
        </div>
      </section>
      {localImage && (
        <section className={cx(theme.heroBg, 'wrapper')}>
          <AdaptiveImage
            className={theme.heroBgImage}
            localImage={localImage}
            alt={getImageAlt(title, category.fields.slug)}
            sizes={'(max-width: 1366px) 100vw, 1100px'}
          />
        </section>
      )}
      <section
        className={cx(
          theme.greyBg,
          theme.recipeCategoryPageRecipes,
          '_bg--main wrapper'
        )}
      >
        <RecipeListing
          content={{
            ...recipesListingContent,
            title: recipesListingContent.title.replace(
              '{numRes}',
              recipeResultsCount
            ),
          }}
          icons={recipeListingIcons}
          list={recipeResultsList}
          ratingProvider={RatingAndReviewsProvider.inline}
          viewType={RecipeListViewType.Base}
          loadMoreConfig={{
            type: LoadMoreType.async,
            onLoadMore: onLoadMoreRecipes,
            allCount: recipeResultsCount,
          }}
          titleLevel={2}
          recipePerLoad={4}
          imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
        >
          {recipeResultsList
            ? recipeResultsList.map(recipe => (
                <RecipeCardLinkWrapper
                  title={recipe.title}
                  key={recipe.id}
                  slug={recipe.fields.slug}
                >
                  <RecipeCard
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
                </RecipeCardLinkWrapper>
              ))
            : []}
        </RecipeListing>
      </section>
      {/* {!!allArticle && allArticle.nodes.length > 0 && (
        <section className="_pb--40 _pt--40">
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
      {categoryTags.length > 0 && (
        <section className={theme.tagList}>
          <Tags
            initialCount={initialTagsCount}
            list={categoryTags}
            content={findPageComponentContent(components, 'Tags')}
          />
        </section>
      )}

      <section className="_pb--40">
        <Hero
          content={findPageComponentContent(components, 'Hero')}
          viewType="Image"
          className={'hero--planner color--inverted'}
          imageSizes={IMAGE_SIZES.HERO}
        />
      </section>

      <section
        className={cx(theme.recipeBottomCarousel, '_pt--40 _pb--40 wrapper')}
      >
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

export default withInitialDataAndAsyncLoadMore(RecipeCategoryPage);

export const query = graphql`
  query($tags: [Int], $slug: String) {
    allRecipe(
      limit: 8
      sort: { order: DESC, fields: creationTime }
      filter: {
        tagGroups: { elemMatch: { tags: { elemMatch: { id: { in: $tags } } } } }
      }
    ) {
      nodes {
        ...RecipeFields
      }
      totalCount
    }

    tags: allTag(filter: { tagId: { in: $tags } }) {
      nodes {
        ...TagFields
      }
    }

    allCategory(
      limit: 15
      filter: { showOnHomepage: { ne: 0 }, fields: { slug: { ne: $slug } } }
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

interface RecipeCategoryPageProps extends WithInitialDataAndAsyncLoadMore {
  data: {
    allRecipe: {
      nodes: Internal.Recipe[];
    };
    allArticle: {
      nodes: Internal.Article[];
    };
    tags: {
      nodes: Internal.Tag[];
    };
    allCategory: {
      nodes: Internal.Category[];
    };
  };
  pageContext: {
    page: AppContent.Page;
    category: Internal.Category;
    tags: number[];
    recipeDetails: AppContent.Category.RecipeDetails;
    slug: string;
  };
  location: WindowLocation;
}