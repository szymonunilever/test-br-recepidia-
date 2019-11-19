import { shallow, mount, ReactWrapper } from 'enzyme';
import React from 'react';
import RichText from '../RichText';
import toJson from 'enzyme-to-json';

const content: AppContent.RichTextContent = {
  text: `
    <h1>Header 1</h1>
    <h2>Header 2</h2>
    <p>
    Paragraph
    <a href="http://test.html">Test link</a>
    </p>
  `,
};

const className = 'rich-text';

describe('RichText', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<RichText content={content} className={className} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render text from props', () => {
    const testContent = shallow(
      <RichText content={content} className={className} />
    );
    expect(testContent.find('div[data-componentname="richText"]')).toBeTruthy();
    expect(testContent.find('h1')).toBeTruthy();
    expect(testContent.find('h2')).toBeTruthy();
    expect(testContent.find('p')).toBeTruthy();
    expect(testContent.find('a')).toBeTruthy();
  });
});
