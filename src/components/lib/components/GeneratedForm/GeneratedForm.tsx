import React, { FormEvent } from 'react';
import { Form } from '../Form';
import { GeneratedFormProps } from './models';
import { TagName, Text } from '../Text';
import { groupBy } from 'lodash';
import GeneratedField from './partials/GeneratedField';
import cx from 'classnames';

export const GeneratedForm = ({
  className,
  content: { title, subtitle, fields, submitButton, resetButton },
  onSubmit,
  shouldValidate = false,
  titleLevel = 1,
}: GeneratedFormProps) => {
  const classWrapper = cx('generated-form', className);

  const Title = title ? (
    // @ts-ignore
    <Text tag={TagName[`h${titleLevel}`]} text={title} />
  ) : null;
  const Subtitle = subtitle ? (
    // @ts-ignore
    <Text tag={TagName[`h${titleLevel + 1}`]} text={subtitle} />
  ) : null;

  const formFields = groupBy(fields, field => field.fieldset);

  const view = formFields.undefined.map((item, key) => {
    let innerItems: JSX.Element[] | undefined = undefined;
    if (item.type === 'fieldset') {
      innerItems = formFields[item.name].map((item, key) => {
        return (
          <GeneratedField
            shouldValidate={shouldValidate}
            content={item}
            key={key}
            className="generated-form__item"
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

  return (
    <Form
      className={classWrapper}
      onSubmit={onSubmit}
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
          <form onSubmit={onSubmitHandler}>
            {Title}
            {Subtitle}
            {view}
            <div className="buttons">
              <button
                type="submit"
                disabled={submitting}
                className="generated-form__button--primary"
              >
                {submitButton.label}
              </button>
              {resetButton ? (
                <button
                  type="reset"
                  disabled={submitting}
                  className="generated-form__button--secondary"
                  onClick={form.reset}
                >
                  {resetButton.label}
                </button>
              ) : null}
            </div>
          </form>
        );
      }}
    />
  );
};

export default GeneratedForm;
