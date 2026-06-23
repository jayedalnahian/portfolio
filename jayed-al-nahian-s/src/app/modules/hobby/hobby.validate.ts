import z from "zod";

export const createHobbySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
});

export const updateHobbySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
});
