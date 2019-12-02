import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { MediaGallery } from '../index';
import toJson from 'enzyme-to-json';
import localImage from '../../../stories/assets/localImage';

describe('<MediaGallery />', () => {
  let wrapper: ReactWrapper;
  const props: any = {
    galleryItemsPerLoad: 6,
    titleLevel: 1,
    className: 'class',
    onLoadMore: jest.fn(),
    allCount: 50,
    content: {
      title: 'Text',
      cta: {
        label: 'Label',
      },
    },
    list: [
      {
        id: '1',
        assets: [
          {
            url: '/',
            alt: 'Alt',
            type: 'Image',
            localImage,
          },
        ],
        fields: {
          slug: '1',
        },
        title: 'Title',
        articleText: 'Text',
        tagGroups: [
          {
            name: 'Tag',
            label: 'Label',
            tags: [
              {
                id: 1,
                name: 'Tag',
              },
            ],
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    wrapper = mount(<MediaGallery {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("shouldn't show Load More button", () => {
    wrapper = mount(<MediaGallery {...props} allCount={1} />);
    expect(wrapper.find('button.media-gallery__button')).toHaveLength(0);
  });

  it('should Load More', () => {
    wrapper.find('button.media-gallery__button').simulate('click');
    expect(props.onLoadMore).toHaveBeenCalledTimes(1);
  });

  it("Load More button shouldn't have label", () => {
    const { list, allCount, onLoadMore } = props;
    wrapper = mount(
      <MediaGallery
        list={list}
        allCount={allCount}
        onLoadMore={onLoadMore}
        content={{}}
      />
    );
    const button = wrapper.find('button.media-gallery__button');
    expect(button.text()).toHaveLength(0);
  });
});
