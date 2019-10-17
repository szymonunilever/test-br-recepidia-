import { storiesOf } from '@storybook/react';
import React from 'react';
import { Card, CardProps } from '../index';
import { ReactComponent as Phone } from './svgs/inline/unilever-logo.svg';

const cards: CardProps[] = [
  {
    titleLevel: 2,
    content: {
      title: 'Phone',
      texts: ['+380633334455'],
      type: 'phone',
    },
  },
  {
    titleLevel: 2,
    content: {
      title: 'Address',
      texts: [
        'Unilever UK Limited.',
        'Registered in England & Wales No. 334527',
      ],
      type: 'address',
    },
  },
  {
    titleLevel: 2,
    content: {
      title: 'Some text',
      texts: [
        'Unilever UK Limited.',
        'Registered in England & Wales No. 334527',
      ],
      type: 'text',
      cta: { label: 'Contact Form', linkTo: '/contact' },
    },
  },
];

storiesOf('Components/Card', module)
  .add('Card with Title and Text', () => <Card {...cards[2]} />, {
    inline: false,
  })
  .add(
    'Card with Title, Text and Icon ',
    () => <Card {...cards[0]} Icon={Phone} />,
    { inline: false }
  )
  .add(
    'Few cards',
    () => (
      <>
        {cards.map((card: CardProps, i: number) => (
          <Card key={i} {...card} Icon={Phone} />
        ))}
      </>
    ),
    { inline: false }
  );
