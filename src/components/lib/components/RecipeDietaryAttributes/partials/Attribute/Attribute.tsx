import Tooltip from '../../../Tooltip';
import React from 'react';
import { AttributeProps } from './models';

const Attribute = ({
  tag: { tagId, disclaimer, title },
  icon,
  infoIcon,
}: AttributeProps) => {
  const infoTooltip = disclaimer ? (
    <Tooltip
      id={`${tagId}`}
      destroyTooltipOnHide={true}
      overlay={disclaimer}
      trigger={['hover']}
      placement="bottom"
    >
      {infoIcon}
    </Tooltip>
  ) : null;
  return (
    <li
      aria-describedby={`${tagId}`}
      className="recipe-dietary-attributes__item"
    >
      {infoTooltip && infoTooltip}
      <div className="recipe-dietary-attributes__icon">{icon}</div>
      <div className="recipe-dietary-attributes__text">{title}</div>
    </li>
  );
};

export default Attribute;
