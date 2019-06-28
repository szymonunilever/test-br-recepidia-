import React from 'react';
import keys from '../keys.json';
import Helmet from 'react-helmet';

export const AddThis = () => {
  const widgetSrc = `${keys.addThis.url}#pubid=${keys.addThis.key}`;
  return (
    <Helmet>
      <script type="text/javascript" src={widgetSrc} />
    </Helmet>
  );
};

export default AddThis;
