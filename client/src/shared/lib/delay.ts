type TDelay = <T>(result: T) => Promise<T>;

export const delay: TDelay = result => {
  return new Promise(resolve => {
    setTimeout(() => resolve(result), 500);
  });
};
