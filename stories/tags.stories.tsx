import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tags } from '../src/components/lib/components/Tags';
import tagsData from '../src/components/data/tags.json';
import { action } from '@storybook/addon-actions';
import { TagViewType } from '../src/components/lib/components/Tags/models';
import RemoveIcon from 'src/svgs/inline/x-mark.svg';
const content: AppContent.TagsContent = {
  title: 'Custom title text',
  loadMoreButton: {
    label: 'Custom button text',
  },
};
const config = {
  content,
  isEditable: true,
  tagsPerLoad: 1,
  initialCount: 2,
  className: 'custom-class',
};

storiesOf('Components/Tags', module)
  .add('Editable tags', () => {
    return (
      <Tags
        list={tagsData}
        RemoveIcon={RemoveIcon}
        handleTagRemove={action('tag was removed')}
        {...config}
      />
    );
  })
  .add('Not editable tags', () => {
    const newConfig = {
      ...config,
      isEditable: false,
    };
    return <Tags list={tagsData} {...newConfig} />;
  })
  .add('Toggle tags', () => {
    const newConfig = {
      ...config,
      isEditable: false,
      viewType: TagViewType.filter,
    };
    return (
      <Tags
        list={tagsData}
        {...newConfig}
        handleTagToggle={action('tag click')}
      />
    );
  });
