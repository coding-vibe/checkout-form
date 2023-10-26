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
import CardExpiryFieldFormat from 'components/CardExpiryFieldFormat';

const initialErrorValue = { status: false, text: '' };

export default function CardExpiryField({
  name,
  ...props
}: Omit<TextFieldProps, 'defaultValue' | 'type' | 'value'>) {
  const {
    input: { onChange, value },
    meta: { error, touched },
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
    <CardExpiryFieldFormat
      allowEmptyFormatting
      customInput={TextField}
      error={}
      format='##/##'
      helperText={}
      onValueChange={handleChange}
      mask='_'
      name={name}
      value={value}
      {...props}
    />
  );
}
