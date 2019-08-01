import React, {
  useState,
  useEffect,
  useCallback,
  FunctionComponent,
  Fragment,
} from 'react';
import { PreferenceEntryProps } from './models';
import Button from 'src/components/lib/components/Button';
import Question from 'src/components/lib/components/Wizard/partials/Quiz/partials/Question';
import QuestionLabel from 'src/components/lib/components/Wizard/partials/Quiz/partials/QuestionLabel';

const PreferenceEntry: FunctionComponent<PreferenceEntryProps> = ({
  preferenceEntry,
  selectedOptions,
  editingKey,
  setEditEntryKey,
  deleteEntry,
  saveEntry,
  buttonsContent,
}) => {
  const [val, setVal] = useState();

  let editingThis = editingKey === preferenceEntry.key;

  useEffect(() => {
    // if another entry is chosen -> reset input data
    setVal(selectedOptions);
  }, [editingKey]);

  const cancelEditing = useCallback(() => {
    setVal(selectedOptions);
    setEditEntryKey('');
  }, [preferenceEntry]);

  const triggerEdit = useCallback(() => {
    setEditEntryKey(preferenceEntry.key);
  }, [preferenceEntry]);

  const saveChanges = useCallback(() => {
    cancelEditing();
    saveEntry(preferenceEntry.key, val);
  }, [preferenceEntry, val]);

  const deleteThisPreference = useCallback(() => {
    deleteEntry(preferenceEntry.key);
    cancelEditing();
  }, [preferenceEntry, cancelEditing]);

  const updateAnswers = (key: string, value: string | object | null) => {
    setVal(value);
  };

  return (
    <div className="preferences__content-item">
      {editingThis ? (
        <Question
          question={preferenceEntry}
          selectedOptions={selectedOptions}
          onChangeCallback={updateAnswers}
        />
      ) : (
        <Fragment>
          <QuestionLabel label={preferenceEntry.label} />
          {selectedOptions && (
            <div className="preferences__item-answers">
              {preferenceEntry.options
                .filter(option => selectedOptions.includes(option.value))
                .map(option => (
                  <span
                    className="preferences__item-answer"
                    key={option.label.text}
                  >
                    {option.label.text}
                  </span>
                ))}
            </div>
          )}
        </Fragment>
      )}
      <div className="preferences__content-edit-controls" hidden={!editingThis}>
        <Button content={buttonsContent.cancelButton} onClick={cancelEditing} />
        <Button content={buttonsContent.saveButton} onClick={saveChanges} />
      </div>
      <div className="preferences__content-controls" hidden={editingThis}>
        <Button content={buttonsContent.editButton} onClick={triggerEdit} />
        <Button
          content={buttonsContent.deleteButton}
          onClick={deleteThisPreference}
        />
      </div>
    </div>
  );
};

export default PreferenceEntry;
