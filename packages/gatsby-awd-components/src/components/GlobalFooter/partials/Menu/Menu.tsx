import React from 'react';
import { MenuProps } from './models';
import { Link } from 'gatsby';
import theme from './Menu.module.scss';
import cx from 'classnames';

const Menu = ({ list }: MenuProps) => {
  return (
    <div className={cx(theme.footerMenu, 'footer-menu')}>
      {list.title && (
        <label className={cx(theme.footerMenu__label, 'footer-menu__label')}>
          {list.title}
        </label>
      )}
      <ul className={cx(theme.footerMenu__list, 'footer-menu__list')}>
        {list.items.map((menuItem, i) => {
          let link = ~menuItem.path.indexOf('http') ? (
            <a
              target="_blank"
              className={cx(theme.footerMenu__link, 'footer-menu__link')}
              href={menuItem.path}
              rel="noopener noreferrer"
            >
              {menuItem.name}
            </a>
          ) : (
            <Link
              className={cx(theme.footerMenu__link, 'footer-menu__link')}
              to={menuItem.path}
            >
              {menuItem.name}
            </Link>
          );
          return (
            <li
              key={i}
              className={cx(theme.footerMenu__item, 'footer-menu__item')}
            >
              {link}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
