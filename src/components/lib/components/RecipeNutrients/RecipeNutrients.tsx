import cx from 'classnames';
import React, { useState } from 'react';
import Button, { ButtonViewType } from '../common/Button';
import { Modal } from '../common/Modal';
import { RecipeNutrientsProps, RecipeNutrientsViewType } from './models';
import { RecipeNutrientsBody } from './partials';
import theme from './RecipeNutrients.module.scss';
import { TagName } from '../Text/index';

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

  const view =
    viewType === RecipeNutrientsViewType.Base ? (
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
          title={props.content.modalTitle}
          titleLevel={TagName.h4}
        >
          <RecipeNutrientsBody className={classWrapper} {...props} />
        </Modal>
      </div>
    );

  return view;
};

export default RecipeNutrients;
