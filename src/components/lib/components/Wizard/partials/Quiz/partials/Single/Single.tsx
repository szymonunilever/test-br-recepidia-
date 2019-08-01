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

const Single: FunctionComponent<QuestionProps> = ({
  question,
  progress,
  selectedOptions,
  onChangeCallback,
}) => {
  const defaultValue = selectedOptions || '';
  const [val, setVal] = useState(defaultValue);
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value);
  }, []);

  useEffect(() => {
    val !== defaultValue && onChangeCallback(question.key, val);
  }, [val]);

  return (
    <Fragment>
      <QuestionLabel label={question.label} {...{ progress }} />
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
              <Option {...{ option, question }} />
            </label>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Single;
