import React, { useState } from 'react';
import { StaticQuery, graphql, navigate } from 'gatsby';
import SearchInput from '../lib/components/SearchInput/SearchInput';
import { Modal } from 'src/components/lib/components/common/Modal';
import ButtonCloseIcon from 'src/svgs/inline/x-mark.svg';
import SearchIcon from 'src/svgs/inline/search-icon.svg';

const GlobalSearch = () => {
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
                shortTitle
              }
            }
          }
        }
      `}
      render={data => {
        return (
          <>
            <SearchIcon className="searchBar" onClick={openModal} />
            <Modal
              className="modal--search"
              isOpen={modalState}
              close={closeModal}
              closeBtn={<ButtonCloseIcon />}
            >
              <SearchInput
                list={data.allRecipe.edges.map(
                  ({ node }: { node: RecipeSearchDetailsNode }) =>
                    node.shortTitle
                )}
                content={{
                  title: 'Looking for something?',
                  placeholderText: 'Type something',
                }}
                labelIcon={<SearchIcon />}
                buttonResetIcon={<ButtonCloseIcon />}
                onSubmit={() => {
                  navigate('/search'); // get URL from Pages when search Page is there
                }}
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
  shortTitle: string;
}