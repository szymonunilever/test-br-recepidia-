import React, {
  ReactChild,
  useState,
  useEffect,
  FunctionComponent,
} from 'react';
import { UserPreferencesProps } from './models';
import PreferencesIntro from './partials/PreferencesIntro';
import NewsletterSubscriptions from '../NewsletterSubscriptions/NewsletterSubscriptions';
import ResultCount from './partials/PreferencesQuiz/partials/ResultCount';
import { LastInteraction } from './partials/PreferencesQuiz/index';

const UserPreferences: FunctionComponent<UserPreferencesProps> = ({
  children,
  deleteQuestion,
  saveQuestion,
  onNewsletterFormSubmit,
  content: {
    preferencesIntroContent,
    noResultContent,
    updatePropsContent,
    buttonsContent,
    resultLabelContent,
    newsletterSubscriptionsContent,
  },
}) => {
  const [editingKey, setEditingKey] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [lastInteraction, setLastInteraction] = useState<LastInteraction>();
  let enhancedChildren: ReactChild[] = [];

  React.Children.forEach(children, child => {
    if (React.isValidElement(child)) {
      const newProps = {
        editingKey,
        setEditingKey,
        deleteQuestion,
        saveQuestion,
        lastInteraction,
        setLastInteraction,
        noResultContent,
        updatePropsContent,
        buttonsContent,
        key: Math.random(),
      };
      enhancedChildren.push(React.cloneElement(child, newProps));
    }
  });

  useEffect(() => {
    let answersCount = 0;
    React.Children.forEach(children, child => {
      if (React.isValidElement(child)) {
        // @ts-ignore
        answersCount += child.props.questions.length;
      }
    });
    setTotalCount(answersCount);
  }, [children]);

  return (
    <div className="preferences">
      <PreferencesIntro {...preferencesIntroContent} />
      {totalCount === 0 && (
        <ResultCount count={totalCount} labelProps={resultLabelContent} />
      )}
      <div className="preferences__form">{enhancedChildren}</div>
      <NewsletterSubscriptions
        onSubmit={onNewsletterFormSubmit}
        content={newsletterSubscriptionsContent}
      />
    </div>
  );
};

export default UserPreferences;
