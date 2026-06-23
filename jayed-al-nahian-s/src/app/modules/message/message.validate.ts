import z from "zod";

export const createMessageSchema = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});
