import { Location, NavigateFn } from '@reach/router';

export interface WithLocationProps {
  location?: Location;
  navigate?: NavigateFn;
  searchQuery?: string;
}
