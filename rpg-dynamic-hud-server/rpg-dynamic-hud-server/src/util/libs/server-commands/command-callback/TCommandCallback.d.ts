import { TReadlineQuestion } from './TReadlineQuestion';

export type TCommandCallback = (
  args: list<string>,
  question: TReadlineQuestion
) => Promise<void>;
