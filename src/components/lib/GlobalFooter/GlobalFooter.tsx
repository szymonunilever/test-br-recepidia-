import React from 'react';
import Menu from './partials/Menu';
import { GlobalFooterProps } from './models';

const GlobalFooter = ({
  content: { list, copyrightText },
  children,
  logoIcon,
}: GlobalFooterProps) => {
  return (
    <footer className="global-footer" data-componentname="global-footer">
      <Menu list={list} />
      {children}
      <a href="//www.unilever.com" target="_blank" rel="noopener noreferrer">
        {logoIcon}
      </a>
      <span className="global-footer__copyright"> &copy; {copyrightText}</span>
    </footer>
  );
};

export default GlobalFooter;
