import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  FunctionComponent,
} from 'react';
import Question from './partials/Question';
import Button from '../../../Button';
import { QuizProps } from './models';
import { ResultsStore } from '../../models';
import get from 'lodash/get';

const Quiz: FunctionComponent<QuizProps> = ({
  intro,
  questions,
  actionCallback,
  stepResultsCallback,
  ctas,
  bottomContent,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFormDirty, setFormDirty] = useState(false);
  const [answers, setAnswers] = useState({});
  const question = questions[currentQuestionIndex];
  const [currentAnswer, setCurrentAnswer] = useState();
  const progress = Math.round(
    ((currentQuestionIndex + 1) / questions.length) * 100
  );
  const isAnswerProvided = useCallback(
    () => !!currentAnswer && !!currentAnswer.length,
    [currentAnswer]
  );

  const setQuestionIndex = (index: number) => {
    setCurrentQuestionIndex(index);
    const currentQuestion = questions[index];

    const selectedOptions = currentQuestion.options.filter(option => {
      // @ts-ignore
      if (answers[currentQuestion.key]) {
        // @ts-ignore
        if (Array.isArray(answers[currentQuestion.key].value)) {
          // @ts-ignore
          return answers[currentQuestion.key].value.find(
            // @ts-ignore
            item => item === option.value
          );
        } else {
          // @ts-ignore
          return answers[currentQuestion.key].value === option.value;
        }
      }
      return false;
    });
    setCurrentAnswer(
      Array.isArray(selectedOptions)
        ? currentQuestion.type.control === 'checkbox'
          ? selectedOptions.map(item => item.value)
          : selectedOptions[0] && selectedOptions[0].value
        : selectedOptions
    );
  };
  const putCurrentAnswer = useCallback(() => {
    const updatedAnswers = { ...answers };
    // @ts-ignore
    updatedAnswers[question.key] = {
      value: currentAnswer,
      filterPropName: question.filterPropName,
    };
    setAnswers(updatedAnswers);
  }, [question, answers, currentAnswer]);
  const continueAction = useCallback(
    (data: ResultsStore) => {
      if (questions.length > currentQuestionIndex + 1) {
        stepResultsCallback && stepResultsCallback(data);
        setQuestionIndex(currentQuestionIndex + 1);
      } else {
        stepResultsCallback && stepResultsCallback(data);
        actionCallback(data);
      }
    },
    [currentQuestionIndex]
  );
  const skipCallback = useCallback(() => continueAction({ data: answers }), [
    answers,
    currentQuestionIndex,
  ]);
  const onChangeCallback = useCallback(
    (questionKey: string, value: string | object | null) => {
      setCurrentAnswer(value);
      setFormDirty(true);
    },
    []
  );

  useEffect(() => {
    if (!currentAnswer) {
      setFormDirty(false);
    }
    // scroll container to top on quiz question change
    const wizardContainer = document.querySelector('.wizard__content');
    wizardContainer && wizardContainer.scrollTo(0, 0);
  }, [currentQuestionIndex]);
  useEffect(() => {
    Object.keys(answers).length && continueAction({ data: answers });
  }, [answers]);

  const getDesktopCols = useCallback((colsNumber: number) => {
    let val = 3;

    [2].includes(colsNumber) && (val = 2);
    [3, 5, 6, 9, 11].includes(colsNumber) && (val = 3);
    [4, 7, 8, 10, 12].includes(colsNumber) && (val = 4);

    return val;
  }, []);

  const mobileCols = 2;
  const desktopCols = getDesktopCols(question.options.length);
  const layoutClass = `wizard-col-${mobileCols}-${desktopCols}`;
  const primaryButtonFinal = ctas.find(item => item.type === 'final');
  const primaryButton = ctas.find(item => item.type === 'next');
  const backButton = ctas.find(item => item.type === 'back');
  const skipButton = ctas.find(item => item.type === 'skip');
  const backAction = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setQuestionIndex(currentQuestionIndex - 1);
      setFormDirty(true);
    }
  }, [currentQuestionIndex]);

  return (
    <Fragment>
      {currentQuestionIndex === 0 && intro}
      <form className={layoutClass}>
        {/* 
        // @ts-ignore */}
        <Question
          {...{
            question,
            progress,
            onChangeCallback,
            selectedOptions: currentAnswer,
          }}
        />
        <div className="wizard__buttons">
          {/*
          // @ts-ignore */}
          <Button
            attributes={{ 'aria-label': 'Continue quiz' }}
            className="wizard__button wizard__button--primary"
            onClick={putCurrentAnswer}
            isDisabled={!isFormDirty || !isAnswerProvided()}
            content={{
              label:
                progress === 100 && primaryButtonFinal
                  ? primaryButtonFinal.label
                  : get(primaryButton, 'label', 'Next'),
            }}
          />
          {skipButton && (
            <Button
              className="wizard__button wizard__button--secondary"
              onClick={skipCallback}
              content={{ label: skipButton.label }}
              attributes={{ 'aria-label': 'Skip quiz step' }}
            />
          )}
          {currentQuestionIndex > 0 && backButton && (
            <Button
              className="wizard__button wizard__button--secondary"
              onClick={backAction}
              content={{ label: backButton.label }}
              attributes={{ 'aria-label': 'Back one step' }}
            />
          )}
        </div>
        <div className="wizard__button-placeholder">{bottomContent}</div>
      </form>
    </Fragment>
  );
};

export default Quiz;
