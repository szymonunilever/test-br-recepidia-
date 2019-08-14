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

const Quiz: FunctionComponent<QuizProps> = ({
  intro,
  questions,
  actionCallback,
  stepResultsCallback,
  primaryButtonLabel,
  primaryButtonFinalLabel,
  secondaryButtonLabel,
  bottomContent,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFormDirty, setFormDirty] = useState(false);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState();
  const question = questions[currentQuestionIndex];
  const progress = Math.round(
    ((currentQuestionIndex + 1) / questions.length) * 100
  );
  const isAnswerProvided = useCallback(
    () => !!currentAnswer && !!currentAnswer.length,
    [currentAnswer]
  );

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
        setCurrentQuestionIndex(currentQuestionIndex + 1);
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

  useEffect(() => setFormDirty(false), [currentQuestionIndex]);
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

  return (
    <Fragment>
      {currentQuestionIndex === 0 && intro}
      <form className={layoutClass}>
        <Question {...{ question, progress, onChangeCallback }} />
        <div className="wizard__buttons">
          {/*
          // @ts-ignore */}
          <Button
            className="wizard__button wizard__button--primary"
            onClick={putCurrentAnswer}
            isDisabled={!isFormDirty || !isAnswerProvided()}
            content={{
              label:
                progress === 100 && primaryButtonFinalLabel
                  ? primaryButtonFinalLabel
                  : primaryButtonLabel,
            }}
          />
          {secondaryButtonLabel && (
            <Button
              className="wizard__button wizard__button--secondary"
              onClick={skipCallback}
              content={{ label: secondaryButtonLabel }}
            />
          )}
          <div className="wizard__button-placeholder">{bottomContent}</div>
        </div>
      </form>
    </Fragment>
  );
};

export default Quiz;
