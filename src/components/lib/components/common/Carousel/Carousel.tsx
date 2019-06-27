import React, { useState, useEffect } from 'react';
import Arrow from './partials/Arrow';
import ProgressBar from './partials/ProgressBar';
import { CarouselProps } from './models';
import './Carousel.css';

const Carousel = ({ list, createElementFunction, config }: CarouselProps) => {
  const getNearestBreakpoint = (target: number) => {
    return config.breakpoints.reduce((prev, curr) =>
      Math.abs(curr.width - target) < Math.abs(prev.width - target)
        ? curr
        : prev
    );
  };
  const [imageIndex, setImageIndex] = useState(0);
  const [breakpoint, setBreakpoint] = useState(
    getNearestBreakpoint(window.innerWidth)
  );
  const [slideStep, setSlideStep] = useState(
    window.innerWidth > breakpoint.width
      ? breakpoint.switchElementsAfterBreakpoint
      : breakpoint.switchElementsBelowBreakpoint
  );
  const [visibleElements, setVisibleElements] = useState(
    window.innerWidth > breakpoint.width
      ? breakpoint.visibleElementsAboveBreakpoint
      : breakpoint.visibleElementsBelowBreakpoint
  );
  const [translateValue, setTranslateValue] = useState(0);

  const [percentage, setPercentage] = useState(
    (100 * visibleElements) / list.length
  );

  const resizeHandler = () => {
    window.innerWidth > breakpoint.width
      ? setVisibleElements(breakpoint.visibleElementsAboveBreakpoint)
      : setVisibleElements(breakpoint.visibleElementsBelowBreakpoint);
  };

  useEffect(() => {
    setBreakpoint(getNearestBreakpoint(window.innerWidth));
    setSlideStep(
      window.innerWidth > breakpoint.width
        ? breakpoint.switchElementsAfterBreakpoint
        : breakpoint.switchElementsBelowBreakpoint
    );
    setVisibleElements(
      window.innerWidth > breakpoint.width
        ? breakpoint.visibleElementsAboveBreakpoint
        : breakpoint.visibleElementsBelowBreakpoint
    );
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  });

  const mayGoLeft = imageIndex - slideStep >= 0;

  const previousImage = () => {
    if (mayGoLeft) {
      let index = imageIndex - slideStep;

      let switchElements =
        index >= slideStep ? slideStep : Math.abs(index - slideStep);
      if (index === 0 && percentage === (100 * visibleElements) / list.length) {
        switchElements = 1;
      }

      const newPercentage = (100 * (index + switchElements)) / list.length;
      setImageIndex(index);
      setPercentage(newPercentage);
      setTranslateValue(translateValue + switchElements * 100);
    }
  };

  const mayGoRight = imageIndex + visibleElements < list.length;

  const getSwitch: any = (index: number, step: number, visible: number) => {
    const thisIndex = index;
    const thisStep = step;
    if (thisIndex + thisStep + visible > list.length) {
      return getSwitch(thisIndex, thisStep - 1, visible);
    }
    return thisStep;
  };

  const nextImage = () => {
    if (mayGoRight) {
      let index = imageIndex + slideStep;
      const switchElements =
        list.length - 1 - index > slideStep
          ? slideStep
          : list.length - slideStep - index;
      const percentage = (100 * (index + switchElements)) / list.length;
      setImageIndex(index);
      setPercentage(percentage);
      setTranslateValue(translateValue + -(switchElements * 100));
    }
  };

  const style = {
    transform: `translateX(${translateValue}%)`,
    flexBasis: `${100 / visibleElements}%`,
  };

  return (
    <>
      <ProgressBar percentage={percentage} />
      <div className="carousel">
        {mayGoLeft && (
          <Arrow
            direction="left"
            clickFunction={previousImage}
            icon={config.arrowIcon || '&#9664;'}
          />
        )}
        <div className={'carousel__images'}>
          {list.map((item: any, index: number) => (
            <div key={index} className="carousel__item" style={style}>
              {createElementFunction(item)}
            </div>
          ))}
        </div>
        {mayGoRight && (
          <Arrow
            direction="right"
            clickFunction={nextImage}
            icon={config.arrowIcon || '&#9654;'}
          />
        )}
      </div>
    </>
  );
};

export default Carousel;
