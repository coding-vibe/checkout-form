import { useContext } from 'react';
import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Select } from 'mui-rff';
import CustomFormSpy from 'components/CustomFormSpy';
import FormScreens from 'constants/formScreens';
import WizardFormContext from 'contexts/WizardFormContext';
import { validateIsRequired } from 'utils/validation';
import PostCompanies from 'constants/postCompanies';
import POST_COMPANIES_OPTIONS from 'constants/postCompaniesOptions';
import POST_OFFICES_OPTIONS from 'constants/postOfficesOptions';

export default function PostDeliveryDetailsScreen() {
  const { formValues, onSaveFormValues } = useContext(WizardFormContext);

  type PostDeliveryDetailsType = typeof formValues.DELIVERY_MODE.subStep;

  const getPostOfficeOptions = (postCompany: PostCompanies | null) => {
    if (!postCompany) {
      return [];
    }
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

  return (
    <Form<PostDeliveryDetailsType>
      onSubmit={(values) => {
        onSaveFormValues(
          FormScreens.POST_DELIVERY_DETAILS,
          values,
          FormScreens.DELIVERY_MODE,
        );
      }}
      render={({ handleSubmit, pristine, submitting, values }) => (
        <>
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
              {values &&
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              values.postCompany ? (
                <Select
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  data={getPostOfficeOptions(values.postCompany)}
                  fieldProps={{ validate: validateIsRequired }}
                  label='Post Office'
                  name='postOffice'
                />
              ) : (
                <Tooltip title='Choose a post company'>
                  <span>
                    <Select
                      data={getPostOfficeOptions(
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        values.postCompany,
                      )}
                      disabled
                      fieldProps={{ validate: validateIsRequired }}
                      label='Post Office'
                      name='postOffice'
                    />
                  </span>
                </Tooltip>
              )}
            </Box>
            <Button
              disabled={submitting || pristine}
              type='submit'
              variant='contained'>
              Next step
            </Button>
          </form>
          <CustomFormSpy
            postCompany={
              values &&
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              values.postCompany
            }
          />
        </>
      )}
    />
  );
}
