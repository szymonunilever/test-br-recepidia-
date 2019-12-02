import React from 'react';
import { required, mustBeNumber, minValue, validEmail } from '../index';

describe('Form utils', () => {
  const values: any = {
    empty: '',
    emptyValue: {},
    value: {
      test: 1,
    },
    string: 'Hello',
    email: 'email@test.com',
    number: 2,
    min1: 1,
    min2: 3,
  };

  it('required should return error', () => {
    const { error, empty, emptyValue } = values;

    expect(required(error)(empty)).toBe(error);
    expect(required(error)(emptyValue)).toBe(error);
  });

  it('required should return false', () => {
    const { error, string, value } = values;

    expect(required(error)(string)).toBe(false);
    expect(required(error)(value)).toBe(false);
  });

  it('mustBeNumber should return error', () => {
    const { error, string } = values;

    expect(mustBeNumber(error)(string)).toBe(error);
  });

  it('mustBeNumber should return false', () => {
    const { error, number } = values;

    expect(mustBeNumber(error)(number)).toBe(false);
  });

  it('minValue should return error', () => {
    const { error, number, min2 } = values;

    expect(minValue(min2, error)(number)).toBe(error);
  });

  it('minValue should return false', () => {
    const { error, number, min1 } = values;

    expect(minValue(min1, error)(number)).toBe(false);
  });

  it('validEmail should return error', () => {
    const { error, string } = values;

    expect(validEmail(error)(string)).toBe(error);
  });

  it('validEmail should return false', () => {
    const { error, email } = values;

    expect(validEmail(error)(email)).toBe(false);
  });

  it('composeValidators should return error', () => {
    const { error, string } = values;

    expect(mustBeNumber(error)(string)).toBe(error);
  });
});
