import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import nodemailer from 'nodemailer';

export const CONTACT_FORM_SCHEMA = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name must contain at least 3 characters.' })
      .max(32, { message: 'Name must contain at most 32 characters.' })
      .optional(),
    company: z.string().min(3, { message: 'Company must contain at least 3 characters.' }).max(32, { message: 'Name must contain at most 32 characters.' }).optional(),
    email: z.string({ message: 'E-Mail is a required field.' }).email(),
    message: z
      .string({ message: 'Message is a required field.' })
      .min(3, { message: 'Message must contain at least 3 characters.' })
      .max(1024, { message: 'Message must contain at most 1024 characters.' }),
    terms: z.boolean(),
  })
  .refine(
    (value) => {
      return value.terms;
    },
    {
      message: 'Please agree to the processing of your data.',
      path: ['terms'],
    },
  );
const getMessage = (input: z.infer<typeof CONTACT_FORM_SCHEMA>): string => {
  let result = `${input.message}\n\n${input.email}`;
  if (input.name) {
    result += `\n${input.name}`;
  }
  if (input.company) {
    result += `\n${input.company}`;
  }
  return result;
};

export default defineAction({
  accept: 'form',
  input: CONTACT_FORM_SCHEMA,
  handler: async (input) => {
    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST,
      port: import.meta.env.SMTP_PORT,
      secure: true,
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASSWORD,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: {
          address: import.meta.env.SMTP_USER,
          name: import.meta.env.SMTP_NAME,
        },
        to: import.meta.env.SMTP_TARGET,
        subject: 'Contact request',
        text: getMessage(input),
      });

      console.info('Message sent: %s', info.messageId);
    } catch (error) {
      console.error(error, input);

      throw new ActionError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Error on sending the form',
      });
    }

    return {
      input,
      message: 'Thank you for contacting me!',
    };
  },
});
