import { graphql } from 'gatsby';
import React from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo';
import cx from 'classnames';
import Hero from 'src/components/lib/components/Hero';
import useElasticSearch, { findPageComponentContent } from 'src/utils';
import Kritique from 'integrations/Kritique';
import ArrowIcon from 'src/svgs/inline/arrow-down.svg';
import PageListing from 'src/components/lib/components/PageListing';
import pageListingData from 'src/components/data/pageListing.json';
import theme from './search.module.scss';
import SearchListing from 'src/components/lib/components/SearchListing';
import TagLinks from 'src/components/TagsLinks';
import { PageListingViewTypes } from 'src/components/lib/components/PageListing/models';
import PlaceholderIcon from 'src/svgs/inline/placeholder.svg';

import SearchIcon from 'src/svgs/inline/search-icon.svg';

import CloseSvg from 'src/svgs/inline/x-mark.svg';
import { RecipeListViewType } from 'src/components/lib/components/RecipeListing';
import FavoriteIcon from 'src/svgs/inline/favorite.svg';

const SearchPage = ({ data, pageContext }: SearchPageProps) => {
  const { components } = pageContext;

  const { allTag } = data;

  const getSearchData = (
    searchQuery: string,
    { from = 0, size = undefined }
  ) => {
    const searchBody = {
      from,
      size,
      query: {
        /*eslint-disable */
        multi_match: {
          query: `${searchQuery}`,
          fields: ['title', 'description', 'tagGroups.tags.name'],
        },
        /*eslint-enable */
      },
    };

    return useElasticSearch<Internal.Recipe>(searchBody);
  };

  return (
    <Layout className={cx('search-page', theme.searchPage)}>
      <SEO title="Recepedia Search" />
      <Kritique />
      <section className="_bg--main">
        <div className="container">
          <SearchListing
            searchResultTitleLevel={3}
            getSearchData={getSearchData}
            config={{
              searchInputConfig: {
                searchResultsCount: 8,
                labelIcon: <SearchIcon />,
                buttonResetIcon: <CloseSvg />,
                buttonSubmitIcon: <PlaceholderIcon />,
                onSubmit: () => {},
              },
              recipesConfig: {
                viewType: RecipeListViewType.Base,
                FavoriteIcon: FavoriteIcon,
                withFavorite: true,
                initialCount: 2,
                recipePerLoad: 4,
                favorites: [],
                onFavoriteChange: () => {},
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

      <section className="_pb--40">
        <Hero
          content={findPageComponentContent(components, 'Hero')}
          viewType="Image"
          className="hero--planner color--inverted"
        />
      </section>

      <section className="_pb--40">
        <div className="container">
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

export default SearchPage;

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
    }[];
  };
}
