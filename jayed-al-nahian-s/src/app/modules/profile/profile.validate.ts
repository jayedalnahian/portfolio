import z from "zod";

export const createProfileSchema = z.object({
  name: z.string(),
  title: z.string(),
  location: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  resumeUrl: z.string().url().optional().or(z.string().optional()),
  github: z.string().url().optional().or(z.string().optional()),
  linkedin: z.string().url().optional().or(z.string().optional()),
  bio: z.string(),
  summary: z.string(),
});

export const updateProfileSchema = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  location: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  resumeUrl: z.string().url().optional().or(z.string().optional()),
  github: z.string().url().optional().or(z.string().optional()),
  linkedin: z.string().url().optional().or(z.string().optional()),
  bio: z.string().optional(),
  summary: z.string().optional(),
});
