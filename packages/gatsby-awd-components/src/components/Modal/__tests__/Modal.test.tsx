import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Modal, ModalProps } from '../index';
import toJson from 'enzyme-to-json';

describe('<Modal />', () => {
  let wrapper: ReactWrapper;
  const props: ModalProps = {
    children: <div>Content</div>,
    isOpen: true,
  };

  beforeEach(() => {
    // eslint-disable-next-line react/no-children-prop
    wrapper = mount(<Modal {...props} children={props.children} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
