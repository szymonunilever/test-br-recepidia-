import cx from 'classnames';
import React, { SyntheticEvent } from 'react';
import { BrandLogoProps } from './models';
import { navigate } from 'gatsby';
import { getBrandLogo } from './getBrandLogo';
import theme from './BrandLogo.module.scss';

export const BrandLogo = ({
  className,
  brand,
  linkTo
}: BrandLogoProps) => {
  const classWrapper = cx(theme.brandLogo, linkTo && theme.brandLogoClickable, className, 'brand-logo');
  // @ts-ignore
  const currentBrand = brand && getBrandLogo(brand);
  const handleLogoClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    linkTo && navigate(linkTo);
  };

  return currentBrand ? (
    <div
      className={classWrapper}
      onClick={handleLogoClick}
    >
      {currentBrand}
    </div>
  ) : null;
};

export default BrandLogo;
