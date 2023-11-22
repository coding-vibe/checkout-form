type FormScreenValueType<
  SubmitFormValues,
  InitialFormValues = Record<string, never>,
> = SubmitFormValues | InitialFormValues;

export default FormScreenValueType;
