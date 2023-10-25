import { useState } from 'react';
import { useField } from 'react-final-form';
import {
  InputAttributes,
  NumberFormatBase,
  NumberFormatValues,
  PatternFormatProps,
  usePatternFormat,
} from 'react-number-format';
import { isPast, parse } from 'date-fns';
import { TextField, TextFieldProps } from 'mui-rff';

const parseDate = (value: string) => {
  const month = value.substring(0, 2);
  const year = value.substring(2, 4);

  return {
    month,
    year,
  };
};

function CardExpiry(props: PatternFormatProps<InputAttributes>) {
  const { format, ...rest } = usePatternFormat({ ...props, format: '##/##' });

  const expirationDateFormat = (value: string) => {
    const parsedDate = parseDate(value);

    if (parsedDate.month.length === 1 && Number(parsedDate.month[0]) > 1) {
      parsedDate.month = `0${parsedDate.month[0]}`;
    }

    return format?.(`${parsedDate.month}${parsedDate.year}`);
  };

  return (
    <NumberFormatBase
      format={expirationDateFormat}
      {...rest}
    />
  );
}

interface Error {
  status: boolean;
  text: string;
}

const initialErrorValue = { status: false, text: '' };

export default function CardExpirationDateField({
  name,
  ...props
}: Omit<TextFieldProps, 'defaultValue' | 'type' | 'value'>) {
  const {
    input: { onChange, value },
  } = useField<string>(name);
  const [error, setError] = useState<Error>(initialErrorValue);

  const handleChange = ({ value }: NumberFormatValues) => {
    const parsedDate = parseDate(value);
    const inputDate = `${parsedDate.month}/${parsedDate.year}`;
    const expirationDate = parse(`01/${inputDate}`, 'dd/MM/yy', new Date());

    if (inputDate.length === 5) {
      if (Number(parsedDate.month) > 12 || isPast(expirationDate)) {
        setError({ status: true, text: 'Invalid expired date' });
      } else {
        onChange(inputDate);
        setError(initialErrorValue);
      }
    }

    return null;
  };

  return (
    <CardExpiry
      allowEmptyFormatting
      customInput={TextField}
      error={error.status}
      format='##/##'
      helperText={error.text}
      onValueChange={handleChange}
      mask='_'
      name={name}
      value={value}
      {...props}
    />
  );
}
