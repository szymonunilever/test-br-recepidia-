import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql, useStaticQuery } from 'gatsby';
import SEO from 'src/components/Seo';
import Kritique from 'integrations/Kritique';
import RecipeHero from 'src/components/lib/components/RecipeHero';
import Rating from 'src/components/lib/components/Rating';
import RecipeCopy, {
  RecipeCopyViewType,
} from 'src/components/lib/components/RecipeCopy';
import RecipeAttributes, {
  RecipeAttributesKeys,
} from 'src/components/lib/components/RecipeAttributes';
import { ReactComponent as RecipeClock } from 'src/svgs/inline/recipe-clock.svg';
import { ReactComponent as RecipeDifficulty } from 'src/svgs/inline/recipe-difficulty.svg';
import { ReactComponent as RecipePeople } from 'src/svgs/inline/recipe-people.svg';
import { ReactComponent as RecipeKnife } from 'src/svgs/inline/recipe-chop.svg';
import RecipeCookingMethod from 'src/components/lib/components/RecipeCookingMethod';
import RecipeNutrients, {
  RecipeNutrientsViewType,
} from 'src/components/lib/components/RecipeNutrients';
import RecipeListing, {
  RecipeListViewType,
} from 'src/components/lib/components/RecipeListing';
import { ReactComponent as ArrowIcon } from 'src/svgs/inline/arrow-down.svg';
import theme from './RecipePage.module.scss';
import cx from 'classnames';
import { Tabs } from 'src/components/lib/components/Tabs';
import { Tab } from '../../components/lib/components/Tabs/partials';
import { RatingAndReviewsProvider } from 'src/components/lib/models/ratings&reviews';
import Reviews from 'src/components/lib/components/Reviews';
import { findPageComponentContent } from 'src/utils';
import { ReactComponent as FavoriteIcon } from '../../svgs/inline/favorite.svg';
import RecipeDietaryAttributes from 'src/components/lib/components/RecipeDietaryAttributes';
import * as icons from 'src/svgs/attributes';
import { ReactComponent as CloseButton } from 'src/svgs/inline/x-mark.svg';
import { Text, TagName } from 'src/components/lib/components/Text';
import Button from '../../components/lib/components/Button';
import SocialSharing, {
  SocialSharingViewType,
  SocialIcons,
} from 'src/components/lib/components/SocialSharing';
import AddThis from '../../../integrations/AddThis';
import socialSharingContent from 'src/components/data/socialSharingContent.json';
import { ReactComponent as FacebookIcon } from 'src/svgs/inline/facebook.svg';
import { ReactComponent as TwitterIcon } from 'src/svgs/inline/twitter.svg';
import Hero from 'src/components/lib/components/Hero';
import { RecipeMicrodata } from 'src/components/lib/components/RecipeMicrodata';
import DigitalData from '../../../integrations/DigitalData';
import { getTagsFromRecipes } from 'src/utils/getTagsFromRecipes';
import { WindowLocation } from '@reach/router';
import useMedia from 'src/utils/useMedia';
import {
  updateFavorites,
  getUserProfileByKey,
  saveUserProfileByKey,
} from 'src/utils/browserStorage';
import { ProfileKey } from 'src/utils/browserStorage/models';
import get from 'lodash/get';
import remove from 'lodash/remove';
import { getFilteredRecipeResponse } from 'src/utils/searchUtils';
import useFavorite from 'src/utils/useFavorite';
import { Tags } from 'src/components/lib/components/Tags';
// Component Styles
import '../../scss/pages/_recipePage.scss';

const RecipePage = ({ pageContext, location }: RecipePageProps) => {
  const {
    recipeTags,
    dietaryTagGroup,
  }: {
    recipeTags: {
      nodes: Internal.Tag[];
    };
    allRecipe: {
      nodes: Internal.Recipe[];
    };
    dietaryTagGroup: RMSData.TagGroupings;
  } = useStaticQuery(graphql`
    query($tags: [Int]) {
      recipeTags: allTag(filter: { tagId: { in: $tags } }) {
        nodes {
          ...TagFields
        }
      }

      dietaryTagGroup: tagGroupings(name: { eq: "dietary" }) {
        id
        tags {
          id
          name
          title
        }
      }
    }
  `);
  const {
    page: { components, seo, type },
    recipe,
  } = pageContext;
  const tags = recipeTags.nodes;

  const allDietaryList = (dietaryTagGroup && dietaryTagGroup.tags) || [];

  const currentRecipeDietaryList = get(
    recipe.tagGroups.find(tags => tags.label === 'dietary'),
    'tags',
    []
  );
  const dietaryAttributesIcons = [
    {
      id: 11,
      active: <icons.VegeterianActive />,
      inActive: <icons.VegeterianInactive />,
    },
    {
      id: 10,
      active: <icons.VeganActive />,
      inActive: <icons.VeganInactive />,
    },
    {
      id: 5,
      active: <icons.NutFreeActive />,
      inActive: <icons.NutFreeInactive />,
    },
    {
      id: 7,
      active: <icons.PregnancySafeActive />,
      inActive: <icons.PregnancySafeInactive />,
    },
    {
      id: 3,
      active: <icons.GlutenFreeActive />,
      inActive: <icons.GlutenFreeInactive />,
    },
    {
      id: 4,
      active: <icons.LactoseFreeActive />,
      inActive: <icons.LactoseFreeInactive />,
    },
    {
      id: 8,
      active: <icons.RawFoodActive />,
      inActive: <icons.RawFoodInactive />,
    },
    {
      id: 2,
      active: <icons.EggFreeActive />,
      inActive: <icons.EggFreeInactive />,
    },
    {
      id: 6,
      active: <icons.PaleoDietActive />,
      inActive: <icons.PaleoDietInactive />,
    },
    // TODO replace below icons with proper onesafter
    {
      id: 1,
      active: <icons.DairyFreeActive />,
      inActive: <icons.DairyFreeInactive />,
    },
    {
      id: 9,
      active: <icons.WheatFreeActive />,
      inActive: <icons.WheatFreeInactive />,
    },
  ];

  const [relatedRecipes, setRelatedRecipes] = useState<Internal.Recipe[]>([]);
  const RecipeListingWithFavorite = useFavorite(
    (getUserProfileByKey(ProfileKey.favorites) as number[]) || [],
    updateFavorites,
    RecipeListing,
    FavoriteIcon
  );
  const classWrapper = cx(theme.recipePage, 'recipe-page header--bg');
  const socialIcons: SocialIcons = {
    facebook: FacebookIcon,
    twitter: TwitterIcon,
  };

  const initialTagsCount = useMedia(undefined, [9, 5]);

  const tagList = getTagsFromRecipes([recipe], tags);

  useEffect(() => {
    getFilteredRecipeResponse(
      tagList.map(tag => tag.tagId).join(' OR '),
      [recipe.recipeId],
      { size: 6 }
    ).then(recipes => {
      setRelatedRecipes(recipes.hits.hits.map(recipe => recipe._source));
    });
  }, []);

  const recipeHero = (
    <>
      <RecipeHero
        content={recipe}
        imageSizes={'(min-width: 1366px) 600w, 600px'}
      />
      <div className={theme.recipeHeroActions}>
        <div>
          <Button
            Icon={FavoriteIcon}
            isSelected={(Array.isArray(
              getUserProfileByKey(ProfileKey.favorites)
            )
              ? getUserProfileByKey(ProfileKey.favorites)
              : []
            )
              // @ts-ignore
              .includes(recipe.recipeId)}
            onClick={() => {
              // @ts-ignore
              const favorites: number[] = Array.isArray(
                getUserProfileByKey(ProfileKey.favorites)
              )
                ? getUserProfileByKey(ProfileKey.favorites)
                : [];
              if (favorites.includes(recipe.recipeId)) {
                remove(favorites, n => n === recipe.recipeId);
              } else {
                favorites.push(recipe.recipeId);
              }
              saveUserProfileByKey(favorites, ProfileKey.favorites);
            }}
            isToggle={true}
            className="action-button"
            attributes={{ 'aria-label': 'favorite toggle' }}
          />
        </div>
        <>
          <SocialSharing
            content={socialSharingContent}
            viewType={SocialSharingViewType.Modal}
            CloseButtonIcon={CloseButton}
            icons={socialIcons}
            titleLevel={4}
            WidgetScript={AddThis}
          />
        </>
      </div>
    </>
  );

  if (recipe.localImage) {
    const seoImage = seo.meta.find(item => {
      return item.name == 'og:image';
    });
    seoImage &&
      (seoImage.content = recipe.localImage.childImageSharp.fluid.src);
  }

  return (
    <Layout className={classWrapper}>
      <SEO
        {...seo}
        title={recipe.title}
        description={recipe.description}
        canonical={location.href}
      />
      <DigitalData title={recipe.title} type={type} />
      <Kritique />
      <RecipeMicrodata recipe={recipe} />

      <section className={cx(theme.recipePageHero, '_bg--main wrapper')}>
        <div className={theme.recipeTopBlock}>
          <div className={theme.recipeTopBlockItem}>
            <div className={theme.recipeHeroDesktop}>{recipeHero}</div>
          </div>
          <div className={theme.recipeTopBlockItem}>
            <div className={theme.recipeHeroMobile}>{recipeHero}</div>
            <div className={theme.recipeBlockTitle}>
              <RecipeCopy
                viewType={RecipeCopyViewType.Title}
                recipe={recipe}
                content={{}}
                className="recipe-copy__title"
              />
              <Rating
                recipeId={recipe.recipeId}
                provider={RatingAndReviewsProvider.kritique}
                linkTo={recipe.fields.slug}
              />
            </div>
            <div className={theme.recipeBlockDescription}>
              <RecipeCopy
                viewType={RecipeCopyViewType.Description}
                recipe={recipe}
                content={{}}
                className="recipe-copy__description"
              />
              <RecipeAttributes
                //@ts-ignore
                recipe={recipe}
                visible={[
                  RecipeAttributesKeys.serves,
                  RecipeAttributesKeys.cookTime,
                  RecipeAttributesKeys.preperationTime,
                  RecipeAttributesKeys.difficulties,
                ]}
                icons={{
                  preperationTime: RecipeKnife,
                  cookTime: RecipeClock,
                  serves: RecipePeople,
                  difficulties: RecipeDifficulty,
                }}
                className="recipe-attributes"
                content={findPageComponentContent(
                  components,
                  'RecipeAttributes'
                )}
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          className={cx(
            theme.recipeIngredientsCooking,
            '_pb--40 , _pt--40 wrapper'
          )}
        >
          <RecipeCopy
            viewType={RecipeCopyViewType.Ingredients}
            recipe={recipe}
            content={findPageComponentContent(
              components,
              'RecipeCopy',
              'Ingredients'
            )}
            className={theme.recipeCopyIngredients}
          />
          <RecipeCookingMethod
            methodList={recipe.methods}
            className={theme.recipeCookingMethod}
            content={findPageComponentContent(
              components,
              'RecipeCookingMethod'
            )}
          />
        </div>
        <div className={theme.recipeIngredientsCookingMobile}>
          <Tabs
            className={cx(theme.recipeIngredientsCookingTabs, 'tabs')}
            content={findPageComponentContent(components, 'Tabs')}
          >
            <Tab
              className={cx(theme.recipeIngredientsTab)}
              view="recipeTabIngredients"
            >
              <RecipeCopy
                viewType={RecipeCopyViewType.Ingredients}
                recipe={recipe}
                content={{}}
                className={theme.recipeCopyIngredients}
              />
            </Tab>
            <Tab
              className={cx(theme.recipeCookingTab)}
              view="recipeTabCookingMethod"
            >
              <RecipeCookingMethod
                methodList={recipe.methods}
                className={theme.recipeCookingMethod}
                content={{}}
              />
            </Tab>
          </Tabs>
        </div>
      </section>
      {currentRecipeDietaryList.length || recipe.nutrients.length ? (
        <section
          className={cx(theme.recipePageNutritional, '_pb--40 _pt--40 wrapper')}
        >
          <Text
            text={
              findPageComponentContent(components, 'Text', 'NutritionalTitle')
                .text
            }
            tag={TagName.h2}
          />
          <RecipeDietaryAttributes
            activeAttributes={currentRecipeDietaryList}
            attributes={allDietaryList}
            icons={dietaryAttributesIcons}
          />
          <RecipeNutrients
            recipe={recipe}
            content={findPageComponentContent(components, 'RecipeNutrients')}
            viewType={RecipeNutrientsViewType.WithAction}
            CloseButton={CloseButton}
          />
        </section>
      ) : null}
      <section className={cx(theme.reviews, '_pt--40 wrapper ')}>
        <Reviews
          recipeId={recipe.recipeId}
          provider={RatingAndReviewsProvider.kritique}
          linkTo={recipe.fields.slug}
        />
      </section>
      <section className={theme.tagList}>
        <Tags
          initialCount={initialTagsCount}
          list={tagList}
          content={findPageComponentContent(components, 'Tags')}
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
        className={cx(
          theme.recipePageBottomCarousel,
          '_pt--40 _pb--40 wrapper'
        )}
      >
        <RecipeListingWithFavorite
          content={findPageComponentContent(
            components,
            'RecipeListing',
            'RelatedRecipes'
          )}
          list={relatedRecipes}
          favorites={getUserProfileByKey(ProfileKey.favorites) as string[]}
          ratingProvider={RatingAndReviewsProvider.kritique}
          viewType={RecipeListViewType.Carousel}
          className="recipe-list--carousel"
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
          imageSizes={'(min-width: 768px) 500w, 500px'}
        />
      </section>
    </Layout>
  );
};

export default RecipePage;

interface RecipePageProps {
  pageContext: {
    page: AppContent.Page;
    recipe: Internal.Recipe;
  };
  location: WindowLocation;
}
