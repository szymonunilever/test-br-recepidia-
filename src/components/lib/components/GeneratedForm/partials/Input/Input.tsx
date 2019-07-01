import React from 'react';
import { Field } from '../../../Form/partials/Field';
import { InputProps } from './models';

const Input = ({ content, type, name, validate, error }: InputProps) => (
  <Field name={name} validate={validate}>
    {({ input, meta }) => {
      return (
        <div className="field">
          <label className="field__label">
            <span className="field__label-text">{content.label}</span>
            <div className="field__wrap">
              <input
                {...input}
                type={type}
                className="field__input"
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
