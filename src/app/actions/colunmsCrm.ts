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
    const docs = await col.find({}).sort({ position: 1 }).toArray()
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

    const last = await columns
      .find({})
      .sort({ position: -1 }) // ordena do maior pro menor
      .limit(1)
      .toArray()
    const lastPos = last[0]?.position ?? -1

    const inserted = await columns.insertOne({
      name: data.name,
      value: data.value, // slug normalizado
      description: data.description,
      color: data.color,
      position: lastPos + 1,
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

type OrderUpdate = { id: string; position: number }

export async function updateColumnsOrder(updates: OrderUpdate[]) {
  if (!Array.isArray(updates) || updates.length === 0) return { ok: true }

  const db = await getCollection("column_crm")
  const bulk = updates.map((u) => ({
    updateOne: {
      filter: { _id: new ObjectId(u.id) },
      update: { $set: { position: u.position } },
    },
  }))

  const res = await db.bulkWrite(bulk, { ordered: false })
  return { ok: true, modified: res.modifiedCount }
}

export async function moveLeadToColumnServerCalc(id: string, columnId: string) {
  const [dbColums, dbUsers] = await Promise.all([
    getCollection("column_crm"),
    getCollection("users"),
  ])

  // pega o maior order da coluna destino
  const last = await dbColums
    .find({ columnId: new ObjectId(columnId) })
    .sort({ order: -1 })
    .limit(1)
    .toArray()

  const nextOrder = (last[0]?.order ?? -1) + 1

  const res = await dbUsers.updateOne(
    { _id: new ObjectId(id) },
    { $set: { columnId: new ObjectId(columnId), order: nextOrder } }
  )

  if (res.matchedCount !== 1) throw new Error("Lead não encontrado")
  return { ok: true, order: nextOrder }
}
