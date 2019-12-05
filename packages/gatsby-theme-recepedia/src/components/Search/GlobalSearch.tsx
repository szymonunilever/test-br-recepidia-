import React, { useState } from 'react';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import {
  Button,
  Modal,
  SearchInput,
  SearchInputProps,
  SearchParams,
  ButtonViewType,
} from 'gatsby-awd-components/src';
import { ReactComponent as ButtonCloseIcon } from 'src/svgs/inline/x-mark.svg';
import { ReactComponent as SearchIcon } from 'src/svgs/inline/search-icon.svg';
import { getSearchSuggestionResponse } from 'src/utils/searchUtils';

const GlobalSearch = ({
  searchContent,
}: {
  searchContent: AppContent.SearchInput.Content;
}) => {
  const {
    page: { relativePath },
  } = useStaticQuery(graphql`
    {
      page(type: { eq: "Search" }) {
        relativePath
      }
    }
  `);

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

  const getSearchSuggestionData = async (
    searchQuery: string,
    params: SearchParams
  ) => {
    getSearchSuggestionResponse(searchQuery, params, '')
      .then(values => {
        const [recipeRes, articleRes] = values;

        setSearchInputResults([
          ...recipeRes.body.hits.hits.map(item => item._source.title),
          ...articleRes.body.hits.hits.map(item => item._source.title),
        ]);
      })
      .catch(() => {});
  };

  return (
    <>
      <Button
        className="searchBar"
        onClick={openModal}
        attributes={{ 'aria-label': 'search' }}
        viewType={ButtonViewType.icon}
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
            navigate(`${relativePath}?searchQuery=${value}`); // get URL from Pages when search Page is there
            setModalState(false);
          }}
          content={searchContent}
          searchResults={searchInputResults}
          labelIcon={<SearchIcon />}
          buttonResetIcon={<ButtonCloseIcon />}
          buttonSubmitIcon={<SearchIcon />}
          onSubmit={async value => {
            navigate(`${relativePath}?searchQuery=${value}`); // get URL from Pages when search Page is there
            setModalState(false);
          }}
          autoFocus
        />
      </Modal>
    </>
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
