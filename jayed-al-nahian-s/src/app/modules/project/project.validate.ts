import z from "zod";

const projectTypeEnum = z.enum(["FRONTEND", "BACKEND", "FULLSTACK"]);

export const createProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  type: projectTypeEnum,
  thumbnailUrl: z.string().url().or(z.string()),
  liveUrl: z.string().url().optional().or(z.string().optional()),
  githubUrl: z.string().url().optional().or(z.string().optional()),
  tags: z.array(z.string()),
  featured: z.boolean().optional(),
});

export const updateProjectSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  type: projectTypeEnum.optional(),
  thumbnailUrl: z.string().url().optional().or(z.string().optional()),
  liveUrl: z.string().url().optional().or(z.string().optional()),
  githubUrl: z.string().url().optional().or(z.string().optional()),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});
