import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
/** Attention: now "src" is webpack alias for the folder "src/components/lib/stories" for storybook app.
 * It was done for compatibility with site app.
 * So for storybook "src" - it's  "src/components/lib/stories" and for gatsby site src it's "src" folder*/
import { ReactComponent as Icon } from 'src/svgs/inline/plus.svg';
import { ButtonViewType } from '../../Button';
import { BackToTop, BackToTopProps } from '../index';
import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';

describe('Back to top', () => {
  let wrapper: ReactWrapper;
  const page = {
    height: '200vh',
    fontSize: '2rem',
  };
  const content: AppContent.BackToTopContent = {
    label: 'Back to top',
  };
  const props: BackToTopProps = {
    content,
    viewType: ButtonViewType.icon,
    Icon,
  };

  window.scroll = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <div style={page}>
        <BackToTop {...props} />
      </div>
    );
    document.documentElement.scrollTop = 800;
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    wrapper.update();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should scroll top on click', () => {
    const scrollSpy = jest.spyOn(window, 'scroll');
    wrapper.find('button').simulate('click');
    expect(scrollSpy).toHaveBeenCalled();
  });
});
