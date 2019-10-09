import React, {
  FunctionComponent,
  useEffect,
  useCallback,
  Fragment,
} from 'react';
import Layout from 'src/components/Layout/Layout';
import { findPageComponentContent } from 'src/utils';
import Tabs, { Tab } from 'src/components/lib/components/Tabs';
import { UserPreferences } from 'src/components/lib/components/UserPreferences';
import { PreferencesQuiz } from 'src/components/lib/components/UserPreferences/partials/PreferencesQuiz';
import { Link } from 'gatsby';
import { RatingAndReviewsProvider } from 'src/components/lib/models/ratings&reviews';
import RecipeListing, {
  RecipeListViewType,
  LoadMoreType,
} from 'src/components/lib/components/RecipeListing';
import { ReactComponent as ArrowIcon } from 'src/svgs/inline/arrow-down.svg';
import { ReactComponent as FavoriteIcon } from 'src/svgs/inline/favorite.svg';
import SEO from 'src/components/Seo';
import DigitalData from '../../../integrations/DigitalData';
import {
  getUserProfileByKey,
  saveUserProfileByKey,
  updateFavorites,
} from 'src/utils/browserStorage';
import { ProfileKey } from 'src/utils/browserStorage/models';
import { Text, TagName } from 'src/components/lib/components/Text';
import RecipeListingCarousel from 'src/components/lib/components/RecipeListing/RecipeListingCarousel';
import Kritique from 'integrations/Kritique';
import theme from './UserProfile.module.scss';
import NullResult from 'src/components/lib/components/NullResult';
import cx from 'classnames';
import useFavorite from 'src/utils/useFavorite';
import withLocation from 'src/components/lib/components/WithLocation';
import { WithLocationProps } from 'src/components/lib/components/WithLocation/models';
import useFavoritesSearch from './useFavoritesSearch';
// Component Styles
import '../../scss/pages/_userProfile.scss';
import get from 'lodash/get';
import { IMAGE_SIZES } from 'src/constants';

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
  arrowIcon: <ArrowIcon />,
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
                content={recipeContent}
                favorites={Array.isArray(favorites) ? favorites : []}
                onFavoriteChange={updateFavoriteState}
                FavoriteIcon={FavoriteIcon}
                withFavorite={true}
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
              />
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
            <Text tag={TagName.h2} text={mealPlanResultsContent.title} />
            <RecipeListingCarousel
              list={mealPlannerResults || []}
              config={carouselConfig}
              titleLevel={1}
              onFavoriteChange={() => {}}
              imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.MEAL_PLANNER}
              ratingProvider={RatingAndReviewsProvider.kritique}
            />
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
