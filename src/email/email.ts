import { env } from 'bun';
import { Resend } from 'resend';

type SendMailProps = {
    to: string;
    subject: string;
    text: string;
}

export const sendEmail = ({ to, subject, text }: SendMailProps) => {
    const resend = new Resend(env.RESEND_API_KEY);

    resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject,
    html: text
    });
}
