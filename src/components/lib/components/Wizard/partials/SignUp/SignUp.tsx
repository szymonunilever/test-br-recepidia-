import React, { Fragment, FunctionComponent } from 'react';
import { SignUpProps } from './models';
import { TagName, Text } from '../../../Text';
import GeneratedForm from '../../../GeneratedForm';
import { Button } from '../../../common/Button';

const SignUp: FunctionComponent<SignUpProps> = ({
  actionCallback,
  formContent,
  title,
}) => (
  <Fragment>
    <div className="wizard__info">
      <div className="wizard__title">
        <Text className="" tag={TagName.h2} text={title} />
      </div>
    </div>
    <GeneratedForm
      onSubmit={actionCallback}
      content={formContent}
      className=""
      shouldValidate
    />
    <div className="wizard__buttons">
      <Button
        className="wizard__button wizard__button--secondary"
        onClick={actionCallback}
        content={{ label: 'Skip' }}
      />
    </div>
  </Fragment>
);

export default SignUp;
