import React, { memo } from 'react';
import cx from 'classnames';
import Attribute from './partials/Attribute';
import get from 'lodash/get';
import { RecipeDietaryAttributesProps } from './models';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';

const RecipeDietaryAttributes = ({
  attributes,
  activeAttributes,
  icons,
  className,
  showInactiveAttributes = false,
}: RecipeDietaryAttributesProps) => {
  const classNames = cx('recipe-dietary-attributes', className);

  const attributesList = attributes.map(attr => {
    const activeAttribute = activeAttributes.find(
      activeAttr => attr.id === activeAttr.id
    );

    const icon = icons.find(icn => attr.id === icn.id);
    if (showInactiveAttributes || activeAttribute) {
      return (
        <Attribute
          key={attr.id}
          attributeText={attr.title}
          icon={icon && activeAttribute ? icon.active : get(icon, 'inActive')}
        />
      );
    }
  });

  return (
    <>
      {attributesList.length ? (
        <div
          className={classNames}
          {...getComponentDataAttrs('recipe-dietary-attributes')}
        >
          <ul className="recipe-dietary-attributes__list">{attributesList}</ul>
        </div>
      ) : (
        <p>No attributes</p>
      )}
    </>
  );
};

export default memo(RecipeDietaryAttributes);
