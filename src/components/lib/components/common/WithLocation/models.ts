import { Location, NavigateFn } from '@reach/router';
import { ParsedQuery } from 'query-string';

export interface WithLocationProps {
  location?: Location;
  navigate?: NavigateFn;
  search?: ParsedQuery<string> | object;
}
