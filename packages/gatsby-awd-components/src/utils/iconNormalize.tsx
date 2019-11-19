import React, { ReactNode } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Icon } from '../models';
export function iconNormalize(Icon: Icon, className?: string): ReactNode {
  return Icon && typeof Icon === 'function' ? (
    <Icon {...{ className }} />
  ) : (
    Icon
  );
}
