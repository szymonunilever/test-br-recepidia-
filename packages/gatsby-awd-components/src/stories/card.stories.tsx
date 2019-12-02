import { storiesOf } from '@storybook/react';
import React from 'react';
import { Card, CardProps } from '../index';
import { ReactComponent as Phone } from 'src/svgs/inline/map-marker.svg';
import cardsData from 'src/mocks/cards.json';

const cards: any = cardsData;

storiesOf('Generic/Card', module)
  .add('with Title and Text', () => <Card {...cards[2]} className="card" />, {
    inline: false,
  })
  .add(
    'with Title, Text and RecipeDietaryAttributeIcon ',
    () => <Card {...cards[0]} Icon={Phone} className="card" />,
    { inline: false }
  )
  .add(
    'several cards',
    () => (
      <>
        {cards.map((card: CardProps, i: number) => (
          <Card key={i} {...card} Icon={Phone} className="card" />
        ))}
      </>
    ),
    { inline: false }
  );
