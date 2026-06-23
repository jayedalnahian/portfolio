import z from "zod";

const skillCategoryEnum = z.enum([
  "FRONTEND",
  "BACKEND",
  "DEVOPS",
  "PROGRAMMING_LANGUAGE",
  "SPOKEN_LANGUAGE",
  "AI_TOOL",
]);

export const createSkillSchema = z.object({
  name: z.string(),
  category: skillCategoryEnum,
  proficiency: z.number().min(0).max(100).optional(),
  icon: z.string().optional(),
  order: z.number().optional(),
});

export const updateSkillSchema = z.object({
  name: z.string().optional(),
  category: skillCategoryEnum.optional(),
  proficiency: z.number().min(0).max(100).optional(),
  icon: z.string().optional(),
  order: z.number().optional(),
});
