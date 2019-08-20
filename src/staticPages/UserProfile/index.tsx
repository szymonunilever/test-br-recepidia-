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
import { Question } from 'src/components/lib/components/Wizard/partials/Quiz/models';
import { Text, TagName } from 'src/components/lib/components/Text';
import RecipeListingCarousel from 'src/components/lib/components/RecipeListing/RecipeListingCarousel';
import RecipeListingWithFavorites from 'src/components/lib/components/RecipeListing/WithFavorites';
import Kritique from 'integrations/Kritique';
import theme from './UserProfile.module.scss';

// @todo remove hardcoded mocks
import mealPlannerQuestionsMock from 'src/components/data/mealPlannerPageMock.json';
import questionsMock from 'src/components/data/introQuiz.json';
import NullResult from 'src/components/lib/components/NullResult';

const carouselConfig = {
  breakpoints: [
    {
      width: 1366,
      switchElementsBelowBreakpoint: 1,
      switchElementsAfterBreakpoint: 2,
      visibleElementsBelowBreakpoint: 2,
      visibleElementsAboveBreakpoint: 4,
    },
  ],
  arrowIcon: <ArrowIcon />,
};

const ListingWithFavorite = RecipeListingWithFavorites(
  RecipeListing,
  updateFavorites,
  getUserProfileByKey(ProfileKey.favorites) as string[],
  FavoriteIcon
);

const FavoritesRecipeListingPage: FunctionComponent<
  FavoriteRecipeListingProps
> = ({
  pageContext: {
    page: { components, seo, type },
  },
}) => {
  const recipeContent = findPageComponentContent(components, 'RecipeListing');
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
  const noMealPlanContent = findPageComponentContent(
    components,
    'Text',
    'NoMealPlanResults'
  );
  const nullResultContent = findPageComponentContent(components, 'NullResult');

  const [tabsHeaderContent, setTabsHeaderContent] = useState<TabsHeaderContent>(
    tabsContent.tabsHeaderContent
  );
  const { getRecipeDataByIds, recipeByIdsResults } = useSearchResults(
    (Array.isArray(getUserProfileByKey(ProfileKey.favorites))
      ? getUserProfileByKey(ProfileKey.favorites)
      : []
    )
      // @ts-ignore
      .join(' OR ')
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
  const passedMealPlanner = mealPlannerResults && mealPlannerResults.count;

  const onLoadMoreRecipes = useCallback(
    (tags: Internal.Tag[], sortingOption: string, size: number) =>
      getRecipeDataByIds(
        (Array.isArray(getUserProfileByKey(ProfileKey.favorites))
          ? getUserProfileByKey(ProfileKey.favorites)
          : []
        )
          // @ts-ignore
          .join(' OR '),
        {
          from: recipeByIdsResults.list.length,
          size,
        }
      ),
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
    // @todo add sorting: First sort by Rating. Entries equal by Rating are sorted by date.
    getRecipeDataByIds(
      (Array.isArray(getUserProfileByKey(ProfileKey.favorites))
        ? getUserProfileByKey(ProfileKey.favorites)
        : []
      )
        // @ts-ignore
        .join(' OR '),
      { from: 0, size: 8 }
    );
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
        className={theme.userProfile}
      >
        <Tab view="ProfileFavorites">
          <div className="user-profile-favorites">
            {hasFavorites ? (
              <ListingWithFavorite
                content={recipeContent}
                list={recipeByIdsResults.list}
                ratingProvider={RatingAndReviewsProvider.kritique}
                favorites={
                  getUserProfileByKey(ProfileKey.favorites) as string[]
                }
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
        <Tab view="UserPreferences">
          <UserPreferences
            deleteQuestion={deleteQuestion}
            saveQuestion={saveQuestion}
            onNewsletterFormSubmit={onNewsletterFormSubmit}
            content={userPreferencesContent}
          >
            // @ts-ignore
            <PreferencesQuiz
              questions={questionsMock.questions as Question[]}
              answers={getUserProfileByKey(ProfileKey.initialQuiz)}
              heading={preferencesQuizContent.quizTitle}
              quizKey={ProfileKey.initialQuiz}
            />
            // @ts-ignore
            <PreferencesQuiz
              questions={
                // @ts-ignore
                mealPlannerQuestionsMock.components.items.find(
                  component => component.name === 'Wizard'
                ).content.wizardQuiz.questions as Question[]
              }
              answers={getUserProfileByKey(ProfileKey.mealPlannerAnswers)}
              heading={mealPlannerQuizContent.quizTitle}
              quizKey={ProfileKey.mealPlannerAnswers}
            />
          </UserPreferences>
        </Tab>
        <Tab view="MealPlanner">
          <Fragment>
            {passedMealPlanner ? (
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
              </Fragment>
            ) : (
              <Text tag={TagName.h3} text={noMealPlanContent.text} />
            )}
            <Link to={'/meal-planner'}>{mealPlanButtonContent.label}</Link>
          </Fragment>
        </Tab>
      </Tabs>
    </Layout>
  );
};

export default FavoritesRecipeListingPage;

interface FavoriteRecipeListingProps {
  pageContext: {
    page: AppContent.Page;
  };
}
