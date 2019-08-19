import cx from 'classnames';
import get from 'lodash/get';
import React, { useState } from 'react';
import Button, { ButtonViewType } from '../Button';
import { Modal } from '../Modal';
import { TagName } from '../Text/index';
import { RecipeNutrientsProps, RecipeNutrientsViewType } from './models';
import { RecipeNutrientsBody } from './partials';
import theme from './RecipeNutrients.module.scss';

export const RecipeNutrients = ({
  className,
  viewType = RecipeNutrientsViewType.WithAction,
  CloseButton,
  ...props
}: RecipeNutrientsProps) => {
  const [state, setState] = useState(false);
  const openModal = () => {
    setState(true);
  };
  const closeModal = () => {
    setState(false);
  };
  const classWrapper = cx(theme.recipeNutrients, className);

  const noInfo = !(
    get(props.recipe, 'nutrients', []).toString() ||
    get(props.recipe, 'nutrientsPerServing', []).toString() ||
    get(props.recipe, 'nutrientsPer100g', []).toString()
  );

  if (noInfo) return <></>;

  return viewType === RecipeNutrientsViewType.Base ? (
    <RecipeNutrientsBody
      data-comonentname="recipeNutrients"
      className={classWrapper}
      {...props}
    />
  ) : (
    <div data-comonentname="recipeNutrients">
      <Button
        className="recipe-nutrients__button"
        content={props.content.buttonLabel}
        viewType={ButtonViewType.classic}
        onClick={openModal}
      />
      <Modal
        className="recipe-nutrients__modal"
        close={closeModal}
        isOpen={state}
        // @ts-ignore
        closeBtn={<CloseButton />}
        title={props.modalTitle}
        titleLevel={TagName.h4}
      >
        <RecipeNutrientsBody className={classWrapper} {...props} />
      </Modal>
    </div>
  );
};

export default RecipeNutrients;
