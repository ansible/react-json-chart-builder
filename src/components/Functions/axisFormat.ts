import { ChartAxisFormatFunction } from './types';

export enum ChartAxisFormatFunctionNames {
  default = 'default',
  formatDateAsDays = 'formatDateAsDays',
  formatDateAsDayMonth = 'formatDateAsDayMonth',
  formatNumberAsK = 'formatNumberAsK'
}

const returnSame = (i: string | number): string => i.toString();

const formatDateAsDays = (i: string): string => i && i.split('-')[2];

const formatDateAsDayMonth = (i: string): string => {
  if (!i) return '';
  const parts = i.split('-');
  return `${parts[1]}/${parts[2]}`;
};

const formatNumberAsK = (n: string | number = 0): string => {
  const digits = 3;
  if (`${n}`.length <= digits) {
    return `${n}`;
  }

  let divisor = 1;
  let suffix = '';
  if (Math.abs(+n) >= 1000000) {
    divisor = 1000000;
    suffix = 'M';
  } else if (Math.abs(+n) >= 1000) {
    divisor = 1000;
    suffix = 'k';
  }

  const output = +n / divisor;
  const remainLen = digits - `${output.toFixed(0)}`.length + (output > 0 ? 0 : 1);
  return output % 1 === 0
    ? `${output}${suffix}`
    : `${output.toFixed(remainLen > 0 ? remainLen : 0)}${suffix}`;
};

const axisFormat: Record<string, ChartAxisFormatFunction> = {
  [ChartAxisFormatFunctionNames.default]: returnSame,
  [ChartAxisFormatFunctionNames.formatDateAsDays]: formatDateAsDays,
  [ChartAxisFormatFunctionNames.formatDateAsDayMonth]: formatDateAsDayMonth,
  [ChartAxisFormatFunctionNames.formatNumberAsK]: formatNumberAsK
};

export default axisFormat;
