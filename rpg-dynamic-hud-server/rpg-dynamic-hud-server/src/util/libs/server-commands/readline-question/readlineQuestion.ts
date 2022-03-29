import { TReadlineQuestion } from '../declaration/TReadlineQuestion';
import { stdInput } from './stdInput';

export const readlineQuestion: TReadlineQuestion = async query => {
  return new Promise(resolve => {
    stdInput.question(query || '', resolve);
  });
};
