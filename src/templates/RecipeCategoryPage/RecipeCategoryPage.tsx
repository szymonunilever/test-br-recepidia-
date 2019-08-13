import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql } from 'gatsby';
import SEO from 'src/components/Seo';
import Kritique from 'integrations/Kritique';
import { TagName, Text } from 'src/components/lib/components/Text';
import {
  useElasticSearch,
  findPageComponentContent,
  fromCamelCase,
} from 'src/utils';
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
import theme from '../RecipeCategoryPage/RecipeCategoryPage.module.scss';
import FavoriteIcon from '../../svgs/inline/favorite.svg';
import { PageListingViewTypes } from '../../components/lib/components/PageListing/models';
import { action } from '@storybook/addon-actions';
import AdaptiveImage from '../../components/lib/components/AdaptiveImage';
import TagLinks from 'src/components/TagsLinks/TagLinks';
import DigitalData from '../../../integrations/DigitalData';
import ArrowIcon from 'src/svgs/inline/arrow-down.svg';
import useMedia from 'src/utils/useMedia';
import { getTagsFromRecipes } from 'src/utils/getTagsFromRecipes';
import { WindowLocation } from '@reach/router';
import keys from 'integrations/keys.json';
import { get } from 'lodash';

//TODO: add this part to main page json and remove this import
import relatedArticlesComponent from 'src/components/data/relatedArticlesForContentHub.json';
import { SearchParams } from 'src/components/lib/components/SearchListing/models';

const RecipeCategotyPage = ({
  data,
  pageContext,
  location,
}: RecipeCategotyPageProps) => {
  //TODO: remove object assign and replace let to const when main page json will be fixed
  const {
    page: { components, seo, type },
  } = pageContext;
  const { tag, allRecipe, allTag, allArticle } = data;
  const categoryImage = get(tag.assets, '[0].localImage');
  const classWrapper = cx(theme.recipeCategoryPage, 'recipe-category-page');
  const recipesListingContent = findPageComponentContent(
    components,
    'RecipeListing',
    'RecipesByCategory'
  );
  const initialRecipesCount = useMedia();
  const initialTagsCount = useMedia(undefined, [9, 5]);

  const [recipeResults, setRecipeResults] = useState<{
    list: Internal.Recipe[];
    count: number;
  }>({
    list: allRecipe.nodes,
    count: 0,
  });

  const getRecipeSearchData = async (params: SearchParams = {}) => {
    const searchParams = {
      index: keys.elasticSearch.recipeIndex,
      body: {
        ...params,
        query: {
          bool: {
            must: [
              {
                // eslint-disable-next-line @typescript-eslint/camelcase
                query_string: {
                  query: tag.name,
                  fields: ['tagGroups.tags.name'],
                },
              },
            ],
            // eslint-disable-next-line @typescript-eslint/camelcase
            must_not: [
              {
                terms: {
                  recipeId: allRecipe.nodes.map(({ recipeId }) => recipeId),
                },
              },
            ],
          },
        },
      },
    };

    return useElasticSearch<Internal.Recipe>(searchParams);
  };

  const onLoadMoreRecipes = async (
    tags: Internal.Tag[],
    sorting: string,
    size: number
  ) => {
    getRecipeSearchData({
      from: recipeResults.list.length - allRecipe.nodes.length,
      size,
    }).then(res => {
      setRecipeResults({
        ...recipeResults,
        list: [
          ...recipeResults.list,
          ...res.hits.hits.map(item => item._source),
        ],
      });
    });
  };

  const [tagList, setTagList] = useState<Internal.Tag[]>([]);

  useEffect(() => {
    getRecipeSearchData({
      size: 0,
    }).then(res => {
      setRecipeResults({
        ...recipeResults,
        count: res.hits.total + recipeResults.list.length,
      });
    });
  }, []);

  useEffect(() => {
    setTagList(getTagsFromRecipes(recipeResults.list, allTag.nodes));
  }, [recipeResults]);

  if (categoryImage) {
    const seoImage = seo.meta.find(item => {
      return item.name == 'og:image';
    });
    seoImage && (seoImage.content = categoryImage.childImageSharp.fluid.src);
  }

  const title = tag.title || fromCamelCase(tag.name);

  return (
    <Layout className={classWrapper}>
      <SEO
        {...seo}
        title={title}
        description={tag.description}
        canonical={location.href}
      />
      <DigitalData title={title} type={type} />
      <Kritique />
      <section className="_pt--40">
        <div className="container">
          <Text
            className={theme.heroTitle}
            tag={TagName['h1']}
            text={tag.title || fromCamelCase(tag.name)}
          />
        </div>
      </section>
      <section>
        <div className="container">
          <Text
            className={theme.heroDescriptionBold}
            tag={TagName['p']}
            text={
              tag.description ||
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores atque dolores exercitationem harum, incidunt libero, nesciunt, omnis perferendis placeat possimus praesentium provident quae quia quibusdam rem sequi ut veniam!\n'
            }
          />

          <Text
            className={theme.heroDescription}
            tag={TagName['p']}
            text={
              tag.description ||
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores atque dolores exercitationem harum, incidunt libero, nesciunt, omnis perferendis placeat possimus praesentium provident quae quia quibusdam rem sequi ut veniam!\n'
            }
          />
        </div>
      </section>

      {/* {categoryImage && (
        <section className={theme.heroBg}>
          <div className="container">
            <AdaptiveImage localImage={categoryImage} alt={tag.title} />
          </div>
        </section>
      )} */}
      {/* @todo remove hardcoded section below and uncomment section above */}
      <section className={cx(theme.heroBg, '_pt--40 _pb--40')}>
        <div className="container">
          <AdaptiveImage
            className={theme.heroBgImage}
            localImage={
              findPageComponentContent(components, 'Hero').image.localImage
            }
            alt={tag.title}
          />
        </div>
      </section>

      <section className={cx(theme.greyBg, '_pt--40 _pb--40')}>
        <div className="container">
          <RecipeListing
            content={{
              ...recipesListingContent,
              title: recipesListingContent.title.replace(
                '{numRes}',
                recipeResults.count
              ),
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
            titleLevel={2}
            initialCount={initialRecipesCount}
            recipePerLoad={4}
            withFavorite
            favorites={[]}
            onFavoriteChange={action('favorites were changed')}
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
            initialCount={initialTagsCount}
            list={tagList}
            content={{
              ...findPageComponentContent(components, 'Tags'),
              loadMoreButton: { label: '+ show more' },
            }}
          />
        </div>
      </section>

      <section className="_pb--40">
        <Hero
          content={findPageComponentContent(components, 'Hero')}
          viewType="Image"
          className={'hero--planner color--inverted'}
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

export default RecipeCategotyPage;

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

interface RecipeCategotyPageProps {
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
    allArticle: {
      nodes: Internal.Article[];
    };
    allTag: {
      nodes: Internal.Tag[];
    };
  };
  pageContext: {
    page: AppContent.Page;
  };
  location: WindowLocation;
}
