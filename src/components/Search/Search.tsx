import React, { useState } from 'react';
import { StaticQuery, graphql, navigate } from 'gatsby';
import SearchInput from '../lib/components/SearchInput/SearchInput';
import { Modal } from 'src/components/lib/components/Modal';
import { Button } from '../lib/components/Button';
import ButtonCloseIcon from 'src/svgs/inline/x-mark.svg';
import SearchIcon from 'src/svgs/inline/search-icon.svg';
import { SearchParams } from '../lib/components/SearchListing/models';
import { SearchInputProps } from '../lib/components/SearchInput/models';
import useElasticSearch from 'src/utils';
import keys from 'integrations/keys.json';

const GlobalSearch = ({
  searchContent,
}: {
  searchContent: AppContent.SearchInput.Content;
}) => {
  const [modalState, setModalState] = useState(false);
  const [searchInputResults, setSearchInputResults] = useState<
    SearchInputProps['searchResults']
  >([]);

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  const getRecipeSearchData = async (
    searchQuery: string,
    params: SearchParams
  ) => {
    const searchParams = {
      index: keys.elasticSearch.recipeIndex,
      body: {
        from: params.from,
        size: params.size,
        _source: ['title'],
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

    return useElasticSearch<Internal.Recipe>(searchParams).then(res => res);
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
        _source: ['title'],
        query: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          query_string: {
            query: `*${searchQuery}*`,
            fields: ['title', 'articleText.text'],
          },
        },
      },
    };

    return useElasticSearch<Internal.Article>(searchParams).then(res => res);
  };

  const getSearchSuggestionData = async (
    searchQuery: string,
    params: SearchParams
  ) => {
    Promise.all([
      getRecipeSearchData(searchQuery, { size: params.size }),
      getArticleSearchData(searchQuery, { size: params.size }),
    ]).then(values => {
      const [recipeRes, articleRes] = values;

      setSearchInputResults([
        ...recipeRes.hits.hits.map(item => item._source.title),
        ...articleRes.hits.hits.map(item => item._source.title),
      ]);
    });
  };

  return (
    <StaticQuery
      query={graphql`
        {
          allRecipe {
            edges {
              node {
                fields {
                  slug
                }
                id
                recipeId
              }
            }
          }
        }
      `}
      render={() => {
        return (
          <>
            <Button
              className="searchBar"
              onClick={openModal}
              attributes={{ 'aria-label': 'search' }}
            >
              <SearchIcon className="searchBar__icon" />
            </Button>
            <Modal
              className="modal--search"
              isOpen={modalState}
              close={closeModal}
              closeBtn={<ButtonCloseIcon />}
            >
              <SearchInput
                getSearchResults={getSearchSuggestionData}
                onClickSearchResultsItem={(value: string) => {
                  navigate(`/search?searchQuery=${value}`); // get URL from Pages when search Page is there
                  setModalState(false);
                }}
                content={searchContent}
                searchResults={searchInputResults}
                labelIcon={<SearchIcon />}
                buttonResetIcon={<ButtonCloseIcon />}
                buttonSubmitIcon={<SearchIcon />}
                onSubmit={value => {
                  navigate(`/search?searchQuery=${value}`); // get URL from Pages when search Page is there
                  setModalState(false);
                }}
                autoFocus
              />
            </Modal>
          </>
        );
      }}
    />
  );
};

export default GlobalSearch;

export interface RecipeSearchDetailsNode {
  fields: {
    slug: string;
  };
  id: string;
  recipeId: string;
  title: string;
}
