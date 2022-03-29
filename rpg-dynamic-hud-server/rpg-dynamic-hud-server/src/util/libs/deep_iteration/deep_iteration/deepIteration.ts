import { deepIterationImpl } from '../deep_iteration_impl';
import { TDeepIteration } from './TDeepIteration';

export const deepIteration: TDeepIteration = (obj, callback) => {
  const keyStack: string[] = [];
  deepIterationImpl(obj, callback, keyStack);
};
