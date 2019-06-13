import { storiesOf } from '@storybook/react';
import React from 'react';
// @ts-ignore
import Icon from 'src/svgs/inline/plus.svg';
import { BackToTop } from '../src/components/lib/BackToTop';
import { ButtonViewType } from '../src/components/lib/common/Button';

const page = {
  height: '200vh',
};

const content: AppContent.BackToTopContent = {
  label: 'Back to top',
};

storiesOf('Components/Back To Top', module)
  .add(
    'Back to top with Text button',
    () => (
      <>
        <div style={page}>
          <BackToTop content={content} />
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
          <BackToTop
            content={content}
            viewType={ButtonViewType.icon}
            icon={<Icon />}
          />
        </div>
      </>
    ),
    { inline: false }
  );
