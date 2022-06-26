import { delay } from 'shared/lib/delay';
import { IEmailService } from '../IEmailService';
import { userRepositoryMock } from './userRepositoryMock';
import { validateEmail } from './validationMock';

export class EmailServiceMock implements IEmailService {
  private static instance: EmailServiceMock | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): EmailServiceMock {
    if (EmailServiceMock.instance === null)
      EmailServiceMock.instance = new EmailServiceMock();

    return EmailServiceMock.instance;
  }

  async sendResetPasswordEmail(email: string): Promise<void> {
    await delay();
    if (!validateEmail(email)) throw new Error('Invalid Email.');
    if (userRepositoryMock.findUsernameByEmail(email) === null)
      throw new Error('Email not found!');
  }
}
