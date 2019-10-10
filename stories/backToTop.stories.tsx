import { storiesOf } from '@storybook/react';
import React from 'react';
import { ReactComponent as Icon } from 'src/svgs/inline/arrow-up.svg';
import { BackToTop } from '../src/components/lib';

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
          <BackToTop content={{ label: undefined }} Icon={Icon} />
        </div>
      </>
    ),
    { inline: false }
  );
