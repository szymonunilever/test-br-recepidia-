import React, { useState } from 'react';
import { AccordionProps } from './models';
import cx from 'classnames';
import theme from './Accordion.module.scss';

const Accordion = ({
  title,
  isOpen = true,
  children,
  className,
  icon,
  iconOpened,
}: AccordionProps) => {
  const [state, setState] = useState(isOpen);
  const onToggle = () => {
    setState(!state);
  };

  const classWrapper = cx(theme.accordion, className);

  return (
    <div className={classWrapper} onClick={onToggle}>
      {title ? <div className="accordion__title">{title}</div> : null}
      {state ? iconOpened : icon}
      <div className="accordion__body" hidden={!state}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
