import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { Button } from 'src/components/lib/common/Button';
import { ItemProps, TagsProps, TagViewType } from './models';
import Tag from './partials/Tag';
import { includes } from 'lodash';

const Tags = ({
  list,
  content,
  isEditable,
  tagsPerLoad = 4,
  initialCount = 4,
  handleTagToggle,
  handleTagRemove,
  selectedTags,
  className,
  viewType = TagViewType.standard,
}: TagsProps) => {
  const { title, cta } = content || { title: undefined, cta: undefined };
  const [tags, setTags] = useState({
    list: list,
    displayList: initialCount !== 'all' ? list.slice(0, initialCount) : list,
  });
  const loadMore = () => {
    const newCount = tags.displayList.length + tagsPerLoad;

    setTags({
      ...tags,
      displayList: tags.list.slice(0, newCount),
    });
  };

  const deleteItem = (tag: ItemProps) => {
    setTags({
      list: tags.list.filter(item => item.id !== tag.id),
      displayList: tags.displayList.filter(item => item.id !== tag.id),
    });
    if (handleTagRemove) {
      handleTagRemove(tag);
    }
  };

  useEffect(() => {
    if (list !== tags.list) {
      setTags({
        ...tags,
        list: list,
        displayList:
          initialCount !== 'all' ? list.slice(0, initialCount) : list,
      });
    }
  });

  const shouldAppear = tags.list.length > tags.displayList.length && cta;

  const loadMoreBtn = shouldAppear ? (
    <Button onClick={loadMore} className="tags__button">
      {cta ? cta.label : null}
    </Button>
  ) : null;

  const classNames = cx('tags', className);

  const view =
    viewType === TagViewType.filter ? (
      <div className={classNames} data-componentname="tags">
        <ul className="tags__list">
          {tags.list.map((item: ItemProps) => (
            <Tag
              key={item.id}
              handleClick={deleteItem}
              tag={item}
              active={includes(selectedTags, item)}
              isEditable={false}
              isToggle
              handleToggle={handleTagToggle}
            />
          ))}
        </ul>
      </div>
    ) : (
      <div className={classNames} data-componentname="tags">
        {title ? <h3 className="tags__title">{title}</h3> : null}

        <ul className="tags__list">
          {tags.displayList.map((item: ItemProps) => (
            <Tag
              key={item.id}
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
