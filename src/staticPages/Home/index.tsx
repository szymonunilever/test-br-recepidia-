import { graphql } from 'gatsby';
import React from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo';
import { Text, TagName } from 'src/components/lib/components/Text';
import cx from 'classnames';
import {
  RecipeListing,
  RecipeListViewType,
} from 'src/components/lib/components/RecipeListing';
import Hero from 'src/components/lib/components/Hero';
import { findPageComponentContent } from 'src/utils';
import Kritique from 'integrations/Kritique';
import ArrowIcon from 'src/svgs/inline/arrow-down.svg';
import PageListing from 'src/components/lib/components/PageListing';
import pageListingData from 'src/components/data/pageListing.json';
import theme from './home.module.scss';
import { RatingAndReviewsProvider } from 'src/components/lib/models/ratings&reviews';
import FavoriteIcon from '../../svgs/inline/favorite.svg';

const HomePage = ({ data, pageContext }: HomePageProps) => {
  const { title, components } = pageContext;
  const recipes = data.allRecipe.nodes;

  return (
    <Layout className="header--bg">
      <SEO title="Recepedia Home" />
      <Kritique />
      <section className="_bg--main">
        <div className="container">
          <Text
            tag={TagName['h1']}
            text="Hello ! Welcome to Recepedia"
            // text={
            //   findPageComponentContent(components, 'Text', 'PageTitle').text
            // }
          />
        </div>
      </section>

      <section className={cx(theme.homeTopSection, 'bg--half')}>
        <div className="container">
          <RecipeListing
            content={findPageComponentContent(
              components,
              'RecipeListing',
              'LatestAndGreatest'
            )}
            list={recipes}
            ratingProvider={RatingAndReviewsProvider.kritique}
            className="recipe-list--blue-header recipe-list--carousel cards--2-4"
            viewType={RecipeListViewType.Carousel}
            titleLevel={2}
            withFavorite
            FavoriteIcon={FavoriteIcon}
            favorites={[]}
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
        </div>
      </section>

      <section className="_pt--40 _pb--40">
        <div className="container">
          <RecipeListing
            content={findPageComponentContent(
              components,
              'RecipeListing',
              'TopRecipes'
            )}
            list={recipes}
            withFavorite
            FavoriteIcon={FavoriteIcon}
            favorites={[]}
            ratingProvider={RatingAndReviewsProvider.kritique}
            viewType={RecipeListViewType.Carousel}
            className="recipe-list--carousel cards--1-2"
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
        </div>
      </section>

      <section className="_pb--40">
        <Hero
          content={findPageComponentContent(components, 'Hero')}
          viewType="Image"
          className="hero--planner color--inverted"
        />
      </section>
      <section className="_pt--40 _pb--40">
        <div className="container">
          <PageListing
            content={findPageComponentContent(components, 'PageListing')}
            list={pageListingData}
            initialCount={12}
          />
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;

export const pageQuery = graphql`
  {
    allRecipe(limit: 6) {
      nodes {
        ...RecipeFields
      }
    }

    allTag {
      nodes {
        ...TagFields
      }
    }
  }
`;

interface HomePageProps {
  data: {
    allRecipe: {
      nodes: Internal.Recipe[];
    };
    allTag: {
      nodes: Internal.Tag[];
    };
  };
  pageContext: {
    title: string;
    components: {
      [key: string]: string | number | boolean | object | null;
    }[];
  };
}

interface Edge<T> {
  node: T;
}

interface PageNode {
  components: {
    items: {
      name: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content: any;
    }[];
  };
  title: string;
  type: string;
}
