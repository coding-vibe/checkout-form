import { FieldRenderProps, useField } from 'react-final-form';
import { PatternFormat } from 'react-number-format';
import { TextField } from 'mui-rff';

interface Props {
  fieldProps: {
    validate: (value: string) => string | undefined;
  };
  label: string;
  name: string;
  placeholder: string;
  sx?: {
    mt: number;
  };
}

export default function MaskedTextField({
  fieldProps,
  label,
  name,
  placeholder,
  sx,
}: Props) {
  const TextFieldProps = {
    fieldProps,
    label,
    name,
    placeholder,
    sx,
  };
  const { onChange, value }: FieldRenderProps<string> = useField(name);

  return (
    <PatternFormat
      allowEmptyFormatting
      customInput={TextField}
      format='+(##) ### ### ## ##'
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      onValueChange={onChange}
      mask='_'
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value={value}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      {...TextFieldProps}
    />
  );
}

MaskedTextField.defaultProps = {
  sx: null,
};
