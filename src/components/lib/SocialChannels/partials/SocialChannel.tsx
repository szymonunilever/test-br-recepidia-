import React from 'react';
import { Link } from 'gatsby';

const SocialChannel = ({ text, path }: any) => {
  return (
    <li className="social-channels__item">
      <Link className="social-channels__link" to={path}>
        {text}
      </Link>
    </li>
  );
};

export default SocialChannel;
