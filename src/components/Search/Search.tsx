import React, { useState } from 'react';
import { StaticQuery, graphql, navigate } from 'gatsby';
import SearchInput from '../lib/components/SearchInput/SearchInput';
import { Modal } from 'src/components/lib/components/Modal';
import ButtonCloseIcon from 'src/svgs/inline/x-mark.svg';
import SearchIcon from 'src/svgs/inline/search-icon.svg';

const GlobalSearch = ({
  searchContent,
}: {
  searchContent: AppContent.SearchInput.Content;
}) => {
  const [modalState, setModalState] = useState(false);

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
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
      render={data => {
        return (
          <>
            <div className="searchBar" onClick={openModal}>
              <SearchIcon className="searchBar__icon" />
            </div>
            <Modal
              className="modal--search"
              isOpen={modalState}
              close={closeModal}
              closeBtn={<ButtonCloseIcon />}
            >
              <SearchInput
                list={data.allRecipe.edges.map(
                  ({ node }: { node: RecipeSearchDetailsNode }) => node.title
                )}
                content={searchContent}
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
