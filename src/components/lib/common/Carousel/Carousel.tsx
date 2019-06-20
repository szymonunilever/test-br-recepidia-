import React, { useState } from 'react';
import Arrow from './partials/Arrow';
import ProgressBar from './partials/ProgressBar';
import { CarouselProps } from './models';
import { CSSTransition } from 'react-transition-group';
import './Carousel.css';

const Carousel = ({
  list,
  createElementFunction,
  shownItems = 4,
  showThumbnails = false,
}: CarouselProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(shownItems);
  const [selectedItem, setSelectedItem] = useState(list[0]);

  const previousImage = () => {
    const lastIndex = list.length - 1;
    const shouldResetIndex = imageIndex === 0;
    const index = shouldResetIndex ? lastIndex : imageIndex - 1;
    const percentage = (100 * index) / list.length;

    let newStart = start;
    let newEnd = end;
    if (list.length >= shownItems) {
      newStart = shouldResetIndex
        ? lastIndex - shownItems
        : newStart === 0
        ? newStart
        : newStart - 1;
      newEnd = shouldResetIndex
        ? lastIndex
        : newStart === 0
        ? shownItems
        : newEnd - 1;
    }
    setStart(newStart);
    setEnd(newEnd);
    setSelectedItem(list[index]);
    setImageIndex(index);
    setPercentage(percentage);
  };

  const nextImage = () => {
    const lastIndex = list.length - 1;
    const shouldResetIndex = imageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : imageIndex + 1;
    const percentage = (100 * index) / list.length;

    let newStart = start;
    let newEnd = end;
    if (list.length >= shownItems) {
      newStart = shouldResetIndex
        ? 0
        : newEnd === lastIndex
        ? lastIndex - shownItems
        : newStart + 1;
      newEnd = shouldResetIndex
        ? shownItems
        : newEnd === lastIndex
        ? newEnd
        : newEnd + 1;
    }

    setStart(newStart);
    setEnd(newEnd);
    setSelectedItem(list[index]);
    setImageIndex(index);
    setPercentage(percentage);
  };

  const displayElement = () => createElementFunction(list[imageIndex]);

  return (
    <div className="carousel">
      <ProgressBar percentage={percentage} />
      <Arrow direction="left" clickFunction={previousImage} icon="&#9664;" />
      <CSSTransition
        in={true}
        appear={true}
        timeout={300}
        classNames="carousel__transition"
      >
        <div className={'carousel__image'}>{displayElement()}</div>
      </CSSTransition>
      <Arrow direction="right" clickFunction={nextImage} icon="&#9654;" />

      <div className="carousel__items" hidden={!showThumbnails}>
        {list.slice(start, end).map((item: any, index: number) => (
          <div
            key={index}
            className={`carousel__items__item ${
              item === selectedItem ? 'selected' : ''
            }`}
          >
            {createElementFunction(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
