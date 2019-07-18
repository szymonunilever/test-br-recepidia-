import { storiesOf } from '@storybook/react';
import React from 'react';

import GeneratedForm from 'src/components/lib/components/GeneratedForm';
import signUpFormContent from 'src/components/data/signUpFormContent.json';

const content: AppContent.GeneratedForm.Content = {
  view: 'TestGeneratedForm',
  submitButton: {
    label: 'Submit',
  },
  resetButton: {
    label: 'Clear form',
  },
  title: 'Test generated form',
  subtitle: 'Story of form generator',
  fields: [
    {
      name: 'description',
      type: 'description',
      label: 'This is form description field.',
    },
    {
      name: 'testFieldset',
      type: 'fieldset',
      label: 'Test Fieldset',
    },
    {
      name: 'testFieldset3',
      type: 'fieldset',
      label: 'Test Fieldset3',
    },
    {
      name: 'testInput One',
      type: 'text',
      label: 'Test text input One',
      placeholder: 'Test text input One',
      hint: 'Enter some text',
      fieldset: 'testFieldset',
      validationRules: [
        {
          type: 'required',
          errorMessage: 'This field is required.',
        },
        {
          type: 'pattern',
          value: /^[A-Z]/,
          errorMessage: 'Should start with uppercase',
        },
        {
          type: 'maxLength',
          value: 4,
          errorMessage: 'This field is too long.',
        },
        {
          type: 'minLength',
          value: 2,
          errorMessage: 'This field is too short.',
        },
      ],
    },
    {
      name: 'testInput Two',
      type: 'text',
      label: 'Test text input Two',
      placeholder: 'Test text input Two',
      hint: 'Enter some text',
      validationRules: [
        {
          type: 'required',
          errorMessage: 'This field is required.',
        },
        {
          type: 'pattern',
          value: /^[A-Z]/,
          errorMessage: 'Should start with uppercase',
        },
        {
          type: 'maxLength',
          value: 4,
          errorMessage: 'This field is too long.',
        },
        {
          type: 'minLength',
          value: 2,
          errorMessage: 'This field is too short.',
        },
      ],
    },
    {
      name: 'testTextarea',
      type: 'textarea',
      label: 'Test textarea',
      placeholder: 'Test textarea',
      rows: 6,
      hint: 'Enter some text',
      validationRules: [
        {
          type: 'required',
          errorMessage: 'This field is required.',
        },
      ],
    },
    {
      name: 'radio buttons group one',
      type: 'radio',
      label: 'Test Radiobutton One',
      value: 'Radio Button value One',
      hint: 'Choose one',
      fieldset: 'testFieldset',
      validationRules: [
        {
          type: 'required',
          errorMessage: 'This field is required.',
        },
      ],
    },
    {
      name: 'radio buttons group one',
      type: 'radio',
      label: 'Test Radiobutton Two',
      value: 'Radio Button value Two ',
      hint: 'Choose one',
      fieldset: 'testFieldset',
      validationRules: [
        {
          type: 'required',
          errorMessage: 'This field is required.',
        },
      ],
    },
    {
      name: 'Checkbox One',
      type: 'checkbox',
      label: 'Test Checkbox One',
      value: 'Checkbox value One',
      hint: 'Choose one',
      fieldset: 'testFieldset3',
      validationRules: [
        {
          type: 'required',
          errorMessage: 'This field is required.',
        },
      ],
    },
    {
      name: 'Checkbox Two',
      type: 'checkbox',
      label: 'Test Checkbox Two',
      value: 'Checkbox value Two',
      hint: 'Choose one',
      fieldset: 'testFieldset3',
      validationRules: [
        {
          type: 'required',
          errorMessage: 'This field is required.',
        },
      ],
    },
    {
      name: 'testSelect',
      type: 'select',
      label: 'Test Select',
      hint: 'Choose one',
      placeholder: 'select value',
      options: [
        { label: 'test 1', value: '0' },
        { label: 'test 2', value: '1' },
        { label: 'test 3', value: '2' },
      ],
      validationRules: [
        {
          type: 'required',
          errorMessage: 'This field is required.',
        },
      ],
    },
    {
      type: 'captcha',
      name: 'recaptcha',
    },
  ],
};

// eslint-disable-next-line no-console
const onSubmit = () => console.log('onSubmit');

storiesOf('Components/Generated Form', module)
  .add('with validation', () => (
    <GeneratedForm
      onSubmit={onSubmit}
      content={content}
      className="test"
      shouldValidate
      recaptchaAction="signUp"
    />
  ))
  .add('Recipe sign up with validation', () => (
    <GeneratedForm
      content={signUpFormContent as AppContent.GeneratedForm.Content}
      titleLevel={1}
      onSubmit={onSubmit}
      className="test-recipe-sign-up"
      shouldValidate={true}
      recaptchaAction="signUp"
    />
  ));
