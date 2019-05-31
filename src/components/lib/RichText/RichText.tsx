import React from 'react';
import { RichTextProps } from './models';

const RichText = ({ html, className = '' }: RichTextProps) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
);

export default RichText;
