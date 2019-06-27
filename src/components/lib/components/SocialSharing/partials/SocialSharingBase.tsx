import React, { useEffect, useState } from 'react';
import { SocialSharingBaseProps } from './models';
import theme from './SocialSharingBase.module.scss';
import cx from 'classnames';
import Img from 'gatsby-image';
import keys from 'integrations/keys.json';

export const SocialSharingBase = ({
  buttonClassName,
  buttons,
  handleSocialButtonClick,
  handleSocialDialogClose,
  icons,
  showTextLabels,
}: SocialSharingBaseProps) => {
  const serviceCodes: { [key: string]: string } = keys.addThis.serviceCodes;
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
      }, 10);
    };
    if (!state.loaded) initSocial();
  });

  const socialButtons = buttons.map((item, key) => {
    const { name, label, linkDescriptionToShare, linkTitleToShare } = item;
    const classWrapperButton = cx(theme.socialSharingButton, buttonClassName);
    const props = {
      type: 'button' as 'button',
      className: classWrapperButton,
      'data-url': state.href,
      'data-title': linkTitleToShare,
      'data-description': linkDescriptionToShare,
      title: label,
    };
    const iconProps = {
      className: 'social-sharing-button__icon',
      alt: label,
      disabled: true,
    };

    const Icon =
      icons && name && icons[name] && !icons[name].aspectRatio
        ? icons[name]
        : null;

    return (
      <button key={key} data-service={serviceCodes[name]} {...props}>
        {Icon ? (
          <Icon className="social-sharing-button__icon" {...iconProps} />
        ) : icons && icons[name] ? (
          <Img fluid={icons[name]} {...iconProps} />
        ) : (
          label
        )}
        {showTextLabels ? (
          <span className="social-sharing-button__label">{label}</span>
        ) : null}
      </button>
    );
  });

  return <div className={theme.socialSharing}>{socialButtons}</div>;
};
