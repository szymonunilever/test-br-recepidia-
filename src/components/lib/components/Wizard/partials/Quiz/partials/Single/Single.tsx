import React, { Fragment, FunctionComponent, useState } from 'react';
import QuestionLabel from '../QuestionLabel';
import { QuestionProps } from '../Question/models';
import CheckMark from '../../../../../../../../svgs/inline/checkmark-bigger.svg';

const Single: FunctionComponent<QuestionProps> = ({
  question,
  onChangeCallback,
}) => {
  const [val, setVal] = useState('');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value);
    onChangeCallback(question.key, event.target.value);
  };

  return (
    <Fragment>
      <QuestionLabel label={question.label} />
      <ul className="quiz__list quiz__single">
        {question.options.map(option => (
          <li className="quiz__item" key={option.value}>
            <label className="quiz__item-label">
              <input
                type="radio"
                name={question.key}
                value={option.value}
                checked={val === option.value}
                onChange={onChange}
                className="quiz__item-input"
              />
              <div className="quiz__label-content">
                <div className="quiz__label-image-wrap">
                  <div className="quiz__label-checkmark">
                    <CheckMark />
                    <h3 className="quiz__label-title">{option.label.text}</h3>
                  </div>
                  <div className="quiz__label-image" />
                </div>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Single;
