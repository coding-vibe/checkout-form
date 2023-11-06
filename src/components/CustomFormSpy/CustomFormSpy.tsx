import { useEffect } from 'react';
import { useForm } from 'react-final-form';
import PostCompanies from 'constants/postCompanies';

interface Props {
  postCompany: PostCompanies | null;
}

export default function CustomFormSpy({ postCompany }: Props) {
  const form = useForm();

  useEffect(() => {
    if (postCompany) {
      form.change('postOffice', null);
      form.resetFieldState('postOffice');
    }
  }, [postCompany, form]);

  return null;
}
