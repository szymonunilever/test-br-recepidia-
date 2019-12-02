import { mount, render, ReactWrapper } from 'enzyme';
import React from 'react';
import Quiz, { QuizProps } from '../index';
import toJson from 'enzyme-to-json';
import questions from 'src/mocks/wizardQuizQuestions';
import { ReactComponent as CheckMarkIcon } from 'src/svgs/inline/checkmark-bigger.svg';

describe('<Quiz />', () => {
  let wrapper: ReactWrapper;
  let wrapperMulti: ReactWrapper;
  let wrapperSingle: ReactWrapper;
  const mockCallback = jest.fn(() => {});
  const imageSizesOptions = {
    QUIZ_SMALL: '(max-width: 768px) 50vw, (max-width: 1366px) 30vw, 400px',
    QUIZ_BIG: '(max-width: 1366px) 50vw, 800px',
  };
  const quizProps: QuizProps = {
    questions,
    CheckMarkIcon,
    ctas: [
      { type: 'skip', label: 'Skip' },
      { type: 'next', label: 'Continue' },
      { type: 'back', label: 'Back' },
      { type: 'final', label: 'Continue' },
    ],
    containerClass: 'wizard--quiz',
    stepId: 'quiz',
    onClose: mockCallback,
    actionCallback: val => val,
    bottomContent: <>test</>,
  };

  const multiOptions = quizProps.questions.filter(
    item => item.type.control === 'checkbox'
  );
  const singleOptions = quizProps.questions.filter(
    item => item.type.control === 'radio'
  );

  beforeEach(() => {
    wrapper = mount(
      <div className="wizard__content">
        <Quiz {...quizProps} imageSizesOptions={imageSizesOptions} />
      </div>
    );
    wrapperMulti = mount(<Quiz {...quizProps} questions={multiOptions} />);
    wrapperSingle = mount(<Quiz {...quizProps} questions={singleOptions} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('multi choise options are rendered', () => {
    expect(
      !!render(<Quiz {...quizProps} questions={multiOptions} />).find(
        '.quiz__item'
      ).length
    ).toBe(true);
  });

  it('multi choise options increment', () => {
    expect(!!wrapperMulti.find('.quiz__item-selected').length).toBe(false);
    wrapperMulti
      .find('.quiz__item-input')
      .first()
      .simulate('change')
      .update();
    expect(!!wrapperMulti.find('.quiz__item-selected').length).toBe(true);
    wrapperMulti
      .find('.quiz__item-input')
      .at(1)
      .simulate('change')
      .update();
    expect(wrapperMulti.find('.quiz__item-selected')).toHaveLength(2);
  });

  it('single choise options are rendered', () => {
    expect(
      !!render(<Quiz {...quizProps} questions={singleOptions} />).find(
        '.quiz__item'
      ).length
    ).toBe(true);
  });

  it('single choise options toggle', () => {
    expect(!!wrapperSingle.find('.quiz__item-selected').length).toBe(false);
    wrapperSingle
      .find('.quiz__item-input')
      .first()
      .simulate('change');
    expect(!!wrapperSingle.find('.quiz__item-selected').length).toBe(true);
    wrapperSingle
      .find('.quiz__item-input')
      .at(1)
      .simulate('change');
    expect(wrapperSingle.find('.quiz__item-selected')).toHaveLength(1);
  });

  it('update selected question multi options', () => {
    wrapper
      .find('.quiz__item-input')
      .first()
      .simulate('change')
      .update();
    expect(!!wrapper.find('.quiz__item-selected').length).toBe(true);
    wrapper
      .find('.wizard__button--primary')
      .first()
      .simulate('click');
    expect(wrapper.find('h2').text()).toBe('Time');
    wrapper
      .find('.quiz__item-input')
      .first()
      .simulate('change')
      .update();
    wrapper
      .find('.wizard__button--primary')
      .first()
      .simulate('click');
    wrapper
      .find('.wizard__button--back')
      .first()
      .simulate('click');
    expect(!!wrapper.find('.quiz__item-selected').length).toBe(true);
    wrapper
      .find('.wizard__button--back')
      .first()
      .simulate('click');
    wrapper
      .find('.quiz__item-input')
      .at(1)
      .simulate('change');
    expect(wrapper.find('.quiz__item-selected')).toHaveLength(2);
  });

  it('callback is called on quiz unmount', () => {
    expect(!!wrapper.find('.quiz__item').length).toBe(true);
    wrapper.unmount();
    expect(mockCallback.mock.calls).toHaveLength(1);
  });

  it('quiz go to second question, skip and then return back', () => {
    expect(!!wrapper.find('.quiz__item').length).toBe(true);
    wrapper
      .find('.quiz__item-input')
      .first()
      .simulate('change');
    wrapper
      .find('.wizard__button--primary')
      .first()
      .simulate('click');
    expect(wrapper.find('h2').text()).toBe('Time');
    wrapper
      .find('.wizard__button--skip')
      .first()
      .simulate('click');
    expect(wrapper.find('h2').text()).toBe('Budget');
    wrapper
      .find('.wizard__button--back')
      .first()
      .simulate('click');
    expect(wrapper.find('h2').text()).toBe('Time');
  });

  it('go to radio, select, next, go back, select twice, next', () => {
    expect(!!wrapper.find('.quiz__item').length).toBe(true);
    wrapper
      .find('.quiz__item-input')
      .first()
      .simulate('change');
    wrapper
      .find('.wizard__button--primary')
      .first()
      .simulate('click');
    // .update();
    // console.log('----', wrapper.find('h2').text());
    // expect(wrapperMulti.find('h2').text()).toBe('Budget');
    wrapper
      .find('.wizard__button--back')
      .first()
      .simulate('click');
    expect(wrapper.find('.quiz__item-selected')).toHaveLength(1);
    wrapper
      .find('.quiz__item-input')
      .first()
      .simulate('change');
    wrapper
      .find('.quiz__item-input')
      .first()
      .simulate('change');
    wrapper
      .find('.wizard__button--primary')
      .first()
      .simulate('click');
    wrapper
      .find('.wizard__button--back')
      .first()
      .simulate('click');
    expect(wrapper.find('.quiz__item-selected')).toHaveLength(1);
  });
});
