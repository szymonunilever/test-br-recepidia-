import React, {
  useState,
  useEffect,
  CSSProperties,
  useCallback,
  FunctionComponent,
} from 'react';
import { TagName, Text } from '../Text';
import Arrow from './partials/Arrow';
import ProgressBar from './partials/ProgressBar';
import {
  GenericCarouselProps,
  GenericBreakpointProps,
  GenericCarouselConfig,
} from './models';
import theme from './GenericCarousel.module.scss';
import { useSwipeable } from 'react-swipeable';
import cx from 'classnames';

const shouldUpdate = (
  newBreakpoint: GenericBreakpointProps,
  slideStep: number,
  visibleElements: number
): boolean => {
  const newSlideStep =
    window.innerWidth > newBreakpoint.width
      ? newBreakpoint.switchElementsAfterBreakpoint
      : newBreakpoint.switchElementsBelowBreakpoint;
  const newVisibleElemenst =
    window.innerWidth > newBreakpoint.width
      ? newBreakpoint.visibleElementsAboveBreakpoint
      : newBreakpoint.visibleElementsBelowBreakpoint;
  return newSlideStep !== slideStep || newVisibleElemenst !== visibleElements;
};

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
  arrowIcon: null,
};

const getNearestBreakpoint = (
  config: GenericCarouselConfig,
  target: number
) => {
  return (config.breakpoints || defaultCarouselConfig.breakpoints).reduce(
    (prev, curr) =>
      Math.abs(curr.width - target) < Math.abs(prev.width - target)
        ? curr
        : prev
  );
};

const GenericCarousel: FunctionComponent<GenericCarouselProps> = ({
  children,
  config = defaultCarouselConfig,
  onVisibleElementsChanged,
  content: { title },
  titleLevel = 1,
  className,
}) => {
  const listHeader = title ? (
    <Text
      className={cx(theme.recipeList__header, 'recipe-list__header')}
      // @ts-ignore
      tag={TagName[`h${titleLevel}`]}
      text={title}
    />
  ) : null;

  const list = (children && React.Children.map(children, child => child)) || [];
  const listSize = list.length;
  const listEven = listSize % 2 === 0;
  const [slideStep, setSlideStep] = useState();
  const [visibleElements, setVisibleElements] = useState();
  const [translateValue, setTranslateValue] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [trackingIndex, setTrackingIndex] = useState(0);
  const [updateKey, setUpdateKey] = useState();

  const maxTranslatevalue = -(listSize - visibleElements) * (100 / listSize);
  const mayGoLeft =
    listSize <= visibleElements
      ? false
      : (listEven ? translateValue : new Number(translateValue.toFixed(6))) < 0;
  const mayGoRight =
    listSize <= visibleElements
      ? false
      : (listEven ? translateValue : new Number(translateValue.toFixed(6))) >
        (listEven
          ? maxTranslatevalue
          : new Number(maxTranslatevalue.toFixed(6)));

  const adjustSizing = useCallback(
    (currentlyVisibleElements: number, currentTranslateValue: number) => {
      const maxTranslate =
        -(listSize - currentlyVisibleElements) * (100 / listSize);

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

  const setCarouselSettings = () => {
    const newBreakpoint = getNearestBreakpoint(config, window.innerWidth);
    if (!shouldUpdate(newBreakpoint, slideStep, visibleElements)) {
      return;
    }

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

    if (listSize <= newVisibleElemenst) {
      setTranslateValue(0);
      setPercentage(100);
      setTrackingIndex(0);
    } else {
      const [newTranslateValue, maxTranslate] = adjustSizing(
        newVisibleElemenst,
        translateValue
      );
      setPercentage(Math.abs(newTranslateValue / maxTranslate) * 100);
      setTrackingIndex(Math.abs(newTranslateValue) / (100 / listSize));
    }
  };

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
          Math.abs(actualCurrentTranslateValue) / (100 / listSize);
        setTrackingIndex(firstIndex);
        onVisibleElementsChanged && onVisibleElementsChanged(visibleElements);
      }
    },
    [visibleElements, list]
  );

  const previousImage = useCallback(() => {
    switchImages(mayGoLeft, translateValue + (100 * slideStep) / listSize);
  }, [mayGoLeft, switchImages, translateValue, slideStep, list]);

  const nextImage = useCallback(() => {
    switchImages(mayGoRight, translateValue + -((100 * slideStep) / listSize));
  }, [mayGoRight, switchImages, translateValue, slideStep, list]);

  useEffect(() => {
    // This effect checks if the list length is equal or less than visibleElements value.
    // If so, the number of visible elements is adjusted to meet the number of elements in the list.
    if (listSize <= visibleElements) {
      setVisibleElements(listSize);
    }
  }, [visibleElements]);

  useEffect(() => {
    setCarouselSettings();
  }, [list, updateKey]);

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
      (100 * listSize) / visibleElements
        ? (100 * listSize) / visibleElements
        : 0
    }%`,
    transform: `translateX(${translateValue}%)`,
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => previousImage(),
  });

  return (
    <div className={className}>
      {listHeader}
      <ProgressBar percentage={percentage} />
      <div className={cx(theme.carousel, 'carousel')}>
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
          className={cx(theme.carousel__images, 'carousel__images')}
          {...swipeHandlers}
        >
          <div
            className={cx(
              theme.carousel__imagesTracker,
              'carousel__images-tracker'
            )}
            style={trackerStyle}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {list.map((item: any, index: number) => (
              <div
                key={index}
                className={cx(theme.carousel__item, 'carousel__item')}
                style={carouselItemStyle(isSlideVisible(index))}
                aria-hidden={!isSlideVisible(index)}
              >
                {isSlideVisible(index) && item}
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
    </div>
  );
};

export default GenericCarousel;
