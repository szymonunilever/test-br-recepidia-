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
import TagLinks from 'src/components/TagsLinks/TagLinks';
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

const RecipePage = ({ pageContext, location }: RecipePageProps) => {
  const {
    allTag,
    dietaryTagGroup,
  }: {
    allTag: {
      nodes: Internal.Tag[];
    };
    allRecipe: {
      nodes: Internal.Recipe[];
    };
    dietaryTagGroup: RMSData.TagGroupings;
  } = useStaticQuery(graphql`
    {
      allTag {
        nodes {
          ...TagFields
        }
      }

      dietaryTagGroup: tagGroupings(name: { eq: "dietary" }) {
        id
        tags {
          id
          name
        }
      }
    }
  `);
  const {
    page: { components, seo, type },
    recipe,
  } = pageContext;
  const tags = allTag.nodes;

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
  // const tabsContent = {
  //   tabs: [
  //     {
  //       title: 'Ingredients',
  //       view: 'recipeTabIngredients',
  //     },
  //     {
  //       title: 'Cook',
  //       view: 'recipeTabCookingMethod',
  //     },
  //   ],
  // };
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
        imageSizes={'(min-width: 1366px) 40vw, 90vw'}
        imagePlaceholder={{
          id: '0bcf6c75-0450-554d-89c7-85316cc28839',
          childImageSharp: {
            fluid: {
              aspectRatio: 1,
              base64:
                'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA+Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBkZWZhdWx0IHF1YWxpdHkK/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgBLAEsAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9MooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKzm1Us7eRayTRqcFx0/CgDRoqG3uY7i3E6HCd89vrVL+1x/rPs0v2fOPN/+tQBp0VG80ccBmZvkA3Z9qpJq2XQy20kUTnCyN0oA0aKKKACiiigAoqpd3y2zpGsbSyvyEX0pLW/E8xhkheGUDO1u49qALlFU7q/8iYQxQvNLjJVew96ktLtLuMkKUdThkbqDQBYoqhPqRjnaKG3edk++V6CrNtcpdQCWPODwQeoNAE1FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAjDcpXpkY4qhLPBo9vFFtkYHO3p+v51ekZlidlGWAJA9TUFrcJeWYkYLgg7l7CgDPUlNBnlyP3pLYU9MkDFaSwL9hEGPl8vbj8KzIYt+j3gjBKGRig9hj/CtAXSf2YLjcMeXn8cdPzoAzixl0O1Qk/PIIz9Mn/CtHUI1fTplxwEJH4c1QeNotCt22nMbCQj8f/r1c1GdF02RgwIkXavvmgCxauZLSFyclkUn8qr6jJcQRLPC3yocumByKsW6GO2iQ9VQA/lTL2dLe0kkcAjGAp7k9qAKz3j3N1BDaPhSN8jYBwPStGsXSQbO5a3mQK8qh1Pr7VtUAV5IooZpL1txZYyCPYc8VRt7pNQ1SOSMbFhQ8MeWzVxbs/2i9q4AG0Mh9agmVP7btigAfaxfHpjjNADrAbrq9lPUy7M/SiMeXrcoHAkhDH6g4pLJhHfXkJ4JfzB7g0QsJtZndeVjjEeffOaAF0gZtGl7ySMxP40WI8u+voh90OrAfUc0mlMFglgPDRSMCD6UaefNuryccqzhVPrgUAaFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVQk0e1kkL/ADpuOSqtgGr9FADI4khiWNFCoowBVP8Ase083fh9uc7N3y1fooARkV0KMAVIwR7VSi0m1imEgDttOVVmyBV6igAqC4tI7mSJpC2IzkKDwT71PRQBXubSO5aNmLK8ZyrKeasUUUAVrqxhvNvmAhl6MpwRRa2MNmWMYYu3VmOTVmigCrdWEN2ys+5XXgMhwaktraK1i8uJcDqSepNTUUAU7nTLe6l8xt6uRglDjP1qzDDHBEsca7VHQU+igAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiisyCUpBFMvntiPdLvLYPy54z7+lAGnRVZZJw/lv5ZdoyyFQcAjHB/MUz7dvBCKMlV2E9Cxxx+G4UAXKKpzXciTSKiFhHgECNmLcZ4I4HWpS8rXZjQoEVVYkgknJPHX2oAnpCwBAJAJOB71Ut7uSZ0Ow7H5H7tht7jJPBpokllktJG2eW7llAByPkbGfWgC6WAIBIBJwPelqtd799t5e3d5vG7p91qQ3EixSMwUmJ8PgcFcA5H4H9KALVFRRSGVnIx5YOFI7+p/p+FRLNIs9wohlkAcYKlcD5V45I/yaALVFZ5BktRKzSq/nbceYRgeZjHBx04p9xvhlh8tnKxo7lSxO4ArnOevBOKALtFUoZGlvhIHPlOjhFzwQCvP6n8KntGLWcDMSSY1JJ78UATUVXcGW6MRdlRUDYViNxJPcc8Y/WiYFEiiWRgHfaXJ5AwT1/DFAFiiqM+63SZEkcgwO43MSVI9+vf9KiuJZfs0luHYSRKzM4PO0DIOffj9aANOiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACmrGqRiNR8gG0DrxTqKAI4reOEkopBIxySePTmkFtCoXCD5WLL7E1LRQBE9vHI+5gc9DhiM/XHWnhFEhcD5iACfYZx/M06igCJbeNH3qCD1xuOB9B0pFtYVkEgT5lJI+Y4GeuB+NTUUARywxzBRIudp3DkjB/CmPCUgMcAUbs5LE8Z6n3NT0UANjjWKNY0GFUYFCoqliBgscn3OAP6CnUUAM8mPZs2/Lu34z3zu/nSlFMgcj5gCAfY4z/ACFOooAaUUyByPmAIB9jjP8AIVHHaxwldnmAKMAGRiB+BOKmooAiNtEURNpAQYUhiCB9RzSmGMxeUVynoTUlFAEK20Ko6bSQ4w2WJJH1PNSOiyRsjDKsCCPanUUAFFFFAH//2Q==',
              sizes: '(max-width: 300px) 10vw, 300px',
              src: '/static/17960958527413a2fca4ac3a7e0fe78d/bc3a8/knorr.jpg',
              srcSet:
                '/static/17960958527413a2fca4ac3a7e0fe78d/d278e/knorr.jpg 1vw,↵/static/17960958527413a2fca4ac3a7e0fe78d/8539d/knorr.jpg 20vw,↵/static/17960958527413a2fca4ac3a7e0fe78d/bc3a8/knorr.jpg 800w,↵/static/17960958527413a2fca4ac3a7e0fe78d/81ef8/knorr.jpg 11vw,↵/static/17960958527413a2fca4ac3a7e0fe78d/989b1/knorr.jpg 1600w,↵/static/17960958527413a2fca4ac3a7e0fe78d/c82f6/knorr.jpg 220vw,↵/static/17960958527413a2fca4ac3a7e0fe78d/65c7d/knorr.jpg 4009w',
            },
          },
        }}
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
      <section
        className={cx(theme.recipePageNutritional, '_pb--40 _pt--40 wrapper')}
      >
        <Text text={'Nutritional'} tag={TagName.h2} />
        <RecipeDietaryAttributes
          activeAttributes={currentRecipeDietaryList}
          attributes={allDietaryList}
          icons={dietaryAttributesIcons}
        />
        <RecipeNutrients
          recipe={recipe}
          modalTitle={'Nutritional information'}
          content={findPageComponentContent(components, 'RecipeNutrients')}
          viewType={RecipeNutrientsViewType.WithAction}
          CloseButton={CloseButton}
        />
      </section>
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
          imageSizes={'(min-width: 768px) 25vw, 50vw'}
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
