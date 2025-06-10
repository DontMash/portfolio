import { ActionError, defineAction } from 'astro:actions';
import { EMAIL_TARGET, EMAIL_USER, RESEND_API_KEY } from 'astro:env/server';
import { z } from 'astro:schema';
import { Resend } from 'resend';

export const CONTACT_FORM_SCHEMA = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name must contain at least 3 characters.' })
      .max(32, { message: 'Name must contain at most 32 characters.' })
      .optional(),
    company: z
      .string()
      .min(3, { message: 'Company must contain at least 3 characters.' })
      .max(32, { message: 'Name must contain at most 32 characters.' })
      .optional(),
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
    const client = new Resend(RESEND_API_KEY);

    try {
      const result = await client.emails.send({
        from: `${EMAIL_USER} <${EMAIL_TARGET}>`,
        to: EMAIL_TARGET,
        subject: 'Contact request',
        text: getMessage(input),
      });

      if (result.error) {
        throw new Error(result.error.message, { cause: result.error.name });
      }

      console.info('Message sent: %s', result.data?.id);
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
