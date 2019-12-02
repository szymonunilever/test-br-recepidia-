import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { BrandSocialChannels } from '../index';
import toJson from 'enzyme-to-json';

describe('<BrandSocialChannels />', () => {
  let wrapper: ReactWrapper;
  const mock = {
    socialItems: {
      facebook: {
        label: 'Facebook',
        url: 'https://www.facebook.com/',
      },
      instagram: {
        label: 'Instagram',
        url: 'https://www.instagram.com/',
      },
      twitter: {
        label: 'Twitter',
        url: 'https://twitter.com/',
      },
      pinterest: {
        label: 'Pinterest',
        url: 'https://www.pinterest.com/',
      },
    },
  };
  const props: any = {
    listIcons: {
      facebook: <div>Facebook</div>,
      instagram: <div>Instagram</div>,
    },
    content: mock,
  };

  beforeEach(() => {
    wrapper = mount(<BrandSocialChannels {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
