import cx from 'classnames';
import React, { useState } from 'react';
import smoothScroll from 'smoothscroll-polyfill';
import { Button } from '../common/Button';
import theme from './BackToTop.module.scss';
import { BackToTopProps, CustomEventTarget } from './models';

smoothScroll.polyfill();
const BackToTop = ({
  className,
  hideTopPositionPx = window.innerHeight,
  ...props
}: BackToTopProps) => {
  const [isHidden, setIsHidden] = useState(true);
  const wrapClasses = cx(theme.backToTop, className);
  const onClick = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };
  document.addEventListener('scroll', (e: Event) => {
    const element = e.target as Partial<CustomEventTarget>;
    const top =
      element && element.scrollingElement
        ? element.scrollingElement.scrollTop
        : document.documentElement.scrollTop;
    setIsHidden(top + hideTopPositionPx <= hideTopPositionPx);
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
