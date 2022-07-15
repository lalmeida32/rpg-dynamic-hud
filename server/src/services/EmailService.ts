import { UserRepository } from 'repositories/UserRepository';
import { validateEmail } from 'util/validation';

export class EmailService {
  private static instance: EmailService | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): EmailService {
    if (EmailService.instance === null)
      EmailService.instance = new EmailService();

    return EmailService.instance;
  }

  async sendResetPasswordEmail(email: string): Promise<void> {
    if (!validateEmail(email)) throw new Error('Invalid Email.');
    if ((await UserRepository.findUsernameByEmail(email)) === null)
      throw new Error('Email not found!');
  }
}
