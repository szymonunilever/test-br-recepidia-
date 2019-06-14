import { storiesOf } from '@storybook/react';
import React from 'react';
import { Select } from '../src/components/lib/common/Select';
import selectOptions from '../src/components/data/select.json';
// import { action } from '@storybook/addon-actions';
// import {
//   CheckElem,
//   checkElemTypes,
// } from '../src/components/lib/common/CheckElem/index';
// import { Button } from '../src/components/lib/common/Button';
import cx from 'classnames';

import {
  Form,
  Field,
  required,
  // mustBeNumber,
  // minValue,
  // composeValidators,
  validEmail,
} from '../src/components/lib/Form';

const options = selectOptions.options;

const containerStyles = {
  width: '375px',
  padding: '1.5rem',
  border: '1px solid black',
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const onSubmit = async (values: object) => {
  await sleep(100);
  window.alert(JSON.stringify(values, null, 2));
};

storiesOf('Components/Form elements/All', module)
  .add(
    'Form contact us without validation',
    () => (
      <div style={containerStyles}>
        <h1>Contact form</h1>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Field name="select">
                {({ input }) => (
                  <div className="field">
                    <label className="field-label">
                      <span className="field-label--text">
                        Do you have a question?
                      </span>
                      <div className="field-wrap">
                        <Select
                          input={input}
                          options={options}
                          className="select field-select"
                          placeholder="How can we help?"
                        />
                      </div>
                    </label>
                  </div>
                )}
              </Field>
              <h2>Recipes details</h2>
              <fieldset className="field">
                <legend className="field-label">
                  <span className="field-label--text">
                    Is it regarding a specific recipes?
                  </span>
                </legend>
                <div className="field-wrap field-wrap--inline">
                  <Field name="specific">
                    {({ input }) => (
                      <div className="checkable radiobtn">
                        <label className="checkable_label">
                          <input
                            {...input}
                            type="radio"
                            className="checkable_input"
                            value="yes"
                          />
                          <span className="checkable_checkelem">
                            <span className="checkmark" />
                          </span>
                          Yes
                        </label>
                      </div>
                    )}
                  </Field>
                  <Field name="specific">
                    {({ input }) => (
                      <div className="checkable radiobtn">
                        <label className="checkable_label">
                          <input
                            {...input}
                            type="radio"
                            className="checkable_input"
                            value="no"
                          />
                          <span className="checkable_checkelem">
                            <span className="checkmark" />
                          </span>
                          No
                        </label>
                      </div>
                    )}
                  </Field>
                </div>
              </fieldset>
              <Field name="recipeName">
                {({ input }) => (
                  <div className="field">
                    <label className="field-label">
                      <span className="field-label--text">First Name</span>
                      <div className="field-wrap">
                        <input
                          {...input}
                          type="text"
                          placeholder="Recipe Name"
                          className="field-input"
                        />
                      </div>
                    </label>
                    <p>
                      Please ensure you enter the product name, type and details
                    </p>
                  </div>
                )}
              </Field>
              <h2>Comments</h2>
              <Field name="comment">
                {({ input }) => (
                  <div className="field">
                    <label className="field-label">
                      <span className="field-label--text">
                        What would you like to say?
                      </span>
                      <div className="field-wrap">
                        <textarea
                          rows={4}
                          {...input}
                          placeholder="Type something…"
                          className="field-textarea"
                        />
                      </div>
                    </label>
                  </div>
                )}
              </Field>
              <h2>Personal details</h2>
              <Field name="firstName">
                {({ input }) => (
                  <div className="field">
                    <label className="field-label">
                      <span className="field-label--text">First Name</span>
                      <div className="field-wrap">
                        <input
                          {...input}
                          type="text"
                          placeholder="Ex. John"
                          className="field-input"
                        />
                      </div>
                    </label>
                  </div>
                )}
              </Field>
              <Field name="lastName">
                {({ input }) => (
                  <div className="field">
                    <label className="field-label">
                      <span className="field-label--text">Last Name</span>
                      <div className="field-wrap">
                        <input
                          {...input}
                          type="text"
                          placeholder="Ex. Doe"
                          className="field-input"
                        />
                      </div>
                    </label>
                  </div>
                )}
              </Field>
              <Field name="email">
                {({ input }) => (
                  <div className="field">
                    <label className="field-label">
                      <span className="field-label--text">Email</span>
                      <div className="field-wrap">
                        <input
                          {...input}
                          type="text"
                          placeholder="Ex. johndoe@gmail.com"
                          className="field-input"
                        />
                      </div>
                    </label>
                  </div>
                )}
              </Field>
              <Field name="phone" validate={required('Field is required')}>
                {({ input }) => (
                  <div className="field">
                    <label className="field-label">
                      <span className="field-label--text">Phone number</span>
                      <div className="field-wrap">
                        <input
                          {...input}
                          type="text"
                          placeholder="+00 0000 000 000"
                          className="field-input"
                        />
                      </div>
                    </label>
                  </div>
                )}
              </Field>
              <div className="buttons">
                {/* <Button type="submit">Submit form</Button> */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="button-primary"
                >
                  Submit form
                </button>
              </div>
            </form>
          )}
        />
      </div>
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Form contact us with validation',
    () => (
      <div style={containerStyles}>
        <h1>Contact form</h1>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Field name="select" validate={required('Field is required')}>
                {({ input, meta }) => (
                  <div
                    className={cx('field', {
                      valid: (meta.touched || meta.submitFailed) && meta.valid,
                      invalid:
                        (meta.touched || meta.submitFailed) && meta.invalid,
                    })}
                  >
                    <label className="field-label">
                      <span className="field-label--text">
                        Do you have a question?
                      </span>
                      <div className="field-wrap">
                        <Select
                          input={input}
                          options={options}
                          className="select field-select"
                          placeholder="How can we help?"
                        />
                      </div>
                      {meta.error && meta.touched && (
                        <span className="field-error-message">
                          {meta.error}
                        </span>
                      )}
                    </label>
                    {/* <pre>{JSON.stringify(meta, null, 2)}</pre> */}
                  </div>
                )}
              </Field>
              <h2>Recipes details</h2>
              <fieldset className="field">
                <legend className="field-label">
                  <span className="field-label--text">
                    Is it regarding a specific recipes?
                  </span>
                </legend>
                <div className="field-wrap field-wrap--inline">
                  <Field
                    name="specific"
                    validate={required('Field is required')}
                  >
                    {({ input, meta }) => (
                      <div
                        className={cx('checkable', 'radiobtn', {
                          valid:
                            (meta.touched || meta.submitFailed) && meta.valid,
                          invalid:
                            (meta.touched || meta.submitFailed) && meta.invalid,
                        })}
                      >
                        <label className="checkable_label">
                          <input
                            {...input}
                            type="radio"
                            className="checkable_input"
                            value="yes"
                          />
                          <span className="checkable_checkelem">
                            <span className="checkmark" />
                          </span>
                          Yes
                        </label>
                      </div>
                    )}
                  </Field>
                  <Field
                    name="specific"
                    validate={required('Field is required')}
                  >
                    {({ input, meta }) => (
                      <div
                        className={cx('checkable', 'radiobtn', {
                          valid:
                            (meta.touched || meta.submitFailed) && meta.valid,
                          invalid:
                            (meta.touched || meta.submitFailed) && meta.invalid,
                        })}
                      >
                        <label className="checkable_label">
                          <input
                            {...input}
                            type="radio"
                            className="checkable_input"
                            value="no"
                          />
                          <span className="checkable_checkelem">
                            <span className="checkmark" />
                          </span>
                          No
                        </label>
                      </div>
                    )}
                  </Field>
                </div>
              </fieldset>
              <Field name="recipeName" validate={required('Field is required')}>
                {({ input, meta }) => (
                  <div
                    className={cx('field', {
                      valid: (meta.touched || meta.submitFailed) && meta.valid,
                      invalid:
                        (meta.touched || meta.submitFailed) && meta.invalid,
                    })}
                  >
                    <label className="field-label">
                      <span className="field-label--text">First Name</span>
                      <div className="field-wrap">
                        <input
                          {...input}
                          type="text"
                          placeholder="Recipe Name"
                          className="field-input"
                        />
                      </div>
                      {meta.error && meta.touched && (
                        <span className="field-error-message">
                          {meta.error}
                        </span>
                      )}
                    </label>
                    <p>
                      Please ensure you enter the product name, type and details
                    </p>
                  </div>
                )}
              </Field>
              <h2>Comments</h2>
              <Field name="comment" validate={required('Field is required')}>
                {({ input, meta }) => (
                  <div
                    className={cx('field', {
                      valid: (meta.touched || meta.submitFailed) && meta.valid,
                      invalid:
                        (meta.touched || meta.submitFailed) && meta.invalid,
                    })}
                  >
                    <label className="field-label">
                      <span className="field-label--text">
                        What would you like to say?
                      </span>
                      <div className="field-wrap">
                        <textarea
                          rows={4}
                          {...input}
                          placeholder="Type something…"
                          className="field-textarea"
                        />
                      </div>
                      {meta.error && meta.touched && (
                        <span className="field-error-message">
                          {meta.error}
                        </span>
                      )}
                    </label>
                  </div>
                )}
              </Field>
              <h2>Personal details</h2>
              <Field name="firstName" validate={required('Field is required')}>
                {({ input, meta }) => (
                  <div
                    className={cx('field', {
                      valid: (meta.touched || meta.submitFailed) && meta.valid,
                      invalid:
                        (meta.touched || meta.submitFailed) && meta.invalid,
                    })}
                  >
                    <label className="field-label">
                      <span className="field-label--text">First Name</span>
                      <div className="field-wrap">
                        <input
                          {...input}
                          type="text"
                          placeholder="Ex. John"
                          className="field-input"
                        />
                      </div>
                      {meta.error && meta.touched && (
                        <span className="field-error-message">
                          {meta.error}
                        </span>
                      )}
                    </label>
                  </div>
                )}
              </Field>
              <Field name="lastName" validate={required('Field is required')}>
                {({ input, meta }) => (
                  <div
                    className={cx('field', {
                      valid: (meta.touched || meta.submitFailed) && meta.valid,
                      invalid:
                        (meta.touched || meta.submitFailed) && meta.invalid,
                    })}
                  >
                    <label className="field-label">
                      <span className="field-label--text">Last Name</span>
                      <div className="field-wrap">
                        <input
                          {...input}
                          type="text"
                          placeholder="Ex. Doe"
                          className="field-input"
                        />
                      </div>
                      {meta.error && meta.touched && (
                        <span className="field-error-message">
                          {meta.error}
                        </span>
                      )}
                    </label>
                  </div>
                )}
              </Field>
              <Field name="email" validate={validEmail('invalid email')}>
                {({ input, meta }) => (
                  <div
                    className={cx('field', {
                      valid: (meta.touched || meta.submitFailed) && meta.valid,
                      invalid:
                        (meta.touched || meta.submitFailed) && meta.invalid,
                    })}
                  >
                    <label className="field-label">
                      <span className="field-label--text">Email</span>
                      <div className="field-wrap">
                        <input
                          {...input}
                          type="text"
                          placeholder="Ex. johndoe@gmail.com"
                          className="field-input"
                        />
                      </div>
                      {meta.error && meta.touched && (
                        <span className="field-error-message">
                          {meta.error}
                        </span>
                      )}
                    </label>
                  </div>
                )}
              </Field>
              <Field name="phone" validate={required('Field is required')}>
                {({ input, meta }) => (
                  <div
                    className={cx('field', {
                      valid: (meta.touched || meta.submitFailed) && meta.valid,
                      invalid:
                        (meta.touched || meta.submitFailed) && meta.invalid,
                    })}
                  >
                    <label className="field-label">
                      <span className="field-label--text">Phone number</span>
                      <div className="field-wrap">
                        <input
                          {...input}
                          type="text"
                          placeholder="+00 0000 000 000"
                          className="field-input"
                        />
                      </div>
                      {meta.error && meta.touched && (
                        <span className="field-error-message">
                          {meta.error}
                        </span>
                      )}
                    </label>
                  </div>
                )}
              </Field>
              <div className="buttons">
                {/* <Button type="submit">Submit form</Button> */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="button-primary"
                >
                  Submit form
                </button>
              </div>
              {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
            </form>
          )}
        />
      </div>
    ),
    {
      info: { inline: false },
    }
  );
