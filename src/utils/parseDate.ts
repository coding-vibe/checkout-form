import { isValid, parse } from 'date-fns';

const parseDate = (datestring: string) => {
  const parsedDate = parse(datestring, 'MM/yy', new Date());

  if (!isValid(parsedDate)) {
    return null;
  }

  return parsedDate;
};

export default parseDate;
