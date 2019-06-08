import React from 'react';
import { storiesOf } from '@storybook/react';
import Tags from '../src/components/lib/Tags';
import tagsData from '../src/components/data/tags.json';

storiesOf('Components/Tags', module)
  .add('Editable tags', () => {
    return <Tags data={tagsData} />;
  })
  .add('Not editable tags', () => {
    const newData = {
      ...tagsData,
      isEditable: false,
    };
    return <Tags data={newData} />;
  });
