import { db } from './db';
import { randomUUID } from 'crypto';
import sendgrid from '@sendgrid/mail';

interface MailerProps {
   email: string,
   emailType: string,
   userId: string
}

export const sendEmail = async ({ email, emailType, userId }: MailerProps) => {
   try {

      //await db.user.update({
      //   where: {
      //      id: userId,
      //   },
      //   data: {
      //      ActivateTokens: {
      //         updateMany: {
      //            where: {
      //               valid: true
      //            },
      //            data: {
      //               valid: false
      //            }
      //         }
      //      }
      //   }
      //});

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

      sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)

      const mailOptions = {
         from: 'i.k.shevery@gmail.com',
         to: email,
         subject: emailType === "VERIFY" ? 'Verify your email' : 'Reset your password',
         html: `<p>Click ${emailType === "VERIFY" ? `${process.env.NEXT_PUBLIC_API_URL}/verifyemail?token=${token} to verify your email` :
            `${process.env.NEXT_PUBLIC_API_URL}/resetpwd?token=${token} to reset your password`}`
      }

      const mailresponse = sendgrid.send(mailOptions);

      return mailresponse

      //?================ RESEND ================

      //const resend = new Resend(process.env.RESEND_API_KEY);

      //  const mailresponse = await resend.emails.send(mailOptions);


      //?================ NODEMAILER with MailTrap ================

      //var transport = nodemailer.createTransport({
      //   host: "sandbox.smtp.mailtrap.io",
      //   port: 2525,
      //   auth: {
      //      user: "d265214b12280c",
      //      pass: "871ecad833af95"
      //   }
      //});

      //const mailOptions = {
      //   from: 'i.k.shevery@gmail.com',
      //   to: email,
      //   subject: emailType === "VERIFY" ? 'Verify your email' : 'Reset your password',
      //   html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${token}">here</a> to ${emailType === "VERIFY" ? "verify your email" :
      //         'reset your password'}
      //        <br> ${process.env.domain}/verifyemail?token=${token}`


      //}


   } catch (err: any) {
      throw new Error(err.message)
   }
}