import React, { FunctionComponent } from 'react';
import { Text, TagName } from 'src/components/lib/components/Text';
import { PreferencesIntroProps } from './models';
import { Link } from 'gatsby';
import { RichText } from '../../RichText';

const PreferencesIntro: FunctionComponent<PreferencesIntroProps> = ({
  heading = '',
  subheading = {
    text: ' ',
  },
  content,
  availableQuizLinks,
}) => (
  <div className="preferences__header">
    <div className="preferences__header-heading">
      <Text tag={TagName.h2} text={heading} />
    </div>
    <div className="preferences__header-content">
      <RichText content={subheading} className="rich-text" />
    </div>
    {availableQuizLinks && (
      <ul className="preferences__header-links">
        {availableQuizLinks.map(item => (
          <li key={item.label} className="preferences__header-links-item">
            <Link
              className="preferences__header-links-item-link"
              to={item.path}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default PreferencesIntro;
