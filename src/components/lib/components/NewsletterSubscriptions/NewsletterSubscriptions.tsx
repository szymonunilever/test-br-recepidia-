import React, { FunctionComponent } from 'react';
import GeneratedForm from 'src/components/lib/components/GeneratedForm';
import { NewsletterSubscriptionProps } from './index';

const NewsletterSubscriptions: FunctionComponent<
  NewsletterSubscriptionProps
> = ({ onSubmit, content }) => (
  <div className="preferences__newsletter">
    <GeneratedForm onSubmit={onSubmit} content={content} />
  </div>
);

export default NewsletterSubscriptions;
