import { useField } from 'react-final-form';
import { NumberFormatValues } from 'react-number-format';
import { TextField, TextFieldProps } from 'mui-rff';
import ExpirationDateInput from 'components/ExpirationDateInput';

export default function CardExpiryField({
  name,
  ...props
}: Omit<TextFieldProps, 'defaultValue' | 'type' | 'value'>) {
  const {
    input: { onChange, value },
  } = useField<string>(name);

  const handleChange = ({ formattedValue }: NumberFormatValues) => {
    onChange(formattedValue);
  };

  return (
    <ExpirationDateInput
      allowEmptyFormatting
      customInput={TextField}
      format='##/##'
      inputProps={{ inputMode: 'numeric' }}
      onValueChange={handleChange}
      mask='_'
      name={name}
      value={value}
      {...props}
    />
  );
}
