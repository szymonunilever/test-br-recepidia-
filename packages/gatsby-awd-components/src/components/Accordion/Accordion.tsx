import React, { KeyboardEvent, useState } from 'react';
import { AccordionProps } from './models';
import cx from 'classnames';
import theme from './Accordion.module.scss';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';

export const Accordion = ({
  title,
  isOpen = true,
  children,
  className,
  Icon,
  IconOpened,
}: AccordionProps) => {
  const [state, setState] = useState(isOpen);
  const onToggle = () => {
    setState(!state);
  };
  const onToggleKeyboard = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.keyCode === 13 || e.keyCode === 32) {
      setState(!state);
    }
  };

  const classWrapper = cx(theme.accordion, className, state && 'is-opened');

  let titleIcon = null;
  if (Icon && !IconOpened) {
    titleIcon = <Icon />;
  } else if (Icon && IconOpened) {
    titleIcon = state ? <IconOpened /> : <Icon />;
  } else if (IconOpened) {
    titleIcon = <IconOpened />;
  }

  return (
    <div className={classWrapper} {...getComponentDataAttrs('accordion')}>
      <div
        role="tree"
        id={title && title.name}
        className="accordion__title"
        onClick={onToggle}
        tabIndex={0}
        aria-expanded={state}
        aria-label={title && title.label}
        onKeyUp={onToggleKeyboard}
      >
        {title && title.label ? title.label : null}
        {titleIcon}
      </div>
      <div className="accordion__body">{children}</div>
    </div>
  );
};

export default Accordion;
