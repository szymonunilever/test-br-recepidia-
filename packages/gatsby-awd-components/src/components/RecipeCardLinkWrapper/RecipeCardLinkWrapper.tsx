import cx from 'classnames';
import { Link } from 'gatsby';
import React, { FunctionComponent } from 'react';
import { RecipeCardProps } from '../RecipeCard';
import theme from '../RecipeCard/RecipeCard.module.scss';
import { RecipeCardLinkWrapperProps } from './models';

export const RecipeCardLinkWrapper:FunctionComponent<RecipeCardLinkWrapperProps> = ({isExternal, className, title, children, slug, ...props}) => {
  const wrapClasses = cx(theme.recipeCard, 'recipe-card', className);
  const LinkComponent: any = isExternal ? 'a' : Link;
  const linkProps = {'aria-label' : title, ...props};
  if (isExternal) {
    linkProps[ 'href' ] = props.href || slug;
    linkProps[ 'target' ] = props.target || '_blank';
    linkProps[ 'rel' ] = props.rel || 'noopener noreferrer';
  } else {
    linkProps[ 'to' ] = props.to || props.href || slug;
  }

  return <LinkComponent  {...linkProps} className={wrapClasses}>
    {children}
  </LinkComponent>
};

export default RecipeCardLinkWrapper;
