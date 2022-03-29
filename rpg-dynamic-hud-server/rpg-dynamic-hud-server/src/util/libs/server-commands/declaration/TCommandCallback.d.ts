import { TQuestion } from './TQuestion';

export type TCommandCallback = (
  args: list<string>,
  question: TQuestion
) => Promise<void>;
