import React from 'react';
import { findPageComponentContent } from 'src/utils';
import { Text, AdaptiveImage, TagName } from 'gatsby-awd-components/src';
import { ReactComponent as MaizenaSpikeletIcon } from 'src/svgs/inline/spikelet.svg';

const BrandPromiseMaizena = ({ components }: MaizenaPromiseProps) => {
  const promiseArticleContent = findPageComponentContent(
    components,
    'PromiseArticle'
  );

  return (
    <>
      <section className="wrapper promise-intro _pt--40 _pb--40 bg-primary">
        <Text
          tag={TagName.h2}
          text={
            findPageComponentContent(components, 'Text', 'PromiseIntro').intro
          }
          className="promise-intro__text"
        />
        <div>
          <MaizenaSpikeletIcon />
        </div>
      </section>

      <section className="wrapper promise-article _pb--40 bg-primary">
        <Text
          tag={TagName.h2}
          text={promiseArticleContent.title}
          className="promise-article__title"
        />
        {promiseArticleContent.subtitle && (
          <Text
            tag={TagName.p}
            text={promiseArticleContent.subtitle}
            className="promise-article__subtitle"
          />
        )}
        <AdaptiveImage
          localImage={promiseArticleContent.image.localImage}
          alt={promiseArticleContent.image.alt}
          className="promise-article__image"
        />
      </section>
    </>
  );
};

interface MaizenaPromiseProps {
  components: AppContent.Page.components;
}

export default BrandPromiseMaizena;
