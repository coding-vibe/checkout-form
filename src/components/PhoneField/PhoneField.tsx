import { useField } from 'react-final-form';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import { TextField, TextFieldProps } from 'mui-rff';

export default function PhoneField({ name, ...props }: TextFieldProps) {
  const {
    input: { onChange, value },
  } = useField<string>(name);

  const handleChange = ({ value }: NumberFormatValues) => onChange(`+${value}`);

  return (
    <PatternFormat
      allowEmptyFormatting
      valueIsNumericString
      customInput={TextField}
      format='+(##) ### ### ## ##'
      onValueChange={handleChange}
      mask='_'
      name={name}
      value={value}
      {...props}
    />
  );
}
