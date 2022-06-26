export interface IEmailService {
  sendResetPasswordEmail: (email: string) => Promise<void>;
}
