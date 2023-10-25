import { useField } from 'react-final-form';
import {
  InputAttributes,
  NumberFormatBase,
  NumberFormatValues,
  PatternFormatProps,
  usePatternFormat,
} from 'react-number-format';
import { TextField, TextFieldProps } from 'mui-rff';

function CardExpiry(props: PatternFormatProps<InputAttributes>) {
  const { format, ...rest } = usePatternFormat({ ...props, format: '##/##' });

  const expiredDateFormat = (val: string) => {
    let month = val.substring(0, 2);
    let year = val.substring(2, 4);

    if (month.length === 1 && Number(month[0]) > 1) {
      month = `0${month[0]}`;
    } else if (month.length === 2) {
      if (Number(month) === 0) {
        month = '01';
      } else if (Number(month) > 12) {
        month = '12';
      }
    }

    if (year.length === 2 && Number(`20${year}`) < new Date().getFullYear()) {
      year = '22';
    }

    return format?.(`${month}${year}`);
  };

  return (
    <NumberFormatBase
      format={expiredDateFormat}
      {...rest}
    />
  );
}

export default function CardExpiredDateField({
  name,
  ...props
}: Omit<TextFieldProps, 'defaultValue' | 'type' | 'value'>) {
  const {
    input: { onChange, value },
  } = useField<string>(name);

  const handleChange = ({ value }: NumberFormatValues) => onChange(value);

  return (
    <CardExpiry
      allowEmptyFormatting
      customInput={TextField}
      format='##/##'
      onValueChange={handleChange}
      mask='_'
      name={name}
      value={value}
      {...props}
    />
  );
}
