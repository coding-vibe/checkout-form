import { forwardRef, useContext } from 'react';
import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Select } from 'mui-rff';
import CustomFormSpy from 'components/CustomFormSpy';
import FormScreens from 'constants/formScreens';
import WizardFormContext, {
  InitialFormValuesType,
} from 'contexts/WizardFormContext';
import { validateIsRequired } from 'utils/validation';
import PostCompanies from 'constants/postCompanies';
import POST_COMPANIES_OPTIONS from 'constants/postCompaniesOptions';
import POST_OFFICES_OPTIONS from 'constants/postOfficesOptions';

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

interface Props {
  postCompany?: PostCompanies | null;
}

const PostOfficeSelection = forwardRef(({ postCompany }: Props, ref) => (
  <Box sx={{ mb: 2 }}>
    {postCompany ? (
      <Select
        data={getPostOfficeOptions(postCompany)}
        fieldProps={{ validate: validateIsRequired }}
        label='Post Office'
        name='postOffice'
      />
    ) : (
      <Select
        disabled
        data={[]}
        label='Post Office'
        name='postOffice'
        ref={ref}
      />
    )}
  </Box>
));

PostOfficeSelection.defaultProps = {
  postCompany: null,
};

type PostDeliveryDetailsType =
  InitialFormValuesType[FormScreens.POST_DELIVERY_DETAILS];

export default function PostDeliveryDetailsScreen() {
  const { onSaveFormValues } = useContext(WizardFormContext);

  return (
    <Form<PostDeliveryDetailsType>
      onSubmit={(values) => {
        onSaveFormValues(FormScreens.POST_DELIVERY_DETAILS, values);
      }}
      render={({ handleSubmit, pristine, submitting, values }) => (
        <>
          <CustomFormSpy postCompany={values.postCompany} />
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
            {values.postCompany ? (
              <PostOfficeSelection postCompany={values.postCompany} />
            ) : (
              <Tooltip title='Choose a post company'>
                <PostOfficeSelection />
              </Tooltip>
            )}
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
