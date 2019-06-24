import React from 'react';
import Menu from './partials/Menu';
import cx from 'classnames';
import { GlobalFooterProps } from './models';

const GlobalFooter = ({
  content: { list, copyrightText },
  children,
  logoIcon,
  className,
}: GlobalFooterProps) => {
  const classNames = cx('global-footer', className);

  return (
    <footer className={classNames} data-componentname="global-footer">
      <Menu list={list} />
      {children}
      {logoIcon && (
        <a href="//www.unilever.com" target="_blank" rel="noopener noreferrer">
          {logoIcon}
        </a>
      )}
      <span className="global-footer__copyright"> &copy; {copyrightText}</span>
    </footer>
  );
};

export default GlobalFooter;
