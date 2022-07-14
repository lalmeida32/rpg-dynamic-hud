import { userRepositoryMock } from 'repositories/UserRepository';
import { validateEmail } from 'util/validation';

export class EmailServiceMock {
  private static instance: EmailServiceMock | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): EmailServiceMock {
    if (EmailServiceMock.instance === null)
      EmailServiceMock.instance = new EmailServiceMock();

    return EmailServiceMock.instance;
  }

  async sendResetPasswordEmail(email: string): Promise<void> {
    if (!validateEmail(email)) throw new Error('Invalid Email.');
    if (userRepositoryMock.findUsernameByEmail(email) === null)
      throw new Error('Email not found!');
  }
}
