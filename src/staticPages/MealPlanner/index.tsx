import React, { useCallback, useState } from 'react';
import SEO from '../../components/Seo';
import Wizard from '../../components/lib/components/Wizard';
import WizardIntroductionPanel from '../../components/lib/components/Wizard/partials/IntroductionPanel';
import WizardQuiz from '../../components/lib/components/Wizard/partials/Quiz';
import WizardResultSection from '../../components/lib/components/Wizard/partials/ResultSection';
import localImage from '../../../stories/assets/localImage';
import WizardLogo from '../../svgs/inline/wizard-logo.svg';
import Spinner from '../../svgs/inline/spinner.svg';
import Logo from '../../components/lib/components/Logo';
import RecipeListingCarousel from '../../components/lib/components/RecipeListing/RecipeListingCarousel';
import { RatingAndReviewsProvider } from '../../components/lib/models/ratings&reviews';
import ArrowIcon from '../../svgs/inline/arrow-down.svg';
import {
  saveUserProfileByKey,
  getUserProfileByKey,
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
import { getPersonalizationSearchData } from 'src/staticPages/Home';

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
  const [answers, setAnswers] = useState({});
  const [recipes, setRecipes] = useState([]);
  const wizardResultSection = componentContent.wizardResultSection;

  // @todo remove this workaround once we store images in graphql
  // @ts-ignore
  componentContent.wizardQuiz.questions.forEach(item => {
    // @ts-ignore
    item.options.forEach(option => {
      //@ts-ignore
      option.label.image.localImage = localImage;
    });
  });
  //@ts-ignore
  componentContent.wizardIntroductionPanel.image.localImage = localImage;

  const processSearchData = useCallback(
    (query: string) => {
      getPersonalizationSearchData(query, {
        from: 0,
        size: 7,
        sort: [{ creationTime: { order: 'desc' } }],
      }).then(data => {
        const result = data.hits.hits.map(hit => hit._source);
        if (data.hits.total >= 7) {
          // @ts-ignore
          setRecipes(result);
          saveUserProfileByKey(
            result.map(item => item.recipeId),
            ProfileKey.mealPlannerResults
          );
          return;
        }
        const index = query.lastIndexOf('AND');
        if (index !== -1) {
          query = query.substring(0, index);
          processSearchData(query);
        }
      });
    },
    [setRecipes]
  );

  const stepResultsCallback = useCallback(quizData => {
    setAnswers(quizData.data);

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
        <div className="container">
          <Wizard actionCallback={() => true}>
            {/*
          // @ts-ignore */}
            <WizardIntroductionPanel
              {...componentContent.wizardIntroductionPanel}
              containerClass="wizard--intro"
              stepId="intro"
            />
            {/*
          // @ts-ignore */}
            <WizardQuiz
              {...componentContent.wizardQuiz}
              {...{ stepResultsCallback }}
              containerClass="wizard--quiz"
              stepId="quiz"
            />
            {/*
          // @ts-ignore */}
            <WizardResultSection
              containerClass="wizard--result recipe-list--carousel"
              stepId="result"
              {...wizardResultSection}
            >
              {recipes.length ? (
                <div>
                  <RecipeListingCarousel
                    list={recipes}
                    config={{
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
                    }}
                    onFavoriteChange={() => true}
                    withFavorite={false}
                    imageSizes={'(min-width: 768px) 25vw, 50vw'}
                    ratingProvider={RatingAndReviewsProvider.kritique}
                  />
                  <div className="wizard__buttons">
                    <Link
                      className="wizard__button wizard__button--primary"
                      to={'/profile'}
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
