import { MailerService as MS } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  constructor(private readonly mailService: MS) {}

  async sendMail(receiver: string, subject: string, message: string) {
    await this.mailService
      .sendMail({
        from: process.env.EMAIL_USERNAME,
        to: receiver,
        subject: subject,
        html: message,
      })
      .then((result) => {
        console.log('Mail sent successfully:', result.envelope);
      })
      .catch((error) => {
        console.error('Error sending mail:', error);
      });
  }
}
