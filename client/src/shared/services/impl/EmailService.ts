import { IEmailService } from '../IEmailService';

export class EmailService implements IEmailService {
  private static instance: EmailService | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): EmailService {
    if (EmailService.instance === null)
      EmailService.instance = new EmailService();

    return EmailService.instance;
  }

  async sendResetPasswordEmail(email: string): Promise<void> {
    try {
      const response = await fetch('http://127.0.0.1:4000/api/emails/reset', {
        method: 'POST',
        headers: {
          'x-email': email,
        },
      });
      if (response.status !== 200) {
        const body = await response.json();
        throw new Error(body.message);
      }
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
    }
  }
}
