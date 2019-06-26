import { storiesOf } from '@storybook/react';
import React from 'react';
import SocialSharing, {
  SocialSharingViewType,
} from 'src/components/lib/components/SocialSharing';
import CloseButton from 'src/svgs/inline/x-mark.svg';

import AddThis from '../integrations/AddThis';

const content: AppContent.SocialSharing.Content = {
  buttons: [
    {
      view: 'facebook',
      label: 'Facebook',
    },
    {
      view: 'twitter',
      label: 'Twitter',
    },
    {
      view: 'pinterest',
      label: 'Pinterest',
    },
  ],
  openModalButton: {
    label: 'Share into social networks',
  },
};

storiesOf('Components/Social Sharing', module)
  .add(
    'SocialSharing Base without icons',
    () => (
      <>
        <AddThis />
        <SocialSharing content={content} />
      </>
    ),
    { inline: false }
  )
  .add(
    'SocialSharing without icons ',
    () => (
      <>
        <AddThis />
        <SocialSharing
          content={content}
          viewType={SocialSharingViewType.Modal}
          CloseButtonIcon={CloseButton}
        />
      </>
    ),
    { inline: false }
  );
