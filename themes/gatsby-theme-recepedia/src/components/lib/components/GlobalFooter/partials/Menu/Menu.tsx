import React from 'react';
import { MenuProps } from './models';
import { Link } from 'gatsby';

const Menu = ({ list }: MenuProps) => {
  return (
    <div className="footer-menu">
      {list.title && <label className="footer-menu__label">{list.title}</label>}
      <ul className="footer-menu__list">
        {list.items.map((menuItem, i) => {
          let link = ~menuItem.path.indexOf('http') ? (
            <a
              target="_blank"
              className="footer-menu__link"
              href={menuItem.path}
              rel="noopener noreferrer"
            >
              {menuItem.name}
            </a>
          ) : (
            <Link className="footer-menu__link" to={menuItem.path}>
              {menuItem.name}
            </Link>
          );
          return (
            <li key={i} className="footer-menu__item">
              {link}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
