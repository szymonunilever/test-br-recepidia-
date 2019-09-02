import { WindowLocation } from '@reach/router';
import cx from 'classnames';
import { graphql } from 'gatsby';
import DigitalData from 'integrations/DigitalData';
import Kritique from 'integrations/Kritique';
import React, { useEffect, useState } from 'react';
import Layout from 'src/components/Layout/Layout';
import Hero from 'src/components/lib/components/Hero';
import PageListing from 'src/components/lib/components/PageListing';
import {
  RecipeListing,
  RecipeListViewType,
} from 'src/components/lib/components/RecipeListing';
import { TagName, Text } from 'src/components/lib/components/Text';
import { RatingAndReviewsProvider } from 'src/components/lib/models/ratings&reviews';
import SEO from 'src/components/Seo';
import { findPageComponentContent } from 'src/utils';
import { ReactComponent as ArrowIcon } from 'src/svgs/inline/arrow-down.svg';
import { ReactComponent as FavoriteIcon } from '../../svgs/inline/favorite.svg';

import IntroQuiz from '../../components/page/IntroQuiz';

import theme from './home.module.scss';
import { getUserProfileByKey, updateFavorites } from 'src/utils/browserStorage';
import { ProfileKey } from 'src/utils/browserStorage/models';
import useFavorite from 'src/utils/useFavorite';
import { isQuizesStored, getTopRecipes, getLatestAndGratest } from './helpers';
import checkHash from '../../utils/checkHash';

const HomePage = ({ data, pageContext, location }: HomePageProps) => {
  const { latestAndGrates, topRecipes, allCategory } = data;
  const pageListingData = allCategory.nodes.map(category => ({
    ...category,
    path: category.fields.slug,
  }));
  const {
    page: { seo, components, type },
  } = pageContext;
  const quizContent = findPageComponentContent(components, 'Wizard');
  const introContent = {
    title: findPageComponentContent(components, 'Text', 'IntroQuizTitle')
      .text as string,
    description: findPageComponentContent(
      components,
      'Text',
      'IntroQuizDescription'
    ).text as string,
  };

  const [searchAgent, setSearchAgent] = useState(false);
  const [introModalClosed, setintroModalClosed] = useState(false);
  const [topRecipesResult, setTopRecipesResult] = useState<Internal.Recipe[]>(
    topRecipes.nodes
  );
  const [latestAndGratestResult, setLatestAndGratestResult] = useState<
    Internal.Recipe[]
  >(latestAndGrates.nodes);
  const [loadedTop, setLoadedTop] = useState(false);
  const [loadedLatest, setLoadedLatest] = useState(false);

  const isIntroDone = () => {
    setintroModalClosed(true);
  };

  const searchRecipes = () => {
    setLoadedLatest(false);
    setLoadedTop(false);
    Promise.all([
      getLatestAndGratest(latestAndGrates.nodes),
      getTopRecipes(topRecipes.nodes),
    ])
      .then(([latestResult, topResult]) => {
        setLatestAndGratestResult(latestResult);
        setLoadedLatest(true);
        setTopRecipesResult(topResult);
        setLoadedTop(true);
      })
      .catch();
  };

  useEffect(() => {
    //@ts-ignore
    setSearchAgent(window.searchAgentOnPage);
    //@ts-ignore
    setLoadedLatest(window.searchAgentOnPage);
    //@ts-ignore
    setLoadedTop(window.searchAgentOnPage);
    if (isQuizesStored() && !searchAgent) {
      searchRecipes();
    } else {
      setLoadedLatest(true);
      setLoadedTop(true);
    }
  }, []);

  useEffect(() => {
    if (isQuizesStored()) {
      searchRecipes();
    }
  }, [introModalClosed]);

  const RecipeListingWithFavorite = useFavorite(
    (getUserProfileByKey(ProfileKey.favorites) as number[]) || [],
    updateFavorites,
    RecipeListing,
    FavoriteIcon
  );

  return (
    <Layout className="header--bg">
      <SEO {...seo} canonical={location.href} />
      {!searchAgent && (
        <IntroQuiz
          introContent={introContent}
          quizContent={quizContent}
          onClose={isIntroDone}
        />
      )}
      <Kritique />
      <DigitalData title={seo.title} type={type} />
      <section className={cx(theme.homeTitle, '_bg--main wrapper')}>
        <Text
          tag={TagName['h1']}
          text={findPageComponentContent(components, 'Text', 'PageTitle').text}
        />
      </section>

      <section className={cx(theme.homeHeroCarousel, 'bg--half wrapper')}>
        <RecipeListingWithFavorite
          content={findPageComponentContent(
            components,
            'RecipeListing',
            'LatestAndGreatest'
          )}
          list={latestAndGratestResult}
          ratingProvider={RatingAndReviewsProvider.kritique}
          className={`${!loadedLatest &&
            theme.recipeHidden} recipe-list--blue-header recipe-list--carousel`}
          viewType={RecipeListViewType.Carousel}
          titleLevel={2}
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
          imageSizes={'(min-width: 768px) 25vw, 50vw'}
        />
      </section>

      <section
        className={cx(theme.homeMiddleCarousel, '_pt--40 _pb--40 wrapper')}
      >
        <RecipeListingWithFavorite
          content={findPageComponentContent(
            components,
            'RecipeListing',
            'TopRecipes'
          )}
          list={topRecipesResult}
          ratingProvider={RatingAndReviewsProvider.kritique}
          viewType={RecipeListViewType.Carousel}
          className={`${!loadedTop &&
            theme.recipeHidden} recipe-list--carousel`}
          titleLevel={2}
          carouselConfig={{
            breakpoints: [
              {
                width: 768,
                switchElementsBelowBreakpoint: 1,
                switchElementsAfterBreakpoint: 1,
                visibleElementsBelowBreakpoint: 1,
                visibleElementsAboveBreakpoint: 2,
              },
            ],
            arrowIcon: <ArrowIcon />,
          }}
          imageSizes={'(min-width: 768px) 50vw, 100vw'}
        />
      </section>

      <section className="_pb--40">
        <Hero
          content={findPageComponentContent(components, 'Hero')}
          viewType="Image"
          className="hero--planner color--inverted"
        />
      </section>
      <section
        className={cx(theme.homeBottomCarousel, '_pt--40 _pb--40 wrapper')}
      >
        <PageListing
          content={findPageComponentContent(components, 'PageListing')}
          list={pageListingData}
          initialCount={12}
        />
      </section>
    </Layout>
  );
};

export default HomePage;

//TODO: When we will have rating we need to change query sorting params for both requests latestAndGrates and topRecipes.
export const pageQuery = graphql`
  {
    latestAndGrates: allRecipe(
      sort: { order: DESC, fields: creationTime }
      limit: 6
    ) {
      nodes {
        ...RecipeFields
      }
    }

    topRecipes: allRecipe(limit: 6) {
      nodes {
        ...RecipeFields
      }
    }

    allTag {
      nodes {
        ...TagFields
      }
    }
    allCategory(filter: { tags: { elemMatch: { id: { ne: null } } } }) {
      nodes {
        ...CategoryFields
      }
    }
  }
`;

interface HomePageProps {
  data: {
    latestAndGrates: {
      nodes: Internal.Recipe[];
    };
    topRecipes: {
      nodes: Internal.Recipe[];
    };
    allTag: {
      nodes: Internal.Tag[];
    };
    allCategory: {
      nodes: Internal.Category[];
    };
  };
  pageContext: {
    page: AppContent.Page;
  };
  location: WindowLocation;
}
