import React, { useState, FunctionComponent, useCallback } from 'react';
import { TagName, Text } from '../../../../Text';
import { ResultCountProps } from './index';
//TODO: get icons from props or children.
/** Attention: now "src" is webpack alias for the folder "src/components/lib/stories" for storybook app.
 * It was done for compatibility with site app.
 * So for storybook "src" - it's  "src/components/lib/stories" and for gatsby site src it's "src" folder*/
import { ReactComponent as ArrowUp } from 'src/svgs/inline/arrow-up.svg';
import { ReactComponent as ArrowDown } from 'src/svgs/inline/arrow-down.svg';

const ResultCount: FunctionComponent<ResultCountProps> = ({
  count,
  labelProps,
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
            <ArrowDown />
            <Text tag={TagName.p} text={labelProps.showResultLabel} />
          </>
        ) : (
          <ArrowUp />
        )}
      </div>
      <div hidden={opened}>
        <Text tag={TagName.p} text={displayResultCount(count)} />
      </div>
    </div>
  );
};

export default ResultCount;
