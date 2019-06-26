import React, { useEffect, useState } from 'react';
import { SocialSharingBaseProps } from './models';
import theme from './SocialSharingBase.module.scss';
import cx from 'classnames';
import Img from 'gatsby-image';

export const SocialSharingBase = ({
  buttonClassName,
  buttons,
  handleSocialButtonClick,
  handleSocialDialogClose,
  icons,
  showTextLabels,
}: SocialSharingBaseProps) => {
  const [state, setState] = useState({ href: '', loaded: false });
  useEffect(() => {
    const initSocial = () => {
      setState({ href: window.location.href, loaded: true });
      setTimeout(() => {
        // @ts-ignore
        const addThis = window.addthis;
        addThis.share({
          // eslint-disable-next-line @typescript-eslint/camelcase
          container_selector: `.${theme.socialSharing}`,
          // eslint-disable-next-line @typescript-eslint/camelcase
          button_selector: `.${theme.socialSharingButton}`,
          click: handleSocialButtonClick ? handleSocialButtonClick : null,
          close: handleSocialDialogClose ? handleSocialDialogClose : null,
        });
      }, 0);
    };
    if (!state.loaded) initSocial();
  });

  const socialButtons = buttons.map((item, key) => {
    const { view, label, linkDescriptionToShare, linkTitleToShare } = item;
    const classWrapperButton = cx(theme.socialSharingButton, buttonClassName);
    const props = {
      key: key,
      type: 'button' as 'button',
      className: classWrapperButton,
      'data-url': state,
      'data-title': linkTitleToShare,
      'data-description': linkDescriptionToShare,
      title: label,
    };
    const iconProps = {
      className: 'social-sharing-button__icon',
      alt: label,
    };
    const FacebookIcon =
      icons && icons.facebook && !icons.facebook.aspectRatio
        ? icons.facebook
        : null;
    const TwitterIcon =
      icons && icons.twitter && !icons.twitter.aspectRatio
        ? icons.twitter
        : null;
    const BitlyIcon =
      icons && icons.bitly && !icons.bitly.aspectRatio ? icons.bitly : null;
    const CopyLinkIcon =
      icons && icons.copyLink && !icons.copyLink.aspectRatio
        ? icons.copyLink
        : null;
    const EmailIcon =
      icons && icons.email && !icons.email.aspectRatio ? icons.email : null;
    const LinkedInIcon =
      icons && icons.linkedIn && !icons.linkedIn.aspectRatio
        ? icons.linkedIn
        : null;
    const PinterestIcon =
      icons && icons.pinterest && !icons.pinterest.aspectRatio
        ? icons.pinterest
        : null;
    const TumblrIcon =
      icons && icons.tumblr && !icons.tumblr.aspectRatio ? icons.tumblr : null;
    const LineIcon =
      icons && icons.line && !icons.line.aspectRatio ? icons.line : null;
    const WhatsUpIcon =
      icons && icons.whatsApp && !icons.whatsApp.aspectRatio
        ? icons.whatsApp
        : null;

    switch (view) {
      case 'facebook':
        return (
          <button data-service="facebook" {...props}>
            {FacebookIcon ? (
              <FacebookIcon className="social-sharing-button__icon" />
            ) : icons && icons.facebook ? (
              <Img fluid={icons.facebook} {...iconProps} />
            ) : (
              label
            )}
            {showTextLabels ? (
              <span className="social-sharing-button__label">{label}</span>
            ) : null}
          </button>
        );
      case 'twitter':
        return (
          <button data-service="twitter" {...props}>
            {TwitterIcon ? (
              <TwitterIcon className="social-sharing-button__icon" />
            ) : icons && icons.twitter ? (
              <Img fluid={icons.twitter} {...iconProps} />
            ) : (
              label
            )}
            {showTextLabels ? (
              <span className="social-sharing-button__label">{label}</span>
            ) : null}
          </button>
        );
      case 'bitly':
        return (
          <button data-service="bitly" {...props}>
            {BitlyIcon ? (
              <BitlyIcon className="social-sharing-button__icon" />
            ) : icons && icons.bitly ? (
              <Img fluid={icons.bitly} {...iconProps} />
            ) : (
              label
            )}
            {showTextLabels ? (
              <span className="social-sharing-button__label">{label}</span>
            ) : null}
          </button>
        );
      case 'copyLink':
        return (
          <button data-service="link" {...props}>
            {CopyLinkIcon ? (
              <CopyLinkIcon className="social-sharing-button__icon" />
            ) : icons && icons.copyLink ? (
              <Img fluid={icons.copyLink} {...iconProps} />
            ) : (
              label
            )}
            {showTextLabels ? (
              <span className="social-sharing-button__label">{label}</span>
            ) : null}
          </button>
        );
      case 'email':
        return (
          <button data-service="email" {...props}>
            {EmailIcon ? (
              <EmailIcon className="social-sharing-button__icon" />
            ) : icons && icons.email ? (
              <Img fluid={icons.email} {...iconProps} />
            ) : (
              label
            )}
            {showTextLabels ? (
              <span className="social-sharing-button__label">{label}</span>
            ) : null}
          </button>
        );
      case 'linkedIn':
        return (
          <button data-service="linkedin" {...props}>
            {LinkedInIcon ? (
              <LinkedInIcon className="social-sharing-button__icon" />
            ) : icons && icons.linkedIn ? (
              <Img fluid={icons.linkedIn} {...iconProps} />
            ) : (
              label
            )}
            {showTextLabels ? (
              <span className="social-sharing-button__label">{label}</span>
            ) : null}
          </button>
        );
      case 'pinterest':
        return (
          <button data-service="pinterest_share" {...props}>
            {PinterestIcon ? (
              <PinterestIcon className="social-sharing-button__icon" />
            ) : icons && icons.pinterest ? (
              <Img fluid={icons.pinterest} {...iconProps} />
            ) : (
              label
            )}
            {showTextLabels ? (
              <span className="social-sharing-button__label">{label}</span>
            ) : null}
          </button>
        );
      case 'tumblr':
        return (
          <button data-service="tumblr" {...props}>
            {TumblrIcon ? (
              <TumblrIcon className="social-sharing-button__icon" />
            ) : icons && icons.tumblr ? (
              <Img fluid={icons.tumblr} {...iconProps} />
            ) : (
              label
            )}
            {showTextLabels ? (
              <span className="social-sharing-button__label">{label}</span>
            ) : null}
          </button>
        );
      case 'line':
        return (
          <button data-service="lineme" {...props}>
            {LineIcon ? (
              <LineIcon className="social-sharing-button__icon" />
            ) : icons && icons.line ? (
              <Img fluid={icons.line} {...iconProps} />
            ) : (
              label
            )}
            {showTextLabels ? (
              <span className="social-sharing-button__label">{label}</span>
            ) : null}
          </button>
        );
      case 'whatsUp':
        return (
          <button data-service="whatsapp" {...props}>
            {WhatsUpIcon ? (
              <WhatsUpIcon className="social-sharing-button__icon" />
            ) : icons && icons.whatsApp ? (
              <Img fluid={icons.whatsApp} {...iconProps} />
            ) : (
              label
            )}
            {showTextLabels ? (
              <span className="social-sharing-button__label">{label}</span>
            ) : null}
          </button>
        );
    }
  });

  return <div className={theme.socialSharing}>{socialButtons}</div>;
};
