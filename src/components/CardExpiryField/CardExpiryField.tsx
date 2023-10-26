import { useField } from 'react-final-form';
import { NumberFormatValues } from 'react-number-format';
import { TextField, TextFieldProps } from 'mui-rff';
import FieldFormatter from 'components/FieldFormatter';

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
    <FieldFormatter
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
