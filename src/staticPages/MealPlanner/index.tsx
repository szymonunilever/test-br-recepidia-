import React, { useCallback, useState } from 'react';
import SEO from '../../components/Seo';
import Wizard from '../../components/lib/components/Wizard';
import WizardIntroductionPanel from '../../components/lib/components/Wizard/partials/IntroductionPanel';
import WizardQuiz from '../../components/lib/components/Wizard/partials/Quiz';
import WizardResultSection from '../../components/lib/components/Wizard/partials/ResultSection';
import localImage from '../../../stories/assets/localImage';
import { ReactComponent as Spinner } from '../../svgs/inline/spinner.svg';
import { ReactComponent as WizardLogo } from '../../svgs/inline/wizard-logo.svg';
import Logo from '../../components/lib/components/Logo';
import { RatingAndReviewsProvider } from '../../components/lib/models/ratings&reviews';
import { ReactComponent as ArrowIcon } from '../../svgs/inline/arrow-down.svg';
import {
  saveUserProfileByKey,
  getUserProfileByKey,
  updateFavorites,
} from '../../utils/browserStorage';
import { ProfileKey } from '../../utils/browserStorage/models';
import { Link } from 'gatsby';
import { findPageComponentContent } from '../../utils';
import { WindowLocation } from '@reach/router';
import DigitalData from 'integrations/DigitalData';
import theme from './mealPlanner.module.scss';
import Kritique from 'integrations/Kritique';
import generateQuery from '../../utils/queryGenerator';
import { MealPlannerPersonalizationFormula } from 'src/constants';
import getPersonalizationSearchData from '../../utils/getPersonalizationSearchData';
import RecipeListing, {
  RecipeListViewType,
} from 'src/components/lib/components/RecipeListing';
import { ReactComponent as FavoriteIcon } from '../../svgs/inline/favorite.svg';
import useFavorite from 'src/utils/useFavorite';

const refineQuery = (query: string): string => {
  if (query.trim().startsWith('AND')) {
    // in case when "no restrictions" option with empty value is choosen OR if intro quiz is not passed
    return refineQuery(query.trim().replace('AND', ''));
  }
  return query;
};

const MealPlannerPage = ({ pageContext, location }: MealPlannerProps) => {
  const {
    page: { seo, components, type },
  } = pageContext;
  const componentContent = findPageComponentContent(components, 'Wizard');
  const [recipes, setRecipes] = useState<Internal.Recipe[]>([]);
  const wizardResultSection = componentContent.wizardResultSection;
  const RecipeListingWithFavorite = useFavorite(
    (getUserProfileByKey(ProfileKey.favorites) as number[]) || [],
    updateFavorites,
    RecipeListing,
    FavoriteIcon
  );

  const processSearchData = useCallback(
    (query: string) => {
      getPersonalizationSearchData(query, {
        from: 0,
        size: 7,
        sort: [{ creationTime: { order: 'desc' } }],
      }).then(data => {
        const result = data.hits.hits.map(hit => hit._source);
        const index = query.lastIndexOf('AND');
        // if we have no results and can simplify query
        if (data.hits.total === 0 && index > -1) {
          query = query.substring(0, index);
          processSearchData(query);
        } else {
          setRecipes(result);
          saveUserProfileByKey(
            result.map(item => item.recipeId),
            ProfileKey.mealPlannerResults
          );
        }
      });
    },
    [setRecipes]
  );

  const stepResultsCallback = useCallback(quizData => {
    if (
      Object.keys(quizData.data).length ===
      componentContent.wizardQuiz.questions.length
    ) {
      const queryString = generateQuery(
        getUserProfileByKey(ProfileKey.initialQuiz),
        quizData.data,
        MealPlannerPersonalizationFormula
      );

      saveUserProfileByKey(quizData.data, ProfileKey.mealPlannerAnswers);

      processSearchData(refineQuery(queryString));
    }
  }, []);

  return (
    <div className={theme.mealPlanner}>
      <SEO {...seo} canonical={location.href} />
      <DigitalData title={seo && seo.title} type={type} />
      <div className="wizard__logo">
        <Logo icon={<WizardLogo />} path="/" />
      </div>
      <section>
        <Kritique />
        <Wizard actionCallback={() => true}>
          <WizardIntroductionPanel
            {...componentContent.wizardIntroductionPanel}
            containerClass="wizard--intro"
            stepId="intro"
          />
          <WizardQuiz
            {...componentContent.wizardQuiz}
            {...{ stepResultsCallback }}
            containerClass="wizard--quiz"
            stepId="quiz"
          />
          <WizardResultSection
            containerClass="wizard--result"
            stepId="result"
            title={wizardResultSection.title}
            subheading={
              recipes.length
                ? wizardResultSection.subheading.replace(
                    '[[counter]]',
                    recipes.length
                  )
                : ''
            }
          >
            {recipes.length ? (
              <div>
                <RecipeListingWithFavorite
                  content={findPageComponentContent(components, 'Wizard')}
                  list={recipes}
                  ratingProvider={RatingAndReviewsProvider.kritique}
                  viewType={RecipeListViewType.Carousel}
                  className="recipe-list--wizard recipe-list--carousel"
                  carouselConfig={{
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
                  }}
                  imageSizes={'(min-width: 768px) 25vw, 50vw'}
                />
                <div className="wizard__buttons">
                  <Link
                    className="wizard__button wizard__button--primary"
                    to={'/profile?tabOpen=MealPlanner'}
                  >
                    {wizardResultSection.primaryButtonLabel}
                  </Link>
                </div>
              </div>
            ) : (
              <div className={theme.spinner}>
                <Spinner />
              </div>
            )}
          </WizardResultSection>
        </Wizard>
      </section>
    </div>
  );
};

interface MealPlannerProps {
  pageContext: {
    page: AppContent.Page;
  };
  location: WindowLocation;
}

export default MealPlannerPage;
