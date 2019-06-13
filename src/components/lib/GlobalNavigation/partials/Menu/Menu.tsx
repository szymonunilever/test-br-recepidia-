import React, { useState } from 'react';
import cx from 'classnames';
import { MenuProps, MenuStateProps } from './models';
import { Link } from 'gatsby';

const Menu = ({
  list,
  isOpened,
  className,
  dropDownIcon,
  menuAccordionBehavior,
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
    const openedItems = menuAccordionBehavior
      ? [i]
      : [...menuState.openedItems, i];

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
          <a className={`${className}__link`}>{menuItem.name}</a>
        );

        return (
          <li
            key={i}
            className={classNames}
            onClick={e => {
              isSubMenuList && handleClickMenu(e, i);
            }}
          >
            {link}
            {menuItem.children && (
              <>
                <Menu
                  list={menuItem.children}
                  isOpened={matchItem(i)}
                  className="submenu"
                  dropDownIcon={dropDownIcon}
                />
                {dropDownIcon}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
