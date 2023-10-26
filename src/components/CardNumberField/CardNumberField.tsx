import { useField } from 'react-final-form';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import { TextField, TextFieldProps } from 'mui-rff';

export default function CardNumberField({
  name,
  ...props
}: Omit<TextFieldProps, 'defaultValue' | 'type' | 'value'>) {
  const {
    input: { onChange, value },
  } = useField<string>(name);

  const handleChange = ({ value }: NumberFormatValues) => onChange(value);

  return (
    <PatternFormat
      allowEmptyFormatting
      customInput={TextField}
      format='#### #### #### ####'
      onValueChange={handleChange}
      mask='_'
      name={name}
      value={value}
      {...props}
    />
  );
}
