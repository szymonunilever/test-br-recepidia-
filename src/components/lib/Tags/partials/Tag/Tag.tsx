import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { TagProps } from '../../models';
import { Button } from 'src/components/lib/common/Button';
import cx from 'classnames';

const Tag = ({
  tag,
  handleClick,
  RemoveIcon,
  isEditable,
  active = false,
  enableExternalManage = false,
  handleToggle,
  isToggle,
}: TagProps) => {
  const [state, setState] = useState(active);
  const { name, path = '' } = tag;
  const classWrapper = cx('tags__item', {
    'for-filter': isToggle,
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

  const buttonDelete = isEditable ? (
    <Button
      Icon={RemoveIcon}
      onClick={onButtonClick}
      className="tags__button-delete"
    />
  ) : null;

  const view = isToggle ? (
    <Button
      className="tags__link"
      onClick={onTagClick}
      toggleExternalManage
      content={{ label: name }}
      isSelected={state}
      isToggle
    />
  ) : (
    <>
      <Link className="tags__link" to={path}>
        {name}
      </Link>
      {buttonDelete}
    </>
  );

  return <li className={classWrapper}>{view}</li>;
};

export default Tag;
