import React from 'react';
import { ChartBar, ChartLine, ChartArea, ChartScatter } from '@patternfly/react-charts/victory';
import {
  ChartData,
  ChartDataSerie,
  ChartInterface,
  ChartSimple,
  ChartTooltipComponentFunctionNames,
  ChartType
} from '../types';
import { snakeToSentence } from '../Common/helpers';
import { ChartLabelFormatFunctionNames } from '../Functions';

const components: Partial<Record<ChartType, React.ElementType>> = {
  [ChartType.bar]: ChartBar,
  [ChartType.line]: ChartLine,
  [ChartType.area]: ChartArea,
  [ChartType.scatter]: ChartScatter
};

/**
 * Calculate data points. The interactive label can hide chart components,
 * if it is hidden we want to display null element so the color is staying
 * the same for the other charts.
 */
const getData = (
  data: ChartDataSerie,
  y = 'y',
  props: {
    labelName: string;
    ignored?: string;
  }
): Record<string, string | number>[] =>
  data.hidden
    ? [{ [y]: null }]
    : data.serie.map((el) => ({
        ...el,
        y: el[y],
        ...props
      }));

const createChart = (
  id: number,
  data: ChartInterface,
  chartData: ChartData
): React.ReactElement => {
  const { schema: charts, functions } = data;
  const chart = charts.find(({ id: i }) => i === id) as ChartSimple;
  const SelectedChart = components[chart.type];

  const TooltipComponent =
    functions.tooltipComponent[chart.tooltip?.type ?? ChartTooltipComponentFunctionNames.default];

  const labelFnc = chart.tooltip?.standalone
    ? functions.labelFormat[chart.tooltip?.labelFormat ?? ChartLabelFormatFunctionNames.default]
    : null;

  const DataComponentElement = chart.dataComponent
    ? functions.dataComponent[chart.dataComponent]
    : null;

  const props = {
    ...chart.props,
    labels: labelFnc,
    labelComponent: <TooltipComponent {...chart.tooltip?.props} dy={0} />,
    ...(chart.onClick && {
      events: [
        {
          target: 'data',
          eventHandlers: {
            onClick: functions.onClick[chart.onClick]
          }
        }
      ]
    }),
    ...(chart.dataComponent && {
      dataComponent: <DataComponentElement />
    })
  };

  const getLabelName = () =>
    chart.tooltip ? chart.tooltip.labelName ?? snakeToSentence(chart.props.y as string) : '';

  return (
    <SelectedChart
      {...props}
      key={chartData.series[0].name}
      data={getData(chartData.series[0], props.y as string, {
        labelName: getLabelName(),
        ...(!chart.tooltip && { ignored: 'true' })
      })}
      name={chart.name || chartData.series[0].name}
    />
  );
};

export default createChart;
