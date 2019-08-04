import React, {
  Fragment,
  FunctionComponent,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { Modal } from '../../lib/components/Modal';
import CloseSvg from '../../../svgs/inline/x-mark.svg';
import Wizard from '../../lib/components/Wizard';
import WizardQuiz from '../../lib/components/Wizard/partials/Quiz';
import { IntroQuizProps } from './models';
import WizardLogo from '../../../svgs/inline/wizard-logo.svg';
import Logo from '../../lib/components/Logo';
import {
  getUserProfileByKey,
  saveUserProfileByKey,
} from '../../../utils/browserStorage';
import { ProfileKey } from '../../../utils/browserStorage/models';

const IntroQuiz: FunctionComponent<IntroQuizProps> = ({
  questions,
  primaryButtonLabel,
  primaryButtonFinalLabel,
  secondaryButtonLabel,
}) => {
  const [isQuizOpened, setIsQuizOpened] = useState(false);
  const [isQuizPassed, setIsQuizPassed] = useState(false);
  const [userProfileIQ, setUserProfileIQ] = useState(
    getUserProfileByKey(ProfileKey.initialQuiz)
  );

  useEffect(() => {
    !Object.keys(userProfileIQ).length &&
      setTimeout(() => {
        !isQuizPassed && setIsQuizOpened(true);
      }, 3000);
  }, [isQuizPassed]);

  const wizardAction = useCallback(wizardData => {
    setIsQuizOpened(false);
    setIsQuizPassed(true);
    setUserProfileIQ(wizardData.data.quiz);
    saveUserProfileByKey(wizardData.data.quiz, ProfileKey.initialQuiz);
  }, []);

  const stepResultsCallback = useCallback(
    quizData => saveUserProfileByKey(quizData.data, ProfileKey.initialQuiz),
    []
  );

  const closeCallback = useCallback(() => setIsQuizOpened(false), []);

  return (
    <Modal
      isOpen={isQuizOpened}
      className="modal--quiz"
      closeBtn={<CloseSvg />}
      close={closeCallback}
    >
      <Wizard actionCallback={wizardAction}>
        {/*
          // @ts-ignore */}
        <WizardQuiz
          intro={
            <Fragment>
              <div className="wizard__info">
                <div className="wizard__logo">
                  <Logo icon={<WizardLogo />} path="/" />
                </div>
                <h1>Welcome to Recepedia</h1>
                <p className="wizard__description">
                  We want to know you better and feed you with recipes you love
                </p>
              </div>
            </Fragment>
          }
          {...{
            questions,
            stepResultsCallback,
            primaryButtonLabel,
            primaryButtonFinalLabel,
            secondaryButtonLabel,
          }}
          containerClass="wizard--quiz wizard--quiz-initial"
          stepId="quiz"
        />
      </Wizard>
    </Modal>
  );
};

export default IntroQuiz;
