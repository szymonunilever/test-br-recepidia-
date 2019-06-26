import React from 'react';
import { StaticQuery, graphql, navigate } from 'gatsby';
import SearchInput from '../lib/components/SearchInput/SearchInput';
import ButtonCloseIcon from 'src/svgs/inline/x-mark.svg';

const Search = () => (
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
        <SearchInput
          list={data.allRecipe.edges.map(
            ({ node }: { node: RecipeSearchDetailsNode }) => node.shortTitle
          )}
          content={{
            title: 'Looking for something?',
            placeholderText: 'Type something',
          }}
          labelIcon={ButtonCloseIcon}
          buttonResetIcon={ButtonCloseIcon}
          buttonSubmitIcon={ButtonCloseIcon}
          onSubmit={() => {
            navigate('/search');
          }}
        />
      );
    }}
  />
);

export default Search;

export interface RecipeSearchDetailsNode {
  fields: {
    slug: string;
  };
  id: string;
  recipeId: string;
  shortTitle: string;
}
