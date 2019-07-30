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

const Multi: FunctionComponent<QuestionProps> = ({
  question,
  progress,
  onChangeCallback,
}) => {
  const defaultValue = question.selectedOptions || [];
  const [val, setVal] = useState<string[]>(defaultValue);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value;

    const updatedVal = val.includes(newValue)
      ? val.filter(v => v !== newValue)
      : val.concat([newValue]);

    setVal(updatedVal);
  }, []);

  useEffect(() => {
    val !== defaultValue && onChangeCallback(question.key, val);
  }, [val]);

  return (
    <Fragment>
      <QuestionLabel label={question.label} {...{ progress }} />
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
              <Option {...{ option, question }} />
            </label>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Multi;
