import React from 'react';
import { Link } from 'gatsby';
import { TagProps } from '../../models';
import { Button } from 'src/components/lib/common/Button';

import Icon from 'src/svgs/inline/x-mark.svg';

const Tag = ({ tag, handleClick, isEditable }: TagProps) => {
  const { tagName, path } = tag;

  const onButtonClick = () => {
    handleClick(tagName);
  };

  const buttonDelete = isEditable ? (
    <Button
      icon={<Icon />}
      onClick={onButtonClick}
      className="tags__button-delete"
    />
  ) : null;

  return (
    <li className="tags__item">
      <Link className="tags__link" to={path}>
        {tagName}
      </Link>
      {buttonDelete}
    </li>
  );
};

export default Tag;
