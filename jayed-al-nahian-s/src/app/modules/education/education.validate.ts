import z from "zod";






export const createEducationSchema = z.object({
    institution: z.string(),
    degree: z.string(),
    duration: z.string(),
    status: z.string(),
    description: z.string(),
    order: z.number(),
})



export const updateEducation = z.object({
    institution: z.string().optional(),
    degree: z.string().optional(),
    duration: z.string().optional(),
    status: z.string().optional(),
    description: z.string().optional(),
    order: z.number().optional(),
})