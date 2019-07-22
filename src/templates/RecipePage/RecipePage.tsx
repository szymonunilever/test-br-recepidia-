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
import RecipeClock from 'src/svgs/inline/recipe-clock.svg';
import RecipeDifficulty from 'src/svgs/inline/recipe-difficulty.svg';
import RecipePeople from 'src/svgs/inline/recipe-people.svg';
import RecipeKnife from 'src/svgs/inline/recope-chop.svg';
import RecipeCookingMethod from 'src/components/lib/components/RecipeCookingMethod';
import RecipeNutrients, {
  RecipeNutrientsViewType,
} from 'src/components/lib/components/RecipeNutrients';
import RecipeListing, {
  RecipeListViewType,
} from 'src/components/lib/components/RecipeListing';
import ArrowIcon from 'src/svgs/inline/arrow-down.svg';
import theme from './RecipePage.module.scss';
import cx from 'classnames';
import { Tabs } from 'src/components/lib/components/Tabs';
import { Tab } from '../../components/lib/components/Tabs/partials';
import { RatingAndReviewsProvider } from 'src/components/lib/models/ratings&reviews';
import Reviews from 'src/components/lib/components/Reviews';
import { findPageComponentContent } from 'src/utils';
import FavoriteIcon from '../../svgs/inline/favorite.svg';
import RecipeDietaryAttributes from 'src/components/lib/components/RecipeDietaryAttributes';
import attributes from 'src/components/data/dietaryAttributes.json';
import activeAttributes from 'src/components/data/dietaryAttributesActive.json';
import dataRecipe from 'src/components/data/recipe.json';
import * as icons from 'src/svgs/attributes';
import CloseButton from 'src/svgs/inline/x-mark.svg';
import { Text, TagName } from 'src/components/lib/components/Text';
import Button from '../../components/lib/components/common/Button';
import SocialSharing, {
  SocialSharingViewType,
  SocialIcons,
} from 'src/components/lib/components/SocialSharing';
import AddThis from '../../../integrations/AddThis';
import socialSharingContent from 'src/components/data/socialSharingContent.json';
import FacebookIcon from 'src/svgs/inline/facebook.svg';
import InstagramIcon from 'src/svgs/inline/instagram.svg';
import TwitterIcon from 'src/svgs/inline/twitter.svg';
import TagLinks from 'src/components/TagsLinks/TagLinks';

const RecipePage = ({ data, pageContext }: RecipePageProps) => {
  const { recipe } = data;
  const { components } = pageContext;
  // TODO below fields should be fetched from back-end. Currenty missing in back-end response
  recipe.nutrientsPer100g = dataRecipe.nutrientsPer100g as any;
  recipe.nutrientsPerServing = dataRecipe.nutrientsPerServing as any;
  recipe.nutrients = dataRecipe.nutrientsPerServing as any;
  const tags = data.allTag.nodes;
  const dietaryAttributesIcons = [
    {
      id: 'vegetarian',
      active: <icons.VegeterianActive />,
      inActive: <icons.VegeterianInactive />,
    },
    {
      id: 'vegan',
      active: <icons.VeganActive />,
      inActive: <icons.VeganInactive />,
    },
    {
      id: 'nutFree',
      active: <icons.NutFreeActive />,
      inActive: <icons.NutFreeInactive />,
    },
    {
      id: 'pregnancySafe',
      active: <icons.PregnancySafeActive />,
      inActive: <icons.PregnancySafeInactive />,
    },
    {
      id: 'glutenFree',
      active: <icons.GlutenFreeActive />,
      inActive: <icons.GlutenFreeInactive />,
    },
    {
      id: 'lactoseFree',
      active: <icons.LactoseFreeActive />,
      inActive: <icons.LactoseFreeInactive />,
    },
    {
      id: 'rawFood',
      active: <icons.RawFoodActive />,
      inActive: <icons.RawFoodInactive />,
    },
    {
      id: 'eggFree',
      active: <icons.EggFreeActive />,
      inActive: <icons.EggFreeInactive />,
    },
    {
      id: 'paleoFree',
      active: <icons.PaleoDietActive />,
      inActive: <icons.PaleoDietInactive />,
    },
    // TODO replace below icons with proper onesafter
    {
      id: 'wheatFree',
      active: <icons.DairyFreeActive />,
      inActive: <icons.DairyFreeInactive />,
    },
    {
      id: 'dairyProductFree',
      active: <icons.WheatFreeActive />,
      inActive: <icons.WheatFreeInactive />,
    },
  ];

  const relatedRecipes = data.allRecipe.nodes;
  const classWrapper = cx(theme.recipePage, 'recipe-page');
  const tabsContent = {
    tabs: [
      {
        title: 'Ingredients',
        view: 'recipeTabIngredients',
      },
      {
        title: 'Cook',
        view: 'recipeTabCookingMethod',
      },
    ],
  };
  const socialIcons: SocialIcons = {
    facebook: FacebookIcon,
    twitter: TwitterIcon,
    //TODO linkedin icon should be here
    linkedIn: InstagramIcon,
  };

  return (
    <Layout className={classWrapper}>
      <SEO title="Recepedia Home" />
      <Kritique />
      <AddThis />

      <section className={theme.topBg}>
        <div className="container">
          <div className={theme.recipeTopBlock}>
            <div className={theme.recipeTopBlockItem}>
              <div className={theme.recipeHeroDesktop}>
                <RecipeHero
                  content={recipe}
                  imagePlaceholder={{
                    id: '0bcf6c75-0450-554d-89c7-85316cc28839',
                    childImageSharp: {
                      fluid: {
                        aspectRatio: 1,
                        base64:
                          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA+Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBkZWZhdWx0IHF1YWxpdHkK/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgBLAEsAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9MooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKzm1Us7eRayTRqcFx0/CgDRoqG3uY7i3E6HCd89vrVL+1x/rPs0v2fOPN/+tQBp0VG80ccBmZvkA3Z9qpJq2XQy20kUTnCyN0oA0aKKKACiiigAoqpd3y2zpGsbSyvyEX0pLW/E8xhkheGUDO1u49qALlFU7q/8iYQxQvNLjJVew96ktLtLuMkKUdThkbqDQBYoqhPqRjnaKG3edk++V6CrNtcpdQCWPODwQeoNAE1FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAjDcpXpkY4qhLPBo9vFFtkYHO3p+v51ekZlidlGWAJA9TUFrcJeWYkYLgg7l7CgDPUlNBnlyP3pLYU9MkDFaSwL9hEGPl8vbj8KzIYt+j3gjBKGRig9hj/CtAXSf2YLjcMeXn8cdPzoAzixl0O1Qk/PIIz9Mn/CtHUI1fTplxwEJH4c1QeNotCt22nMbCQj8f/r1c1GdF02RgwIkXavvmgCxauZLSFyclkUn8qr6jJcQRLPC3yocumByKsW6GO2iQ9VQA/lTL2dLe0kkcAjGAp7k9qAKz3j3N1BDaPhSN8jYBwPStGsXSQbO5a3mQK8qh1Pr7VtUAV5IooZpL1txZYyCPYc8VRt7pNQ1SOSMbFhQ8MeWzVxbs/2i9q4AG0Mh9agmVP7btigAfaxfHpjjNADrAbrq9lPUy7M/SiMeXrcoHAkhDH6g4pLJhHfXkJ4JfzB7g0QsJtZndeVjjEeffOaAF0gZtGl7ySMxP40WI8u+voh90OrAfUc0mlMFglgPDRSMCD6UaefNuryccqzhVPrgUAaFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVQk0e1kkL/ADpuOSqtgGr9FADI4khiWNFCoowBVP8Ase083fh9uc7N3y1fooARkV0KMAVIwR7VSi0m1imEgDttOVVmyBV6igAqC4tI7mSJpC2IzkKDwT71PRQBXubSO5aNmLK8ZyrKeasUUUAVrqxhvNvmAhl6MpwRRa2MNmWMYYu3VmOTVmigCrdWEN2ys+5XXgMhwaktraK1i8uJcDqSepNTUUAU7nTLe6l8xt6uRglDjP1qzDDHBEsca7VHQU+igAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiisyCUpBFMvntiPdLvLYPy54z7+lAGnRVZZJw/lv5ZdoyyFQcAjHB/MUz7dvBCKMlV2E9Cxxx+G4UAXKKpzXciTSKiFhHgECNmLcZ4I4HWpS8rXZjQoEVVYkgknJPHX2oAnpCwBAJAJOB71Ut7uSZ0Ow7H5H7tht7jJPBpokllktJG2eW7llAByPkbGfWgC6WAIBIBJwPelqtd799t5e3d5vG7p91qQ3EixSMwUmJ8PgcFcA5H4H9KALVFRRSGVnIx5YOFI7+p/p+FRLNIs9wohlkAcYKlcD5V45I/yaALVFZ5BktRKzSq/nbceYRgeZjHBx04p9xvhlh8tnKxo7lSxO4ArnOevBOKALtFUoZGlvhIHPlOjhFzwQCvP6n8KntGLWcDMSSY1JJ78UATUVXcGW6MRdlRUDYViNxJPcc8Y/WiYFEiiWRgHfaXJ5AwT1/DFAFiiqM+63SZEkcgwO43MSVI9+vf9KiuJZfs0luHYSRKzM4PO0DIOffj9aANOiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACmrGqRiNR8gG0DrxTqKAI4reOEkopBIxySePTmkFtCoXCD5WLL7E1LRQBE9vHI+5gc9DhiM/XHWnhFEhcD5iACfYZx/M06igCJbeNH3qCD1xuOB9B0pFtYVkEgT5lJI+Y4GeuB+NTUUARywxzBRIudp3DkjB/CmPCUgMcAUbs5LE8Z6n3NT0UANjjWKNY0GFUYFCoqliBgscn3OAP6CnUUAM8mPZs2/Lu34z3zu/nSlFMgcj5gCAfY4z/ACFOooAaUUyByPmAIB9jjP8AIVHHaxwldnmAKMAGRiB+BOKmooAiNtEURNpAQYUhiCB9RzSmGMxeUVynoTUlFAEK20Ko6bSQ4w2WJJH1PNSOiyRsjDKsCCPanUUAFFFFAH//2Q==',
                        sizes: '(max-width: 300px) 10vw, 300px',
                        src:
                          '/static/17960958527413a2fca4ac3a7e0fe78d/bc3a8/knorr.jpg',
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
                      isToggle={true}
                      // changeHandler={console.log}
                      className="action-button"
                    />
                  </div>
                  <>
                    <SocialSharing
                      content={socialSharingContent}
                      viewType={SocialSharingViewType.Modal}
                      CloseButtonIcon={CloseButton}
                      icons={socialIcons}
                      titleLevel={4}
                    />
                  </>
                </div>
              </div>
            </div>
            <div className={theme.recipeTopBlockItem}>
              <div className={theme.recipeHeroMobile}>
                <RecipeHero
                  content={recipe}
                  imagePlaceholder={{
                    id: '0bcf6c75-0450-554d-89c7-85316cc28839',
                    childImageSharp: {
                      fluid: {
                        aspectRatio: 1,
                        base64:
                          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA+Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBkZWZhdWx0IHF1YWxpdHkK/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgBLAEsAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9MooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKzm1Us7eRayTRqcFx0/CgDRoqG3uY7i3E6HCd89vrVL+1x/rPs0v2fOPN/+tQBp0VG80ccBmZvkA3Z9qpJq2XQy20kUTnCyN0oA0aKKKACiiigAoqpd3y2zpGsbSyvyEX0pLW/E8xhkheGUDO1u49qALlFU7q/8iYQxQvNLjJVew96ktLtLuMkKUdThkbqDQBYoqhPqRjnaKG3edk++V6CrNtcpdQCWPODwQeoNAE1FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAjDcpXpkY4qhLPBo9vFFtkYHO3p+v51ekZlidlGWAJA9TUFrcJeWYkYLgg7l7CgDPUlNBnlyP3pLYU9MkDFaSwL9hEGPl8vbj8KzIYt+j3gjBKGRig9hj/CtAXSf2YLjcMeXn8cdPzoAzixl0O1Qk/PIIz9Mn/CtHUI1fTplxwEJH4c1QeNotCt22nMbCQj8f/r1c1GdF02RgwIkXavvmgCxauZLSFyclkUn8qr6jJcQRLPC3yocumByKsW6GO2iQ9VQA/lTL2dLe0kkcAjGAp7k9qAKz3j3N1BDaPhSN8jYBwPStGsXSQbO5a3mQK8qh1Pr7VtUAV5IooZpL1txZYyCPYc8VRt7pNQ1SOSMbFhQ8MeWzVxbs/2i9q4AG0Mh9agmVP7btigAfaxfHpjjNADrAbrq9lPUy7M/SiMeXrcoHAkhDH6g4pLJhHfXkJ4JfzB7g0QsJtZndeVjjEeffOaAF0gZtGl7ySMxP40WI8u+voh90OrAfUc0mlMFglgPDRSMCD6UaefNuryccqzhVPrgUAaFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVQk0e1kkL/ADpuOSqtgGr9FADI4khiWNFCoowBVP8Ase083fh9uc7N3y1fooARkV0KMAVIwR7VSi0m1imEgDttOVVmyBV6igAqC4tI7mSJpC2IzkKDwT71PRQBXubSO5aNmLK8ZyrKeasUUUAVrqxhvNvmAhl6MpwRRa2MNmWMYYu3VmOTVmigCrdWEN2ys+5XXgMhwaktraK1i8uJcDqSepNTUUAU7nTLe6l8xt6uRglDjP1qzDDHBEsca7VHQU+igAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiisyCUpBFMvntiPdLvLYPy54z7+lAGnRVZZJw/lv5ZdoyyFQcAjHB/MUz7dvBCKMlV2E9Cxxx+G4UAXKKpzXciTSKiFhHgECNmLcZ4I4HWpS8rXZjQoEVVYkgknJPHX2oAnpCwBAJAJOB71Ut7uSZ0Ow7H5H7tht7jJPBpokllktJG2eW7llAByPkbGfWgC6WAIBIBJwPelqtd799t5e3d5vG7p91qQ3EixSMwUmJ8PgcFcA5H4H9KALVFRRSGVnIx5YOFI7+p/p+FRLNIs9wohlkAcYKlcD5V45I/yaALVFZ5BktRKzSq/nbceYRgeZjHBx04p9xvhlh8tnKxo7lSxO4ArnOevBOKALtFUoZGlvhIHPlOjhFzwQCvP6n8KntGLWcDMSSY1JJ78UATUVXcGW6MRdlRUDYViNxJPcc8Y/WiYFEiiWRgHfaXJ5AwT1/DFAFiiqM+63SZEkcgwO43MSVI9+vf9KiuJZfs0luHYSRKzM4PO0DIOffj9aANOiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACmrGqRiNR8gG0DrxTqKAI4reOEkopBIxySePTmkFtCoXCD5WLL7E1LRQBE9vHI+5gc9DhiM/XHWnhFEhcD5iACfYZx/M06igCJbeNH3qCD1xuOB9B0pFtYVkEgT5lJI+Y4GeuB+NTUUARywxzBRIudp3DkjB/CmPCUgMcAUbs5LE8Z6n3NT0UANjjWKNY0GFUYFCoqliBgscn3OAP6CnUUAM8mPZs2/Lu34z3zu/nSlFMgcj5gCAfY4z/ACFOooAaUUyByPmAIB9jjP8AIVHHaxwldnmAKMAGRiB+BOKmooAiNtEURNpAQYUhiCB9RzSmGMxeUVynoTUlFAEK20Ko6bSQ4w2WJJH1PNSOiyRsjDKsCCPanUUAFFFFAH//2Q==',
                        sizes: '(max-width: 300px) 10vw, 300px',
                        src:
                          '/static/17960958527413a2fca4ac3a7e0fe78d/bc3a8/knorr.jpg',
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
                      isToggle={true}
                      // changeHandler={console.log}
                      className="action-button"
                    />
                  </div>
                  <>
                    <SocialSharing
                      content={socialSharingContent}
                      viewType={SocialSharingViewType.Modal}
                      CloseButtonIcon={CloseButton}
                      icons={socialIcons}
                      titleLevel={4}
                    />
                  </>
                </div>
              </div>
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
                    RecipeAttributesKeys.totalTime,
                    RecipeAttributesKeys.preparationTime,
                    RecipeAttributesKeys.difficulties,
                  ]}
                  icons={{
                    preparationTime: RecipeKnife,
                    totalTime: RecipeClock,
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
        </div>
      </section>

      <section>
        <div className="container">
          <div className={theme.recipeIngredientsCooking}>
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
        </div>
        <div className={theme.recipeIngredientsCookingMobile}>
          <Tabs className="tabs" content={tabsContent}>
            <Tab view="recipeTabIngredients">
              <RecipeCopy
                viewType={RecipeCopyViewType.Ingredients}
                recipe={recipe}
                content={{}}
                className={theme.recipeCopyIngredients}
              />
            </Tab>
            <Tab view="recipeTabCookingMethod">
              <RecipeCookingMethod
                methodList={recipe.methods}
                className={theme.recipeCookingMethod}
                content={{}}
              />
            </Tab>
          </Tabs>
        </div>
      </section>
      <section className="recipe-dietary-attributes__wrapper">
        <div className="container">
          <Text text={'Nutritional'} tag={TagName.h2} />
        </div>
        <div className="container-fluid">
          <RecipeDietaryAttributes
            activeAttributes={activeAttributes}
            attributes={attributes}
            icons={dietaryAttributesIcons}
          />
          <RecipeNutrients
            recipe={recipe}
            content={findPageComponentContent(components, 'RecipeNutrients')}
            viewType={RecipeNutrientsViewType.WithAction}
            CloseButton={CloseButton}
          />
        </div>
      </section>
      <section className="_pt--40">
        <div className="container">
          <TagLinks
            list={tags}
            content={findPageComponentContent(components, 'Tags')}
          />
        </div>
      </section>
      <section className="_pt--40">
        {/* Hero Component should go here */}
      </section>
      <section className="_pt--40">
        <div className="container">
          <RecipeListing
            content={findPageComponentContent(
              components,
              'RecipeListing',
              'RelatedRecipes'
            )}
            list={relatedRecipes}
            ratingProvider={RatingAndReviewsProvider.kritique}
            viewType={RecipeListViewType.Carousel}
            className="recipe-list--carousel cards--2-4"
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
          />
        </div>
      </section>
      <section className="_pt--40">
        <div className="container">
          <Reviews
            recipeId={recipe.recipeId}
            provider={RatingAndReviewsProvider.kritique}
            linkTo={recipe.fields.slug}
          />
        </div>
      </section>
    </Layout>
  );
};

export default RecipePage;

export const query = graphql`
  query($slug: String!) {
    recipe(fields: { slug: { eq: $slug } }) {
      ...RecipeFields
    }

    allTag {
      nodes {
        ...TagFields
      }
    }

    allRecipe(limit: 10) {
      nodes {
        ...RecipeFields
      }
    }
  }
`;

interface RecipePageProps {
  data: {
    recipe: Internal.Recipe;
    allTag: {
      nodes: Internal.Tag[];
    };
    allRecipe: {
      nodes: Internal.Recipe[];
    };
  };
  pageContext: {
    title: string;
    components: {
      [key: string]: string | number | boolean | object | null;
    }[];
  };
}
