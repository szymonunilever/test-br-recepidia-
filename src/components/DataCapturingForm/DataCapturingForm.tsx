import cx from 'classnames';
import React, { FunctionComponent } from 'react';
import { GeneratedForm, TagName, Text } from 'src/components/lib';
import { getUserProfileByKey } from '../../utils/browserStorage';
import theme from './DataCapturingForm.module.scss';
import { DataCapturingFormProps } from './models';
import { sendForm } from './helpers';

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
  const results = getUserProfileByKey(pathToData);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: any) => {
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
        content={formContent}
        shouldValidate
      />
    </>
  );
};

export default DataCapturingForm;
