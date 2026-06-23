import z from "zod";

export const createStatSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.string(),
});

export const updateStatSchema = z.object({
  label: z.string().optional(),
  value: z.string().optional(),
  icon: z.string().optional(),
});
