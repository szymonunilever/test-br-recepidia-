import React, { useState } from 'react';
import Tag from './partials/Tag';
import { TagsProps, ItemProps } from './models';
import { Button } from 'src/components/common/Button';

const Tags = ({ data }: TagsProps) => {
  const {
    componentName,
    customClass,
    title,
    tagsCount,
    isEditable,
    loadMoreButton,
    tagList,
    loadMoreButton: { isEnabled, tagsPerLoad = 4 },
  } = data;

  const [tags, setTags] = useState({
    tagsCount,
    list: tagList,
    slicedList: tagList.slice(0, tagsCount),
  });

  const loadMore = () => {
    const newCount = tags.tagsCount + tagsPerLoad;

    setTags({
      ...tags,
      tagsCount: newCount,
      slicedList: tags.list.slice(0, newCount),
    });
  };

  const deleteItem = (tagName: string) =>
    setTags({
      tagsCount: tags.tagsCount - 1,
      list: tags.list.filter(item => item.tagName !== tagName),
      slicedList: tags.slicedList.filter(item => item.tagName !== tagName),
    });

  const className = customClass ? `tags ${customClass}` : 'tags';

  const shouldAppear = tags.list.length > tags.tagsCount && isEnabled;

  const loadMoreBtn = shouldAppear ? (
    <Button onClick={loadMore} className="tags__button">
      {loadMoreButton.text}
    </Button>
  ) : null;

  return (
    <div className={className} data-componentname={componentName}>
      <h3 className="tags__title">{title}</h3>

      <ul className="tags__list">
        {tags.slicedList.map((item: ItemProps) => (
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
};

export default Tags;
