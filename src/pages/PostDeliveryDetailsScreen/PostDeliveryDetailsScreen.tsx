import { useContext, useEffect, useMemo, useState } from 'react';
import { Form, FormSpy } from 'react-final-form';
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
  console.log(postCompany);
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

function CustomFormSpy(postCompany: PostCompanies | null) {
  const [isChanged, setIsChanged] = useState(false);
  const memoizedPostCompany = useMemo(() => postCompany, [postCompany]);

  useEffect(() => {
    if (postCompany !== memoizedPostCompany) {
      setIsChanged(true);
    }
  }, [postCompany, memoizedPostCompany]);

  console.log(isChanged);

  return (
    isChanged && (
      <FormSpy
        onChange={(props) => {
          // eslint-disable-next-line no-param-reassign, react/prop-types
          props.values.postOffice = null;
        }}
      />
    )
  );
}

export default function PostDeliveryDetailsScreen() {
  const { onSaveFormValues } = useContext(WizardFormContext);

  return (
    <Form<PostDeliveryDetailsType>
      onSubmit={(values) => {
        onSaveFormValues(FormScreens.POST_DELIVERY_DETAILS, values);
      }}
      render={({ handleSubmit, pristine, submitting, values }) => (
        <>
          <CustomFormSpy value={values.postCompany} />
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <Select
                data={POST_COMPANIES_OPTIONS}
                fieldProps={{
                  validate: validateIsRequired,
                }}
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
              disabled={submitting || pristine}
              type='submit'
              variant='contained'>
              Next step
            </Button>
          </form>
        </>
      )}
    />
  );
}
