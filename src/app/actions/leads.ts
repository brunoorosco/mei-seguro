"use server"

import { ObjectId, SortDirection } from "mongodb"
import { z } from "zod"
import { getCollection } from "@/lib/mongodb"
import { Lead } from "@/types"
import { getByIdSchema, listSchema } from "@/schemas/lead"

// --------- Tipos e utilidades ----------

export type TLead = Omit<Lead, "_id"> & { id: string }

export type ListLeadsInput = z.infer<typeof listSchema>

// --------- Ações ----------
export async function getLeadById(input: { id: string }) {
  const parsed = getByIdSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues.map((i) => i.message).join(", ") }
  }

  try {
    const col = await getCollection<TLead>("users")
    const doc = await col.findOne({ _id: new ObjectId(parsed.data.id) })
    if (!doc) return { ok: false as const, error: "Lead não encontrado" }
    return { ok: true as const, data: doc }
  } catch (e: any) {
    console.error("[getLeadById]", e?.message || e)
    return { ok: false as const, error: "Falha ao buscar lead" }
  }
}

export async function listLeads(input: Partial<ListLeadsInput> = {}) {
  const parsed = listSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues.map((i) => i.message).join(", ") }
  }
  const { page, pageSize, sortBy, sortDir, columnId, search, tags } = parsed.data

  try {
    const col = await getCollection<TLead>("users")

    // filtro base: somente documentos de lead (evitar misturar outras coleções na mesma "users")
    const filter: Record<string, any> = { type_lead: { $exists: true } }

    if (columnId) filter.columnId = columnId
    if (tags?.length) filter.tags = { $all: tags }
    if (search) {
      // texto simples em múltiplos campos
      const q = new RegExp(escapeRegex(search), "i")
      filter.$or = [{ name: q }, { email: q }, { phone: q }, { company: q }, { razao_social: q }]
    }

    const sort: Record<string, SortDirection> = { [sortBy]: sortDir === "asc" ? 1 : -1 }

    const cursor = col
      .find({ type_lead: { $ne: "done" } })
      .project({
        name: 1,
        cnpj: 1,
        phone: 1,
        email: 1,
        columnId: 1,
        company: { isMei: 1, razao_social: 1, situacao_cadastral: 1 },
      })
      .sort(sort)
      .skip((page - 1) * pageSize)
      .limit(pageSize)

    const [items, total] = await Promise.all([cursor.toArray(), col.countDocuments(filter)])
    return {
      ok: true as const,
      data: {
        items: items,
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    }
  } catch (e: any) {
    console.error("[listLeads]", e?.message || e)
    return { ok: false as const, error: "Falha ao listar leads" }
  }
}

// --------- helper ----------
function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

type MovePayload =
  | { id: string; columnId: string } // sem order
  | { id: string; columnId: string; order: number } // com order

export async function moveLeadToColumn(payload: MovePayload) {
  const leadColection = await getCollection<TLead>("users")
  const { id, columnId } = payload

  const update: any = { columnId: new ObjectId(columnId) }
  if ("order" in payload) update.order = payload.order

  const res = await leadColection.updateOne({ _id: new ObjectId(id) }, { $set: update })

  if (res.matchedCount !== 1) {
    throw new Error("Lead não encontrado")
  }
  return { ok: true }
}
