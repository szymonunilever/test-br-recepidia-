import React from 'react';
import { RichTextProps } from './models';

const RichText = ({ html, className = '' }: RichTextProps) => (
  <div
    data-componentname="richText"
    className={className}
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

export default RichText;
