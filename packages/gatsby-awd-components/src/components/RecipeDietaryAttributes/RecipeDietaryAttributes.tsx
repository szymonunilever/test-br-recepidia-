import React, { memo } from 'react';
import cx from 'classnames';
import Attribute from './partials/Attribute';
import compact from 'lodash/compact';
import { RecipeDietaryAttributesProps } from './models';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';
import theme from './RecipeDietaryAttributes.module.scss';

const RecipeDietaryAttributes = ({
  attributes,
  activeAttributes,
  icons,
  infoIcon,
  className,
  showInactiveAttributes = false,
}: RecipeDietaryAttributesProps) => {
  const classNames = cx(
    theme.recipeDietaryAttributes,
    'recipe-dietary-attributes',
    className
  );
  const activeIds = activeAttributes.map(attr => attr.id);
  const activeTags = compact(
    activeAttributes.map(activeAttr =>
      attributes.find(attr => attr.tagId === activeAttr.id)
    )
  );
  const inactiveTags = attributes.filter(
    attr => !activeIds.includes(attr.tagId)
  );

  const mapIcons = (attributes: Internal.Tag[], inActive: boolean = false) =>
    icons.map(icon => {
      const iconId = Array.isArray(icon.id) ? icon.id : [icon.id];
      const attr =
        attributes && attributes.find(attr => iconId.includes(attr.tagId));
      const check = inActive ? icon.inActive : true;
      if (attr && check) {
        return (
          <Attribute
            infoIcon={infoIcon}
            key={attr.tagId}
            tag={attr}
            icon={inActive ? icon.inActive : icon.active}
          />
        );
      }
    });
  const attrWillShowActive = mapIcons(activeTags);
  const attrWillShowInActive = mapIcons(inactiveTags, true);

  return (
    <>
      {attrWillShowActive.length || showInactiveAttributes ? (
        <div
          className={classNames}
          {...getComponentDataAttrs('recipe-dietary-attributes')}
        >
          <ul
            className={cx(
              theme.recipeDietaryAttributes__list,
              'recipe-dietary-attributes__list'
            )}
          >
            {attrWillShowActive}
            {showInactiveAttributes && attrWillShowInActive}
          </ul>
        </div>
      ) : (
        <p>No attributes</p>
      )}
    </>
  );
};

export default memo(RecipeDietaryAttributes);
