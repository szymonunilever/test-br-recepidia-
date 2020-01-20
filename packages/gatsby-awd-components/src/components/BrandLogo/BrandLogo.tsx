import cx from 'classnames';
import React, { SyntheticEvent } from 'react';
import { BrandLogoProps } from './models';
import { Link, navigate } from 'gatsby';
import { getBrandLogo } from './getBrandLogo';
import theme from './BrandLogo.module.scss';

export const BrandLogo = ({
  className,
  brand,
  linkTo,
  isExternal = false,
}: BrandLogoProps) => {
  const classWrapper = cx(theme.brandLogo, linkTo && theme.brandLogoClickable, className, 'brand-logo');
  const currentBrand = brand && getBrandLogo(brand);
  const LinkComponent: any = isExternal ? 'a' : Link;
  const linkProps: any = {'aria-label': brand };
  if (isExternal) {
    linkProps[ 'href' ] = linkTo;
    linkProps[ 'target' ] = '_blank';
    linkProps[ 'rel' ] = 'noopener noreferrer';
  } else {
    linkProps[ 'to' ] = linkTo;
  }

  return currentBrand ? (
    <LinkComponent {...linkProps} className={classWrapper}>
      {currentBrand}
    </LinkComponent>
  ) : null;
};

export default BrandLogo;
