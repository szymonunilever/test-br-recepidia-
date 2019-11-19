import { storiesOf } from '@storybook/react';
import React from 'react';
import { NullResult } from '../index';

const nullResultContent = {
  title: 'We found 0 results',
  subtitle: 'Maybe try the following:',
  textList: [
    'Use short keywords in your search',
    'Try not to use too long phrases',
    "Don't use too many filter at once",
    'Try using only filters',
  ],
};

storiesOf('Generic/NullResult', module).add('default', () => (
  <NullResult content={nullResultContent} className="" />
));
