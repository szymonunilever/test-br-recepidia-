import { storiesOf } from '@storybook/react';
import React from 'react';
import { ContactCard, ContactCardProps } from '../index';
import { ReactComponent as Phone } from 'src/svgs/inline/map-marker.svg';
import cardsData from 'src/mocks/cards.json';

const cards: any = cardsData;

storiesOf('Generic/ContactCard', module)
  .add('with Title and Text', () => <ContactCard {...cards[2]} className="card" />, {
    inline: false,
  })
  .add(
    'with Title, Text and RecipeDietaryAttributeIcon ',
    () => <ContactCard {...cards[0]} Icon={Phone} className="card" />,
    { inline: false }
  )
  .add(
    'several cards',
    () => (
      <>
        {cards.map((card: ContactCardProps, i: number) => (
          <ContactCard key={i} {...card} Icon={Phone} className="card" />
        ))}
      </>
    ),
    { inline: false }
  );
