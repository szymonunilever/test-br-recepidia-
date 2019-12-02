import React, {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
} from 'react';
import Layout from 'src/components/Layout/Layout';
import { findPageComponentContent } from 'src/utils';
import { Link } from 'gatsby';
import SEO from 'src/components/Seo';
import {
  getUserProfileByKey,
  saveUserProfileByKey,
  updateFavorites,
} from 'src/utils/browserStorage';
import { ProfileKey } from 'src/utils/browserStorage/models';
import Kritique from 'integrations/Kritique';
import {
  favoriteButtonDefaults,
  RecipeListingIcons as icons,
} from '../../themeDefaultComponentProps';
import theme from './UserProfile.module.scss';
import cx from 'classnames';
import useFavorite from 'src/utils/useFavorite';
import useFavoritesSearch from './useFavoritesSearch';
import DigitalData from '../../../integrations/DigitalData';
// Component Styles
import '../../scss/pages/_userProfile.scss';
import get from 'lodash/get';
import { IMAGE_SIZES } from 'src/constants';
import {
  RecipeCard,
  RecipeCardLinkWrapper,
  Button,
  PreferencesQuiz,
  UserPreferencesIcons,
  LoadMoreType,
  NullResult,
  RecipeListing,
  RecipeListViewType,
  Tab,
  Tabs,
  UserPreferences,
  RatingAndReviewsProvider,
  WithLocation as withLocation,
  WithLocationProps,
} from 'gatsby-awd-components/src';
import { ReactComponent as IconArrowUp } from 'src/svgs/inline/arrow-up.svg';
import { ReactComponent as IconArrowDown } from 'src/svgs/inline/arrow-down.svg';
import { ReactComponent as IconSuccess } from 'src/svgs/inline/checkmark-bigger.svg';
import { ReactComponent as IconError } from 'src/svgs/inline/x-mark.svg';
import { ReactComponent as IconEdit } from 'src/svgs/inline/edit.svg';
import { ReactComponent as IconDelete } from 'src/svgs/inline/delete.svg';
import { ReactComponent as CheckMarkIcon } from 'src/svgs/inline/checkmark-bigger.svg';

const userPreferencesIcons: UserPreferencesIcons = {
  arrowUp: <IconArrowUp />,
  arrowDown: <IconArrowDown />,
  error: <IconError />,
  success: <IconSuccess />,
  edit: <IconEdit />,
  delete: <IconDelete />,
  checkMark: <CheckMarkIcon />,
};
const carouselConfig = {
  breakpoints: [
    {
      width: 1366,
      switchElementsBelowBreakpoint: 1,
      switchElementsAfterBreakpoint: 1,
      visibleElementsBelowBreakpoint: 2,
      visibleElementsAboveBreakpoint: 4,
    },
  ],
  arrowIcon: <IconArrowDown />,
};
const FavoritesRecipeListingPage: FunctionComponent<
  FavoriteRecipeListingProps
> = ({
  pageContext: {
    page: { components, seo, type },
  },
  location,
}) => {
  const recipeContent = findPageComponentContent(
    components,
    'RecipeListing',
    'Favorites'
  );
  const buttonContent = findPageComponentContent(
    components,
    'Button',
    'ProfileFavorites'
  );
  const tabsContent = findPageComponentContent(components, 'Tabs');
  const preferencesQuizContent = findPageComponentContent(
    components,
    'PreferencesQuiz',
    'IntroQuiz'
  );
  const mealPlannerQuizContent = findPageComponentContent(
    components,
    'PreferencesQuiz',
    'MealPlanner'
  );
  const userPreferencesContent = findPageComponentContent(
    components,
    'UserPreferences'
  );
  const mealPlanResultsContent = findPageComponentContent(
    components,
    'RecipeListing',
    'MealPlan'
  );
  const mealPlanButtonContent = findPageComponentContent(
    components,
    'Button',
    'ChangeMealPlan'
  );
  const nullResultContent = findPageComponentContent(components, 'NullResult');

  const savedFavorites: number[] = Array.isArray(
    getUserProfileByKey(ProfileKey.favorites)
  )
    ? (getUserProfileByKey(ProfileKey.favorites) as number[])
    : [];
  const savedMealPlannerResults: number[] = Array.isArray(
    getUserProfileByKey(ProfileKey.mealPlannerResults)
  )
    ? (getUserProfileByKey(ProfileKey.mealPlannerResults) as number[])
    : [];
  const { getRecipeDataByIds, recipeList, totalCount } = useFavoritesSearch();
  const {
    getRecipeDataByIds: getMealPlannerResults,
    recipeList: mealPlannerResults,
  } = useFavoritesSearch();
  const hasFavorites = Array.isArray(recipeList)
    ? recipeList.length
    : undefined;
  const passedMealPlanner = Boolean(
    mealPlannerResults && mealPlannerResults.length
  );
  const { updateFavoriteState, favorites } = useFavorite(
    () => getUserProfileByKey(ProfileKey.favorites) as number[],
    updateFavorites
  );

  const onLoadMoreRecipes = useCallback(
    (tags: Internal.Tag[], sortingOption: string, size: number) =>
      getRecipeDataByIds(savedFavorites.join(' OR '), savedFavorites, {
        from: get(recipeList, 'length', 0),
        size,
      }),
    [recipeList]
  );

  const deleteQuestion = useCallback((quizKey: ProfileKey, key: string) => {
    const quiz = getUserProfileByKey(quizKey);
    // @ts-ignore
    delete quiz[key];
    saveUserProfileByKey(quiz, quizKey);
  }, []);
  const saveQuestion = useCallback(
    (quizKey: ProfileKey, key: string, value: string | object | null) => {
      const quiz = getUserProfileByKey(quizKey);
      // @ts-ignore
      quiz[key] = value;
      saveUserProfileByKey(quiz, quizKey);
    },
    []
  );
  const onNewsletterFormSubmit = useCallback((values: object) => {
    // @todo real call
    // eslint-disable-next-line no-console
    console.log('values', values);
  }, []);

  useEffect(() => {
    getRecipeDataByIds(savedFavorites.join(' OR '), savedFavorites, {
      from: 0,
      size: 8,
    });
  }, []);
  useEffect(() => {
    const query = savedMealPlannerResults.join(' OR ');
    if (query) {
      getMealPlannerResults(query, savedMealPlannerResults, {
        from: 0,
        size: 7,
        sort: 'desc',
      });
    }
  }, []);
  const data = [
    {
      pattern: '{num}',
      replacement: (totalCount || 0).toString(),
    },
  ];
  const mealPlannerName =
    getUserProfileByKey(ProfileKey.mealPlannerName) ||
    mealPlanResultsContent.title;
  return (
    <Layout className="header--bg">
      <SEO {...seo} />
      <Kritique />
      <DigitalData title={seo && seo.title} type={type} />
      <Tabs
        content={tabsContent.tabsContent}
        tabsHeaderContent={tabsContent.tabsHeaderContent}
        data={data}
        className={cx(theme.userProfile, '')}
        tabFromLocation
        location={location}
        titleLevel={1}
      >
        <Tab
          view="ProfileFavorites"
          hasContent={Boolean(hasFavorites && hasFavorites > 0)}
        >
          <div className="user-profile-favorites">
            {hasFavorites === undefined ? null : hasFavorites ? (
              <RecipeListing
                icons={icons}
                content={recipeContent}
                list={recipeList || []}
                ratingProvider={RatingAndReviewsProvider.kritique}
                className="recipe-list recipe-list--carousel favorites"
                initialCount={8}
                titleLevel={2}
                viewType={RecipeListViewType.Base}
                loadMoreConfig={{
                  type: LoadMoreType.async,
                  onLoadMore: onLoadMoreRecipes,
                  allCount: totalCount,
                }}
                imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
              >
                {recipeList
                  ? recipeList.map(recipe => (
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
                            {...favoriteButtonDefaults}
                            isSelected={
                              favorites.indexOf(recipe.recipeId) !== -1
                            }
                            onClick={updateFavoriteState}
                          />
                        </RecipeCard>
                      </RecipeCardLinkWrapper>
                    ))
                  : []}
              </RecipeListing>
            ) : (
              <Fragment>
                <NullResult
                  content={nullResultContent}
                  className="recipe-list__null-results"
                  titleLevel={2}
                />
                <Link className="favorites__button" to={'/receita'}>
                  {buttonContent.label}
                </Link>
              </Fragment>
            )}
          </div>
        </Tab>
        <Tab view="UserPreferences" className={theme.userPreferences}>
          <UserPreferences
            icons={userPreferencesIcons}
            deleteQuestion={deleteQuestion}
            saveQuestion={saveQuestion}
            onNewsletterFormSubmit={onNewsletterFormSubmit}
            content={userPreferencesContent}
          >
            <PreferencesQuiz
              questions={preferencesQuizContent.questions}
              // @ts-ignore
              answers={getUserProfileByKey(ProfileKey.initialQuiz)}
              heading={preferencesQuizContent.quizTitle}
              quizKey={ProfileKey.initialQuiz}
            />
            <PreferencesQuiz
              questions={mealPlannerQuizContent.questions}
              // @ts-ignore
              answers={getUserProfileByKey(ProfileKey.mealPlannerAnswers)}
              heading={mealPlannerQuizContent.quizTitle}
              quizKey={ProfileKey.mealPlannerAnswers}
            />
          </UserPreferences>
        </Tab>
        <Tab
          view="MealPlanner"
          visible={passedMealPlanner}
          className="recipe-list--carousel"
        >
          <Fragment>
            <RecipeListing
              icons={icons}
              content={{ title: mealPlannerName }}
              viewType={RecipeListViewType.Carousel}
              list={mealPlannerResults || []}
              carouselConfig={carouselConfig}
              titleLevel={2}
              imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.MEAL_PLANNER}
              ratingProvider={RatingAndReviewsProvider.kritique}
            >
              {mealPlannerResults
                ? mealPlannerResults.map(recipe => (
                    <RecipeCardLinkWrapper
                      title={recipe.title}
                      key={recipe.id}
                      isExternal={true}
                      slug={recipe.fields.slug}
                    >
                      <RecipeCard
                        key={recipe.id}
                        {...recipe}
                        slug={recipe.fields.slug}
                        ratingProvider={RatingAndReviewsProvider.kritique}
                        imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
                        content={{ title: recipe.title }}
                      >
                        <Button
                          {...favoriteButtonDefaults}
                          isSelected={favorites.indexOf(recipe.recipeId) !== -1}
                          onClick={updateFavoriteState}
                        />
                      </RecipeCard>
                    </RecipeCardLinkWrapper>
                  ))
                : []}
            </RecipeListing>
            <div className={theme.mealPlannerBtnWrap}>
              <Link
                className={cx(theme.mealPlannerBtn, 'button')}
                to={'/planejamento-da-semana'}
              >
                {mealPlanButtonContent.label}
              </Link>
            </div>
          </Fragment>
        </Tab>
      </Tabs>
    </Layout>
  );
};

export default withLocation<FavoriteRecipeListingProps & WithLocationProps>(
  // @ts-ignore
  FavoritesRecipeListingPage
);

interface FavoriteRecipeListingProps {
  pageContext: {
    page: AppContent.Page;
  };
  location?: Location;
}
