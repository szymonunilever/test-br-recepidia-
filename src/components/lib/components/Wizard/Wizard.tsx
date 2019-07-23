import React, {
  ReactChild,
  ReactNode,
  FunctionComponent,
  useState,
  useCallback,
} from 'react';
import { ResultsStore, NextAction, WizardProps } from './models';
import WizardLogo from '../../../../svgs/inline/wizard-logo.svg';
import { Button, ButtonViewType } from '../common/Button';
import CloseSvg from '../../../../svgs/inline/x-mark.svg';
import cx from 'classnames';

const Wizard: FunctionComponent<WizardProps> = ({
  step = 0,
  closeCallback,
  actionCallback,
  children,
}) => {
  const [currentStep, setCurrentStep] = useState(step);
  const [wizardDataStore, setWizardDataStore] = useState<ResultsStore>({});
  let wizardClassName;
  let enhancedChildren: ReactChild[] = [];

  const nextAction = useCallback(
    ({ data }: NextAction) => {
      const currentComponent: ReactChild = enhancedChildren[currentStep];

      // @ts-ignore
      wizardDataStore[currentComponent.props.stepId] = data;
      setWizardDataStore(wizardDataStore);

      if (currentStep === enhancedChildren.length - 1) {
        actionCallback({ data: wizardDataStore });
      } else {
        setCurrentStep(currentStep + 1);
      }
    },
    [wizardDataStore, enhancedChildren, currentStep]
  );

  React.Children.forEach(children, child => {
    if (React.isValidElement(child)) {
      const newProps = {
        actionCallback: nextAction,
        resultsStore: wizardDataStore,
      };

      enhancedChildren.push(React.cloneElement(child, newProps));
    }
  });

  const currentComponent: ReactNode = enhancedChildren[currentStep];
  // @ts-ignore
  wizardClassName = currentComponent.props.containerClass;

  return (
    <div className={cx('wizard', wizardClassName)}>
      <div className="wizard__container">
        <div className="wizard__logo">
          <WizardLogo />
        </div>
        <div className="wizard__content">{currentComponent}</div>
        <Button
          className="wizard__close"
          Icon={CloseSvg}
          onClick={closeCallback}
          isToggle={true}
          viewType={ButtonViewType.icon}
        />
      </div>
    </div>
  );
};

Wizard.defaultProps = {
  step: 0,
};

export default Wizard;