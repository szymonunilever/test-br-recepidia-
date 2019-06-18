import React from 'react';
import { MenuProps } from './models';
import { Link } from 'gatsby';

const Menu = ({ list }: MenuProps) => {
  return (
    <ul className="footer-menu">
      {list.map((menuItem, i) => {
        return (
          <li key={i} className="footer-menu__item">
            <Link className="footer-menu__link" to={menuItem.path}>
              {menuItem.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
