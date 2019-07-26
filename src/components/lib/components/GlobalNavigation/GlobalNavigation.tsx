import React, { useState, useCallback } from 'react';
import { GlobalNavigationProps } from './models';
import Navigation from './partials/Navigation';
import Logo from './partials/Logo';
import cx from 'classnames';
import { Button as BurgerButton } from '../Button';

const GlobalNavigation: React.SFC<GlobalNavigationProps> = ({
  content: { list },
  logo,
  login,
  className,
  dropDownIcon,
  buttonCloseIcon,
  isAccordion,
  children,
}) => {
  const [isBurgerActive, setBurgerActive] = useState(false);
  const classNames = cx('global-navigation', className);

  const handleToggleNavigationClick = useCallback(
    () => setBurgerActive(!isBurgerActive),
    [isBurgerActive]
  );

  return (
    <header className={classNames} data-componentname="global-navigation">
      <div className="global-navigation__inner">
        <BurgerButton
          onClick={handleToggleNavigationClick}
          className="burger-button"
          attributes={{ 'aria-label': 'Menu' }}
        >
          <span className="burger-button__icon" />
        </BurgerButton>
        <Logo {...logo} />
        <Navigation
          buttonCloseIcon={buttonCloseIcon}
          login={login}
          handleToggleNavigationClick={handleToggleNavigationClick}
          dropDownIcon={dropDownIcon}
          isActive={isBurgerActive}
          isAccordion={isAccordion}
          list={list}
        />
        {login}
        {children}
      </div>
    </header>
  );
};

export default GlobalNavigation;
