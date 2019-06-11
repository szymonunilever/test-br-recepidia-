import React from 'react';
import { Link } from 'gatsby';
import { TagProps } from '../../models';
import { Button } from 'src/components/lib/common/Button';
import cx from 'classnames';

import Icon from 'src/svgs/inline/x-mark.svg';

const Tag = ({
  tag,
  handleClick,
  isEditable,
  handleToggle,
  isToggle,
}: TagProps) => {
  const { tagName, path } = tag;
  const classWrapper = cx('tags__item', {
    'for-filter': isToggle,
  });

  const onButtonClick = () => {
    handleClick(tagName);
  };

  const onTagClick = (selected: boolean) => {
    if (handleToggle) {
      handleToggle({ tagName, state: selected });
    }
  };

  const buttonDelete = isEditable ? (
    <Button
      icon={<Icon />}
      onClick={onButtonClick}
      className="tags__button-delete"
    />
  ) : null;

  const view = isToggle ? (
    <Button className="tags__link" onClick={onTagClick} isToggle>
      {tagName}
    </Button>
  ) : (
    <>
      <Link className="tags__link" to={path}>
        {tagName}
      </Link>
      {buttonDelete}
    </>
  );

  return <li className="tags__item">{view}</li>;
};

export default Tag;
