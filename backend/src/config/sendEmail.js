import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.RESEND_API) {
  throw new Error('RESEND_API environment variable is not set');
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ to, subject, html }) => {
  if(!html){
    throw new Error('Missing `html` content for email');
  }
  try {
    const { data, error } = await resend.emails.send({
    from: 'Blinkyt <onboarding@resend.dev>',
    to,
    subject,
    html,
  });
    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
export default sendEmail;