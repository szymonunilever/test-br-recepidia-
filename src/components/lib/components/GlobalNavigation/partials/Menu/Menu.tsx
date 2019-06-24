import React, { useState } from 'react';
import cx from 'classnames';
import { MenuProps, MenuStateProps } from './models';
import { Link } from 'gatsby';

const Menu = ({
  list,
  isOpened,
  className,
  dropDownIcon,
  isAccordion,
}: MenuProps) => {
  const [menuState, setMenuState] = useState<MenuStateProps>({
    openedItems: [],
  });

  const classNames = cx(className, {
    'is-opened': isOpened,
  });

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

  return (
    <ul className={classNames}>
      {list.map((menuItem, i) => {
        const subMenuList = menuItem.children;
        const isSubMenuList = !!(subMenuList && subMenuList.length);

        const classNames = cx(`${className}__item`, {
          'has-submenu': isSubMenuList,
          active: matchItem(i),
        });
        const link = menuItem.path ? (
          <Link className={`${className}__link`} to={menuItem.path}>
            {menuItem.name}
          </Link>
        ) : (
          <a
            className={`${className}__link`}
            onClick={e => {
              isSubMenuList && handleClickMenu(e, i);
            }}
          >
            {menuItem.name}
          </a>
        );

        return (
          <li key={i} className={classNames}>
            {link}
            {menuItem.children && (
              <>
                <span
                  className={`${className}__dropdown-icon`}
                  onClick={e => {
                    isSubMenuList && handleClickMenu(e, i);
                  }}
                >
                  {dropDownIcon}
                </span>
                <Menu
                  list={menuItem.children}
                  isOpened={matchItem(i)}
                  className="submenu"
                  dropDownIcon={dropDownIcon}
                />
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
