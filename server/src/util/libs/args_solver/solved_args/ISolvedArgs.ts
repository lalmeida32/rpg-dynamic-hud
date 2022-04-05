export interface ISolvedArgs {
  optional: {
    [index: string]: string;
  };
  positional: string[];
}
