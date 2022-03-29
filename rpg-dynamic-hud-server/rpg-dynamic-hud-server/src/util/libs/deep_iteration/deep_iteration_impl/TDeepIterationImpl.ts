export type TDeepIterationImpl = (
  obj: { [index: string]: unknown },
  callback: (element: unknown, keyStack: string[]) => void,
  keyStack: string[]
) => void;
