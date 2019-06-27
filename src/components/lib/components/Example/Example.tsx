import React from 'react';
import { ExampleProps } from './models';
import cx from 'classnames';

const Example = ({ className, text }: ExampleProps) => {
  const classNames = cx('example', className);

  return (
    <p className={classNames} data-componentname="example">
      {text}
    </p>
  );
};

Example.defaultProps = {
  className: '',
};

export default Example;
