import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { Button } from 'src/components/lib/components/Button';
import { TagsProps, TagViewType } from './models';
import Tag from './partials/Tag';
import includes from 'lodash/includes';
import { TagName, Text } from '../Text';

const Tags = ({
  list,
  content,
  tagsPerLoad = 4,
  initialCount = 4,
  RemoveIcon,
  handleTagToggle,
  enableExternalManage = false,
  handleTagRemove,
  selectedTags,
  className,
  viewType = TagViewType.standard,
  variant,
  titleLevel = 2,
}: TagsProps) => {
  const { title, loadMoreButton } = content || {
    title: undefined,
    loadMoreButton: undefined,
  };
  const [tags, setTags] = useState({
    list: list,
    displayList: initialCount !== 'all' ? list.slice(0, initialCount) : list,
  });

  useEffect(() => {
    setTags({
      list: list,
      displayList:
        initialCount !== 'all'
          ? list.slice(0, Math.max(tags.displayList.length, initialCount))
          : list,
    });
  }, [list, initialCount]);

  const loadMore = () => {
    const newCount = tags.displayList.length + tagsPerLoad;

    setTags({
      ...tags,
      displayList: tags.list.slice(0, newCount),
    });
  };

  const deleteItem = (tag: Internal.Tag) => {
    setTags({
      list: tags.list.filter(item => item.id !== tag.id),
      displayList: tags.displayList.filter(item => item.id !== tag.id),
    });
    if (handleTagRemove) {
      handleTagRemove(tag);
    }
  };

  useEffect(() => {
    if (enableExternalManage && list !== tags.list) {
      setTags({
        ...tags,
        list: list,
        displayList:
          initialCount !== 'all' ? list.slice(0, initialCount) : list,
      });
    }
  });

  const shouldAppear =
    tags.list.length > tags.displayList.length && loadMoreButton;

  const loadMoreBtn = shouldAppear ? (
    <Button onClick={loadMore} className="tags__button">
      {loadMoreButton ? loadMoreButton.label : null}
    </Button>
  ) : null;

  const classNames = cx('tags', className);

  const view =
    viewType === TagViewType.filter ? (
      <div className={classNames} data-componentname="tags">
        <ul className="tags__list">
          {tags.list.map((item: Internal.Tag) => (
            <Tag
              key={item.id}
              handleClick={deleteItem}
              tag={item}
              enableExternalManage={enableExternalManage}
              active={includes(selectedTags, item)}
              variant={variant}
              handleToggle={handleTagToggle}
            />
          ))}
        </ul>
      </div>
    ) : (
      <div className={classNames} data-componentname="tags">
        {title && (
          <Text
            className="tags__title"
            // @ts-ignore
            tag={TagName[`h${titleLevel}`]}
            text={title}
          />
        )}

        <ul className="tags__list">
          {tags.displayList.map((item: Internal.Tag) => (
            <Tag
              RemoveIcon={RemoveIcon}
              key={item.id}
              handleClick={deleteItem}
              tag={item}
              variant={variant}
            />
          ))}
        </ul>
        <span className="tags__load-more">{loadMoreBtn}</span>
      </div>
    );

  return <>{view}</>;
};

export default Tags;
