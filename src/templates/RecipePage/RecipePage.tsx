import React from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql } from 'gatsby';
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
import { ReactComponent as FacebookIcon } from 'src/svgs/inline/facebook.svg';
import { ReactComponent as TwitterIcon } from 'src/svgs/inline/twitter.svg';
import { ReactComponent as PinterestIcon } from 'src/svgs/inline/pinterest.svg';
import Hero from 'src/components/lib/components/Hero';
import { RecipeMicrodata } from 'src/components/lib/components/RecipeMicrodata';
import DigitalData from '../../../integrations/DigitalData';
import { getTagsFromRecipes } from 'src/utils/getTagsFromRecipes';
import { WindowLocation } from '@reach/router';
import useMedia from 'src/utils/useMedia';
import { updateFavorites, getUserProfileByKey } from 'src/utils/browserStorage';
import { ProfileKey } from 'src/utils/browserStorage/models';
import useFavorite from 'src/utils/useFavorite';
import { Tags } from 'src/components/lib/components/Tags';
// Component Styles
import '../../scss/pages/_recipePage.scss';
import flatMap from 'lodash/flatMap';
import remove from 'lodash/remove';
import intersection from 'lodash/intersection';
import { ReactComponent as InfoIcon } from '../../svgs/inline/info.svg';

const infoIcon = <InfoIcon />;
const dietaryAttributesIcons = [
  {
    id: [11, 12909],
    active: <icons.VegeterianActive />,
    inActive: <icons.VegeterianInactive />,
  },
  {
    id: [10, 13153],
    active: <icons.VeganActive />,
    inActive: <icons.VeganInactive />,
  },
  {
    id: [3, 12941],
    active: <icons.GlutenFreeActive />,
    inActive: <icons.GlutenFreeInactive />,
  },
  {
    id: [4, 12886],
    active: <icons.LactoseFreeActive />,
    inActive: <icons.LactoseFreeInactive />,
  },
  {
    id: [2, 12942],
    active: <icons.EggFreeActive />,
    inActive: <icons.EggFreeInactive />,
  },

  // TODO replace below icons with proper onesafter
  {
    id: [1, 12914],
    active: <icons.DairyFreeActive />,
    inActive: <icons.DairyFreeInactive />,
  },
  {
    id: 12595,
    active: <icons.SeafoodFreeActive />,
  },
  {
    id: 12628,
    active: <icons.SoyFreeActive />,
  },
  {
    id: 12913,
    active: <icons.SugarFreeActive />,
  },
];
const socialIcons: SocialIcons = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  pinterest: PinterestIcon,
};

const RecipePage: React.FunctionComponent<RecipePageProps> = ({
  pageContext,
  location,
  data: { recipeTags, relatedRecipes },
}) => {
  const {
    page: { components, seo, type },
    recipe,
  } = pageContext;
  const classWrapper = cx(theme.recipePage, 'recipe-page header--bg');
  const tags = recipeTags.nodes;

  /*We use this way because we don't need to show inactive dietary attributes.
   * If we need to show it we should do few requests to get All dietary attributes includes freeFormTags
   * for use custom dietary attributes and use it for attributes property in RecipeDietaryAttributes component.
   * And add showInactiveAttributes flag for this component.*/
  const recipeRMSTags = flatMap(recipe.tagGroups, tagGroup => tagGroup.tags);
  const existingImagesIds = flatMap(dietaryAttributesIcons, icon => icon.id);
  const showDietaryTags = intersection(existingImagesIds, pageContext.tags);

  const { updateFavoriteState, favorites } = useFavorite(
    () => getUserProfileByKey(ProfileKey.favorites) as number[],
    updateFavorites
  );
  const initialTagsCount = useMedia(undefined, [9, 5]);
  const tagList = getTagsFromRecipes([recipe], tags);
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
            isSelected={favorites.includes(recipe.recipeId)}
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
              updateFavoriteState(favorites);
            }}
            isToggle={true}
            className="action-button"
            attributes={{ 'aria-label': 'favorite toggle' }}
          />
        </div>
        <>
          <SocialSharing
            content={findPageComponentContent(components, 'SocialSharing')}
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
                  RecipeAttributesKeys.difficulties,
                ]}
                icons={{
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
      {showDietaryTags.length || recipe.nutrients.length ? (
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
            activeAttributes={recipeRMSTags}
            infoIcon={infoIcon}
            showInactiveAttributes
            attributes={tags}
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
        <RecipeListing
          content={findPageComponentContent(
            components,
            'RecipeListing',
            'RelatedRecipes'
          )}
          favorites={Array.isArray(favorites) ? favorites : []}
          onFavoriteChange={updateFavoriteState}
          FavoriteIcon={FavoriteIcon}
          withFavorite={true}
          list={relatedRecipes.nodes}
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

export const query = graphql`
  query($tags: [Int]) {
    recipeTags: allTag(filter: { tagId: { in: $tags } }) {
      nodes {
        ...TagFields
        disclaimer
      }
    }
    relatedRecipes: allRecipe(
      limit: 6
      sort: { order: ASC, fields: creationTime }
      filter: {
        tagGroups: { elemMatch: { tags: { elemMatch: { id: { in: $tags } } } } }
      }
    ) {
      nodes {
        ...RecipeFields
      }
    }
  }
`;

interface RecipePageProps {
  data: {
    recipeTags: {
      nodes: Internal.Tag[];
    };
    relatedRecipes: {
      nodes: Internal.Recipe[];
    };
  };
  pageContext: {
    page: AppContent.Page;
    recipe: Internal.Recipe;
    tags: number[];
  };
  location: WindowLocation;
}
