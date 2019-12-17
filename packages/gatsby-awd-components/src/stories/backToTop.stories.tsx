import { storiesOf } from '@storybook/react';
import React from 'react';
import { ReactComponent as Icon } from 'src/svgs/inline/arrow-up.svg';
import { BackToTop } from '../index';
import { ButtonViewType } from '../components/Button';

const page = {
  height: '200vh',
  fontSize: '2rem',
};

const content: AppContent.BackToTopContent = {
  label: 'Back to top',
};

storiesOf('Generic/Back To Top', module)
  .add(
    'with RecipeDietaryAttributeIcon',
    () => (
      <>
        <div style={page}>
          Scroll down to see Back-to-top button in the right bottom corner
          <BackToTop content={{ label: undefined }} Icon={Icon} />
        </div>
      </>
    ),
    { inline: false }
  )
  .add(
    'with RecipeDietaryAttributeIcon and Text',
    () => (
      <>
        <div style={page}>
          Scroll down to see Back-to-top button in the right bottom corner
          <BackToTop content={content} Icon={Icon} />
        </div>
      </>
    ),
    { inline: false }
  )
  .add(
    'with RecipeDietaryAttributeIcon viewType',
    () => (
      <>
        <div style={page}>
          Scroll down to see Back-to-top button in the right bottom corner
          <BackToTop
            content={{ label: undefined }}
            Icon={Icon}
            viewType={ButtonViewType.icon}
          />
        </div>
      </>
    ),
    { inline: false }
  );
