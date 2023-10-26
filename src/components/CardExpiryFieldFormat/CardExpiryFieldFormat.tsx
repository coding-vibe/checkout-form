import {
  InputAttributes,
  NumberFormatBase,
  PatternFormatProps,
  usePatternFormat,
} from 'react-number-format';
import { TextFieldProps } from 'mui-rff';

export default function CardExpiry(
  props: Omit<TextFieldProps, 'defaultValue' | 'type' | 'value'>,
) {
  const { format, ...rest } = usePatternFormat({ ...props, format: '##/##' });

  const handleAddLeadingZero = (formattedValue: string) => {
    if (parsedDate.month.length === 1 && Number(parsedDate.month[0]) > 1) {
      parsedDate.month = `0${parsedDate.month[0]}`;
    }

    return format?.(`${parsedDate.month}${parsedDate.year}`);
  };

  return (
    <NumberFormatBase
      format={handleAddLeadingZero}
      {...rest}
    />
  );
}
