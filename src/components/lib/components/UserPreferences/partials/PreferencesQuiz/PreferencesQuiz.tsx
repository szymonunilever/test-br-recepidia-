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
import { Question } from '../../../Wizard/partials/Quiz/models';
import PreferenceUpdateBlock from './partials/PreferenceUpdateBlock';

// According to the requirements: "successful update message near the updated Q&A is displayed for 3 sec"
const successSaveMessageShowTime = 3000;

const PreferencesQuiz: FunctionComponent<PreferenceQuizProps> = ({
  questions,
  heading,
  editingKey,
  setEditingKey,
  deleteQuestion,
  saveQuestion,
  lastInteraction,
  setLastInteraction,
  noResultProps,
  entryUpdateProps,
  buttonsContent,
}) => {
  const deleteThisEntry = (key: string) => {
    // eslint-disable-next-line no-console
    console.log('Deleted preference entry with key', key);
    // @todo place actual delete logic (remove from storage) here
    deleteQuestion(key);
    const rand = Math.floor(Math.random() * (10 - 1)) + 1;
    setLastInteraction({
      key: key,
      // simulating response
      // @todo actually should depend on result of saving - remove later
      resultType:
        rand % 2 === 0
          ? PreferenceUpdateResultType.Success
          : PreferenceUpdateResultType.Error,
      message:
        rand % 2 === 0
          ? entryUpdateProps.deleteProps.success
          : entryUpdateProps.deleteProps.error,
      interactionType: PreferenceInteractionType.Delete,
    });
  };

  const saveThisEntry = (
    key: string,
    selectedOptions: string | object | null
  ) => {
    // eslint-disable-next-line no-console
    console.log('Saved new entry', [key, selectedOptions]);
    // simulating response
    // @todo place actual save logic (write to storage) here.
    saveQuestion(key, selectedOptions);
    const rand = Math.floor(Math.random() * (10 - 1)) + 1;
    const mockResultFromSaveFunction: LastInteraction = {
      key: key,
      // @todo actually should depend on result of saving - remove later
      resultType:
        rand % 2 === 0
          ? PreferenceUpdateResultType.Success
          : PreferenceUpdateResultType.Error,
      message:
        rand % 2 === 0
          ? entryUpdateProps.saveProps.success
          : entryUpdateProps.saveProps.error,
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
      <div className="preferences__title">
        <Text tag={TagName.h1} text={heading} />
      </div>
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
            {...noResultProps}
          />
        )}
      </div>
    </form>
  );
};

export default PreferencesQuiz;
