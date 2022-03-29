import { TDeepIterationImpl } from './TDeepIterationImpl';

export const deepIterationImpl: TDeepIterationImpl = (
  obj,
  callback,
  keyStack
) => {
  for (const key in obj) {
    const element = obj[key];
    if (typeof element === typeof obj) {
      keyStack.push(key);
      deepIterationImpl(element as typeof obj, callback, keyStack);
      keyStack.pop();
    } else callback(element, [...keyStack]);
  }
};
