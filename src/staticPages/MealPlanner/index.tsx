import React, { useCallback, useState } from 'react';
import SEO from '../../components/Seo';
import {
  IntroductionPanel as WizardIntroductionPanel,
  Logo,
  Quiz as WizardQuiz,
  RatingAndReviewsProvider,
  RecipeListing,
  RecipeListViewType,
  reloadKritiqueWidget as useKritiqueReload,
  ResultSection as WizardResultSection,
  Wizard,
} from 'src/components/lib';
import { ReactComponent as Spinner } from '../../svgs/inline/spinner.svg';
import { ReactComponent as WizardLogo } from '../../svgs/inline/wizard-logo.svg';
import { ReactComponent as ArrowIcon } from '../../svgs/inline/arrow-down.svg';
import {
  getUserProfileByKey,
  saveUserProfileByKey,
  updateFavorites,
} from '../../utils/browserStorage';
import { ProfileKey } from '../../utils/browserStorage/models';
import { navigate } from 'gatsby';
import { findPageComponentContent } from '../../utils';
import { WindowLocation } from '@reach/router';
import DigitalData from 'integrations/DigitalData';
import theme from './mealPlanner.module.scss';
import Kritique from 'integrations/Kritique';
import generateQuery from '../../utils/queryGenerator';
import { IMAGE_SIZES, MealPlannerPersonalizationFormula } from 'src/constants';
import getPersonalizationSearchData, {
  FROM,
} from '../../utils/getPersonalizationSearchData';
import { ReactComponent as FavoriteIcon } from '../../svgs/inline/favorite.svg';
import useFavorite from 'src/utils/useFavorite';
import Menu from 'src/components/lib/components/GlobalFooter/partials/Menu';
// Component Styles
import '../../scss/pages/_mealPlanner.scss';
import DataCapturingForm from '../../components/DataCapturingForm';

const RESULT_SIZE = 7;

const MealPlannerPage = ({ pageContext, location }: MealPlannerProps) => {
  const {
    page: { seo, components, type },
  } = pageContext;
  const componentContent = findPageComponentContent(components, 'Wizard');
  const { dataCapturing } = componentContent;
  const linksContent = findPageComponentContent(components, 'Links');
  const [recipes, setRecipes] = useState<Internal.Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const wizardResultSection = componentContent.wizardResultSection;
  const { updateFavoriteState, favorites } = useFavorite(
    () => getUserProfileByKey(ProfileKey.favorites) as number[],
    updateFavorites
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processSearchData = (quizData: any, i: number = 0) => {
    setIsLoading(true);
    const maxTry = MealPlannerPersonalizationFormula.template.length;
    const queryString = generateQuery(
      getUserProfileByKey(ProfileKey.initialQuiz),
      quizData.data,
      MealPlannerPersonalizationFormula,
      i
    );
    saveUserProfileByKey(quizData.data, ProfileKey.mealPlannerAnswers);

    getPersonalizationSearchData(queryString, {
      from: FROM,
      size: RESULT_SIZE,
      sort: [{ creationTime: { order: 'desc' } }],
    }).then(data => {
      setIsLoading(false);
      const result = data.body.hits.hits.map(hit => hit._source);
      i++;
      if (data.body.hits.total.value === 0 && i < maxTry) {
        processSearchData(quizData, i);
      } else {
        if (result && result.length) {
          setRecipes(result);
          useKritiqueReload();
          saveUserProfileByKey(
            result.map(item => item.recipeId),
            ProfileKey.mealPlannerResults
          );
        }
      }
    });
  };

  const stepResultsCallback = useCallback(quizData => {
    if (
      Object.keys(quizData.data).length ===
      componentContent.wizardQuiz.questions.length
    ) {
      processSearchData(quizData);
    }
  }, []);

  const wizardCallback = useCallback(() => {
    navigate('/perfil?tabOpen=MealPlanner');
  }, []);

  const pageUpdate = useCallback(() => {
    window.location.reload();
  }, []);

  const [formUrl, formType] = [
    process.env['mealPlanerDataCapturing_url'] as string,
    process.env['mealPlanerDataCapturing_formType'] as string,
  ];

  return (
    <div className={theme.mealPlanner}>
      <SEO {...seo} canonical={location.href} />
      <DigitalData title={seo && seo.title} type={type} />
      <div className="wizard__logo">
        <Logo icon={<WizardLogo />} path="/" />
      </div>
      <section>
        <Kritique />
        <Wizard actionCallback={wizardCallback}>
          <WizardIntroductionPanel
            {...componentContent.wizardIntroductionPanel}
            containerClass="wizard--intro"
            stepId="intro"
            imageSizes={IMAGE_SIZES.MEAL_PLANNER.INTRODUCTION}
          />
          <WizardQuiz
            {...componentContent.wizardQuiz}
            {...{ stepResultsCallback }}
            imageSizesOptions={IMAGE_SIZES.QUIZ_OPTIONS}
            containerClass="wizard--quiz"
            stepId="quiz"
          />
          {recipes.length > 0 && (
            <DataCapturingForm
              {...dataCapturing}
              url={formUrl}
              formType={formType}
              pathToData={ProfileKey.mealPlannerAnswers}
              containerClass="wizard--form"
            />
          )}

          <WizardResultSection
            {...wizardResultSection}
            containerClass="wizard--result"
            stepId="result"
            isLoading={isLoading}
            resultSize={recipes.length}
            callbacks={{
              back: pageUpdate,
            }}
          >
            {!isLoading ? (
              <div>
                {recipes.length > 0 && (
                  <RecipeListing
                    content={findPageComponentContent(components, 'Wizard')}
                    favorites={Array.isArray(favorites) ? favorites : []}
                    onFavoriteChange={updateFavoriteState}
                    FavoriteIcon={FavoriteIcon}
                    withFavorite={true}
                    list={recipes}
                    ratingProvider={RatingAndReviewsProvider.kritique}
                    viewType={RecipeListViewType.Carousel}
                    className="recipe-list--wizard recipe-list--carousel"
                    carouselConfig={{
                      breakpoints: [
                        {
                          width: 1365,
                          switchElementsBelowBreakpoint: 1,
                          switchElementsAfterBreakpoint: 1,
                          visibleElementsBelowBreakpoint: 2,
                          visibleElementsAboveBreakpoint: 4,
                        },
                      ],
                      arrowIcon: <ArrowIcon />,
                    }}
                    imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.MEAL_PLANNER}
                    isExternalItemLink={true}
                  />
                )}
              </div>
            ) : (
              <div className={theme.spinner}>
                <Spinner />
              </div>
            )}
          </WizardResultSection>
        </Wizard>
        <div className="wizard__privacy">
          <Menu list={linksContent.list} />
        </div>
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
