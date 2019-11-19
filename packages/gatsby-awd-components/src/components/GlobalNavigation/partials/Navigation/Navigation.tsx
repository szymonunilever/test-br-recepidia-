import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import Menu from '../Menu';
import { NavigationProps } from './models';
import { Button as ButtonClose } from '../../../Button';
import getComponentDataAttrs from '../../../../utils/getComponentDataAttrs';
import { KeyCode } from '../../../constants';
import theme from './Navigation.module.scss';
const Navigation: FunctionComponent<NavigationProps> = ({
  list,
  isActive,
  login,
  dropDownIcon,
  isAccordion,
  buttonCloseIcon,
  handleToggleNavigationClick,
}) => {
  const navigationClassNames = cx(theme.navigation, 'navigation', {
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
        className={cx(theme.menu, 'menu')}
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
