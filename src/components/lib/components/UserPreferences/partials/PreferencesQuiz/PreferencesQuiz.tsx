import React, { Fragment, FunctionComponent } from 'react';
import PreferenceEntry from './partials/PreferenceEntry';
import {
  PreferenceQuizProps,
  LastInteraction,
  PreferenceInteractionType,
} from './index';
import { Text, TagName } from 'src/components/lib/components/Text';
import sortByOrderIndex from 'src/components/lib/utils/sortByOrderIndex';
import PreferenceUpdateInfo from './partials/PreferenceUpdateInfo';
import { PreferenceUpdateResultType } from './partials/index';
import {
  Question,
  QuestionFilterPropNameKeys,
} from '../../../Wizard/partials/Quiz/models';
import PreferenceUpdateBlock from './partials/PreferenceUpdateBlock';
import { RecipeAttributesKeys } from '../../../RecipeAttributes/models';

// According to the requirements: "successful update message near the updated Q&A is displayed for 3 sec"
const successSaveMessageShowTime = 3000;

const PreferencesQuiz: FunctionComponent<PreferenceQuizProps> = ({
  questions,
  answers,
  heading,
  editingKey,
  setEditingKey,
  deleteQuestion,
  saveQuestion,
  lastInteraction,
  setLastInteraction,
  noResultContent,
  updatePropsContent,
  buttonsContent,
  quizKey,
}) => {
  const deleteThisEntry = (key: string) => {
    deleteQuestion(quizKey, key);
    // @ts-ignore
    answers[key] = {};
    setLastInteraction({
      key: key,
      resultType: PreferenceUpdateResultType.Success,
      message: updatePropsContent.deleteProps.success,
      interactionType: PreferenceInteractionType.Delete,
    });
  };

  const saveThisEntry = (
    key: string,
    selectedOptions: {
      value: string | object | null;
      filterPropName: RecipeAttributesKeys | QuestionFilterPropNameKeys;
    }
  ) => {
    // @ts-ignore
    answers[key] = selectedOptions;
    saveQuestion(quizKey, key, selectedOptions);
    const mockResultFromSaveFunction: LastInteraction = {
      key: key,
      resultType: PreferenceUpdateResultType.Success,
      message: updatePropsContent.saveProps.success,
      interactionType: PreferenceInteractionType.Save,
    };
    setLastInteraction(mockResultFromSaveFunction);
    if (
      mockResultFromSaveFunction.resultType ===
      PreferenceUpdateResultType.Success
    ) {
      setTimeout(() => {
        setLastInteraction({});
      }, successSaveMessageShowTime);
    }
  };

  const shouldRenderSuccessfullDelete = (item: Question) => {
    return (
      lastInteraction &&
      lastInteraction.key === item.key &&
      lastInteraction.interactionType === PreferenceInteractionType.Delete &&
      lastInteraction.resultType === PreferenceUpdateResultType.Success
    );
  };

  return (
    <form>
      {(questions || {}).length > 0 && (
        <div className="preferences__title">
          <Text tag={TagName.h3} text={heading} />
        </div>
      )}
      <div className="preferences__content">
        {questions && questions.length ? (
          questions.sort(sortByOrderIndex).map(item => {
            return shouldRenderSuccessfullDelete(item) ? (
              <PreferenceUpdateInfo
                key={item.orderIndex}
                show={true}
                resultType={lastInteraction.resultType}
                message={lastInteraction.message}
              />
            ) : (
              <Fragment key={item.key}>
                <PreferenceEntry
                  key={item.orderIndex}
                  preferenceEntry={item}
                  selectedOptions={answers[item.key]}
                  editingKey={editingKey}
                  setEditEntryKey={setEditingKey}
                  deleteEntry={deleteThisEntry}
                  saveEntry={saveThisEntry}
                  buttonsContent={buttonsContent}
                />
                <PreferenceUpdateBlock
                  key={item.key}
                  lastInteraction={lastInteraction}
                  questionKey={item.key}
                />
              </Fragment>
            );
          })
        ) : (
          <PreferenceUpdateInfo
            show={true}
            resultType={PreferenceUpdateResultType.Warning}
            {...noResultContent}
          />
        )}
      </div>
    </form>
  );
};

export default PreferencesQuiz;
