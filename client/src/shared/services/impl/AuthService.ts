export interface IAuthService {
  logIn: (userId: string, password: string) => Promise<[string, string]>;
  // logOut: () => Promise<void>;
}
