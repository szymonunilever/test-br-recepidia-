import React from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql } from 'gatsby';
import SEO from 'src/components/Seo/Seo';
import Kritique from 'integrations/Kritique';
import RecipeHero from 'src/components/lib/components/RecipeHero';
import Rating, { RatingProvider } from 'src/components/lib/components/Rating';
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
import recipeAttributesContent from 'src/components/data/recipeAttributes.json';
import RecipeCookingMethod from 'src/components/lib/components/RecipeCookingMethod';
import RecipeNutrients, {
  RecipeNutrientsViewType,
} from 'src/components/lib/components/RecipeNutrients';
import { Tags } from 'src/components/lib/components/Tags';
import RecipeListing, {
  RecipeListViewType,
} from 'src/components/lib/components/RecipeListing';
import ArrowIcon from 'src/svgs/inline/arrow-down.svg';
import theme from './RecipePage.module.scss';
import cx from 'classnames';
import { Tabs } from 'src/components/lib/components/Tabs';
import { Tab } from '../../components/lib/components/Tabs/partials';

const RecipePage = ({ data }: RecipePageProps) => {
  const { recipe } = data;
  const tags = data.allTag.nodes;
  const newTags = tags.map(tag => {
    const newTag = {
      ...tag,
      id: tag.tagId,
    };

    return newTag;
  });

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

  return (
    <Layout className={classWrapper}>
      <SEO title="Recepedia Home" />
      <Kritique />

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
              </div>
              <div className={theme.recipeBlockTitle}>
                <RecipeCopy
                  viewType={RecipeCopyViewType.Title}
                  recipe={recipe}
                  content={{}}
                  className={'recipe-copy__title'}
                />
                <Rating
                  recipeId={recipe.recipeId}
                  provider={RatingProvider.kritique}
                  linkTo={recipe.fields.slug}
                />
              </div>
              <div className={theme.recipeBlockDescription}>
                <RecipeCopy
                  viewType={RecipeCopyViewType.Description}
                  recipe={recipe}
                  content={{}}
                  className={'recipe-copy__description'}
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
                  className={'recipe-attributes'}
                  content={recipeAttributesContent}
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
              content={{ title: 'Ingredients' }}
              className={theme.recipeCopyIngredients}
            />
            <RecipeCookingMethod
              methodList={recipe.methods}
              className={theme.recipeCookingMethod}
              content={{
                title: 'Cook',
              }}
            />
          </div>
        </div>
        <div className={theme.recipeIngredientsCookingMobile}>
          <Tabs className={'tabs'} content={tabsContent}>
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
      <section className={'_pt--40'}>
        <div className="container">
          <RecipeNutrients
            recipe={recipe}
            viewType={RecipeNutrientsViewType.Base}
            content={{
              buttonLabel: { label: 'Nutrients' },
              titleTotal: 'Total',
              titlePer100: 'Per 100',
              titlePerServing: 'Amount per Serving',
            }}
          />
        </div>
      </section>
      <section className={'_pt--40'}>
        <div className="container">
          <Tags
            list={newTags}
            content={{
              title: 'Similar tags',
              loadMoreButton: {
                label: '+ show more',
              },
            }}
            initialCount={8}
            tagsPerLoad={4}
            variant="link"
          />
        </div>
      </section>
      <section className={'_pt--40'}>
        {/* Hero Component should go here */}
      </section>
      <section className={'_pt--40'}>
        <div className="container">
          <RecipeListing
            content={{ title: 'Related recipes' }}
            list={relatedRecipes}
            ratingProvider={RatingProvider.kritique}
            viewType={RecipeListViewType.Carousel}
            className="recipe-list--carousel cards--2-4"
            titleLevel={3}
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
}
