import React from 'react';
import { GeneratedFieldProps } from './models';
import { Field } from '../../../Form';
import cx from 'classnames';
import { CheckElem, checkElemTypes } from '../../../common/CheckElem';
import { Select } from '../../../common/Select';
import { FieldMetaState } from 'react-final-form';
import { forEach } from 'lodash';
import Input from '../Input/';

const GeneratedField = ({
  className,
  content: { type, name, validationRules = [], ...content },
  innerContent,
  shouldValidate,
}: GeneratedFieldProps) => {
  let view: JSX.Element;

  const errorMessage = (type: string) => {
    const [errMsg] = validationRules
      .filter(rule => rule.type === type)
      .map(item => item.errorMessage);

    return errMsg || 'Invalid field';
  };

  const validate = (val: any) => {
    let validMessage = undefined;

    if (shouldValidate) {
      forEach(validationRules, rule => {
        switch (rule.type) {
          case 'required': {
            if (!Array.isArray(val) && typeof val === 'object' && !val.value) {
              validMessage = errorMessage(rule.type);
              break;
            } else if (!val) {
              validMessage = errorMessage(rule.type);
              break;
            } else if (Array.isArray(val) && !val.length) {
              validMessage = errorMessage(rule.type);
              break;
            } else {
              break;
            }
          }
          case 'minLength': {
            if (val && val.length < rule.value) {
              validMessage = errorMessage(rule.type);
            }
            break;
          }
          case 'maxLength': {
            if (val && val.length > rule.value) {
              validMessage = errorMessage(rule.type);
            }
            break;
          }
          case 'pattern': {
            if (val && !rule.value.test(val)) {
              validMessage = errorMessage(rule.type);
            }
            break;
          }
          default: {
            validMessage = errorMessage(rule.type);
          }
        }
      });
    }

    return validMessage;
  };
  const error = (meta: FieldMetaState) =>
    meta.error &&
    meta.touched && <span className="field__error">{meta.error}</span>;

  switch (type) {
    case 'fieldset':
      view = (
        <fieldset className={className}>
          <legend className={className + '-legend'}>{content.label}</legend>
          {innerContent}
        </fieldset>
      );
      break;
    case 'text':
    case 'number':
    case 'tel':
    case 'password':
    case 'email':
      view = (
        <Input
          content={content}
          name={name}
          validate={validate}
          error={error}
          type={type}
        />
      );
      break;
    case 'hidden':
      view = (
        <Field name={name}>
          {({ input }) => (
            <input
              {...input}
              value={content.value as string}
              type="hidden"
              className="field__input"
            />
          )}
        </Field>
      );
      break;
    case 'description':
      view = (
        <Field name={type}>
          {() => <p className={className + '-description'}>{content.label}</p>}
        </Field>
      );
      break;
    case 'checkbox':
      view = (
        <Field
          name={name}
          value={content.value}
          type="checkbox"
          initialValue={content.defaultValue}
          validate={validate}
        >
          {({ input, meta }) => (
            <div
              className={cx('checkable', 'checkbox', {
                valid: (meta.touched || meta.submitFailed) && meta.valid,
                invalid: (meta.touched || meta.submitFailed) && meta.invalid,
              })}
            >
              <CheckElem
                input={input}
                type={checkElemTypes.checkbox}
                label={content.label}
                value={content.value as string}
              />
              {error(meta)}
            </div>
          )}
        </Field>
      );
      break;
    case 'radio':
      view = (
        <Field
          name={name}
          type={type}
          value={content.value}
          initialValue={content.defaultValue}
          validate={validate}
        >
          {({ input, meta }) => {
            return (
              <div className="checkable radiobtn">
                <CheckElem
                  input={input}
                  type={checkElemTypes.radio}
                  label={content.label}
                  value={content.value as string}
                />
                {error(meta)}
              </div>
            );
          }}
        </Field>
      );
      break;
    case 'select':
      view = (
        <Field
          name={name}
          initialValue={content.defaultValue}
          validate={validate}
        >
          {({ input, meta }) => (
            <div className="field">
              <label className="field__label">
                <span className="field__label-text">{content.label}</span>
                <div className="field__wrap">
                  <Select
                    input={input}
                    options={content.options ? content.options : []}
                    className="select field__select"
                    placeholder={content.placeholder}
                  />
                  {error(meta)}
                </div>
              </label>
            </div>
          )}
        </Field>
      );
      break;
    case 'capcha':
      view = <></>;
      //TODO: make capcha integration.
      break;
    default:
      view = <p className={className + '-description'}>{content.label}</p>;
      break;
  }

  return view;
};

export default GeneratedField;
