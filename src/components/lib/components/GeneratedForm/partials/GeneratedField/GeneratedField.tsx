import React from 'react';
import Textarea from '../Textarea';
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
  content: { type, name, rows = 4, validationRules = [], ...content },
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validate = (val: any) => {
    let validMessage = undefined;

    if (shouldValidate && validationRules && validationRules.length > 0) {
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
            if (val && !new RegExp(rule.value).test(val)) {
              validMessage = errorMessage(rule.type);
            }
            break;
          }
          case 'email': {
            // eslint-disable-next-line no-useless-escape
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
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
          rules={validationRules}
          name={name}
          validate={validate}
          error={error}
          type={type}
        />
      );
      break;
    case 'textarea':
      view = (
        <Textarea
          content={content}
          rules={validationRules}
          name={name}
          rows={rows}
          validate={validate}
          error={error}
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
                valid:
                  validationRules &&
                  validationRules.length > 0 &&
                  (meta.touched || meta.submitFailed) &&
                  meta.valid,
                invalid:
                  validationRules &&
                  validationRules.length > 0 &&
                  (meta.touched || meta.submitFailed) &&
                  meta.invalid,
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
              <div
                className={cx('checkable', 'radiobtn', {
                  valid:
                    validationRules &&
                    validationRules.length > 0 &&
                    (meta.touched || meta.submitFailed) &&
                    meta.valid,
                  invalid:
                    validationRules &&
                    validationRules.length > 0 &&
                    (meta.touched || meta.submitFailed) &&
                    meta.invalid,
                })}
              >
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
                <div
                  className={cx('field__wrap', {
                    valid:
                      validationRules &&
                      validationRules.length > 0 &&
                      (meta.touched || meta.submitFailed) &&
                      meta.valid,
                    invalid:
                      validationRules &&
                      validationRules.length > 0 &&
                      (meta.touched || meta.submitFailed) &&
                      meta.invalid,
                  })}
                >
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
