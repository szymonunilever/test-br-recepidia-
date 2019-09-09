import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { TagProps, TagVariant } from '../../models';
import { Button } from 'src/components/lib/components/Button';
import cx from 'classnames';

const Tag = ({
  tag,
  handleClick,
  RemoveIcon,
  active = false,
  enableExternalManage = false,
  handleToggle,
  variant,
}: TagProps) => {
  const [state, setState] = useState(active);
  const {
    name,
    title,
    fields: { slug: path },
  } = tag;
  const classWrapper = cx('tags__item', {
    'for-filter': variant === TagVariant.toggle,
  });
  const onButtonClick = () => {
    handleClick(tag);
  };

  const onTagClick = (selected: boolean) => {
    setState(selected);
    if (handleToggle) {
      handleToggle({ tag, state: selected });
    }
  };
  useEffect(() => {
    if (enableExternalManage && state !== active) {
      setState(active);
    }
  });

  let view;
  switch (variant) {
    case TagVariant.toggle:
      view = (
        <Button
          className="tags__toggle"
          onClick={onTagClick}
          toggleExternalManage
          content={{ label: title || name }}
          isSelected={state}
          isToggle={true}
        />
      );
      break;
    case TagVariant.link:
      view = (
        <Link className="tags__link" to={path}>
          <span>{title || name}</span>
        </Link>
      );
      break;
    case TagVariant.removable:
      view = (
        <div className="tags__removable" tabIndex={0}>
          <span>{title || name}</span>
          <Button
            className="tags__removable--button"
            onClick={onButtonClick}
            toggleExternalManage
            isSelected={state}
            Icon={RemoveIcon}
          />
        </div>
      );
      break;
    default:
  }

  return <li className={classWrapper}>{view}</li>;
};

export default Tag;
