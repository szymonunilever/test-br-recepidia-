import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
  Fragment,
} from 'react';
import Layout from 'src/components/Layout/Layout';
import { findPageComponentContent } from 'src/utils';
import Tabs, {
  Tab,
  HeaderContent,
  TabsHeaderContent,
} from 'src/components/lib/components/Tabs';
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
import useSearchResults from '../Search/useSearchResults';
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

const arrangeFavoritesOrder = (
  x: Internal.Recipe,
  y: Internal.Recipe,
  savedFavorites: number[]
) => {
  const xIndex = savedFavorites.indexOf(x.recipeId);
  const yIndex = savedFavorites.indexOf(y.recipeId);
  if (xIndex > yIndex) {
    return -1;
  }
  if (yIndex > xIndex) {
    return 1;
  }
  return 0;
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
  const [tabsHeaderContent, setTabsHeaderContent] = useState<TabsHeaderContent>(
    tabsContent.tabsHeaderContent
  );
  const { getRecipeDataByIds, recipeByIdsResults } = useSearchResults(
    savedFavorites.join(' OR ')
  );
  recipeByIdsResults.list.sort((x, y) =>
    arrangeFavoritesOrder(x, y, savedFavorites)
  );
  const {
    getRecipeDataByIds: getMealPlannerResults,
    recipeByIdsResults: mealPlannerResults,
  } = useSearchResults(
    (Array.isArray(getUserProfileByKey(ProfileKey.mealPlannerResults))
      ? getUserProfileByKey(ProfileKey.mealPlannerResults)
      : []
    )
      // @ts-ignore
      .join(' OR ')
  );
  const hasFavorites = recipeByIdsResults && recipeByIdsResults.count > 0;
  const passedMealPlanner = mealPlannerResults && mealPlannerResults.count > 0;
  const RecipeListingWithFavorite = useFavorite(
    (getUserProfileByKey(ProfileKey.favorites) as number[]) || [],
    updateFavorites,
    RecipeListing,
    FavoriteIcon
  );
  const onLoadMoreRecipes = useCallback(
    (tags: Internal.Tag[], sortingOption: string, size: number) =>
      getRecipeDataByIds(savedFavorites.join(' OR '), {
        from: recipeByIdsResults.list.length,
        size,
      }),
    [recipeByIdsResults]
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
    getRecipeDataByIds(savedFavorites.join(' OR '), { from: 0, size: 8 });
  }, []);
  useEffect(() => {
    const query = (Array.isArray(
      getUserProfileByKey(ProfileKey.mealPlannerResults)
    )
      ? getUserProfileByKey(ProfileKey.mealPlannerResults)
      : []
    )
      // @ts-ignore
      .join(' OR ');
    if (query) {
      getMealPlannerResults(query, { from: 0, size: 7 });
    }
  }, []);
  useEffect(() => {
    const newTabsHeaderContent = Object.assign({}, tabsHeaderContent);
    newTabsHeaderContent.contents.forEach((item: HeaderContent) => {
      if (item.view === 'ProfileFavorites' && recipeByIdsResults.count) {
        item.subheading = recipeByIdsResults.count
          ? (item.defaultSubheading || '').replace(
              '{num}',
              recipeByIdsResults.count.toString()
            )
          : item.subheading || '';
      }
    });
    setTabsHeaderContent(newTabsHeaderContent);
  }, [recipeByIdsResults.count]);

  return (
    <Layout className="header--bg">
      <SEO {...seo} />
      <Kritique />
      <DigitalData title={seo && seo.title} type={type} />
      <Tabs
        content={tabsContent.tabsContent}
        tabsHeaderContent={tabsHeaderContent}
        className={cx(theme.userProfile, '')}
        tabFromLocation
        location={location}
      >
        <Tab view="ProfileFavorites">
          <div className="user-profile-favorites">
            {hasFavorites ? (
              <RecipeListingWithFavorite
                content={recipeContent}
                list={recipeByIdsResults.list}
                ratingProvider={RatingAndReviewsProvider.kritique}
                className="recipe-list favorites"
                initialCount={8}
                titleLevel={2}
                viewType={RecipeListViewType.Base}
                loadMoreConfig={{
                  type: LoadMoreType.async,
                  onLoadMore: onLoadMoreRecipes,
                  allCount: recipeByIdsResults.count,
                }}
                imageSizes={'(min-width: 768px) 25vw, 50vw'}
              />
            ) : (
              <Fragment>
                <NullResult
                  content={nullResultContent}
                  className="recipe-list__null-results"
                  titleLevel={2}
                />
                <Link className="favorites__button" to={'/recipes'}>
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
        <Tab view="MealPlanner" visible={passedMealPlanner}>
          <Fragment>
            <Text tag={TagName.h2} text={mealPlanResultsContent.title} />
            <RecipeListingCarousel
              list={mealPlannerResults.list}
              config={carouselConfig}
              titleLevel={1}
              onFavoriteChange={() => {}}
              imageSizes={'(min-width: 768px) 25vw, 50vw'}
              ratingProvider={RatingAndReviewsProvider.kritique}
            />
            <div className={theme.mealPlannerBtnWrap}>
              <Link
                className={cx(theme.mealPlannerBtn, 'button')}
                to={'/meal-planner'}
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
