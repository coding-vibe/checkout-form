import { useContext, useEffect } from 'react';
import { useForm } from 'react-final-form';
import FormScreens from 'constants/formScreens';
import PostCompanies from 'constants/postCompanies';
import WizardFormContext from 'contexts/WizardFormContext';

interface Props {
  postCompany: PostCompanies | null;
}

export default function CustomFormSpy({ postCompany }: Props) {
  const { values } = useContext(WizardFormContext);
  const postDeliveryStep = values.find(
    (value) => value.id === FormScreens.POST_DELIVERY_DETAILS,
  );

  const form = useForm();

  useEffect(() => {
    if (
      postCompany &&
      postDeliveryStep &&
      'values' in postDeliveryStep &&
      // TODO: fix
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      'postCompany' in postDeliveryStep.values &&
      postCompany !== postDeliveryStep.values.postCompany
    ) {
      form.change('postOffice', null);
      form.resetFieldState('postOffice');
    }
  }, [form, postCompany, postDeliveryStep]);

  return null;
}
