import React, { useCallback, useState } from 'react';
import SEO from '../../components/Seo';
import Wizard from '../../components/lib/components/Wizard';
import WizardIntroductionPanel from '../../components/lib/components/Wizard/partials/IntroductionPanel';
import WizardQuiz from '../../components/lib/components/Wizard/partials/Quiz';
import WizardResultSection from '../../components/lib/components/Wizard/partials/ResultSection';
import localImage from '../../../stories/assets/localImage';
import WizardLogo from '../../svgs/inline/wizard-logo.svg';
import Logo from '../../components/lib/components/Logo';
import { useElasticSearch } from '../../utils';
import RecipeListingCarousel from '../../components/lib/components/RecipeListing/RecipeListingCarousel';
import { RatingAndReviewsProvider } from '../../components/lib/models/ratings&reviews';
import keys from '../../../integrations/keys.json';
import ArrowIcon from '../../svgs/inline/arrow-down.svg';
import {
  saveUserProfileByKey,
  getUserProfileByKey,
} from '../../utils/browserStorage';
import { ProfileKey } from '../../utils/browserStorage/models';
import Button from '../../components/lib/components/Button';
import { findPageComponentContent } from '../../utils';
import { WindowLocation } from '@reach/router';
import DigitalData from 'integrations/DigitalData';

const generateQueryString = (data: any) => {
  let finalQuery: string[] = [];
  for (let prop in data) {
    const value = data[prop];
    if (Array.isArray(value)) {
      let queryPart: string[] = [];
      value.forEach(item =>
        queryPart.push(item.includes(';') ? item.replace(/;/g, ' OR ') : item)
      );
      const joined = queryPart.join(' OR ');
      finalQuery.push(queryPart.length < 2 ? joined : '(' + joined + ')');
    } else {
      finalQuery.push(
        value.includes(';') ? '(' + value.replace(/;/g, ' OR ') + ')' : value
      );
    }
  }
  return finalQuery.join(' AND ');
};

const MealPlannerPage = ({ pageContext, location }: MealPlannerProps) => {
  const {
    page: { seo, components, type },
  } = pageContext;
  const componentContent = findPageComponentContent(components, 'Wizard');
  const [answers, setAnswers] = useState({});
  const [recipes, setRecipes] = useState([]);

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

  const getSearchData = (searchQuery: string, { from = 0, size = 7 }) => {
    const searchParams = {
      index: keys.elasticSearch.recipeIndex,
      body: {
        from,
        size,
        query: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          query_string: {
            query: `*${searchQuery}*`,
            fields: [
              'title',
              'description',
              'tagGroups.tags.name',
              'ingredients.description',
            ],
          },
        },
      },
    };

    return useElasticSearch<Internal.Recipe>(searchParams);
  };

  const processSearchData = useCallback(
    (query: string) => {
      getSearchData(query, { from: 0, size: 7 }).then(data => {
        const result = data.hits.hits.map(hit => hit._source);
        if (data.hits.total >= 7) {
          // @ts-ignore
          setRecipes(result);
          saveUserProfileByKey(
            result.map(item => item.recipeId),
            ProfileKey.mealPlannerResults
          );
          // console.log(result);
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
      const introQuizAnswers = getUserProfileByKey(ProfileKey.initialQuiz);
      let query = [];
      if (introQuizAnswers) {
        query.push(generateQueryString(introQuizAnswers));
      }
      query.push(generateQueryString(quizData.data));
      const finalQuery = query.join(' AND ');

      saveUserProfileByKey(quizData.data, ProfileKey.mealPlannerAnswers);

      processSearchData(finalQuery);
    }
  }, []);

  return (
    <div>
      <SEO {...seo} canonical={location.href} />
      <DigitalData title={seo.title} type={type} />
      <div className="wizard__logo">
        <Logo icon={<WizardLogo />} path="/" />
      </div>
      <section>
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
              {...componentContent.wizardResultSection}
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
                    <Button
                      className="wizard__button wizard__button--primary"
                      onClick={() => alert('goto profile')}
                    >
                      See my meal plan
                    </Button>
                  </div>
                </div>
              ) : (
                'Loading....'
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
