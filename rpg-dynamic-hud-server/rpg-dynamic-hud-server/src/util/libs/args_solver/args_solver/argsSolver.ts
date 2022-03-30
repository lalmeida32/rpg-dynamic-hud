import { ISolvedArgs } from '../solved_args';
import { TArgsSolver } from './TArgsSolver';

type checkArg = (arg: string) => boolean;

const isOption: checkArg = arg => /^--[^-=_].*$/g.test(arg);
const isKeyValueOption: checkArg = arg => isOption(arg) && arg.includes('=');
const isBooleanOption: checkArg = arg => isOption(arg) && !arg.includes('=');
const isPositional: checkArg = arg => /^[^-=_].*$/g.test(arg);

const solveArg = (arg: string, solvedArgs: ISolvedArgs) => {
  if (isBooleanOption(arg)) return (solvedArgs.optional[arg.slice(2)] = 'true');
  if (isKeyValueOption(arg))
    return (solvedArgs.optional[arg.slice(2, arg.indexOf('='))] = arg.slice(
      arg.indexOf('=') + 1
    ));
  if (isPositional(arg)) return solvedArgs.positional.push(arg);
  throw Error(`${arg} launch option is not valid.`);
};

export const argsSolver: TArgsSolver = args => {
  const solvedArgs: ISolvedArgs = {
    optional: {},
    positional: [],
  };
  for (const arg of args) solveArg(arg, solvedArgs);

  return solvedArgs;
};
