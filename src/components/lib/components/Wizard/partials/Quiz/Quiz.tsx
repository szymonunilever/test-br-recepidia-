import React, { useState, FunctionComponent } from 'react';
import Question from './partials/Question';
import Button from '../../../Button';
import { QuizProps } from './models';

const Quiz: FunctionComponent<QuizProps> = ({
  questions,
  actionCallback,
  primaryButtonLabel,
  secondaryButtonLabel,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFormDirty, setFormDirty] = useState(false);
  const [answers, setAnswers] = useState({});
  const question = questions[currentQuestionIndex];

  const continueCallback = () => {
    if (questions.length > currentQuestionIndex + 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      actionCallback({
        data: answers,
      });
    }
  };

  const onChangeCallback = (
    questionKey: string,
    value: string | object | null
  ) => {
    const updatedAnswers = { ...answers };

    // @ts-ignore
    updatedAnswers[questionKey] = value;
    setAnswers(updatedAnswers);
    setFormDirty(true);
    // eslint-disable-next-line no-console
    console.log('current answers are', updatedAnswers);
  };

  return (
    <form>
      <Question question={question} onChangeCallback={onChangeCallback} />
      <div className="wizard__buttons">
        <Button
          className="wizard__button wizard__button--primary"
          onClick={continueCallback}
          content={{ label: primaryButtonLabel }}
        />
        <Button
          className="wizard__button wizard__button--secondary"
          onClick={continueCallback}
          content={{ label: secondaryButtonLabel }}
        />
      </div>
    </form>
  );
};

export default Quiz;
