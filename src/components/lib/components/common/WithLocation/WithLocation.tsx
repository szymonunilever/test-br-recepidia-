import React from 'react';
import { Location } from '@reach/router';
import queryString from 'query-string';
import { WithLocationProps } from './models';

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
          search={location.search ? queryString.parse(location.search) : {}}
        />
      )}
    </Location>
  );

  return Composition;
};

export default withLocation;
