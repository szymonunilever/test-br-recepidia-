import cx from 'classnames';
import React, { useState } from 'react';
import { Button } from 'src/components/lib/common/Button';
import { ItemProps, TagsProps, TagViewType } from './models';
import Tag from './partials/Tag';

const Tags = ({
  list,
  content: { title, cta },
  isEditable,
  tagsPerLoad = 4,
  initialCount,
  className,
  viewType = TagViewType.standart,
}: TagsProps) => {
  const [tags, setTags] = useState({
    list: list,
    displayList: list.slice(0, initialCount),
  });

  const loadMore = () => {
    const newCount = tags.displayList.length + tagsPerLoad;

    setTags({
      ...tags,
      displayList: tags.list.slice(0, newCount),
    });
  };

  const deleteItem = (tagName: string) =>
    setTags({
      list: tags.list.filter(item => item.tagName !== tagName),
      displayList: tags.displayList.filter(item => item.tagName !== tagName),
    });

  const shouldAppear = tags.list.length > tags.displayList.length && cta;

  const loadMoreBtn = shouldAppear ? (
    <Button onClick={loadMore} className="tags__button">
      {cta.label}
    </Button>
  ) : null;

  const classNames = cx('tags', className);

  const view =
    viewType === TagViewType.filter ? (
      <div className={classNames} data-componentname="tags">
        <ul className="tags__list">
          {tags.list.map((item: ItemProps) => (
            <Tag
              key={item.tagName}
              handleClick={deleteItem}
              tag={item}
              isEditable={false}
              isToggle
            />
          ))}
        </ul>
      </div>
    ) : (
      <div className={classNames} data-componentname="tags">
        <h3 className="tags__title">{title}</h3>

        <ul className="tags__list">
          {tags.displayList.map((item: ItemProps) => (
            <Tag
              key={item.tagName}
              handleClick={deleteItem}
              tag={item}
              isEditable={isEditable}
            />
          ))}
        </ul>
        {loadMoreBtn}
      </div>
    );

  return <>{view}</>;
};

export default Tags;
