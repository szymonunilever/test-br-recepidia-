import React, { useState, useEffect, FunctionComponent } from 'react';
import cx from 'classnames';
import { MenuProps, MenuStateProps } from './models';
import { Link } from 'gatsby';
import { KeyCode } from '../../../constants';
import findIndex from 'lodash/findIndex';
const Menu: FunctionComponent<MenuProps> = ({
  list,
  isOpened,
  className,
  dropDownIcon,
  isAccordion = true,
  closeMenu,
}) => {
  const [menuState, setMenuState] = useState<MenuStateProps>({
    openedItems: [],
  });
  const [menuLinks, setMenuLinks] = useState<HTMLElement[]>([]);
  const [focus, setFocus] = useState<HTMLElement | undefined>();
  const [parentIndex, setParentIndex] = useState<number | undefined>();
  const classNames = cx(className, {
    'is-opened': isOpened,
  });

  useEffect(() => {
    focus && focus.focus();
  }, [focus]);

  useEffect(() => {
    setMenuLinks([
      ...(Array.from(
        document.querySelectorAll('.menu__link')
      ) as HTMLElement[]),
      ...(Array.from(
        document.querySelectorAll('.submenu__link')
      ) as HTMLElement[]),
    ]);
  }, []);

  useEffect(() => {
    if (!isOpened) {
      setMenuState({ openedItems: [] });
    }
  }, [isOpened]);

  const matchItem = (i: number) => menuState.openedItems.includes(i);
  const handleClickMenu = (e: React.MouseEvent<HTMLElement>, i: number) => {
    e.stopPropagation();
    const openedItems = isAccordion ? [i] : [...menuState.openedItems, i];

    setMenuState({
      openedItems: matchItem(i)
        ? menuState.openedItems.filter(index => index !== i)
        : openedItems,
    });
  };

  const keyBoardOpenSubmenu = (element: HTMLElement, i: number) => {
    const openedItems = isAccordion ? [i] : [...menuState.openedItems, i];
    setParentIndex(i);
    setMenuState({
      openedItems: openedItems,
    });
    const currentLinkIndex = findIndex(menuLinks, element);
    const firstInnerLink = menuLinks
      .slice(currentLinkIndex + 1)
      .find(val => val.tabIndex === 0);
    firstInnerLink && setFocus(firstInnerLink);
  };
  const keyBoardGoToNextLink = (element: HTMLElement) => {
    const currentLinkIndex = findIndex(menuLinks, element);
    if (menuLinks[currentLinkIndex]) {
      const nextLink = menuLinks
        .slice(currentLinkIndex)
        .find(val => val.tabIndex === menuLinks[currentLinkIndex].tabIndex + 1);
      nextLink && setFocus(nextLink);
    }
  };
  const keyBoardGoToPreviousLink = (element: HTMLElement) => {
    const currentLinkIndex = findIndex(menuLinks, element);
    const firstSubmenuLinkIndex =
      currentLinkIndex - menuLinks[currentLinkIndex].tabIndex;
    if (menuLinks[currentLinkIndex]) {
      const nextLink = menuLinks
        .slice(firstSubmenuLinkIndex)
        .find(val => val.tabIndex === menuLinks[currentLinkIndex].tabIndex - 1);
      nextLink && setFocus(nextLink);
    }
  };
  const keyBoardCloseSubmenu = (
    element: HTMLElement,
    isRoot: boolean = false
  ) => {
    const currentLinkIndex = findIndex(menuLinks, element);
    const parentLinkIndex = isRoot
      ? 0
      : currentLinkIndex - element.tabIndex - 1;
    parentLinkIndex && setFocus(menuLinks[parentLinkIndex]);
    closeMenu && closeMenu(parentLinkIndex);
  };

  const closeChild = (menuIndex: number, isRoot: boolean = false) => {
    if (typeof parentIndex !== 'undefined' && matchItem(parentIndex)) {
      setMenuState({
        openedItems: menuState.openedItems.filter(
          index => index !== parentIndex
        ),
      });
      setFocus(menuLinks[menuIndex]);
      menuIndex === 0 && closeMenu && isRoot && closeMenu(0);
    }
  };

  const getMenuStepInfo = (
    element: HTMLElement
  ): {
    currentMenuSize: number | null;
    currentLinkIndex: number;
    currentTabIndex: number;
    currentMenu: HTMLElement | null;
  } => {
    const currentTabIndex = element.tabIndex;
    const currentItem = element.parentElement;
    const currentMenu = currentItem && currentItem.parentElement;
    const currentLinkIndex = findIndex(menuLinks, element);
    const currentMenuSize = currentMenu && currentMenu.childElementCount;
    return { currentMenuSize, currentLinkIndex, currentTabIndex, currentMenu };
  };

  const countToRoot = (element: HTMLElement): number => {
    let counterToRoot = 0;
    return (function countIterationsToRoot(element: HTMLElement): number {
      counterToRoot++;
      let root = element.parentElement;
      return root && !root.classList.contains('menu__item')
        ? countIterationsToRoot(root)
        : counterToRoot;
    })(element);
  };

  const handleKeyUpMenu = (
    e: React.KeyboardEvent<HTMLElement>,
    i: number,
    isSubmenuList: boolean
  ) => {
    if (
      e.keyCode === KeyCode.Tab ||
      ((e.keyCode === KeyCode.Enter || e.keyCode === KeyCode.Space) &&
        !isSubmenuList)
    ) {
      return true;
    }
    e.preventDefault();
    switch (e.keyCode) {
      case KeyCode.Escape:
        closeMenu && closeMenu(0, true);
        break;
      case KeyCode.ArrowDown:
        if (isSubmenuList && e.currentTarget.className.includes('menu__link')) {
          keyBoardOpenSubmenu(e.currentTarget, i);
        } else if (e.currentTarget.className.includes('submenu__link')) {
          const {
            currentMenuSize,
            currentTabIndex,
            currentLinkIndex,
          } = getMenuStepInfo(e.currentTarget);

          const counterToRoot = countToRoot(e.currentTarget);

          if (currentMenuSize && currentTabIndex < currentMenuSize - 1) {
            keyBoardGoToNextLink(e.currentTarget);
          } else {
            if (
              currentLinkIndex === menuLinks.length - 1 &&
              counterToRoot === 3
            ) {
              const firstSubmenuLink = document.querySelector(
                '.submenu__link'
              ) as HTMLElement;
              firstSubmenuLink && setFocus(firstSubmenuLink);
            } else {
              const currentMenuRoot =
                menuLinks[currentLinkIndex - currentTabIndex];
              setFocus(currentMenuRoot);
            }
          }
        }
        break;
      case KeyCode.ArrowRight:
        if (e.currentTarget.className.includes('menu__link')) {
          const { currentMenuSize, currentTabIndex } = getMenuStepInfo(
            e.currentTarget
          );
          currentMenuSize && currentTabIndex < currentMenuSize - 1
            ? keyBoardGoToNextLink(e.currentTarget)
            : setFocus(menuLinks[0]);
        } else if (
          isSubmenuList &&
          e.currentTarget.className.includes('submenu__link')
        ) {
          keyBoardOpenSubmenu(e.currentTarget, i);
        }
        break;
      case KeyCode.ArrowLeft:
        if (e.currentTarget.className.includes('menu__link')) {
          const { currentMenuSize, currentTabIndex } = getMenuStepInfo(
            e.currentTarget
          );
          if (currentMenuSize) {
            currentTabIndex !== 0
              ? keyBoardGoToPreviousLink(e.currentTarget)
              : setFocus(menuLinks[currentMenuSize - 1]);
          }
        }
        if (e.currentTarget.className.includes('submenu__link')) {
          const counterToRoot = countToRoot(e.currentTarget);
          if (counterToRoot === 3) {
            keyBoardCloseSubmenu(e.currentTarget, true);
          } else {
            keyBoardCloseSubmenu(e.currentTarget);
          }
        }
        break;
      case KeyCode.ArrowUp:
        if (
          e.keyCode === KeyCode.ArrowUp &&
          e.currentTarget.className.includes('submenu__link')
        ) {
          const counterToRoot = countToRoot(e.currentTarget);
          const {
            currentMenuSize,
            currentTabIndex,
            currentLinkIndex,
          } = getMenuStepInfo(e.currentTarget);

          if (counterToRoot === 3 && e.currentTarget.tabIndex === 0) {
            keyBoardCloseSubmenu(e.currentTarget, true);
          }

          if (currentMenuSize && currentTabIndex !== 0) {
            keyBoardGoToPreviousLink(e.currentTarget);
          } else {
            const currentMenuLast =
              currentMenuSize &&
              menuLinks[currentLinkIndex + currentMenuSize - 1];
            currentMenuLast && setFocus(currentMenuLast);
          }
        }
        break;
    }
  };
  let counter = 0;
  return (
    <ul className={classNames} role="menubar">
      {list.map((menuItem, i) => {
        const subMenuList = menuItem.children;
        const isSubMenuList = !!(subMenuList && subMenuList.length);

        const classNames = cx(`${className}__item`, {
          'has-submenu': isSubMenuList,
          active: matchItem(i),
        });
        const link = menuItem.path ? (
          <Link
            tabIndex={counter++}
            className={`${className}__link`}
            to={menuItem.path}
            onKeyDown={e => {
              handleKeyUpMenu(e, i, isSubMenuList);
            }}
          >
            {menuItem.name}
          </Link>
        ) : (
          <a
            tabIndex={counter++}
            className={`${className}__link`}
            onClick={e => {
              isSubMenuList && handleClickMenu(e, i);
            }}
            onKeyDown={e => {
              handleKeyUpMenu(e, i, isSubMenuList);
            }}
          >
            {menuItem.name}
            {menuItem.children && (
              <span className={`${className}__dropdown-icon`}>
                {dropDownIcon}
              </span>
            )}
          </a>
        );

        return (
          <li
            key={i}
            className={classNames}
            aria-haspopup={menuItem.children && menuItem.children.length > 0}
            aria-expanded={isOpened}
          >
            {link}
            {menuItem.children && (
              <Menu
                list={menuItem.children}
                closeMenu={closeChild}
                isOpened={matchItem(i)}
                className="submenu"
                dropDownIcon={dropDownIcon}
                isAccordion={isAccordion}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
