import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import smoothScroll from 'smoothscroll-polyfill';
import { Button } from '../Button';
import theme from './BackToTop.module.scss';
import { BackToTopProps, CustomEventTarget } from './models';

export const BackToTop = ({
  className,
  content,
  hideTopPositionPx,
  ...props
}: BackToTopProps) => {
  const [isHidden, setIsHidden] = useState(true);
  const wrapClasses = cx('back-to-top', theme.backToTop, className);
  const onClick = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    smoothScroll.polyfill();
    hideTopPositionPx = hideTopPositionPx || window.innerHeight;

    const scrollListener = (e: Event) => {
      const element = e.target as Partial<CustomEventTarget>;
      const top =
        element && element.scrollingElement
          ? element.scrollingElement.scrollTop
          : document.documentElement.scrollTop;

      if (hideTopPositionPx) {
        setIsHidden(top + hideTopPositionPx <= hideTopPositionPx);
      }
    };
    window.addEventListener('scroll', scrollListener);
    return function cleanup() {
      window.removeEventListener('scroll', scrollListener);
    };
  });

  if (isHidden) {
    return null;
  }

  return (
    <div className={wrapClasses}>
      <Button
        {...props}
        onClick={onClick}
        className={cx(theme.backToTop__button, 'back-to-top__button')}
        attributes={{ 'aria-label': 'back to top' }}
      />
      <span className="back-to-top__label">{content.label}</span>
    </div>
  );
};

export default BackToTop;
