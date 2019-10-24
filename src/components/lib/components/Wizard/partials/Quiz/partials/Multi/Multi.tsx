import React, {
  Fragment,
  FunctionComponent,
  useState,
  useCallback,
  useEffect,
} from 'react';
import QuestionLabel from '../QuestionLabel';
import { QuestionProps } from '../Question/models';
import Option from '../Option';

// @ts-ignore
const getSelectedOptions = selectedOptions => {
  return (
    (selectedOptions &&
      (Array.isArray(selectedOptions) ? selectedOptions : [selectedOptions])) ||
    []
  );
};

const Multi: FunctionComponent<QuestionProps> = ({
  question,
  progress,
  selectedOptions,
  onChangeCallback,
}) => {
  const defaultValue = getSelectedOptions(selectedOptions);
  const [val, setVal] = useState<string[]>(defaultValue);

  useEffect(() => {
    setVal(getSelectedOptions(selectedOptions));
  }, [selectedOptions]);
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue: string = event.target.value;

      const updatedVal = val.includes(newValue)
        ? val.filter(v => v !== newValue)
        : val.concat([newValue]);

      setVal(updatedVal);
      onChangeCallback(question.key, updatedVal);
    },
    [val]
  );

  return (
    <Fragment>
      <QuestionLabel label={question.label} {...{ progress }} />
      <ul className="quiz__list quiz__multi">
        {question.options.map((option, index) => (
          <li className="quiz__item" key={option.value + index}>
            <label
              tabIndex={0}
              aria-label={option.label.text}
              className="quiz__item-label"
            >
              <input
                type="checkbox"
                className="quiz__item-input"
                name={question.key}
                value={option.value}
                aria-label={option.label.text + ' checkbox'}
                checked={val.includes(option.value)}
                onChange={onChange}
              />
              <Option {...{ option, question }} />
            </label>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Multi;
