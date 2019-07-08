import React from 'react';
import GatsbyLink from 'gatsby-link';
import { AdaptiveImageProps } from '../../models';

const WithLink = (Component: React.ComponentType<AdaptiveImageProps>) => {
  const Composition = (props: AdaptiveImageProps) =>
    props.url ? (
      <GatsbyLink className="adaptive-image__link" to={props.url}>
        <Component {...props} />
      </GatsbyLink>
    ) : (
      <Component {...props} />
    );

  return Composition;
};

export default WithLink;
