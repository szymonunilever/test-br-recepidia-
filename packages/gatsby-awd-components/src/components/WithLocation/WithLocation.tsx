import React from 'react';
import { Location } from '@reach/router';
import { WithLocationProps } from './models';
import isBrowser from '../../utils/isBrowser';

const withLocation = <T extends WithLocationProps>(
  Component: React.ComponentType<T>
) => (props: T): React.ReactElement<T> => {
  const Composition = (
    <Location>
      {({ location, navigate }): React.ReactElement<T> => (
        <Component
          {...props}
          location={location}
          navigate={navigate}
          searchQuery={
            isBrowser()
              ? new URLSearchParams(location.search).get('searchQuery') || ''
              : ''
          }
        />
      )}
    </Location>
  );

  return Composition;
};

export default withLocation;
