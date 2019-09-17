import React from 'react';
import { ExampleProps } from './models';
import cx from 'classnames';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';

const Example = ({ className, text }: ExampleProps) => {
  const classNames = cx('example', className);

  return (
    <p className={classNames} {...getComponentDataAttrs('example')}>
      {text}
    </p>
  );
};

Example.defaultProps = {
  className: '',
};

export default Example;
