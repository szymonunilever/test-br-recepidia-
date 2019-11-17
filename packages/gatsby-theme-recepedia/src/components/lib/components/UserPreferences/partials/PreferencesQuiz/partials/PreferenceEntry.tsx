import React, {
  useState,
  useEffect,
  useCallback,
  FunctionComponent,
} from 'react';
import { PreferenceEntryProps, PreferenceUpdateResultType } from './models';
import Button from '../../../../Button';
import Question from '../../../../Wizard/partials/Quiz/partials/Question';
import QuestionLabel from '../../../../Wizard/partials/Quiz/partials/QuestionLabel';
//TODO: get icons from props or children.
/** Attention: now "src" is webpack alias for the folder "src/components/lib/stories" for storybook app.
 * It was done for compatibility with site app.
 * So for storybook "src" - it's  "src/components/lib/stories" and for gatsby site src it's "src" folder*/
import { ReactComponent as IconEdit } from 'src/svgs/inline/edit.svg';
import { ReactComponent as IconDelete } from 'src/svgs/inline/delete.svg';
import { PreferenceInteractionType } from '../index';

const PreferenceEntry: FunctionComponent<PreferenceEntryProps> = ({
  preferenceEntry,
  selectedOptions,
  editingKey,
  setEditEntryKey,
  deleteEntry,
  saveEntry,
  buttonsContent,
  setLastInteraction,
}) => {
  const [val, setVal] = useState();

  let editingThis = editingKey === preferenceEntry.key;

  useEffect(() => {
    // if another entry is chosen -> reset input data
    setVal(selectedOptions && selectedOptions.value);
  }, [editingKey]);

  const cancelEditing = useCallback(() => {
    setVal(selectedOptions && selectedOptions.value);
    setEditEntryKey('');
  }, [preferenceEntry]);

  const triggerEdit = useCallback(() => {
    setEditEntryKey(preferenceEntry.key);
    setLastInteraction({
      key: preferenceEntry.key,
      resultType: PreferenceUpdateResultType.Success,
      message: `editing ${preferenceEntry.key}`,
      interactionType: PreferenceInteractionType.Edit,
    });
  }, [preferenceEntry]);

  const saveChanges = useCallback(() => {
    cancelEditing();
    saveEntry(preferenceEntry.key, {
      value: val,
      filterPropName: preferenceEntry.filterPropName,
    });
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
          selectedOptions={selectedOptions && selectedOptions.value}
          onChangeCallback={updateAnswers}
        />
      ) : (
        <div className="preferences__content-item-info">
          <QuestionLabel label={preferenceEntry.label} />
          {selectedOptions && selectedOptions.value && (
            <div className="preferences__item-answers">
              {preferenceEntry.options
                .filter(option => selectedOptions.value.includes(option.value))
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
        </div>
      )}
      <div className="preferences__content-edit-controls" hidden={!editingThis}>
        <Button
          className="preferences__content-controls-cancel"
          content={buttonsContent.cancelButton}
          onClick={cancelEditing}
        />
        <Button
          className="preferences__content-controls-save"
          content={buttonsContent.saveButton}
          onClick={saveChanges}
        />
      </div>
      <div className="preferences__content-controls" hidden={editingThis}>
        <Button
          className="preferences__content-controls-delete"
          Icon={IconDelete}
          onClick={deleteThisPreference}
        />
        <Button
          className="preferences__content-controls-edit"
          Icon={IconEdit}
          onClick={triggerEdit}
        />
      </div>
    </div>
  );
};

export default PreferenceEntry;
