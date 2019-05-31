import React from 'react';
import { TextProps } from './models';
import { TagName } from './models';

const Text = ({ className, tag, text }: TextProps) => {
  switch (tag) {
    case TagName.h1:
      return <h1 className={className}>{text}</h1>;
    case TagName.h2:
      return <h2 className={className}>{text}</h2>;
    case TagName.h3:
      return <h3 className={className}>{text}</h3>;
    case TagName.h4:
      return <h4 className={className}>{text}</h4>;
    case TagName.h5:
      return <h5 className={className}>{text}</h5>;
    case TagName.h6:
      return <h6 className={className}>{text}</h6>;
    case TagName.p:
      return <p className={className}>{text}</p>;
    default:
      return null;
  }
};

export default Text;
