import React, { memo } from 'react';
import cx from 'classnames';
import Attribute from './partials/Attribute';
import { get } from 'lodash';
import { RecipeDietaryAttributesProps } from './models';

const RecipeDietaryAttributes = ({
  listAttributes,
  listActiveAttributes,
  listIcons,
  className,
}: RecipeDietaryAttributesProps) => {
  const classNames = cx('recipe-dietary-attributes', className);

  return (
    <div className={classNames} data-componentname="recipe-dietary-attributes">
      <ul className="recipe-dietary-attributes__list">
        {listAttributes.map(attr => {
          const activeAttribute = listActiveAttributes.find(
            activeAttr => attr.id === activeAttr.id
          );
          const icon = listIcons.find(icn => attr.id === icn.id);

          return (
            <Attribute
              key={attr.id}
              attributeText={attr.name}
              icon={
                icon && activeAttribute ? icon.active : get(icon, 'inActive')
              }
            />
          );
        })}
      </ul>
    </div>
  );
};

export default memo(RecipeDietaryAttributes);
