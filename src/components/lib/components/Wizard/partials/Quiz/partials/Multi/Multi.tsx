import React, { Fragment, FunctionComponent, useState } from 'react';
import QuestionLabel from '../QuestionLabel';
import { QuestionProps } from '../Question/models';
import CheckMark from '../../../../../../../../svgs/inline/checkmark-bigger.svg';
import AdaptiveImage from '../../../../../AdaptiveImage';

const Multi: FunctionComponent<QuestionProps> = ({
  question,
  onChangeCallback,
}) => {
  const [val, setVal] = useState<string[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value;

    const updatedVal = val.includes(newValue)
      ? val.filter(v => v !== newValue)
      : val.concat([newValue]);

    setVal(updatedVal);
    onChangeCallback(question.key, updatedVal);
  };

  return (
    <Fragment>
      <QuestionLabel label={question.label} />
      <ul className="quiz__list quiz__multi">
        {question.options.map(option => (
          <li className="quiz__item" key={option.value}>
            <label className="quiz__item-label">
              <input
                type="checkbox"
                className="quiz__item-input"
                name={question.key}
                value={option.value}
                checked={val.includes(option.value)}
                onChange={onChange}
              />
              <div className="quiz__label-content">
                <div className="quiz__label-image-wrap">
                  <div className="quiz__label-checkmark">
                    <CheckMark />
                  </div>
                  <AdaptiveImage
                    className="quiz__label-image"
                    {...option.label.image}
                  />
                </div>
                <h3 className="quiz__label-title">{option.label.text}</h3>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Multi;
