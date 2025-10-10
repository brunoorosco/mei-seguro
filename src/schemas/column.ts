import z from "zod"

export const columnSchema = z.object({
  name: z.string().trim().min(1),
  value: z.string().trim().min(1),
  color: z.string().optional(),  
  description: z.string().trim().max(200).optional(),
})