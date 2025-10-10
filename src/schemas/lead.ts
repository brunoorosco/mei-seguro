import z from "zod"

export const getByIdSchema = z.object({
  id: z.string().trim().min(1, "id obrigatório"),
})

export const listSchema = z.object({
  // filtros
  columnId: z.string().trim().optional(),
  search: z.string().trim().optional(), // procura em name/email/phone/company
  tags: z.array(z.string().trim()).optional(),

  // paginação & ordenação
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(["createdAt", "updatedAt", "value", "name"]).default("createdAt"),
  sortDir: z.enum(["asc", "desc"]).default("desc"),
})

export const leadSchema = z.object({
  nome: z.string().trim().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  whatsapp: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "WhatsApp inválido. Use (11) 91234-5678"),
  cnpj: z
    .string()
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido. Use 00.000.000/0000-00"),
  email: z.string().trim().email("E-mail inválido").max(255, "E-mail muito longo"),
  columnId: z.string().trim().optional(),
})