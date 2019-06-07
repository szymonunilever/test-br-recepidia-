import { storiesOf } from '@storybook/react';
import React from 'react';
// @ts-ignore
import Icon from 'src/svgs/inline/plus.svg';
import { BackToTop } from '../src/components/lib/BackToTop';
import { ButtonViewType } from '../src/components/lib/common/Button';

const page = {
  height: '200vh',
};
storiesOf('Components/Back To Top', module)
  .add(
    'Back to top with Text button',
    () => (
      <>
        <div style={page}>
          <BackToTop>Back to top</BackToTop>
        </div>
      </>
    ),
    { inline: false }
  )
  .add(
    'Back to top with Icon',
    () => (
      <>
        <div style={page}>
          <BackToTop viewType={ButtonViewType.icon} icon={<Icon />} />
        </div>
      </>
    ),
    { inline: false }
  );
