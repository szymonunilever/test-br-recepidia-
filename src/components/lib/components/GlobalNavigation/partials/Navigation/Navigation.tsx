import React from 'react';
import cx from 'classnames';
import Menu from '../Menu';
import { NavigationProps } from './models';
import { Button as ButtonClose } from 'src/components/lib/components/Button';
import getComponentDataAttrs from 'src/components/lib/utils/getComponentDataAttrs';

const Navigation = ({
  list,
  isActive,
  login,
  dropDownIcon,
  isAccordion,
  buttonCloseIcon,
  handleToggleNavigationClick,
}: NavigationProps) => {
  const navigationClassNames = cx('navigation', {
    active: isActive,
  });

  return (
    <nav
      className={navigationClassNames}
      {...getComponentDataAttrs('navigation')}
    >
      <Menu
        list={list}
        className="menu"
        dropDownIcon={dropDownIcon}
        isAccordion={isAccordion}
      />
      {login}
      <ButtonClose
        onClick={handleToggleNavigationClick}
        Icon={buttonCloseIcon}
      />
    </nav>
  );
};

export default Navigation;
