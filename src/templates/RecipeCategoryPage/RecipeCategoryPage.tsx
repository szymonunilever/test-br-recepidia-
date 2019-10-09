import React from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql } from 'gatsby';
import SEO from 'src/components/Seo';
import Kritique from 'integrations/Kritique';
import { TagName, Text } from 'src/components/lib/components/Text';
import { findPageComponentContent, getImageAlt } from 'src/utils';
import RecipeListing, {
  RecipeListViewType,
  LoadMoreType,
} from 'src/components/lib/components/RecipeListing';
import { RatingAndReviewsProvider } from 'src/components/lib/models/ratings&reviews';
import Hero from 'src/components/lib/components/Hero';
import PageListing from 'src/components/lib/components/PageListing';
import cx from 'classnames';
// import MediaGallery from '../../components/lib/components/MediaGallery';
import RichText from '../../components/lib/components/RichText';
import theme from '../RecipeCategoryPage/RecipeCategoryPage.module.scss';
import { ReactComponent as FavoriteIcon } from '../../svgs/inline/favorite.svg';
import { PageListingViewTypes } from '../../components/lib/components/PageListing/models';
import AdaptiveImage from '../../components/lib/components/AdaptiveImage';
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
import { Tags } from 'src/components/lib/components/Tags';
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
      <Kritique />
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
          favorites={Array.isArray(favorites) ? favorites : []}
          onFavoriteChange={updateFavoriteState}
          FavoriteIcon={FavoriteIcon}
          withFavorite={true}
          list={recipeResultsList}
          ratingProvider={RatingAndReviewsProvider.kritique}
          viewType={RecipeListViewType.Base}
          loadMoreConfig={{
            type: LoadMoreType.async,
            onLoadMore: onLoadMoreRecipes,
            allCount: recipeResultsCount,
          }}
          titleLevel={2}
          recipePerLoad={4}
          imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
        />
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
