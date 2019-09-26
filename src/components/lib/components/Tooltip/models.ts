import { RCTooltip } from 'rc-tooltip';
export interface TooltipProps extends RCTooltip.Props {
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}
