import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { Button } from 'src/components/lib/components/Button';
import { TagsProps, TagViewType, TagVariant } from './models';
import Tag from './partials/Tag';
import includes from 'lodash/includes';
import uniqBy from 'lodash/uniqBy';
import { TagName, Text } from '../Text';

const getTagList = (list: Internal.Tag[], displayUniq = true) =>
  displayUniq ? uniqBy(list, 'name') : list;

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
  variant = TagVariant.link,
  titleLevel = 2,
  displayOnlyUniqueNames = true,
}: TagsProps) => {
  const { title, loadMoreButton } = content || {
    title: undefined,
    loadMoreButton: undefined,
  };

  const tagsList = getTagList(list, displayOnlyUniqueNames);

  const [tags, setTags] = useState({
    list: tagsList,
    displayList:
      initialCount !== 'all' ? tagsList.slice(0, initialCount) : tagsList,
  });

  useEffect(() => {
    const tagsListUpdated = getTagList(list, displayOnlyUniqueNames);

    setTags({
      list: tagsListUpdated,
      displayList:
        initialCount !== 'all'
          ? tagsListUpdated.slice(
              0,
              Math.max(tags.displayList.length, initialCount)
            )
          : tagsListUpdated,
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
      list: tags.list.filter((item: Internal.Tag) => item.id !== tag.id),
      displayList: tags.displayList.filter(
        (item: Internal.Tag) => item.id !== tag.id
      ),
    });
    if (handleTagRemove) {
      handleTagRemove(tag);
    }
  };

  useEffect(() => {
    if (enableExternalManage && list !== tags.list) {
      const tagsList = getTagList(list, displayOnlyUniqueNames);

      setTags({
        ...tags,
        list: tagsList,
        displayList:
          initialCount !== 'all' ? tagsList.slice(0, initialCount) : tagsList,
      });
    }
  });

  const shouldAppear =
    tags.list.length > tags.displayList.length && loadMoreButton;

  const loadMoreBtn = shouldAppear ? (
    <li className="tags__load-more">
      <Button onClick={loadMore} className="tags__button">
        <span>{loadMoreButton ? loadMoreButton.label : null}</span>
      </Button>
    </li>
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
          {loadMoreBtn}
        </ul>
      </div>
    );

  return <>{view}</>;
};

export default Tags;
