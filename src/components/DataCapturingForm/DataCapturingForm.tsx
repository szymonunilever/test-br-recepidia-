import cx from 'classnames';
import React, { FunctionComponent } from 'react';
import { GeneratedForm, TagName, Text } from 'src/components/lib';
import {
  getUserProfileByKey,
  saveUserProfileByKey,
} from '../../utils/browserStorage';
import theme from './DataCapturingForm.module.scss';
import { DataCapturingFormProps, DataPrepopulateProps } from './models';
import { sendForm } from './helpers';
import { ProfileKey } from '../../utils/browserStorage/models';
import isEmpty from 'lodash/isEmpty';

const DataCapturingForm: FunctionComponent<DataCapturingFormProps> = ({
  className,
  content,
  titleLevel = 1,
  url,
  host,
  pathToData,
  actionCallback,
  titleRenderer,
}) => {
  const { title, subtitle, ...formContent } = content;
  let formContentModified = formContent;
  const dataPrePopulated = getUserProfileByKey(
    ProfileKey.user
  ) as DataPrepopulateProps;
  if (!isEmpty(dataPrePopulated)) {
    const emailField = formContentModified.fields.find(
      ({ name }) => name === 'email'
    );
    const firstNameField = formContentModified.fields.find(
      ({ name }) => name === 'firstName'
    );
    const lastNameField = formContentModified.fields.find(
      ({ name }) => name === 'lastName'
    );
    emailField && (emailField.value = dataPrePopulated.email);
    firstNameField && (firstNameField.value = dataPrePopulated.firstName);
    lastNameField && (lastNameField.value = dataPrePopulated.lastName);
  }
  const results = getUserProfileByKey(pathToData);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: any) => {
    const { email, firstName, lastName } = values;
    saveUserProfileByKey({ email, firstName, lastName }, ProfileKey.user);
    const data = { results, formData: values };
    sendForm(url, host, data)
      .then(() => {
        actionCallback && actionCallback(data);
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
  };
  // @ts-ignore
  const titleTag = TagName[`h${titleLevel}`];
  // @ts-ignore
  const subtitleTag = TagName[`h${titleLevel + 1}`];
  const titles = (
    <>
      {title && <Text tag={titleTag} text={title} />}
      {subtitle && <Text tag={subtitleTag} text={subtitle} />}
    </>
  );

  return (
    <>
      {titleRenderer ? titleRenderer(titles) : titles}
      <GeneratedForm
        className={cx(theme.dataCapturing, className)}
        onSubmit={onSubmit}
        content={formContentModified}
        shouldValidate
      />
    </>
  );
};

export default DataCapturingForm;
