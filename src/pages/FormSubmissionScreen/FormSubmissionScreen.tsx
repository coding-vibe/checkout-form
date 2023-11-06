import { useContext } from 'react';
import WizardFormContext from 'contexts/WizardFormContext';

export default function FormSubmissionScreen() {
  const { formValues } = useContext(WizardFormContext);

  return (
    <div>
      {Object.entries(formValues).map(([screenName, screenInfo], idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={idx}>
          <div>{screenName}</div>
          <div>
            {screenInfo &&
              Object.entries(screenInfo).map(([fieldName, fieldValue]) => (
                <div>
                  {fieldName}:{fieldValue}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
