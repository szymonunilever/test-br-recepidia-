/* global describe, it, expect */
import { shallow } from 'enzyme';
import React from 'react';
import { Text, TagName } from '../';

const testText = 'Test text';
const className = 'text-component';

describe('<Text />', () => {
  it('should render h1 tag', () => {
    const tagName = 'h1';
    const testContent = shallow(
      <Text className={className} tag={TagName[tagName]} text={testText} />
    );
    expect(testContent.find('h1')).toBeTruthy();
  });

  it('should render h2 tag', () => {
    const tagName = 'h2';
    const testContent = shallow(
      <Text className={className} tag={TagName[tagName]} text={testText} />
    );
    expect(testContent.find('h2')).toBeTruthy();
  });

  it('should render h3 tag', () => {
    const tagName = 'h3';
    const testContent = shallow(
      <Text className={className} tag={TagName[tagName]} text={testText} />
    );
    expect(testContent.find('h3')).toBeTruthy();
  });

  it('should render h4 tag', () => {
    const tagName = 'h4';
    const testContent = shallow(
      <Text className={className} tag={TagName[tagName]} text={testText} />
    );
    expect(testContent.find('h4')).toBeTruthy();
  });

  it('should render h5 tag', () => {
    const tagName = 'h5';
    const testContent = shallow(
      <Text className={className} tag={TagName[tagName]} text={testText} />
    );
    expect(testContent.find('h5')).toBeTruthy();
  });

  it('should render h6 tag', () => {
    const tagName = 'h6';
    const testContent = shallow(
      <Text className={className} tag={TagName[tagName]} text={testText} />
    );
    expect(testContent.find('h6')).toBeTruthy();
  });

  it('should render p tag', () => {
    const tagName = 'p';
    const testContent = shallow(
      <Text className={className} tag={TagName[tagName]} text={testText} />
    );
    expect(testContent.find('p')).toBeTruthy();
  });

  it('should render component with "text-component" class', () => {
    const tagName = 'h1';
    const testContent = shallow(
      <Text className={className} tag={TagName[tagName]} text={testText} />
    );
    expect(testContent.find('.text-component')).toBeTruthy();
  });

  it('should render component with Test text', () => {
    const tagName = 'h1';
    const testContent = shallow(
      <Text className={className} tag={TagName[tagName]} text={testText} />
    );
    expect(testContent.contains('Test text')).toBeTruthy();
  });

  it('should render component without className specified', () => {
    const tagName = 'h1';
    const testContent = shallow(
      <Text tag={TagName[tagName]} text={testText} />
    );
    expect(testContent.find('h1')).toBeTruthy();
    expect(testContent.contains('Test text')).toBeTruthy();
  });
});
