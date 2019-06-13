import React, { useState } from 'react';
import cx from 'classnames';
import { MenuProps, MenuStateProps } from './models';
import { Link } from 'gatsby';

const Menu = ({ list, isOpened, className, dropDownIcon }: MenuProps) => {
  const [menuState, setMenuState] = useState<MenuStateProps>({
    openedItems: [],
  });

  const classNames = cx(className, {
    'is-opened': isOpened,
  });

  const matchItem = (i: number) => menuState.openedItems.includes(i);

  const handleTouchMenu = (e: React.TouchEvent<HTMLElement>, i: number) => {
    if (e.target === e.currentTarget) {
      setMenuState({
        openedItems: matchItem(i)
          ? menuState.openedItems.filter(index => index !== i)
          : [...menuState.openedItems, i],
      });
    }
  };

  return (
    <ul className={classNames}>
      {list.map((menuItem, i) => {
        const subMenuList = menuItem.children;
        const classNames = cx(`${className}__item`, {
          'has-submenu': subMenuList,
          active: matchItem(i),
        });
        const link = menuItem.path ? (
          <Link className={`${className}__link`} to={menuItem.path} />
        ) : (
          <a className={`${className}__link`}>{menuItem.name}</a>
        );

        return (
          <li
            key={i}
            className={classNames}
            onTouchStart={e => {
              subMenuList && handleTouchMenu(e, i);
            }}
          >
            {link}
            {subMenuList && (
              <>
                <Menu
                  list={subMenuList}
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
