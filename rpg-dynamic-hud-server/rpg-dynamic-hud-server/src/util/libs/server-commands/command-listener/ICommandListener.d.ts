export interface ICommandListener {
  listen: () => Promise<void>;
}
