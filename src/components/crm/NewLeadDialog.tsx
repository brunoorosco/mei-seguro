"use client"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Plus, X } from "lucide-react"
import type { ColumnCrm, Lead, Company, Tag, Finance } from "@/types"
import { submitLead } from "@/app/actions/newLead"

/** Payload que o client envia para criar um Lead (sem _id e geralmente sem createdAt) */
type NewLeadInput = Omit<Lead, "_id" | "createdAt"> & { createdAt?: Lead["createdAt"] }

/** Estado local do formulário */
type NewLeadForm = {
  name: string
  email: string
  phone: string
  cnpj: string
  companyRazaoSocial: string
  servicoValue: number
  tags: string[] // no form usamos string[], depois mapeamos para Tag[]
  notes: string
  columnId?: string
}

export function NewLeadDialog({
  columns,
  onCreate,
  open,
  onOpenChange,
}: {
  columns: ColumnCrm[]
  onCreate: (lead: NewLeadInput, columnId: string) => void
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [selectedColumn, setSelectedColumn] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [form, setForm] = useState<NewLeadForm>({
    name: "",
    email: "",
    phone: "",
    cnpj: "",
    companyRazaoSocial: "",
    servicoValue: 0,
    tags: [],
    notes: "",
    columnId: "",
  })

  const addTag = () => {
    const t = tagInput.trim()
    if (!t) return
    setForm((p) => ({ ...p, tags: [...p.tags, t] }))
    setTagInput("")
  }

  const removeTag = (t: string) => setForm((p) => ({ ...p, tags: p.tags.filter((x) => x !== t) }))

  /** Cria um objeto Company com defaults, se houver razão social */
  const makeCompany = (razao_social: string): Company => ({
    razao_social,
    data_abertura: "",
    situacao_cadastral: "",
    data_situacao_cadastral: "",
    nome_fantasia: "",
    natureza_juridica: "",
    porte_empresa: "",
    atividade_principal: "",
    endereco: {
      logradouro: "",
      numero: "",
      bairro: "",
      cep: "",
      cidade: "",
      estado: "",
    },
    isSimples: false,
    isMei: false,
    data_opcao_simples: "",
    data_exclusao_simples: null,
    data_opcao_mei: null,
    data_exclusao_mei: null,
  })

  const handleSubmit = async () => {
    if (!form.name.trim() || !selectedColumn) return

    const finance: Finance = {}
    if (!Number.isNaN(form.servicoValue)) {
      finance.servico = Number(form.servicoValue) || 0
    }

    const tags: Tag[] = form.tags.map((name) => ({ name }))

    const company = form.companyRazaoSocial.trim()
      ? makeCompany(form.companyRazaoSocial.trim())
      : undefined


    const payload: NewLeadInput = {
      name: form.name.trim(),
      cnpj: form.cnpj.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      status: true,
      type_lead: "cold", // ajuste se desejar outro default
      company,
      finance,
      tags,
      notes: form.notes.trim(),
      columnId: selectedColumn,
    }

    const res = await submitLead({
      nome: form.name.trim(),
      cnpj: form.cnpj.trim(),
      email: form.email.trim(),
      whatsapp: form.phone.trim(),
      columnId: selectedColumn,
    })

    if (!res.ok) {
      // aqui você pode usar um toast
      console.error(res.error)
      return
    }

    onCreate(payload, selectedColumn)

    // reset
    setForm({
      name: "",
      email: "",
      phone: "",
      cnpj: "",
      companyRazaoSocial: "",
      servicoValue: 0,
      tags: [],
      notes: "",
    })
    setSelectedColumn("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Novo Lead
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Lead</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nome do lead"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                value={form.cnpj}
                onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
                placeholder="00.000.000/0000-00"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@exemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="(11) 98765-4321"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Razão Social (opcional)</Label>
              <Input
                id="company"
                value={form.companyRazaoSocial}
                onChange={(e) => setForm({ ...form, companyRazaoSocial: e.target.value })}
                placeholder="Ex.: ACME LTDA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="servico">Valor de Serviço (R$)</Label>
              <Input
                id="servico"
                type="number"
                inputMode="decimal"
                value={form.servicoValue}
                onChange={(e) => setForm({ ...form, servicoValue: Number(e.target.value) })}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="columnId">Coluna *</Label>
            <select
              id="columnId"
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              <option value="">Selecione uma coluna</option>
              {columns.map((c) => (
                <option key={String(c._id)} value={String(c._id)}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Adicionar tag"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} className="cursor-pointer">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {!!form.tags.length && (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="gap-1">
                    {t}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(t)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Anotações sobre o lead"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="cursor-pointer">
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Adicionar Lead</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
