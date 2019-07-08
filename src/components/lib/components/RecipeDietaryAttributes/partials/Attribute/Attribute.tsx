import React from 'react';
import { AttributeProps } from './models';

const Attribute = ({ icon, attributeText }: AttributeProps) => {
  return (
    <li className="recipe-dietary-attributes__item">
      <div className="recipe-dietary-attributes__icon">{icon}</div>
      <div className="recipe-dietary-attributes__text">{attributeText}</div>
    </li>
  );
};

export default Attribute;
