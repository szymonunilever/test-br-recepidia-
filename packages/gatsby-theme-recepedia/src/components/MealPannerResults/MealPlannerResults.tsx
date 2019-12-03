import {
  Button,
  ButtonViewType,
  Modal,
  RatingAndReviewsProvider,
  RecipeAddPlaceholderProps,
  RecipeCardLinkWrapper,
  RecipeCardLinkWrapperProps,
  RecipeListing,
  RecipeListViewType,
  ResultSection as WizardResultSection,
  SearchInput,
  SearchInputProps,
  SearchParams,
  TagName,
  Text,
  RecipeCard,
  RecipeAddPlaceholder,
} from 'gatsby-awd-components/src';
import React, {
  FunctionComponent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { IMAGE_SIZES } from '../../constants';
import theme from '../../staticPages/MealPlanner/mealPlanner.module.scss';
import { ReactComponent as PlaceholderAddButton } from '../../svgs/inline/plus-light.svg';
import { ReactComponent as SearchIcon } from '../../svgs/inline/search-icon.svg';
import { ReactComponent as Spinner } from '../../svgs/inline/spinner.svg';
import { ReactComponent as ButtonCloseIcon } from '../../svgs/inline/x-mark.svg';
import { ReactComponent as CheckMarkIcon } from 'src/svgs/inline/checkmark-bigger.svg';
import {
  RecipeListingIcons as icons,
  removeRecipeCardButtonDefaults,
} from '../../themeDefaultComponentProps';
import { findPageComponentContent } from '../../utils';
import {
  getRecipeResponse,
  getSearchSuggestionResponse,
} from '../../utils/searchUtils';
import { MealPannerResultsProps } from './models';
import differenceBy from 'lodash/differenceBy';

export const MealPlannerResults: FunctionComponent<MealPannerResultsProps> = ({
  containerClass,
  resultsDefault,
  maxResults,
  components,
  refreshResults,
  changeResultSize,
  callback,
  isLoading,
  actionCallback,
  stepId,
}) => {
  const CUSTOM_SEARCH_RESULT_INITIAL_COUNT = 8;
  // Get Components Contents
  const componentContent = findPageComponentContent(components, 'Wizard');
  const wizardResultSection = componentContent.wizardResultSection;
  const removeFromMPConfirmationContent: AppContent.ConfirmationContent = findPageComponentContent(
    components,
    'Confirmation',
    'RemoveFromMPConfirmation'
  );
  const searchModalContent = findPageComponentContent(
    components,
    'SearchCustomRecipeModal'
  );
  const customSearchRecipeList: AppContent.RecipeListing.Content = findPageComponentContent(
    components,
    'RecipeListing',
    'MPCustomSearchResult'
  );
  const customSearchContent = findPageComponentContent(
    components,
    'SearchCustomRecipeResult'
  );

  // Define States
  const [recipeCards, setRecipeCards] = useState<
    | ReactElement<RecipeCardLinkWrapperProps>[]
    | ReactElement<RecipeAddPlaceholderProps>[]
  >([]);
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const [recipeToRemove, setRecipeToRemove] = useState();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showCustomSelector, setShowCustomSelector] = useState(false);
  const [recipesToSelect, setRecipesToSelect] = useState<Internal.Recipe[]>([]);
  const [recipeSelected, setRecipeSelected] = useState<number>();
  const [customSearchInProcess, setCustomSearchInProcess] = useState(false);
  const [customSearchResultContent, setCustomSearchResultContent] = useState(
    customSearchContent
  );
  const [searchInputResults, setSearchInputResults] = useState<
    SearchInputProps['searchResults']
  >([]);

  // Define Callbacks
  const openCustomSearch = useCallback(() => {
    setShowSearchModal(true);
  }, []);
  const removeFromMP = useCallback(
    (manual: boolean) => {
      const recipeList = [...resultsDefault];
      setRecipesToSelect([]);
      if (manual) {
        openCustomSearch();
        setShowRemoveConfirmation(false);
      } else {
        const recipeIndex = recipeList.findIndex(
          recipe => recipe.recipeId === recipeToRemove
        );
        if (recipeList.length > maxResults) {
          recipeList.splice(recipeIndex, 1);
          refreshResults(recipeList);
          setShowRemoveConfirmation(false);
          setRecipeToRemove(undefined);
        } else {
          recipeList.splice(recipeIndex, 1);
          refreshResults(recipeList, true);
          setShowRemoveConfirmation(false);
          setRecipeToRemove(undefined);
        }
      }
    },
    [showRemoveConfirmation]
  );
  const openCustomRecipeSelector = useCallback(
    value => {
      setCustomSearchInProcess(true);
      getRecipeResponse(value, {}).then(res => {
        setCustomSearchResultContent(customSearchContent);
        let recipes: Internal.Recipe[] = [];
        if (res.body.hits.total.value === 0) {
          setRecipesToSelect([]);
          setShowCustomSelector(true);
          setCustomSearchInProcess(false);
          return;
        }
        res.body.hits.hits.forEach(resItem => {
          recipes.push(resItem._source as Internal.Recipe);
        });
        recipes = differenceBy(recipes, resultsDefault, 'recipeId');
        customSearchContent.onResult.subheading = customSearchContent.onResult.subheading
          .replace('{numRes}', `${recipes.length}`)
          .replace('{searchInputValue}', value);
        setRecipesToSelect(recipes);
        setCustomSearchInProcess(false);
      });
    },
    [resultsDefault]
  );
  const onCustomRecipeSelected = useCallback(() => {
    if (recipesToSelect && recipesToSelect.length > 0) {
      const recipeList = [...resultsDefault];
      setRecipeCards([]);

      const recipeShouldAdd =
        recipesToSelect &&
        recipesToSelect.find(recipe => recipe.recipeId === recipeSelected);

      if (recipeToRemove) {
        const recipeIndex = recipeList.findIndex(
          recipe => recipe.recipeId === recipeToRemove
        );
        recipeShouldAdd && recipeList.splice(recipeIndex, 1, recipeShouldAdd);
        setRecipeToRemove(undefined);
      } else {
        recipeShouldAdd && recipeList.push(recipeShouldAdd);
      }

      setShowCustomSelector(false);
      setRecipesToSelect([]);
      refreshResults(recipeList);
    }
  }, [recipesToSelect, recipeSelected, resultsDefault]);
  const searchAgain = useCallback(() => {
    setShowCustomSelector(false);
    setShowSearchModal(true);
  }, []);

  const onBackFromCustomSearch = useCallback(() => {
    if (recipesToSelect.length === 0) {
      removeFromMP(false);
      setShowCustomSelector(false);
    } else {
      searchAgain();
    }
  }, [recipesToSelect]);

  const getSearchSuggestionData = useCallback(
    async (searchQuery: string, params: SearchParams) => {
      getSearchSuggestionResponse(searchQuery, params)
        .then(values => {
          const [recipeRes] = values;
          setSearchInputResults([
            ...recipeRes.body.hits.hits.map(item => item._source.title),
          ]);
        })
        .catch(() => {});
    },
    [showSearchModal]
  );

  // Define Effects
  useEffect(() => {
    if (recipesToSelect && recipesToSelect.length > 0) {
      changeResultSize && changeResultSize(recipesToSelect.length);
      setShowCustomSelector(true);
    }
  }, [recipesToSelect]);
  useEffect(() => {
    const recipeListingChildren = resultsDefault
      ? resultsDefault.map(recipe => (
          <RecipeCardLinkWrapper
            title={recipe.title}
            key={recipe.id}
            slug={recipe.fields.slug}
            isExternal={true}
          >
            <RecipeCard
              {...recipe}
              slug={recipe.fields.slug}
              ratingProvider={RatingAndReviewsProvider.kritique}
              imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
              content={{ title: recipe.title }}
            >
              <Button
                {...removeRecipeCardButtonDefaults}
                onClick={(e, recipeId) => {
                  setShowRemoveConfirmation(true);
                  setRecipeToRemove(recipeId);
                }}
              />
            </RecipeCard>
          </RecipeCardLinkWrapper>
        ))
      : [];
    if (recipeListingChildren && recipeListingChildren.length > 0) {
      while (recipeListingChildren.length < maxResults) {
        recipeListingChildren.push(
          <RecipeAddPlaceholder
            key={'recipeAddPlaceholder_' + recipeListingChildren.length}
            onClick={openCustomSearch}
            Icon={PlaceholderAddButton}
          />
        );
      }
    }
    setRecipeCards(recipeListingChildren);
    changeResultSize && changeResultSize(recipeListingChildren.length);
  }, [resultsDefault]);

  // Define View Parts
  const removeFromMPConfirmationView = (
    <Modal
      className="confirmation__dialog remove-confirmation"
      isOpen={showRemoveConfirmation}
      close={() => {
        removeFromMP(false);
      }}
    >
      {removeFromMPConfirmationContent.text && (
        <Text
          className="remove-confirmation__text"
          tag={TagName.h2}
          text={removeFromMPConfirmationContent.text}
        />
      )}
      <div className="buttons">
        <Button
          className="remove-confirmation__approve button--medium"
          viewType={ButtonViewType.classic}
          content={removeFromMPConfirmationContent.yesButtonText}
          onClick={() => {
            removeFromMP(true);
          }}
          attributes={{ autoFocus: true }}
        />
        <Button
          className="remove-confirmation__approve button--medium"
          viewType={ButtonViewType.classic}
          content={removeFromMPConfirmationContent.noButtonText}
          onClick={() => {
            removeFromMP(false);
          }}
        />
      </div>
    </Modal>
  );
  const customSearchModalView = (
    <Modal
      className="modal--search"
      isOpen={showSearchModal}
      close={() => {
        removeFromMP(false);
        setShowSearchModal(false);
      }}
      closeBtn={<ButtonCloseIcon />}
    >
      <SearchInput
        getSearchResults={getSearchSuggestionData}
        onClickSearchResultsItem={(value: string) => {
          openCustomRecipeSelector(value);
          setShowSearchModal(false);
        }}
        content={searchModalContent}
        searchResults={searchInputResults}
        labelIcon={<SearchIcon />}
        buttonResetIcon={<ButtonCloseIcon />}
        buttonSubmitIcon={<SearchIcon />}
        onSubmit={async value => {
          openCustomRecipeSelector(value);
          setShowSearchModal(false);
        }}
        autoFocus
      />
    </Modal>
  );
  const customSearchResultChildrenView = recipesToSelect.length > 0 && (
    <RecipeListing
      imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.MEAL_PLANNER}
      list={recipesToSelect}
      initialCount={CUSTOM_SEARCH_RESULT_INITIAL_COUNT}
      icons={icons}
      content={customSearchRecipeList}
    >
      {recipesToSelect.map(recipe => (
        <RecipeCard
          className="custom-search_recipe-card"
          key={recipe.id}
          {...recipe}
          slug={recipe.fields.slug}
          ratingProvider={RatingAndReviewsProvider.kritique}
          imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
          content={{ title: recipe.title }}
        >
          <Button
            className="custom-search_check"
            isSelected={recipe.recipeId === recipeSelected}
            onClick={(val, recipeId) => {
              setRecipeSelected(recipeId);
            }}
            viewType={ButtonViewType.icon}
            Icon={CheckMarkIcon}
          />
        </RecipeCard>
      ))}
    </RecipeListing>
  );
  const spinnerView = (
    <div className={theme.spinner}>
      <Spinner />
    </div>
  );

  return showCustomSelector ? (
    <div className="wizard-meal-planer--custom-search">
      <WizardResultSection
        content={customSearchResultContent}
        containerClass={containerClass}
        stepId="customNoResult"
        nextDisabled={!recipeSelected}
        isLoading={false}
        resultSize={recipesToSelect.length}
        actionCallback={
          recipesToSelect.length === 0 ? searchAgain : onCustomRecipeSelected
        }
        callbacks={{
          back: onBackFromCustomSearch,
        }}
      >
        {!customSearchInProcess ? customSearchResultChildrenView : spinnerView}
      </WizardResultSection>
    </div>
  ) : (
    <WizardResultSection
      {...wizardResultSection}
      containerClass={containerClass}
      stepId={stepId}
      isLoading={isLoading}
      resultSize={resultsDefault.length}
      actionCallback={actionCallback}
      callbacks={{
        back: callback,
      }}
    >
      {!isLoading
        ? recipeCards && (
            <RecipeListing
              initialCount={
                recipeCards.length <= maxResults
                  ? recipeCards.length
                  : maxResults
              }
              icons={icons}
              content={findPageComponentContent(components, 'Wizard')}
              list={resultsDefault}
              ratingProvider={RatingAndReviewsProvider.kritique}
              viewType={RecipeListViewType.Trivial}
              className="recipe-list--wizard"
              imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.MEAL_PLANNER}
            >
              {recipeCards}
            </RecipeListing>
          )
        : spinnerView}
      {removeFromMPConfirmationView}
      {customSearchModalView}
    </WizardResultSection>
  );
};

export default MealPlannerResults;
