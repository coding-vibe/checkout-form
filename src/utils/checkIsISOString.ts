const checkIsISOString = (value: string): boolean => {
  const d = new Date(value);

  return !Number.isNaN(d.valueOf()) && d.toISOString() === value;
};

export default checkIsISOString;
