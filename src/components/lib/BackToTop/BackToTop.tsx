import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import smoothScroll from 'smoothscroll-polyfill';
import { Button } from '../common/Button';
import theme from './BackToTop.module.scss';
import { BackToTopProps, CustomEventTarget } from './models';

smoothScroll.polyfill();
export const BackToTop = ({
  className,
  hideTopPositionPx = window.innerHeight,
  ...props
}: BackToTopProps) => {
  const [isHidden, setIsHidden] = useState(true);
  const wrapClasses = cx(theme.backToTop, className);
  const onClick = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const scrollListener = (e: Event) => {
      const element = e.target as Partial<CustomEventTarget>;
      const top =
        element && element.scrollingElement
          ? element.scrollingElement.scrollTop
          : document.documentElement.scrollTop;
      setIsHidden(top + hideTopPositionPx <= hideTopPositionPx);
    };

    document.addEventListener('scroll', scrollListener);

    return function cleanup() {
      document.removeEventListener('scroll', scrollListener);
    };
  });

  return (
    <Button
      className={wrapClasses}
      {...props}
      onClick={onClick}
      hidden={isHidden}
    />
  );
};

export default BackToTop;
