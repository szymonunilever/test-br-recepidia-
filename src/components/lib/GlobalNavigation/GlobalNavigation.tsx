import React, { useState } from 'react';
import { GlobalNavigationProps } from './models';
import Navigation from './partials/Navigation';
import Logo from './partials/Logo';
import cx from 'classnames';
import { Button as BurgerButton } from '../common/Button';

const GlobalNavigation = ({
  list,
  logo,
  searchBar,
  login,
  className,
  dropDownIcon,
  buttonCloseIcon,
}: GlobalNavigationProps) => {
  const [burgerButton, setburgerButton] = useState({
    isActive: false,
  });
  const classNames = cx('global-navigation', className);

  const handleToggleNavigationClick = () =>
    setburgerButton({ isActive: !burgerButton.isActive });

  return (
    <header className={classNames} component-name="global-navigation">
      <BurgerButton
        onClick={handleToggleNavigationClick}
        className="burger-button"
      >
        <span className="burger-button__icon" />
      </BurgerButton>

      <Logo {...logo} />

      <Navigation
        buttonCloseIcon={buttonCloseIcon}
        login={login}
        handleToggleNavigationClick={handleToggleNavigationClick}
        dropDownIcon={dropDownIcon}
        isActive={burgerButton.isActive}
        list={list}
      />

      {searchBar}
      {login}
    </header>
  );
};

export default GlobalNavigation;
