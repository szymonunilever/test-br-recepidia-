import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { ContactCard } from '../ContactCard';
import toJson from 'enzyme-to-json';
import cardsData from 'src/mocks/cards.json';

describe('<ContactCard />', () => {
  let wrapper: ReactWrapper;
  const cards: any = cardsData;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    wrapper = mount(<ContactCard {...cards[0]} Icon="svg" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should show address card', () => {
    wrapper = mount(<ContactCard {...cards[1]} Icon="svg" />);
    expect(wrapper.find('address')).toHaveLength(1);
  });

  it('should show text card', () => {
    wrapper = mount(<ContactCard {...cards[2]} Icon="svg" />);
    expect(wrapper.find('.card__text')).toHaveLength(2);
  });
});
