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
import pageListingData from 'src/components/data/pageListing.json';
import cx from 'classnames';
import MediaGallery from '../../components/lib/components/MediaGallery';
import theme from './ContentHubPage.module.scss';
import FavoriteIcon from '../../svgs/inline/favorite.svg';
import ArrowIcon from 'src/svgs/inline/arrow-down.svg';
import { PageListingViewTypes } from '../../components/lib/components/PageListing/models';
import TagLinks from 'src/components/TagsLinks';
import DigitalData from '../../../integrations/DigitalData';
import { WindowLocation } from '@reach/router';

//TODO: add this part to main page json and remove this import
import relatedArticlesComponent from 'src/components/data/relatedArticlesForContentHub.json';
import useMedia from 'src/utils/useMedia';
import withRecipeSearchResults from 'src/components/withInitialDataAndAsyncLoadMore';
import { WithInitialDataAndAsyncLoadMore } from 'src/components/withInitialDataAndAsyncLoadMore/WithInitialDataAndAsyncLoadMore';

const ContentHubPage: React.FunctionComponent<ContentHubPageProps> = ({
  data,
  pageContext,
  location,
  tagList,
  recipeResults,
  onLoadMoreRecipes,
}) => {
  const {
    page: { components, seo, type },
  } = pageContext;
  const { tag, allArticle } = data;

  const classWrapper = cx(theme.recipeCategoryPage, 'recipe-category-page');
  const recipesListingContent = findPageComponentContent(
    components,
    'RecipeListing',
    'RecipesByCategory'
  );
  const tagLabel = tag.title || fromCamelCase(tag.name);
  const initialRecipeCount = useMedia();

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

      <section className={cx(theme.contenthubRecipes, 'bg--half')}>
        <div className="container">
          <RecipeListing
            content={{
              ...recipesListingContent,
              title: recipesListingContent.title
                .replace('{numRes}', recipeResults.count)
                .replace('{categoryName}', tagLabel),
            }}
            list={recipeResults.list}
            ratingProvider={RatingAndReviewsProvider.kritique}
            viewType={RecipeListViewType.Base}
            loadMoreConfig={{
              type: LoadMoreType.async,
              onLoadMore: onLoadMoreRecipes,
              allCount: recipeResults.count,
            }}
            FavoriteIcon={FavoriteIcon}
            initialCount={useMedia()}
            titleLevel={2}
            recipePerLoad={4}
            withFavorite
            favorites={[]}
            onFavoriteChange={() => {}}
            imageSizes={'(min-width: 768px) 25vw, 50vw'}
          />
        </div>
      </section>
      {allArticle.nodes.length > 0 && (
        <section className="_pb--40 _pt--40">
          <div className="container">
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
          </div>
        </section>
      )}
      <section>
        <div className="container">
          <TagLinks
            list={tagList}
            content={findPageComponentContent(components, 'Tags')}
            initialCount={useMedia(undefined, [9, 5])}
          />
        </div>
      </section>

      <section className="_pb--40">
        <Hero
          content={findPageComponentContent(components, 'Hero')}
          viewType="Image"
          className="hero--planner color--inverted"
        />
      </section>

      <section className="_pb--40 _pt--40">
        <div className="container">
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
        </div>
      </section>
    </Layout>
  );
};

export default withRecipeSearchResults<ContentHubPageProps>(ContentHubPage);

export const query = graphql`
  query($slug: String!, $id: Int) {
    tag(fields: { slug: { eq: $slug } }) {
      name
      tagId
    }

    allRecipe(
      limit: 8
      filter: {
        tagGroups: { elemMatch: { tags: { elemMatch: { id: { eq: $id } } } } }
      }
    ) {
      nodes {
        ...RecipeFields
      }
    }
    allArticle(
      filter: {
        tagGroups: { elemMatch: { tags: { elemMatch: { id: { eq: $id } } } } }
      }
      limit: 4
      sort: { order: DESC, fields: id }
    ) {
      nodes {
        ...ArticleFields
      }
    }

    allTag {
      nodes {
        ...TagFields
      }
    }
  }
`;

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
  };
  pageContext: {
    page: AppContent.Page;
  };
  location: WindowLocation;
}
