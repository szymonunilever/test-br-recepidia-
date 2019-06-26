import { storiesOf } from '@storybook/react';
import React from 'react';
import SocialSharing, {
  SocialIcons,
  SocialSharingViewType,
} from 'src/components/lib/components/SocialSharing';
import CloseButton from 'src/svgs/inline/x-mark.svg';
import Icon from 'src/svgs/inline/placeholder.svg';
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
      view: 'linkedIn',
      label: 'Linked In',
    },
  ],
  openModalButton: {
    label: 'Share into social networks',
  },
};

const icons: SocialIcons = {
  facebook: Icon,
  twitter: Icon,
  linkedIn: Icon,
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
    'SocialSharing Base with icons',
    () => (
      <>
        <AddThis />
        <SocialSharing content={content} icons={icons} />
      </>
    ),
    { inline: false }
  )
  .add(
    'SocialSharing Base with icons and text',
    () => (
      <>
        <AddThis />
        <SocialSharing content={content} icons={icons} showTextLabels={true} />
      </>
    ),
    { inline: false }
  )
  .add(
    'SocialSharing im modal without icons ',
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
