import { graphql } from 'gatsby';
import React, { useState, useEffect } from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo';
import cx from 'classnames';
import Hero from 'src/components/lib/components/Hero';
import useElasticSearch, { findPageComponentContent } from 'src/utils';
import Kritique from 'integrations/Kritique';
import ArrowIcon from 'src/svgs/inline/arrow-down.svg';
import PageListing from 'src/components/lib/components/PageListing';
import pageListingData from 'src/components/data/pageListing.json';
import DigitalData from '../../../integrations/DigitalData';
import theme from './search.module.scss';
import SearchListing from 'src/components/lib/components/SearchListing';
import TagLinks from 'src/components/TagsLinks';
import { PageListingViewTypes } from 'src/components/lib/components/PageListing/models';
import PlaceholderIcon from 'src/svgs/inline/placeholder.svg';

import keys from 'integrations/keys.json';

import SearchIcon from 'src/svgs/inline/search-icon.svg';

import CloseSvg from 'src/svgs/inline/x-mark.svg';
import { RecipeListViewType } from 'src/components/lib/components/RecipeListing';
import FavoriteIcon from 'src/svgs/inline/favorite.svg';
import withLocation from 'src/components/lib/components/WithLocation';
import { WithLocationProps } from 'src/components/lib/components/WithLocation/models';
import { SearchInputProps } from 'src/components/lib/components/searchInput/models';
import { SearchParams } from './models';
import { RatingAndReviewsProvider } from 'src/components/lib/models/ratings&reviews';

const SearchPage = ({ data, pageContext, searchQuery }: SearchPageProps) => {
  const { components } = pageContext;
  const [recipeResults, setRecipeResults] = useState<{
    list: Internal.Recipe[];
    count: number;
  }>({
    list: [],
    count: 0,
  });
  const [articleResults, setArticleResults] = useState<{
    list: Internal.Article[];
    count: number;
  }>({
    list: [],
    count: 0,
  });
  const [searchInputResults, setSearchInputResults] = useState<{
    list: SearchInputProps['searchResults'];
    count: number;
  }>({
    list: [],
    count: 0,
  });

  const { allTag } = data;

  const getRecipeSearchData = async (
    searchQuery: string,
    params: SearchParams
  ) => {
    const searchParams = {
      index: keys.elasticSearch.recipeIndex,
      body: {
        from: params.from,
        size: params.size,
        query: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          query_string: {
            query: `*${searchQuery}*`,
            fields: [
              'title',
              'description',
              'tagGroups.tags.name',
              'ingredients.description',
            ],
          },
        },
      },
    };

    return useElasticSearch<Internal.Recipe>(searchParams).then(res => {
      setRecipeResults({
        list: recipeResults.list.length
          ? [
              ...recipeResults.list,
              ...res.hits.hits.map(resItem => resItem._source),
            ]
          : res.hits.hits.map(resItem => resItem._source),
        count: res.hits.total,
      });
    });
  };

  const getArticleSearchData = async (
    searchQuery: string,
    params: SearchParams
  ) => {
    const searchParams = {
      index: keys.elasticSearch.articleIndex,
      body: {
        from: params.from,
        size: params.size,
        query: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          query_string: {
            query: `*${searchQuery}*`,
            fields: ['title', 'articleText.text'],
          },
        },
      },
    };

    return useElasticSearch<Internal.Article>(searchParams).then(res => {
      setArticleResults({
        list: articleResults.list.length
          ? [
              ...articleResults.list,
              ...res.hits.hits.map(resItem => resItem._source),
            ]
          : res.hits.hits.map(resItem => resItem._source),
        count: res.hits.total,
      });
    });
  };

  useEffect(() => {
    getArticleSearchData(searchQuery, {
      size: 8,
    });

    getRecipeSearchData(searchQuery, {
      size: 8,
    });
  }, []);

  const getSearchSuggestionData = async (
    searchQuery: string,
    params: SearchParams
  ) => {
    const searchParams = {
      index: keys.elasticSearch.recipeIndex,
      body: {
        from: params.from,
        size: params.size,
        query: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          query_string: {
            query: `*${searchQuery}*`,
            fields: [
              'title',
              'description',
              'tagGroups.tags.name',
              'ingredients.description',
            ],
          },
        },
      },
    };

    return useElasticSearch<Internal.Recipe>(searchParams).then(res => {
      setSearchInputResults({
        list: res.hits.hits.map(item => item._source.title),
        count: res.hits.total,
      });
    });
  };

  const getSearchData = async (searchQeury: string, params: SearchParams) => {
    getArticleSearchData(searchQeury, {
      size: params.size,
    });

    getRecipeSearchData(searchQeury, {
      size: params.size,
    });
  };

  return (
    <Layout className={cx('search-page', theme.searchPage)}>
      <SEO title="Recepedia Search" />
      <DigitalData pageContext={pageContext} data={data} />
      <Kritique />
      <section className="_bg--main">
        <div className="container">
          <SearchListing
            searchQuery={searchQuery}
            searchResults={{
              recipeResults,
              searchInputResults,
              articleResults,
            }}
            searchResultTitleLevel={3}
            config={{
              searchInputConfig: {
                getSearchSuggestionData,
                onClickSearchResultsItem: getSearchData,
                searchResultsCount: 8,
                labelIcon: <SearchIcon />,
                buttonResetIcon: <CloseSvg />,
                buttonSubmitIcon: <PlaceholderIcon />,
              },
              recipeConfig: {
                getRecipeSearchData,
                viewType: RecipeListViewType.Base,
                FavoriteIcon,
                withFavorite: true,
                initialCount: 2,
                recipePerLoad: 4,
                favorites: [],
                onFavoriteChange: () => {},
                imageSizes: '(min-width: 768px) 25vw, 50vw',
                ratingProvider: RatingAndReviewsProvider.kritique,
              },
              articleConfig: {
                getArticleSearchData,
              },
            }}
            content={findPageComponentContent(components, 'SearchListing')}
          />
        </div>
      </section>

      <section className="_pt--40 _pb--40">
        <div className="container">
          <TagLinks
            list={allTag.nodes}
            content={findPageComponentContent(components, 'Tags')}
          />
        </div>
      </section>

      <section>
        <Hero
          content={findPageComponentContent(components, 'Hero')}
          viewType="Image"
          className="hero--planner color--inverted"
        />
      </section>

      <section className="_pt--40 _pb--40">
        <div className="container _pt--40 _pb--40">
          <PageListing
            content={findPageComponentContent(
              components,
              'PageListing',
              'RecipeCategories'
            )}
            list={pageListingData}
            viewType={PageListingViewTypes.carousel}
            titleLevel={2}
            carouselConfig={{
              breakpoints: [
                {
                  width: 768,
                  switchElementsBelowBreakpoint: 1,
                  switchElementsAfterBreakpoint: 2,
                  visibleElementsBelowBreakpoint: 3,
                  visibleElementsAboveBreakpoint: 4,
                },
              ],
              arrowIcon: <ArrowIcon />,
            }}
          />
        </div>
      </section>
    </Layout>
  );
};

export default withLocation<SearchPageProps & WithLocationProps>(SearchPage);

export const pageQuery = graphql`
  {
    allTag {
      nodes {
        ...TagFields
      }
    }
  }
`;

interface SearchPageProps {
  data: {
    allTag: {
      nodes: Internal.Tag[];
    };
  };
  pageContext: {
    title: string;
    components: {
      [key: string]: string | number | boolean | object | null;
    };
  };
  searchQuery: string;
}
