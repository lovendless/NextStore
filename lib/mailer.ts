import { db } from './db';
import { randomUUID } from 'crypto';
import nodemailer from 'nodemailer';

interface MailerProps {
   email: string,
   emailType: string,
   userId: string
}

export const sendEmail = async ({ email, emailType, userId }: MailerProps) => {
   try {

      await db.activateToken.updateMany({
         where: {
            userId,
            valid: true
         },
         data: {
            valid: false
         }
      });

      const token = `${randomUUID()}${randomUUID()}`.replace(/-/g, '');

      if (emailType === "VERIFY") {

         await db.activateToken.create({
            data: {
               token,
               userId,
               verifyToken: true
            }
         })

      } else if (emailType === "RESET") {

         await db.activateToken.create({
            data: {
               token,
               userId,
               resetToken: true
            }
         })

      }

      //?================ SENDGRID ================

      //sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)

      //const mailOptions = {
      //   from: 'i.k.shevery@gmail.com',
      //   to: email,
      //   subject: emailType === "VERIFY" ? 'Verify your email' : 'Reset your password',
      //   html: `<p>Click ${emailType === "VERIFY" ? `${process.env.NEXT_PUBLIC_API_URL}/verifyemail?token=${token} to verify your email` :
      //      `${process.env.NEXT_PUBLIC_API_URL}/resetpwd?token=${token} to reset your password`}`
      //}

      //try {
      //   // Send the email and wait for the response
      //   const mailResponse = await sendgrid.send(mailOptions);
      //   console.log('Email sent successfully', mailResponse);
      //   return mailResponse;
      //} catch (error) {
      //   // Handle errors and log them
      //   console.error('Error sending email:', error);
      //   throw new Error('Email sending failed');
      //}
      //?================ RESEND ================




      //?================ NODEMAILER with MailTrap ================

      // Настройка транспортера для Google SMTP
      const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: process.env.GMAIL_USER, // ваш gmail-адрес
            pass: process.env.GMAIL_PASS, // ваш gmail-пароль или "App Password" при включенной двухфакторной аутентификации
         },
      });

      // Настройка параметров письма
      const mailOptions = {
         from: process.env.GMAIL_USER,
         to: email,
         subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
         html: `<p>Click <a href="${process.env.NEXT_PUBLIC_API_URL}/${emailType === 'VERIFY' ? 'verifyemail' : 'resetpwd'}?token=${token}">here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}.</p>`,
      };

      // Отправка письма
      try {
         const mailResponse = await transporter.sendMail(mailOptions);
         console.log('Email sent successfully:', mailResponse);
         return mailResponse;
      } catch (err: any) {
         console.error('Error sending email:', err);
         throw new Error('Email sending failed');
      }

   } catch (err: any) {
      throw new Error(err.message)
   }
}