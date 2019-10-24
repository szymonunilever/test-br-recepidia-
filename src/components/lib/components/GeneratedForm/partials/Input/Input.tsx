import React from 'react';
import { Field } from '../../../Form/partials/Field';
import { InputProps } from './models';
import cx from 'classnames';

const Input = ({ rules, content, type, name, validate, error }: InputProps) => (
  <Field name={name} validate={validate}>
    {({ input, meta }) => {
      return (
        <div className="field">
          <label className="field__label">
            <span className="field__label-text">{content.label}</span>
            <div
              className={cx('field__wrap', {
                valid:
                  rules &&
                  rules.length > 0 &&
                  (meta.touched || meta.submitFailed) &&
                  meta.valid,
                invalid:
                  rules &&
                  rules.length > 0 &&
                  (meta.touched || meta.submitFailed) &&
                  meta.invalid,
              })}
            >
              <input
                {...input}
                type={type}
                className={cx('field__input', {
                  valid:
                    rules &&
                    rules.length > 0 &&
                    (meta.touched || meta.submitFailed) &&
                    meta.valid,
                  invalid:
                    rules &&
                    rules.length > 0 &&
                    (meta.touched || meta.submitFailed) &&
                    meta.invalid,
                })}
                placeholder={content.placeholder}
                value={content.value}
              />
              {error(meta)}
            </div>
          </label>
          <p className="field__hint">{content.hint}</p>
        </div>
      );
    }}
  </Field>
);

export default Input;
