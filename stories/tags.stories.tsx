import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tags } from '../src/components/lib/Tags';
import tagsData from '../src/components/data/tags.json';
import { action } from '@storybook/addon-actions';
import { TagViewType } from '../src/components/lib/Tags/models';

const config = {
  content: {
    title: 'Custom title text',
    cta: {
      label: 'Custom button text',
    },
  },
  isEditable: true,
  tagsPerLoad: 1,
  initialCount: 2,
  className: 'custom-class',
};

storiesOf('Components/Tags', module)
  .add('Editable tags', () => {
    return <Tags list={tagsData} {...config} />;
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
      handleToggle: action('tag click'),
    };
    return <Tags list={tagsData} {...newConfig} />;
  });
