"use server"
import { getCollection } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { ColumnCrm } from "@/types"
import { z } from "zod"
import { columnSchema } from "@/schemas/column"

type Result<T> = { ok: true; data: T } | { ok: false; error: string }

type DbColumnCrm = Omit<ColumnCrm, "id"> & { _id: ObjectId }

export async function getColumns(): Promise<Result<ColumnCrm[]>> {
  try {
    const col = await getCollection<DbColumnCrm>("column_crm")
    const docs = await col.find({}).sort({ order: 1 }).toArray()
    const data = docs.map(({ _id, ...rest }) => ({ _id: _id.toString(), ...rest }))
    return { ok: true, data }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erro desconhecido"
    console.error("[getColumns]", msg)
    return { ok: false, error: "Falha ao buscar colunas" }
  }
}

export type ColumnPayload = z.infer<typeof columnSchema>

type SubmitColumnOk = { ok: true; _id: string }
type SubmitColumnFail = { ok: false; error: string }
type SubmitColumnResult = SubmitColumnOk | SubmitColumnFail

export async function submitColumn(payload: ColumnPayload): Promise<SubmitColumnResult> {
  try {
    const parsed = columnSchema.safeParse(payload)
    if (!parsed.success) {
      const msg = parsed.error.issues.map((i) => i.message).join(", ")
      return { ok: false, error: msg }
    }
    const data = parsed.data

    const columns = await getCollection<Omit<ColumnCrm, "_id">>("column_crm")

    const inserted = await columns.insertOne({
      name: data.name,
      value: data.value, // slug normalizado
      description: data.description,
      color: data.color,
      createdAt: new Date(),
    })

    return { ok: true, _id: inserted.insertedId.toHexString() }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro desconhecido"

    // erro de duplicidade Mongo (índice único em value)
    if (message.includes("E11000")) {
      return { ok: false, error: "Já existe uma coluna com esse slug (value)!" }
    }

    console.error("[submitColumn]", message)
    return { ok: false, error: message }
  }
}

export async function deleteColumn(columnId: string): Promise<void> {
  const [collection, usersCollection] = await Promise.all([
    getCollection("column_crm"),
    getCollection("users"),
  ])
  const hasLeads = await usersCollection.findOne({ columnId: columnId })
  if (!hasLeads) {
    await collection.deleteOne({ _id: new ObjectId(columnId) })
  }
}
