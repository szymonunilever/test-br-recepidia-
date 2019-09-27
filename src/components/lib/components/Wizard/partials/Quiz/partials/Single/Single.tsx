import React, {
  Fragment,
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
} from 'react';
import QuestionLabel from '../QuestionLabel';
import { QuestionProps } from '../Question/models';
import Option from '../Option';

// @ts-ignore
const getSelectedOptions = selectedOptions => {
  return selectedOptions && Array.isArray(selectedOptions)
    ? null
    : selectedOptions;
};

const Single: FunctionComponent<QuestionProps> = ({
  question,
  progress,
  selectedOptions,
  onChangeCallback,
}) => {
  const defaultValue = getSelectedOptions(selectedOptions);
  const [val, setVal] = useState(defaultValue);
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value);
    onChangeCallback(question.key, event.target.value);
  }, []);
  useEffect(() => {
    setVal(getSelectedOptions(selectedOptions));
  }, [selectedOptions]);

  return (
    <Fragment>
      <QuestionLabel label={question.label} {...{ progress }} />
      <ul className="quiz__list quiz__single">
        {question.options.map((option, index) => (
          <li className="quiz__item" key={option.value + index}>
            <label
              tabIndex={0}
              aria-label={option.label.text}
              className="quiz__item-label"
            >
              <input
                type="radio"
                name={question.key}
                value={option.value}
                checked={val === option.value}
                onChange={onChange}
                className="quiz__item-input"
                aria-label={option.label.text + ' radio'}
              />
              <Option {...{ option, question }} />
            </label>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Single;
