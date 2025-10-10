// app/actions/lead.ts
"use server"

import { getCollection } from "@/lib/mongodb"
import { leadSchema } from "@/schemas/lead"
import { z } from "zod"

export type LeadPayload = z.infer<typeof leadSchema>
type SubmitLeadResult = { ok: true } | { ok: false; error: string }

export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  try {
    const parsed = leadSchema.safeParse(payload)
    if (!parsed.success) {
      const msg = parsed.error.issues.map((i) => i.message).join(", ")
      return { ok: false, error: msg }
    }

    const users = await getCollection("users")

    const cnpjDigits = payload.cnpj.replace(/\D/g, "")
    const inserted = await users.insertOne({
      name: payload.nome,
      cnpj: cnpjDigits,
      email: payload.email,
      phone: payload.whatsapp,
      type_lead: "cold",
      columnId: payload.columnId,
      createdAt: new Date(),
    })

    const base = process.env.URL_API_CNPJ
    if (!base) return { ok: false, error: "URL_API_CNPJ não configurada" }

    const res = await fetch(`${base}/${cnpjDigits}`)
    if (!res.ok) {
      const errorText = await res.text().catch(() => "")
      return { ok: false, error: `Erro ao consultar API de CNPJ (${res.status}): ${errorText}` }
    }

    const data = await res.json()

    const { razao_social, simples, estabelecimento, porte, natureza_juridica } = data || {}

    // Dados principais
    const empresaInfo = {
      razao_social: razao_social ?? null,
      data_abertura: estabelecimento?.data_inicio_atividade ?? null,
      situacao_cadastral: estabelecimento?.situacao_cadastral ?? null,
      data_situacao_cadastral: estabelecimento?.data_situacao_cadastral ?? null,
      nome_fantasia: estabelecimento?.nome_fantasia ?? null,
      natureza_juridica: natureza_juridica?.descricao ?? null,
      porte_empresa: porte?.descricao ?? null,
      atividade_principal: estabelecimento?.atividade_principal?.descricao ?? null,
      endereco: {
        logradouro: estabelecimento?.logradouro ?? null,
        numero: estabelecimento?.numero ?? null,
        bairro: estabelecimento?.bairro ?? null,
        cep: estabelecimento?.cep ?? null,
        cidade: estabelecimento?.cidade?.nome ?? null,
        estado: estabelecimento?.estado?.sigla ?? null,
      },
      // Dados tributários
      isSimples: simples?.simples === "Sim",
      isMei: simples?.mei === "Sim",
      data_opcao_simples: simples?.data_opcao_simples ?? null,
      data_exclusao_simples: simples?.data_exclusao_simples ?? null,
      data_opcao_mei: simples?.data_opcao_mei ?? null,
      data_exclusao_mei: simples?.data_exclusao_mei ?? null,
    }

    await users.updateOne({ _id: inserted.insertedId }, { $set: { company: empresaInfo } })

    return { ok: true }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro desconhecido"
    console.error("[submitLead]", message)
    return { ok: false, error: message }
  }
}
