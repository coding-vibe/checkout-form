import lowerCase from 'lodash/lowerCase';
import upperFirst from 'lodash/upperFirst';

const convertToSentenceCase = (value: string) => upperFirst(lowerCase(value));

export default convertToSentenceCase;
