import cx from 'classnames';
import React from 'react';
import { Field } from '../../../Form/partials/Field';
import { TextareaProps } from './models';

export const Textarea = ({
  rules,
  content,
  name,
  rows,
  validate,
  error,
}: TextareaProps) => (
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
              <textarea
                {...input}
                className={cx('field__textarea', {
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
                rows={rows}
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

export default Textarea;
