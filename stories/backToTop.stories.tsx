import { storiesOf } from '@storybook/react';
import React from 'react';
// @ts-ignore
import Icon from 'src/svgs/inline/arrow-up.svg';
import { BackToTop } from '../src/components/lib/components/BackToTop';
import { ButtonViewType } from '../src/components/lib/components/common/Button';

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
            content={{ label: undefined }}
            className="backToTop"
            Icon={Icon}
          />
        </div>
      </>
    ),
    { inline: false }
  );
