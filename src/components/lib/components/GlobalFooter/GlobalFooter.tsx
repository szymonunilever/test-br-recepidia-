import React from 'react';
import Menu from './partials/Menu';
import cx from 'classnames';
import { GlobalFooterProps } from './models';

const GlobalFooter = ({
  content: { lists, copyrightText },
  children,
  logoIcon,
  className,
}: GlobalFooterProps) => {
  const classNames = cx('global-footer', className);

  return (
    <footer className={classNames} data-componentname="global-footer">
      <div className="global-footer__container">
        {lists.map((list, index) => (
          <Menu list={list} key={index} />
        ))}
        {children}
        {logoIcon && (
          <a
            className="global-footer__logo"
            href="//www.unilever.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {logoIcon}
          </a>
        )}
        <span className="global-footer__copyright">
          {' '}
          &copy; {copyrightText}
        </span>
      </div>
    </footer>
  );
};

export default GlobalFooter;
