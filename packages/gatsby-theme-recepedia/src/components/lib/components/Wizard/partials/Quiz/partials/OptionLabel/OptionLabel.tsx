import React, { FunctionComponent } from 'react';
import { OptionLabelProps } from './models';

const OptionLabel: FunctionComponent<OptionLabelProps> = ({ label }) => (
  <div className="quiz__label-title">{label}</div>
);

export default OptionLabel;
