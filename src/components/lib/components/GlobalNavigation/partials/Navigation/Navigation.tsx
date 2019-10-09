import React from 'react';
import cx from 'classnames';
import Menu from '../Menu';
import { NavigationProps } from './models';
import { Button as ButtonClose } from 'src/components/lib/components/Button';
import getComponentDataAttrs from 'src/components/lib/utils/getComponentDataAttrs';
import { KeyCode } from '../../../constants';

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

  const keyHandler = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === KeyCode.Enter || e.keyCode === KeyCode.Space) {
      e.stopPropagation();
      handleToggleNavigationClick();
    }
  };

  return (
    <nav
      className={navigationClassNames}
      {...getComponentDataAttrs('navigation')}
    >
      <Menu
        list={list}
        className="menu"
        dropDownIcon={dropDownIcon}
        closeMenu={() => {
          handleToggleNavigationClick();
        }}
        isAccordion={isAccordion}
      />
      {login}
      <ButtonClose
        onClick={handleToggleNavigationClick}
        Icon={buttonCloseIcon}
        onKeyDown={keyHandler}
      />
    </nav>
  );
};

export default Navigation;
