import { isValid, parse } from 'date-fns';

const parser = (value: string): Date | null => {
  const parsedDate = parse(`1/${value}`, 'dd/MM/yy', new Date());

  if (!isValid(parsedDate)) {
    return null;
  }

  return parsedDate;
};

export default parser;
