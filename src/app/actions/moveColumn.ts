import { getCollection } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// server action
// export async function moveLeadToColumn({
//   tenantId,
//   leadId,
//   columnValue,
// }: {
//   tenantId: string
//   leadId: string
//   columnValue: string
// }) {
//   const columns = await getCollection("column_crm")
//   const leads = await getCollection("leads")

//   const col = await columns.findOne({
//     tenantId: new ObjectId(tenantId),
//     value: columnValue,
//     isActive: true,
//   })
//   if (!col) throw new Error("Coluna inexistente")

//   const now = new Date()
//   const lead = await leads.findOne({ _id: new ObjectId(leadId), tenantId: new ObjectId(tenantId) })
//   const from = lead?.columnValue ?? null

//   await leads.updateOne(
//     { _id: new ObjectId(leadId), tenantId: new ObjectId(tenantId) },
//     {
//       $set: {
//         columnId: col._id,
//         columnValue: col.value,
//         updatedAt: { $date: { $numberLong: String(now.getTime()) } },
//       },
//       $push: {
//         stageHistory: { from, to: col.value, at: now, by: /* userId */ null },
//       },
//     }
//   )
// }
