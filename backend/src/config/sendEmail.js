import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error('EMAIL_USER or EMAIL_PASS environment variables are not set');
}

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const sendEmail = async ({ to, subject, html }) => {
  if (!html) {
    throw new Error('Missing `html` content for email');
  }

  const mailOptions = {
    from: `Blinkyt <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default sendEmail;
