import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import ButtonCloseIcon from 'src/svgs/inline/x-mark.svg';
import GlobalNavigation from 'src/components/lib/components/GlobalNavigation';
import LogoIcon from 'src/svgs/inline/logo.svg';
import ArrowDownIcon from 'src/svgs/inline/arrow-down.svg';
import Search from 'src/components/Search/Search';
import { constructMenu } from './utils';

const Navigation = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          allTagGroup {
            nodes {
              children {
                ... on Tag {
                  id
                  name
                  fields {
                    slug
                  }
                }
              }
              name
              id
            }
          }
        }
      `}
      render={data => {
        const tagGroups = data.allTagGroup.nodes;
        const menuItems = constructMenu(tagGroups);

        return (
          <GlobalNavigation
            logo={{
              icon: (
                <LogoIcon
                  style={{ height: '40px' }}
                  className="main-logo__icon"
                />
              ),
              path: '/',
            }}
            dropDownIcon={<ArrowDownIcon className="dropdown-icon" />}
            buttonCloseIcon={ButtonCloseIcon}
            content={{ list: menuItems }}
            isAccordion
          >
            <Search />
          </GlobalNavigation>
        );
      }}
    />
  );
};

export default Navigation;
