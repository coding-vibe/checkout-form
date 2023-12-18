import FormScreens from 'constants/formScreens';

export interface Step {
  id: FormScreens;
  isCompleted: boolean;
  values?: object;
  url: string;
}
