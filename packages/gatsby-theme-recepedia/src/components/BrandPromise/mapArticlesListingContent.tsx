import React from 'react';
import { CardLinkWrapper, Card } from 'gatsby-awd-components/src';
import { IMAGE_SIZES } from 'src/constants';

export const mapArticlesListingContent = ({
  articles,
  countState,
}: ArticlesListing) =>
  articles.slice(0, countState).map((article, index) => (
    <CardLinkWrapper
      title={article.title}
      cardKey={article.fields.slug}
      slug={article.fields.slug}
      key={index + article.fields.slug}
    >
      <Card
        content={article}
        cardKey={article.fields.slug}
        imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
        idPropertyName="recipeId"
      />
    </CardLinkWrapper>
  ));

export interface ArticlesListing {
  articles: PromiseArticle[];
  countState: number;
}

export interface PromiseArticle {
  title: string;
  fields: {
    slug: string;
  };
  section?: string;
  localImage: Internal.LocalImage;
}
