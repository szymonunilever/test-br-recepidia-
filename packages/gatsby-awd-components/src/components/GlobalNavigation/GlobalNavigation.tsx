import React, { useState, useCallback, FunctionComponent } from 'react';
import { GlobalNavigationProps } from './models';
import Navigation from './partials/Navigation';
import Logo from '../Logo/index';
import cx from 'classnames';
import { Button as BurgerButton } from '../Button';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';
import { KeyCode } from '../constants';
import theme from './GlobalNavigation.module.scss';

const GlobalNavigation: FunctionComponent<GlobalNavigationProps> = ({
  content,
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
  const classNames = cx(
    theme.globalNavigation,
    'global-navigation',
    className,
    {
      open: isBurgerActive,
    }
  );

  const handleToggleNavigationClick = useCallback(
    () => setBurgerActive(!isBurgerActive),
    [isBurgerActive]
  );
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.keyCode === KeyCode.Tab) {
        return;
      }
      e.preventDefault();
      let burgerActive = isBurgerActive;
      switch (e.keyCode) {
        case KeyCode.Escape:
          burgerActive = false;
          break;
        case KeyCode.Enter:
          burgerActive = !isBurgerActive;
          break;
        case KeyCode.Space:
          burgerActive = !isBurgerActive;
          break;
      }
      setBurgerActive(burgerActive);
    },
    [isBurgerActive]
  );

  return (
    <header
      className={classNames}
      {...getComponentDataAttrs('global-navigation', content)}
    >
      <div
        className={cx(
          theme.globalNavigation__inner,
          'global-navigation__inner'
        )}
      >
        <BurgerButton
          onClick={handleToggleNavigationClick}
          className={cx(theme.burgerButton, 'burger-button')}
          attributes={{ 'aria-label': 'Menu' }}
          onKeyDown={handleKeyDown}
        >
          <span
            className={cx(theme.burgerButton__icon, 'burger-button__icon')}
            tabIndex={0}
          />
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
