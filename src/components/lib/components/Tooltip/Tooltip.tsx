import React from 'react';
import RCTooltip from 'rc-tooltip';
import { TooltipProps } from './models';
import theme from './Tooltip.module.scss';
import cx from 'classnames';

const Tooltip = (props: TooltipProps) => (
  <RCTooltip overlayClassName={cx(props.className, theme.tooltip)} {...props} />
);
export default Tooltip;
