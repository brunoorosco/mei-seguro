export type Lead = {
  _id: string
  name: string
  cnpj: string
  email: string
  phone: string
  type_lead: string
  createdAt: Date
  company?: Company
  finance: Finance
  tags: Tag[]
  notes: string
  columnId?: string
}

export type Company = {
  razao_social: string
  data_abertura: string
  situacao_cadastral: string
  data_situacao_cadastral: string
  nome_fantasia: string
  natureza_juridica: string
  porte_empresa: string
  atividade_principal: string
  endereco: Endereco
  isSimples: boolean
  isMei: boolean
  data_opcao_simples: string
  data_exclusao_simples: any
  data_opcao_mei: any
  data_exclusao_mei: any
}

export type Endereco = {
  logradouro: string
  numero: string
  bairro: string
  cep: string
  cidade: string
  estado: string
}

export type Column = {
  id: string
  name: string
  color: string
}

export type Finance = {
  mensalidade?: number
  servico?: number
}

export type Tag = {
  name: string
}

export type ColumnCrm = {
  _id: string
  name: string
  value: string
  description?: string
  color?: string
  createdAt: Date
}
