import React from 'react';
import Menu from './partials/Menu';
import cx from 'classnames';
import { GlobalFooterProps } from './models';

const GlobalFooter = ({
  content: { lists, copyrightText },
  children,
  logoIcon = null,
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
        <a
          className="global-footer__logo"
          href="//www.unilever.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="www.unilever.com"
        />
        <span className="global-footer__copyright">
          {' '}
          &copy; {copyrightText} {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};

export default GlobalFooter;
