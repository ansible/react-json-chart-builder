import { ChartTooltip } from '@patternfly/react-charts/victory';
import { ChartTooltipComponentFunction } from './types';

export enum ChartTooltipComponentFunctionNames {
  default = 'default'
}

const tooltip: Record<string, ChartTooltipComponentFunction> = {
  [ChartTooltipComponentFunctionNames.default]: ChartTooltip
};

export default tooltip;
