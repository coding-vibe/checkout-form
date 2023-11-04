import { useContext } from 'react';
import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Select } from 'mui-rff';
import FormScreens from 'constants/formScreens';
import WizardFormContext, {
  InitialFormValuesType,
} from 'contexts/WizardFormContext';
import { validateIsRequired } from 'utils/validation';
import PostCompanies from 'constants/postCompanies';
import POST_COMPANIES_OPTIONS from 'constants/postCompaniesOptions';
import POST_OFFICES_OPTIONS from 'constants/postOfficesOptions';

type PostDeliveryDetailsType =
  InitialFormValuesType[FormScreens.POST_DELIVERY_DETAILS];

const getPostOfficeOptions = (postCompany: PostCompanies) => {
  switch (postCompany) {
    case PostCompanies.UKRPOSHTA:
      return POST_OFFICES_OPTIONS.ukrposhta;
    case PostCompanies.NOVA_POST:
      return POST_OFFICES_OPTIONS.novaPost;
    case PostCompanies.MEEST_POSHTA:
      return POST_OFFICES_OPTIONS.meestPoshta;
    default:
      throw new Error('New post company found');
  }
};

export default function PostDeliveryDetailsScreen() {
  const { onSaveFormValues } = useContext(WizardFormContext);

  return (
    <Form<PostDeliveryDetailsType>
      onSubmit={(values) => {
        onSaveFormValues(FormScreens.POST_DELIVERY_DETAILS, values);
      }}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <Select
              data={POST_COMPANIES_OPTIONS}
              fieldProps={{ validate: validateIsRequired }}
              label='Post Company'
              name='postCompany'
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Select
              data={
                values.postCompany
                  ? getPostOfficeOptions(values.postCompany)
                  : []
              }
              fieldProps={{
                validate: validateIsRequired,
              }}
              label='Post Office'
              name='postOffice'
            />
          </Box>
          <Button
            type='submit'
            variant='contained'>
            Next step
          </Button>
        </form>
      )}
    />
  );
}
