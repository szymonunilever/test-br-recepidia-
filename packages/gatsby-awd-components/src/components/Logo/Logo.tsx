import React from 'react';
import { Link } from 'gatsby';
import { LogoProps } from './models';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';

const Logo = ({ icon, path }: LogoProps) => {
  return (
    <div className="main-logo" {...getComponentDataAttrs('main-logo')}>
      <Link className="main-logo__link" to={path}>
        <span className="main-logo__text">Home page</span>
        {icon}
      </Link>
    </div>
  );
};

export default Logo;
