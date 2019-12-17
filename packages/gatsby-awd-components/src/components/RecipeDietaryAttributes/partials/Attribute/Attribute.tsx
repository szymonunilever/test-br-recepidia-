import Tooltip from '../../../Tooltip';
import React from 'react';
import { AttributeProps } from './models';
import theme from './Attribute.module.scss';
import cx from 'classnames';

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
      <span
        ref={React.createRef()}
        className={cx(
          theme.recipeDietaryAttributes__tooltip,
          'recipe-dietary-attributes__tooltip'
        )}
      >
        {infoIcon}
      </span>
    </Tooltip>
  ) : null;
  return (
    <li
      aria-describedby={`${tagId}`}
      className={cx(
        theme.recipeDietaryAttributes__item,
        'recipe-dietary-attributes__item'
      )}
    >
      <div
        className={cx(
          theme.recipeDietaryAttributes__icon,
          'recipe-dietary-attributes__icon'
        )}
      >
        {icon}
      </div>
      <div
        className={cx(
          theme.recipeDietaryAttributes__text,
          'recipe-dietary-attributes__text'
        )}
      >
        {infoTooltip && infoTooltip}
        {title}
      </div>
    </li>
  );
};

export default Attribute;
