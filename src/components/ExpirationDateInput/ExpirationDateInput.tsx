import {
  NumberFormatBase,
  PatternFormatProps,
  usePatternFormat,
} from 'react-number-format';
import { TextFieldProps } from 'mui-rff';

export default function ExpirationDateInput(
  props: PatternFormatProps<
    Omit<TextFieldProps, 'defaultValue' | 'type' | 'value'>
  >,
) {
  const { format, ...rest } = usePatternFormat({ ...props, format: '##/##' });

  const handleAddLeadingZero = (value: string) => {
    let month = value.substring(0, 2);
    const year = value.substring(2, 4);

    if (month.length === 1 && Number(month[0]) > 1) {
      month = `0${month[0]}`;
    }

    const formattedValue = (value: string): string => format?.(value) || value;

    return formattedValue(`${month}${year}`);
  };

  return (
    <NumberFormatBase
      format={handleAddLeadingZero}
      {...rest}
    />
  );
}
