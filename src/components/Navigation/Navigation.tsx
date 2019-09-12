import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { ReactComponent as ButtonCloseIcon } from 'src/svgs/inline/x-mark.svg';
import GlobalNavigation from 'src/components/lib/components/GlobalNavigation';
import { ReactComponent as LogoIcon } from 'src/svgs/inline/logo.svg';
import { ReactComponent as ArrowDownIcon } from 'src/svgs/inline/arrow-down.svg';
import GlobalSearch from 'src/components/Search/GlobalSearch';
import { constructMenu } from './utils';

interface NavigationProps {
  navigationContent: AppContent.GlobalNavigation.Content;
  searchContent: AppContent.SearchInput.Content;
}

const Navigation: React.FunctionComponent<NavigationProps> = ({
  navigationContent,
  searchContent,
}) => {
  const data = useStaticQuery(graphql`
    {
      allCategory(
        filter: { parent: { id: { eq: null } }, inNavigation: { eq: true } }
        sort: { order: ASC, fields: categoryOrder }
      ) {
        nodes {
          ...CategoryNavigationFields
        }
      }
    }
  `);

  const categories = data.allCategory.nodes;
  const menuItems = constructMenu(categories, navigationContent);

  return (
    <GlobalNavigation
      logo={{
        icon: <LogoIcon className="main-logo__icon" />,
        path: '/',
      }}
      dropDownIcon={<ArrowDownIcon className="dropdown-icon" />}
      buttonCloseIcon={ButtonCloseIcon}
      content={{ list: menuItems }}
      isAccordion
    >
      <GlobalSearch searchContent={searchContent} />
    </GlobalNavigation>
  );
};

export default Navigation;
