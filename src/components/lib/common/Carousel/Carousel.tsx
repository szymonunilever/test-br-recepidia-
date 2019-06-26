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
  // // const [percentage, setPercentage] = useState(0);
  // const [start, setStart] = useState(0);
  // const [end, setEnd] = useState(shownItems);
  // const [selectedItem, setSelectedItem] = useState(list[0]);
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

  // const [percentage, setPercentage] = useState(0);
  const [percentage, setPercentage] = useState(
    (100 * visibleElements) / list.length
  );

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
    window.addEventListener('resize', () => {
      window.innerWidth > breakpoint.width
        ? setVisibleElements(breakpoint.visibleElementsAboveBreakpoint)
        : setVisibleElements(breakpoint.visibleElementsBelowBreakpoint);
    });
  });

  // const mayGoLeft = imageIndex - visibleElements >= 0;
  const mayGoLeft = imageIndex - slideStep >= 0;

  const previousImage = () => {
    // const lastIndex = list.length - 1;
    // const shouldStop = imageIndex === 0;
    if (mayGoLeft) {
      // const index = imageIndex - visibleElements;
      let index = imageIndex - slideStep;

      let switchElements =
        index >= slideStep ? slideStep : Math.abs(index - slideStep);
      if (index === 0 && percentage === (100 * visibleElements) / list.length) {
        // its ok cause we've already checked mayGoLeft (nah, research more dude, doesn't seem to work for step >1)
        switchElements = 1;
      }
      // const switchElements = list.length - 1 - index > slideStep ? slideStep : list.length - slideStep - index;

      // let switchElements = slideStep;
      // if (index - visibleElements < 0) {
      //   // index = lastIndex - (index + visibleElements);
      //   switchElements = Math.abs(0 - (index - visibleElements));
      //   index = index - switchElements;
      //   console.log("newIndex", index);
      // }

      // const switchElements = (index - visibleElements < 0) ? Math.abs(0 - index - 1) : visibleElements;
      // const switchElements =
      //   imageIndex - visibleElements < 0
      //     ? Math.abs(imageIndex - index)
      //     : visibleElements;
      // const percentage = 100 * index / list.length;
      const newPercentage = (100 * (index + switchElements)) / list.length;
      setImageIndex(index);
      setPercentage(newPercentage);
      // setTranslateValue(translateValue + slideStep * 100);
      setTranslateValue(translateValue + switchElements * 100);
    }
  };

  const mayGoRight = imageIndex + visibleElements < list.length;
  // const mayGoRight = imageIndex + slideStep < list.length;

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
      // const index = imageIndex + visibleElements;
      let index = imageIndex + slideStep;
      // const switchElements = (index + visibleElements + slideStep > list.length) ? list.length - 1 - index + visibleElements : slideStep;
      // let switchElements = slideStep;
      // if (index + visibleElements > lastIndex) {
      //   // index = lastIndex - (index + visibleElements);
      //   switchElements = Math.abs(list.length - (index + visibleElements));
      //   index = index + switchElements;
      //   console.log("newIndex", index);
      // }
      const switchElements =
        list.length - 1 - index > slideStep
          ? slideStep
          : list.length - slideStep - index;
      // if (list.length - 1 - index <= slideStep) {
      //   index = lastIndex;
      //   console.log("index recalc", index);
      // }

      // if (index + visibleElements > list.length) {
      //   switchElements = list.length - Math.abs(index - visibleElements);
      // } else {
      //   switchElements = index + slideStep > list.length ? list.length - index : slideStep;
      // }
      // const switchElements =
      //   index + slideStep > list.length
      //     ? list.length - index
      //     : slideStep;
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
    <div className="carousel">
      <ProgressBar percentage={percentage} />
      {mayGoLeft && (
        <Arrow direction="left" clickFunction={previousImage} icon="&#9664;" />
      )}
      <div className={'carousel__images'}>
        {list.map((item: any, index: number) => (
          <div key={index} className="carousel__item" style={style}>
            {createElementFunction(item)}
          </div>
        ))}
      </div>
      {mayGoRight && (
        <Arrow direction="right" clickFunction={nextImage} icon="&#9654;" />
      )}
    </div>
  );
};

export default Carousel;
