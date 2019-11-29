import React, { FunctionComponent } from 'react';
import { iconNormalize } from '../../../utils';
import { RecipeAddPlaceholderProps } from './models';
import cx from 'classnames';
import theme from './RecipeAddPlaceholder.module.scss';

export const RecipeAddPlaceholder: FunctionComponent<
  RecipeAddPlaceholderProps
> = ({ Icon, onClick, className }) => (
  <div
    className={cx(
      'recipe-card',
      theme.recipeCardPlaceholder,
      'recipe-card--placeholder',
      className
    )}
    onClick={onClick}
  >
    <div className="adaptive-image recipe-card__image">
      <div className="adaptive-image__image gatsby-image-wrapper">
        <div>
          <button
            className={cx(
              'recipe-card',
              theme.recipeCardPlaceholder__button,
              'recipe-card--placeholder__button'
            )}
          >
            {iconNormalize(Icon)}
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default RecipeAddPlaceholder;
