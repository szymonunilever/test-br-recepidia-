export const required = (errorMessage: string) => (value: string) =>
  value ? false : errorMessage;

export const mustBeNumber = (errorMessage: string) => (value: number) =>
  isNaN(value) ? errorMessage : false;

export const minValue = (min: number, errorMessage: string) => (
  value: number
) => (isNaN(value) || value >= min ? false : errorMessage);

export const composeValidators = (...validators: any[]) => (value: string) =>
  validators.reduce((error, validator) => error || validator(value), false);

export const validEmail = (errorMessage: string) => (value: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return !re.test(String(value).toLowerCase()) ? errorMessage : undefined;
  return re.test(String(value).toLowerCase()) || !value ? false : errorMessage;
};
// export const validPhone = (errorMessage: string) => (value: string) => {
//   const re = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
//   return re.test(String(value).toLowerCase()) || !value ? false : errorMessage;
// };
