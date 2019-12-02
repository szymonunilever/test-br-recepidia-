import React, { useState, FunctionComponent, useCallback } from 'react';
import { TagName, Text } from '../../../../Text';
import { ResultCountProps } from './index';
import { iconNormalize } from '../../../../../utils';

const ResultCount: FunctionComponent<ResultCountProps> = ({
  count,
  labelProps,
  icons,
}) => {
  const [opened, setOpened] = useState(false);
  const displayResultCount = useCallback(
    quantity => {
      const message =
        quantity === 1
          ? labelProps.savedResultsTemplateSingle
          : labelProps.savedResultsTemplatePlural;
      return message.replace('{quantity}', quantity);
    },
    [labelProps]
  );
  const toggleOpened = () => {
    setOpened(!opened);
  };
  return (
    <div className="preferences__result-count">
      <div hidden={count === 0} onClick={toggleOpened}>
        {opened ? (
          <>
            {iconNormalize(icons.arrowDown)}
            <Text tag={TagName.p} text={labelProps.showResultLabel} />
          </>
        ) : (
          iconNormalize(icons.arrowUp)
        )}
      </div>
      <div hidden={opened}>
        <Text tag={TagName.p} text={displayResultCount(count)} />
      </div>
    </div>
  );
};

export default ResultCount;
