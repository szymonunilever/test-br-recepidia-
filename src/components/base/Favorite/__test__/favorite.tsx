/* global describe, it, expect */
import React from 'react';
import { shallow } from 'enzyme';
import { Favorite } from '../index';
// @ts-ignore
import Icon from 'src/svgs/inline/plus.svg';
// @ts-ignore
import IconSelected from 'src/svgs/inline/plus-in-circle.svg';

const testFunc = (x: boolean) => {
  return x;
};

describe('Favorite', () => {
  it('render Favorite', () => {
    const fav = shallow(
      <Favorite
        icon={Icon}
        isSelected={false}
        onChange={testFunc}
        className="favorite"
        iconSelected={IconSelected}
      />
    );
    expect(fav.find('button[data-componentname="Favorite"]')).toBeTruthy();
  });
});
