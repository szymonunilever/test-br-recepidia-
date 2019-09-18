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

  return (
    <div className={classWrapper} {...getComponentDataAttrs('accordion')}>
      <div
        role="tree"
        className="accordion__title"
        onClick={onToggle}
        tabIndex={0}
        aria-expanded={state}
        aria-label={title}
        onKeyUp={onToggleKeyboard}
      >
        {title ? title : null}
        {state ? IconOpened ? <IconOpened /> : null : Icon ? <Icon /> : null}
      </div>

      {/* <div className="accordion__body" hidden={!state}> */}
      <div className="accordion__body">{children}</div>
    </div>
  );
};

export default Accordion;
