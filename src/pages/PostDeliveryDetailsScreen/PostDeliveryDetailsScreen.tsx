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

const { ukrposhta, novaPost, meestPoshta } = POST_OFFICES_OPTIONS;

type PostDeliveryDetailsType =
  InitialFormValuesType[FormScreens.POST_DELIVERY_DETAILS];

const getPostOfficeOptions = (postCompany: PostCompanies) => {
  switch (postCompany) {
    case 'ukrposhta':
      return ukrposhta;
    case 'novaPost':
      return novaPost;
    case 'meestPoshta':
      return meestPoshta;
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
