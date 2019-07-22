import React from 'react';
import { Link } from 'gatsby';
import { LogoProps } from './models';

const Logo = ({ icon, path }: LogoProps) => {
  return (
    <div className="main-logo" data-componentname="main-logo">
      <Link className="main-logo__link" to={path}>
        <span className="main-logo__text">Home page</span>
        {icon}
      </Link>
    </div>
  );
};

export default Logo;
