import React from 'react';
import { storiesOf } from '@storybook/react';
import PlaceholderIcon from '../src/svgs/inline/placeholder.svg';

import SeachInput from 'src/components/lib/SearchInput';
import searchData from 'src/components/data/search.json';

const content: AppContent.SearchInput.Content = {
  title: 'Custom title text',
};

const config = {
  searchResultsCount: 8,
  labelIcon: <PlaceholderIcon />,
  buttonResetIcon: <PlaceholderIcon />,
  buttonSubmitIcon: <PlaceholderIcon />,
};

storiesOf('Components/SearchInput', module).add('defaultView', () => {
  return <SeachInput list={searchData} content={content} {...config} />;
});
