import React from 'react';
import keys from '../keys.json';
import Helmet from 'react-helmet';

export const AddThis = ({ callback }: { callback: (e: Event) => void }) => {
  const widgetSrc = `${keys.addThis.url}#pubid=${keys.addThis.key}`;

  // @ts-ignore
  const handleScriptInject = ({ scriptTags }) => {
    if (scriptTags) {
      const scriptTag = scriptTags[0];
      scriptTag.onload = callback;
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeClientState = (newState: any, addedTags: any) =>
    handleScriptInject(addedTags);

  return (
    <Helmet
      // @ts-ignore
      onChangeClientState={handleChangeClientState}
      script={[
        {
          type: 'text/javascript',
          src: widgetSrc,
          async: true,
        },
      ]}
    />
  );
};

export default AddThis;
