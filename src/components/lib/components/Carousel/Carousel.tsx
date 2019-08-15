import React, { useState, useEffect, CSSProperties, useCallback } from 'react';
import Arrow from './partials/Arrow';
import { ReactComponent as ArrowIcon } from 'src/svgs/inline/arrow-down.svg';
import ProgressBar from './partials/ProgressBar';
import { CarouselProps, BreakpointProps } from './models';
import styles from './Carousel.module.scss';
import { useSwipeable } from 'react-swipeable';
import cx from 'classnames';

export const defaultCarouselConfig = {
  breakpoints: [
    {
      width: 768,
      switchElementsBelowBreakpoint: 1,
      switchElementsAfterBreakpoint: 1,
      visibleElementsBelowBreakpoint: 3,
      visibleElementsAboveBreakpoint: 4,
    },
  ],
  arrowIcon: <ArrowIcon />,
};

const Carousel = ({ list, createElementFunction, config }: CarouselProps) => {
  const getNearestBreakpoint = useCallback(
    (target: number) => {
      return (config.breakpoints || defaultCarouselConfig.breakpoints).reduce(
        (prev, curr) =>
          Math.abs(curr.width - target) < Math.abs(prev.width - target)
            ? curr
            : prev
      );
    },
    [config]
  );
  const [slideStep, setSlideStep] = useState();
  const [visibleElements, setVisibleElements] = useState();
  const [translateValue, setTranslateValue] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [trackingIndex, setTrackingIndex] = useState(0);
  const [updateKey, setUpdateKey] = useState();

  const mayGoLeft = translateValue < 0;
  const mayGoRight =
    translateValue > -(list.length - visibleElements) * (100 / list.length);

  const adjustSizing = useCallback(
    (currentlyVisibleElements: number, currentTranslateValue: number) => {
      const maxTranslate =
        -(list.length - currentlyVisibleElements) * (100 / list.length);

      let fixedTranslateValue = undefined;
      if (currentTranslateValue < maxTranslate) {
        fixedTranslateValue = maxTranslate;
        setTranslateValue(fixedTranslateValue);
      } else if (currentTranslateValue > 0) {
        fixedTranslateValue = 0;
        setTranslateValue(fixedTranslateValue);
      }
      const actualCurrentTranslateValue =
        fixedTranslateValue !== undefined
          ? fixedTranslateValue
          : currentTranslateValue;
      return [actualCurrentTranslateValue, maxTranslate];
    },
    [list]
  );

  const setCarouselSettings = useCallback(
    (newBreakpoint: BreakpointProps) => {
      const newSlideStep =
        window.innerWidth > newBreakpoint.width
          ? newBreakpoint.switchElementsAfterBreakpoint
          : newBreakpoint.switchElementsBelowBreakpoint;
      const newVisibleElemenst =
        window.innerWidth > newBreakpoint.width
          ? newBreakpoint.visibleElementsAboveBreakpoint
          : newBreakpoint.visibleElementsBelowBreakpoint;
      setSlideStep(newSlideStep);
      setVisibleElements(newVisibleElemenst);

      const [newTranslateValue, maxTranslate] = adjustSizing(
        newVisibleElemenst,
        translateValue
      );
      const newPercentage = Math.abs(newTranslateValue / maxTranslate) * 100;
      setPercentage(newPercentage);
      const newTrackingIndex =
        Math.abs(newTranslateValue) / (100 / list.length);
      setTrackingIndex(newTrackingIndex);
    },
    [translateValue]
  );

  const switchImages = useCallback(
    (mayMove: boolean, newTranslateValue: number) => {
      if (mayMove) {
        const [actualCurrentTranslateValue, maxTranslate] = adjustSizing(
          visibleElements,
          newTranslateValue
        );
        setTranslateValue(actualCurrentTranslateValue);
        setPercentage(
          Math.abs(actualCurrentTranslateValue / maxTranslate) * 100
        );
        const firstIndex =
          Math.abs(actualCurrentTranslateValue) / (100 / list.length);
        setTrackingIndex(firstIndex);
      }
    },
    [visibleElements, list]
  );

  const previousImage = useCallback(() => {
    switchImages(mayGoLeft, translateValue + (100 * slideStep) / list.length);
  }, [mayGoLeft, switchImages, translateValue, slideStep, list]);

  const nextImage = useCallback(() => {
    switchImages(
      mayGoRight,
      translateValue + -((100 * slideStep) / list.length)
    );
  }, [mayGoRight, switchImages, translateValue, slideStep, list]);

  const shouldUpdate = useCallback(
    (newBreakpoint: BreakpointProps): boolean => {
      const newSlideStep =
        window.innerWidth > newBreakpoint.width
          ? newBreakpoint.switchElementsAfterBreakpoint
          : newBreakpoint.switchElementsBelowBreakpoint;
      const newVisibleElemenst =
        window.innerWidth > newBreakpoint.width
          ? newBreakpoint.visibleElementsAboveBreakpoint
          : newBreakpoint.visibleElementsBelowBreakpoint;
      return (
        newSlideStep !== slideStep || newVisibleElemenst !== visibleElements
      );
    },
    [slideStep, visibleElements]
  );

  useEffect(() => {
    const newBreakpoint = getNearestBreakpoint(window.innerWidth);
    if (shouldUpdate(newBreakpoint)) {
      setCarouselSettings(newBreakpoint);
    }
  }, [updateKey]);

  useEffect(() => {
    const resizeHandler = () => setUpdateKey(Math.random());
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const isSlideVisible = useCallback(
    (index: number) => {
      return (
        index >= Math.round(trackingIndex) &&
        index < Math.round(trackingIndex) + visibleElements
      );
    },
    [trackingIndex, visibleElements]
  );

  const carouselItemStyle = useCallback(
    (visible: boolean): CSSProperties => {
      return {
        flexBasis: `${100 / visibleElements ? 100 / visibleElements : 0}%`,
        visibility: visible ? 'visible' : 'hidden',
        transition: 'all .5s',
      };
    },
    [visibleElements]
  );

  const trackerStyle = {
    width: `${
      (100 * list.length) / visibleElements
        ? (100 * list.length) / visibleElements
        : 0
    }%`,
    transform: `translateX(${translateValue}%)`,
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => previousImage(),
  });

  return (
    <>
      <ProgressBar percentage={percentage} />
      <div className="carousel">
        {mayGoLeft && (
          <Arrow
            direction="left"
            clickFunction={previousImage}
            icon={
              config.arrowIcon || (
                <div dangerouslySetInnerHTML={{ __html: '&#9664;' }} />
              )
            }
          />
        )}
        <div
          className={cx('carousel__images', styles.carousel__images)}
          {...swipeHandlers}
        >
          <div
            className={styles.carousel__images__tracker}
            style={trackerStyle}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {list.map((item: any, index: number) => (
              <div
                key={index}
                className={'carousel__item'}
                style={carouselItemStyle(isSlideVisible(index))}
                aria-hidden={!isSlideVisible(index)}
              >
                {createElementFunction(item)}
              </div>
            ))}
          </div>
        </div>
        {mayGoRight && (
          <Arrow
            direction="right"
            clickFunction={nextImage}
            icon={
              config.arrowIcon || (
                <div dangerouslySetInnerHTML={{ __html: '&#9654;' }} />
              )
            }
          />
        )}
      </div>
    </>
  );
};

export default Carousel;
