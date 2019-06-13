import React from 'react';
import cx from 'classnames';
import Menu from '../Menu';
import { NavigationProps } from './models';
import { Button as ButtonClose } from 'src/components/lib/common/Button';

const Navigation = ({
  list,
  isActive,
  login,
  dropDownIcon,
  menuAccordionBehavior,
  buttonCloseIcon,
  handleToggleNavigationClick,
}: NavigationProps) => {
  const navigationClassNames = cx('navigation', {
    active: isActive,
  });

  return (
    <nav className={navigationClassNames} data-componentname="navigation">
      <Menu
        list={list}
        className="menu"
        dropDownIcon={dropDownIcon}
        menuAccordionBehavior={menuAccordionBehavior}
      />
      {login}
      <ButtonClose
        onClick={handleToggleNavigationClick}
        icon={buttonCloseIcon}
      />
    </nav>
  );
};

export default Navigation;
