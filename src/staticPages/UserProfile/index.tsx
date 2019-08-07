import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
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
import Kritique from 'integrations/Kritique';
import Button from 'src/components/lib/components/Button';
import { Link } from 'gatsby';
import { RatingAndReviewsProvider } from 'src/components/lib/models/ratings&reviews';
import RecipeListing, {
  RecipeListViewType,
  LoadMoreType,
  ResponsiveRecipeListing,
} from 'src/components/lib/components/RecipeListing';
import ArrowIcon from 'src/svgs/inline/arrow-down.svg';
import FavoriteIcon from 'src/svgs/inline/favorite.svg';

// @todo remove hardcoded mocks
import questionsMock from '../../../stories/mocks/introQuiz';
import useSearchResults from '../Search/useSearchResults';
const answers = {
  question1: '1',
  question2: ['1', '3', '5'],
  question3: '2',
  question4: '1457',
};
questionsMock.forEach(
  question =>
    // @ts-ignore
    (answers[question.key] =
      question.type.control === 'radio'
        ? question.options[0].value
        : [question.options[0].value, question.options[1].value])
);

// Screen width in px below which the view is switching to Carousel mode
const mobileBreakpoint = 768;

const FavoritesRecipeListingPage: FunctionComponent<
  FavoriteRecipeListingProps
> = ({ pageContext: { components, title } }) => {
  const recipeContent = findPageComponentContent(components, 'RecipeListing');
  const buttonContent = findPageComponentContent(
    components,
    'Button',
    'ProfileFavorites'
  );
  const tabsContent = findPageComponentContent(components, 'Tabs');
  const preferencesQuizContent = findPageComponentContent(
    components,
    'PreferencesQuiz'
  );
  const userPreferencesContent = findPageComponentContent(
    components,
    'UserPreferences'
  );

  const deleteQuestion = (key: string) => {
    alert(`Deleted question with key ${key}`);
  };
  const saveQuestion = (key: string, value: string | object | null) => {
    alert(`Saved question with key '${key}' and new values '${value}'`);
  };
  const onNewsletterFormSubmit = (values: object) => {
    // eslint-disable-next-line no-console
    console.log('values', values);
  };

  const [tabsHeaderContent, setTabsHeaderContent] = useState<TabsHeaderContent>(
    tabsContent.tabsHeaderContent
  );
  // @todo remove mocked data
  const recipeIds = [
    '53976',
    '35643',
    '54184',
    '164320',
    '164322',
    '165077',
    '169780',
    '170315',
    '170318',
    '173800',
  ];

  const { getRecipeFavoritesData, recipeFavoritesResults } = useSearchResults(
    recipeIds.join(' OR ')
  );

  const hasRecipes = recipeFavoritesResults && recipeFavoritesResults.count > 0;

  useEffect(() => {
    // @todo add sorting: First sort by Rating. Entries equal by Rating are sorted by date.
    getRecipeFavoritesData(recipeIds.join(' OR '), { from: 0, size: 8 });
  }, []);
  const onLoadMoreRecipes = useCallback(
    (tags: Internal.Tag[], sortingOption: string, size: number) =>
      getRecipeFavoritesData(recipeIds.join(' OR '), {
        from: recipeFavoritesResults.list.length,
        size,
      }),
    [recipeIds, recipeFavoritesResults]
  );

  const ResponsiveListing = ResponsiveRecipeListing(
    RecipeListing,
    mobileBreakpoint
  );

  useEffect(() => {
    const newTabsHeaderContent = Object.assign({}, tabsHeaderContent);
    newTabsHeaderContent.contents.forEach((item: HeaderContent) => {
      if (item.view === 'ProfileFavorites' && recipeFavoritesResults.count) {
        item.subheading =
          recipeFavoritesResults.count < 1
            ? item.defaultSubheading || ''
            : item.subheading.replace(
                '{num}',
                recipeFavoritesResults.count.toString()
              );
      }
    });
    setTabsHeaderContent(newTabsHeaderContent);
  }, [recipeFavoritesResults.count]);

  return (
    <Layout>
      <Tabs
        content={tabsContent.tabsContent}
        tabsHeaderContent={tabsHeaderContent}
      >
        <Tab view="ProfileFavorites">
          <div className="user-profile-favorites">
            <Kritique />
            <ResponsiveListing
              content={recipeContent}
              list={recipeFavoritesResults.list}
              ratingProvider={RatingAndReviewsProvider.kritique}
              className="recipe-list favorites"
              initialCount={8}
              titleLevel={2}
              viewType={RecipeListViewType.Base}
              withFavorite={true}
              FavoriteIcon={FavoriteIcon}
              favorites={
                recipeFavoritesResults.list &&
                recipeFavoritesResults.list.map(item => item.id)
              }
              carouselConfig={{
                breakpoints: [
                  {
                    width: 768,
                    switchElementsBelowBreakpoint: 1,
                    switchElementsAfterBreakpoint: 1,
                    visibleElementsBelowBreakpoint: 2,
                    visibleElementsAboveBreakpoint: 4,
                  },
                ],
                arrowIcon: <ArrowIcon />,
              }}
              loadMoreConfig={{
                type: LoadMoreType.async,
                onLoadMore: onLoadMoreRecipes,
                allCount: recipeFavoritesResults.count,
              }}
              imageSizes={'(min-width: 768px) 25vw, 50vw'}
            />
            {!hasRecipes && (
              <Button>
                <Link to={'/recipes'}>{buttonContent.label}</Link>
              </Button>
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
              questions={questionsMock}
              answers={answers}
              heading={preferencesQuizContent.quizTitle}
            />
          </UserPreferences>
        </Tab>
      </Tabs>
    </Layout>
  );
};

export default FavoritesRecipeListingPage;

interface FavoriteRecipeListingProps {
  pageContext: {
    title: string;
    components: {
      [key: string]: string | number | boolean | object | null;
    }[];
  };
}
