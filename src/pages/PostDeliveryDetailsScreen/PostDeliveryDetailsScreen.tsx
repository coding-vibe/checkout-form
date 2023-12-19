import { Form } from 'react-final-form';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { Select } from 'mui-rff';
import StepNavigator from 'components/StepNavigator';
import CustomFormSpy from 'components/CustomFormSpy';
import withFormHandler from 'components/withFormScreenProps';
import PostCompanies from 'constants/postCompanies';
import POST_COMPANIES_OPTIONS from 'constants/postCompaniesOptions';
import POST_OFFICES_OPTIONS from 'constants/postOfficesOptions';
import PostDeliveryDetailsValues from 'types/postDeliveryDetails';
import StepComponentProps from 'types/formScreen';
import { validateIsRequired } from 'utils/validation';
import * as classes from './styles';

type Props = StepComponentProps<PostDeliveryDetailsValues>;

function PostDeliveryDetailsScreen({ initialValues, onSubmit, screen }: Props) {
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
    <div>
      <h2 css={classes.title}>Provide {screen.toLocaleLowerCase()}</h2>
      <Form<PostDeliveryDetailsValues>
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit, values }) => (
          <>
            <form
              id={screen}
              onSubmit={handleSubmit}>
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
                {values && values.postCompany ? (
                  <Select
                    data={getPostOfficeOptions(values.postCompany)}
                    fieldProps={{ validate: validateIsRequired }}
                    label='Post Office'
                    name='postOffice'
                  />
                ) : (
                  <Tooltip title='Choose a post company'>
                    <span>
                      <Select
                        data={getPostOfficeOptions(values.postCompany)}
                        disabled
                        fieldProps={{ validate: validateIsRequired }}
                        label='Post Office'
                        name='postOffice'
                      />
                    </span>
                  </Tooltip>
                )}
              </Box>
              <StepNavigator />
            </form>
            <CustomFormSpy postCompany={values.postCompany} />
          </>
        )}
      />
    </div>
  );
}

export default withFormHandler<PostDeliveryDetailsValues>(
  PostDeliveryDetailsScreen,
);
