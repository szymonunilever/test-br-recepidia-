import React from 'react';
import RCTooltip from 'rc-tooltip';
import { TooltipProps } from './models';
import theme from './Tooltip.module.scss';
import cx from 'classnames';

const Tooltip = ({ ...props }: TooltipProps) => {
  const onAligned = () => {
    props.children.ref.current.classList.toggle('active');
  };
  return (
    <RCTooltip
      onVisibleChange={onAligned}
      overlayClassName={cx(props.className, theme.tooltip)}
      {...props}
    />
  );
};
export default Tooltip;
