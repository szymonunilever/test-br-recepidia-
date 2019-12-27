import cx from 'classnames';
import React, { FunctionComponent } from 'react';
import {
  AdaptiveImage,
  TagName,
  Text,
  iconNormalize,
} from 'gatsby-awd-components/src';
import { Link } from 'gatsby';
import theme from './BrandHero.module.scss';
import { BrandHeroProps } from './models';

const BrandHero: FunctionComponent<BrandHeroProps> = ({
  className,
  content,
  titleLevel = 1,
  brandLogo,
  prefix,
  imageSizes,
}) => {
  const { title, image, links } = content;

  // @ts-ignore
  return (
    <>
      <div className={cx(theme.brandHero, className, 'brand-hero')}>
        <AdaptiveImage
          {...image}
          sizes={imageSizes}
          className="brand-hero__image"
        />
        <div className="wrapper brand-hero__content">
          {iconNormalize(brandLogo, 'brand-hero__logo')}
          {prefix ? (
            <Text
              // @ts-ignore */
              tag={TagName[`h${titleLevel + 1}`]}
              className="brand-hero__prefix"
              text={prefix}
            />
          ) : null}
          <Text
            // @ts-ignore */
            tag={TagName[`h${titleLevel}`]}
            className="brand-hero__title"
            text={title}
          />
          <div className="brand-hero__links">
            {links.map((link, index: number) => (
              <Link
                className="brand-hero__link"
                activeClassName="active"
                partiallyActive={true}
                to={link.path}
                key={`brand-hero__link-${index}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandHero;
