import React, { useState, useEffect, CSSProperties } from 'react';
import Arrow from './partials/Arrow';
import ProgressBar from './partials/ProgressBar';
import { CarouselProps } from './models';
import styles from './Carousel.module.scss';
import { useSwipeable } from 'react-swipeable';

const Carousel = ({ list, createElementFunction, config }: CarouselProps) => {
  const getNearestBreakpoint = (target: number) => {
    return config.breakpoints.reduce((prev, curr) =>
      Math.abs(curr.width - target) < Math.abs(prev.width - target)
        ? curr
        : prev
    );
  };
  const [slideStep, setSlideStep] = useState();
  const [visibleElements, setVisibleElements] = useState();
  const [translateValue, setTranslateValue] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [trackingIndex, setTrackingIndex] = useState(0);

  const mayGoLeft = translateValue < 0;
  const mayGoRight =
    translateValue > -(list.length - visibleElements) * (100 / list.length);

  const setCarouselSettings = () => {
    const newBreakpoint = getNearestBreakpoint(window.innerWidth);
    setSlideStep(
      window.innerWidth > newBreakpoint.width
        ? newBreakpoint.switchElementsAfterBreakpoint
        : newBreakpoint.switchElementsBelowBreakpoint
    );
    setVisibleElements(
      window.innerWidth > newBreakpoint.width
        ? newBreakpoint.visibleElementsAboveBreakpoint
        : newBreakpoint.visibleElementsBelowBreakpoint
    );
    const maxTranslate = -(list.length - visibleElements) * (100 / list.length);
    if (translateValue < maxTranslate) {
      setTranslateValue(maxTranslate);
    } else if (translateValue > 0) {
      setTranslateValue(0);
    }
    setPercentage(Math.abs(translateValue / maxTranslate) * 100);
    setTrackingIndex(Math.abs(translateValue) / (100 / list.length));
  };

  const switchImages = (mayMove: boolean, newTranslateValue: number) => {
    if (mayMove) {
      const maxTranslate =
        -(list.length - visibleElements) * (100 / list.length);
      setTranslateValue(newTranslateValue);
      setPercentage(Math.abs(newTranslateValue / maxTranslate) * 100);
      const firstIndex = Math.abs(newTranslateValue) / (100 / list.length);
      setTrackingIndex(firstIndex);
    }
  };

  const previousImage = () => {
    switchImages(mayGoLeft, translateValue + (100 * slideStep) / list.length);
  };

  const nextImage = () => {
    switchImages(
      mayGoRight,
      translateValue + -((100 * slideStep) / list.length)
    );
  };

  useEffect(() => {
    setCarouselSettings();

    window.addEventListener('resize', setCarouselSettings);

    return () => {
      window.removeEventListener('resize', setCarouselSettings);
    };
  }, []);

  const isSlideVisible = (index: number) => {
    return (
      index >= Math.round(trackingIndex) &&
      index < Math.round(trackingIndex) + visibleElements
    );
  };

  const carouselItemStyle = (visible: boolean): CSSProperties => {
    return {
      flexBasis: `${100 / visibleElements}%`,
      visibility: visible ? 'visible' : 'hidden',
      transition: 'all .5s',
    };
  };

  const trackerStyle = {
    width: `${(100 * list.length) / visibleElements}%`,
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
        <div className={styles.carousel__images} {...swipeHandlers}>
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
