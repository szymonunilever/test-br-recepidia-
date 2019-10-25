import cx from 'classnames';
import React, { FunctionComponent } from 'react';
import { GeneratedForm, TagName, Text } from 'src/components/lib';
import {
  getUserProfileByKey,
  saveUserProfileByKey,
} from '../../utils/browserStorage';
import theme from './DataCapturingForm.module.scss';
import { dataCapturingResultMapping } from './dataCapturingResultMapping';
import sendForm from '../../services/transactionalServiceAdapter';
import { DataCapturingFormProps, DataPrepopulateProps } from './models';
import { ProfileKey } from '../../utils/browserStorage/models';
import isEmpty from 'lodash/isEmpty';

const DataCapturingForm: FunctionComponent<DataCapturingFormProps> = ({
  className,
  content,
  titleLevel = 1,
  pathToData,
  formType,
  url,
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
    const surveyResponseList = dataCapturingResultMapping(results);
    const { firstName, lastName, email, reCaptchaToken, optIn } = values;
    const contact = {
      givenName: firstName,
      familyName: lastName,
      email,
      legalAgeConfirmation: true,
      languagePref: process.env['dataCapturing_contact_languagePref'],
      country: process.env['dataCapturing_contact_country'],
    };
    const commonProps = {
      hasTakenSkinTest:
        process.env['dataCapturing_commonProps_hasTakenSkinTest'],
      skinTestTakeOnDate:
        process.env['dataCapturing_commonProps_skinTestTakeOnDate'],
      dynamicConditionValidator:
        process.env['dataCapturing_commonProps_dynamicConditionValidator'],
      brand: process.env['dataCapturing_commonProps_brand'],
      locale: process.env['dataCapturing_commonProps_locale'],
      formType,
      entity: process.env['dataCapturing_commonProps_entity'],
      formUrl: url,
    };
    const dcuConfig = {
      campaignId: process.env['dataCapturing_dcuConfig_campaignId'],
      brandId: process.env['dataCapturing_dcuConfig_brandId'],
      emailBrandServiceId:
        process.env['dataCapturing_dcuConfig_emailBrandServiceId'],
    };

    const optInMerged = {
      corporate: optIn ? optIn.corporate : false,
      brand: optIn ? optIn.brand : false,
    };

    saveUserProfileByKey({ email, firstName, lastName }, ProfileKey.user);
    sendForm &&
      sendForm(
        commonProps,
        { contact, dcuConfig, surveyResponseList, optIn: optInMerged },
        reCaptchaToken
      )
        .then(() => {
          actionCallback && actionCallback({});
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
