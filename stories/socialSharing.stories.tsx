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
      name: 'facebook',
      label: 'Facebook',
    },
    {
      name: 'twitter',
      label: 'Twitter',
    },
    {
      name: 'linkedIn',
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
    'SocialSharing Base with icons local images and text',
    () => {
      const localImage = {
        id: '0bcf6c75-0450-554d-89c7-85316cc28839',
        childImageSharp: {
          fluid: {
            base64:
              'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAPABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAMBBP/EABYBAQEBAAAAAAAAAAAAAAAAAAIBA//aAAwDAQACEAMQAAABtaDF46jn/8QAGBABAAMBAAAAAAAAAAAAAAAAAQACIRH/2gAIAQEAAQUCOiJLOisNaT//xAAWEQEBAQAAAAAAAAAAAAAAAAAAARL/2gAIAQMBAT8Baj//xAAWEQEBAQAAAAAAAAAAAAAAAAAAARL/2gAIAQIBAT8BjFf/xAAaEAACAgMAAAAAAAAAAAAAAAABEQAQIUFx/9oACAEBAAY/AtKI0Qsij2f/xAAbEAACAwADAAAAAAAAAAAAAAABEQAhMWFx4f/aAAgBAQABPyF8Tbl6ZgBwY00h0xMNR2vyAKEApGZ//9oADAMBAAIAAwAAABBED//EABgRAAIDAAAAAAAAAAAAAAAAAAARASFh/9oACAEDAQE/EJwVSP/EABYRAQEBAAAAAAAAAAAAAAAAABEAIf/aAAgBAgEBPxDRLrf/xAAaEAEAAwEBAQAAAAAAAAAAAAABABEhMUGR/9oACAEBAAE/ENEODrpaeRSbBgdhYqZVT4xhxuFRsZdVsebQii6YCKmT/9k=',
            aspectRatio: 1.3639181649101053,
            src:
              '/static/19d6fa90d8c16a12c22f10dd36139c04/bc3a8/c2a86e7d-9037-478a-926d-8e2cc27cda69.jpg',
            srcSet:
              '/static/19d6fa90d8c16a12c22f10dd36139c04/d278e/c2a86e7d-9037-478a-926d-8e2cc27cda69.jpg 200w,\n/static/19d6fa90d8c16a12c22f10dd36139c04/8539d/c2a86e7d-9037-478a-926d-8e2cc27cda69.jpg 400w,\n/static/19d6fa90d8c16a12c22f10dd36139c04/bc3a8/c2a86e7d-9037-478a-926d-8e2cc27cda69.jpg 800w,\n/static/19d6fa90d8c16a12c22f10dd36139c04/81ef8/c2a86e7d-9037-478a-926d-8e2cc27cda69.jpg 1200w,\n/static/19d6fa90d8c16a12c22f10dd36139c04/989b1/c2a86e7d-9037-478a-926d-8e2cc27cda69.jpg 1600w,\n/static/19d6fa90d8c16a12c22f10dd36139c04/c82f6/c2a86e7d-9037-478a-926d-8e2cc27cda69.jpg 2400w,\n/static/19d6fa90d8c16a12c22f10dd36139c04/8c25d/c2a86e7d-9037-478a-926d-8e2cc27cda69.jpg 4400w',
            srcWebp:
              '/static/19d6fa90d8c16a12c22f10dd36139c04/c6096/c2a86e7d-9037-478a-926d-8e2cc27cda69.webp',
            srcSetWebp:
              '/static/19d6fa90d8c16a12c22f10dd36139c04/1932c/c2a86e7d-9037-478a-926d-8e2cc27cda69.webp 200w,\n/static/19d6fa90d8c16a12c22f10dd36139c04/f4957/c2a86e7d-9037-478a-926d-8e2cc27cda69.webp 400w,\n/static/19d6fa90d8c16a12c22f10dd36139c04/c6096/c2a86e7d-9037-478a-926d-8e2cc27cda69.webp 800w,\n/static/19d6fa90d8c16a12c22f10dd36139c04/b6424/c2a86e7d-9037-478a-926d-8e2cc27cda69.webp 1200w,\n/static/19d6fa90d8c16a12c22f10dd36139c04/7a72d/c2a86e7d-9037-478a-926d-8e2cc27cda69.webp 1600w,\n/static/19d6fa90d8c16a12c22f10dd36139c04/c5845/c2a86e7d-9037-478a-926d-8e2cc27cda69.webp 2400w,\n/static/19d6fa90d8c16a12c22f10dd36139c04/dc113/c2a86e7d-9037-478a-926d-8e2cc27cda69.webp 4400w',
            sizes: '(max-width: 800px) 100vw, 800px',
          },
        },
      };

      const icons: SocialIcons = {
        facebook: localImage,
        twitter: localImage,
        linkedIn: localImage,
      };

      return (
        <>
          <AddThis />
          <SocialSharing
            content={content}
            icons={icons}
            showTextLabels={true}
            viewType={SocialSharingViewType.Base}
          />
        </>
      );
    },
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
