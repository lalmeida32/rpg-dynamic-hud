export type TDeepIteration = (
  obj: { [index: string]: unknown },
  callback: (element: unknown, keyStack: string[]) => void
) => void;
