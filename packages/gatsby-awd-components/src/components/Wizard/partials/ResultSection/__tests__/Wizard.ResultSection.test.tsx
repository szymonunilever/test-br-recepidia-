import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import ResultSection, { ResultSectionProps } from '../index';
import toJson from 'enzyme-to-json';
import resultContent from 'src/mocks/WizardResultSection.json';
import recipes from 'src/mocks/recipes.json';

describe('<ResultSection />', () => {
  let wrapper: ReactWrapper;
  const recipesList: Internal.Recipe[] = recipes.data.allRecipe.edges.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: { node: Internal.Recipe | any }) => item.node
  );

  const resultSectionProps: ResultSectionProps = {
    containerClass: 'wizard--result',
    stepId: 'result',
    resultSize: recipesList.length,
    ...resultContent,
    actionCallback: jest.fn(),
    callbacks: { test: jest.fn(() => {}) },
  };

  beforeEach(() => {
    wrapper = mount(
      <div className="wizard__content">
        <ResultSection {...resultSectionProps}>
          <>test</>
        </ResultSection>
      </div>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('matches the snapshot with 0 results', () => {
    expect(
      toJson(mount(<ResultSection {...resultSectionProps} resultSize={0} />))
    ).toMatchSnapshot();
  });
});
