import { TDeepIterationImpl } from './TDeepIterationImpl';

export const deepIterationImpl: TDeepIterationImpl = (
  obj,
  callback,
  keyStack
) => {
  for (const key in obj) {
    keyStack.push(key);
    const element = obj[key];
    if (typeof element === typeof obj)
      deepIterationImpl(element as typeof obj, callback, keyStack);
    else callback(element, [...keyStack]);
    keyStack.pop();
  }
};
