import { storiesOf } from '@storybook/react';
import { Helmet } from 'react-helmet';
import React from 'react';
import { SocialSharing, SocialIcons, SocialSharingViewType } from '../index';
import { ReactComponent as CloseButtonIcon } from 'src/svgs/inline/x-mark.svg';
import { ReactComponent as FbIcon } from 'src/svgs/inline/facebook.svg';
import { ReactComponent as TwitterIcon } from 'src/svgs/inline/twitter.svg';
import { ReactComponent as PinterestIcon } from 'src/svgs/inline/pinterest.svg';
import { ReactComponent as OpenModelButtonIcon } from 'src/svgs/inline/social-sharing.svg';

import socialSharingContent from '../mocks/socialSharingContent.json';
export const AddThis = ({ callback }: { callback: (e: Event) => void }) => {
  // @ts-ignore
  const handleScriptInject = ({ scriptTags }) => {
    if (scriptTags) {
      const scriptTag = scriptTags[0];
      scriptTag.onload = callback;
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeClientState = (newState: any, addedTags: any) =>
    handleScriptInject(addedTags);

  return (
    <Helmet
      // @ts-ignore
      onChangeClientState={handleChangeClientState}
      script={[
        {
          type: 'text/javascript',
          src: 'https://s7.addthis.com/js/300/addthis_widget.js',
          async: true,
        },
      ]}
    />
  );
};

const content: AppContent.SocialSharing.Content = socialSharingContent;

const icons: SocialIcons = {
  facebook: FbIcon,
  twitter: TwitterIcon,
  pinterest: PinterestIcon,
};

storiesOf('Generic/Social Sharing', module)
  .add(
    'Base without icons',
    () => (
      <>
        {/*
          //@ts-ignore */}
        <SocialSharing content={content} WidgetScript={AddThis} />
      </>
    ),
    { inline: false }
  )
  .add(
    'Base with icons',
    () => (
      <>
        {/*
          //@ts-ignore */}
        <SocialSharing {...{ icons, content }} WidgetScript={AddThis} />
      </>
    ),
    { inline: false }
  )
  .add(
    'Base with icons and text',
    () => (
      <>
        {/*
          //@ts-ignore */}
        <SocialSharing
          {...{ OpenModelButtonIcon, CloseButtonIcon, content, icons }}
          WidgetScript={AddThis}
          showTextLabels={true}
        />
      </>
    ),
    { inline: false }
  )
  .add(
    'Base with icons local images and text',
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
          {/*
          //@ts-ignore  */}
          <SocialSharing
            WidgetScript={AddThis}
            {...{ icons, content }}
            showTextLabels={true}
            viewType={SocialSharingViewType.Base}
          />
        </>
      );
    },
    { inline: false }
  )
  .add(
    'in modal without icons ',
    () => (
      <>
        {/*
          //@ts-ignore */}
        <SocialSharing
          WidgetScript={AddThis}
          viewType={SocialSharingViewType.Modal}
          {...{ CloseButtonIcon, content }}
        />
      </>
    ),
    { inline: false }
  );
