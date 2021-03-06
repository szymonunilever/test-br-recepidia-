import React, {
  FormEvent,
  FunctionComponent,
  useCallback,
  useState,
} from 'react';
import { Form } from '../../../Form';
import { GeneratedFormProps } from '../../models';
import { TagName, Text } from '../../../Text';
import groupBy from 'lodash/groupBy';
import findIndex from 'lodash/findIndex';
import GeneratedField from '../GeneratedField';
import cx from 'classnames';
import { ReCaptcha } from 'react-recaptcha-v3';
import theme from './GeneratedForm.module.scss';
import { Button } from '../../../Button';

const GeneratedFormInstance: FunctionComponent<GeneratedFormProps> = ({
  className,
  hasCaptcha,
  recaptchaKey,
  recaptchaAction = 'formSubmit',
  content: { title, subtitle, fields, submitButton, resetButton },
  onSubmit,
  shouldValidate = false,
  titleLevel,
}) => {
  const classWrapper = cx(theme.generatedForm, 'generated-form', className);
  const [token, setToken] = useState<string | undefined>();
  const Title = title ? (
    <Text
      // @ts-ignore
      tag={TagName[titleLevel ? `h${titleLevel}` : `div`]}
      className="generated-form__title"
      text={title}
    />
  ) : null;
  const Subtitle = subtitle ? (
    // @ts-ignore
    <Text
      tag={TagName[`div`]}
      className="generated-form__subtitle"
      text={subtitle}
    />
  ) : null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formFields: { [key: string]: any[] } = groupBy(
    fields,
    field => field.fieldset
  );
  for (let fieldsetName in formFields) {
    const checkableIndex = findIndex(
      formFields[fieldsetName],
      item => item.type === 'radio' || item.type === 'checkbox'
    );

    if (checkableIndex > -1) {
      const name = formFields[fieldsetName][checkableIndex].name;
      const lengthGroup = formFields[fieldsetName].filter(
        item => item.name === name
      ).length;
      if (lengthGroup > 1) {
        formFields[name] = formFields[fieldsetName].splice(
          checkableIndex,
          lengthGroup,
          {
            type: 'group',
            name,
          }
        );
      }
    }
  }

  const view =
    formFields.undefined &&
    formFields.undefined.map((item, key) => {
      let innerItems: JSX.Element[] | undefined = undefined;
      if (item.type === 'fieldset') {
        innerItems = formFields[item.name].map((item, key) => {
          if (item.type === 'group') {
            innerItems = formFields[item.name].map((item, key) => {
              return (
                <GeneratedField
                  shouldValidate={shouldValidate}
                  content={item}
                  key={key}
                  className="generated-form__item"
                  innerContent={innerItems}
                />
              );
            });
          }
          return (
            <GeneratedField
              shouldValidate={shouldValidate}
              content={item}
              key={key}
              className="generated-form__item"
              innerContent={innerItems}
            />
          );
        });
      }
      if (item.type === 'group') {
        innerItems = formFields[item.name].map((item, key) => {
          return (
            <GeneratedField
              shouldValidate={shouldValidate}
              content={item}
              key={key}
              className="generated-form__item"
              innerContent={innerItems}
            />
          );
        });
      }
      return (
        <GeneratedField
          shouldValidate={shouldValidate}
          content={item}
          key={key}
          className="generated-form__item"
          innerContent={innerItems}
        />
      );
    });
  const verifyCallback = useCallback((recaptchaToken: string | undefined) => {
    setToken(recaptchaToken);
  }, []);

  const preSubmit = (val: object) => {
    if (hasCaptcha && token) {
      const formObj = { ...val, reCaptchaToken: token };
      onSubmit(formObj);
    } else {
      onSubmit(val);
    }
  };

  return (
    <Form
      className={classWrapper}
      onSubmit={preSubmit}
      subscription={{
        submitting: true,
      }}
      render={({ handleSubmit, submitting, form }) => {
        const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
          const promise = handleSubmit(e);
          promise &&
            promise.then(() => {
              form.reset();
            });
          return promise;
        };
        return (
          <form
            onSubmit={onSubmitHandler}
            className={classWrapper}
            noValidate={shouldValidate}
          >
            {hasCaptcha && (
              <ReCaptcha
                sitekey={recaptchaKey}
                action={recaptchaAction}
                verifyCallback={verifyCallback}
              />
            )}
            <div className="generated-form__container">
              {Title}
              {Subtitle}
              {view && <div className="generated-form__fields">{view}</div>}
              <div className="buttons">
                {/* <button
                  type="submit"
                  disabled={submitting}
                  className="button generated-form__button--primary"
                >
                  {submitButton && submitButton.label}
                </button> */}
                <Button
                  type="submit"
                  isDisabled={submitting}
                  className="generated-form__button--primary"
                >
                  {submitButton && submitButton.label}
                </Button>

                {resetButton ? (
                  <Button
                    type="reset"
                    isDisabled={submitting}
                    className="button--secondary generated-form__button--secondary"
                    // @ts-ignore
                    onClick={form.reset}
                  >
                    {resetButton.label}
                  </Button>
                ) : null}
              </div>
            </div>
          </form>
        );
      }}
    />
  );
};

export default GeneratedFormInstance;
