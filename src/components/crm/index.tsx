"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  User,
  Building,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Lead } from "@/types"

const mockClients = [
  {
    id: 1,
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "(11) 99999-1111",
    business: "Loja de Roupas",
    services: ["Regularização", "Acompanhamento Mensal"],
    status: "active",
    totalValue: 850,
    joinDate: "2024-10-15",
    lastService: "2025-01-10",
  },
  {
    id: 2,
    name: "João Santos",
    email: "joao.santos@email.com",
    phone: "(11) 99999-2222",
    business: "Informática",
    services: ["Encerramento de MEI"],
    status: "completed",
    totalValue: 280,
    joinDate: "2024-12-01",
    lastService: "2024-12-15",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "new":
      return "bg-blue-500"
    case "contacted":
      return "bg-yellow-500"
    case "proposal":
      return "bg-purple-500"
    case "won":
      return "bg-green-500"
    case "lost":
      return "bg-red-500"
    case "active":
      return "bg-green-500"
    case "completed":
      return "bg-gray-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "new":
      return "Novo"
    case "contacted":
      return "Contatado"
    case "proposal":
      return "Proposta"
    case "won":
      return "Fechado"
    case "lost":
      return "Perdido"
    case "active":
      return "Ativo"
    case "completed":
      return "Concluído"
    default:
      return status
  }
}

type Props = {
  leads: Lead[]
}

const CRMSystem = (props: Props) => {
  const [clients, setClients] = useState(mockClients)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredLeads = props.leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company?.razao_social.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.business.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Sistema CRM</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar leads ou clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* CRM Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Leads Ativos</p>
                <p className="text-2xl font-bold text-primary">{props.leads.length}</p>
              </div>
              <User className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Clientes Ativos</p>
                <p className="text-2xl font-bold text-primary">
                  {clients.filter((c) => c.status === "active").length}
                </p>
              </div>
              <Building className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pipeline Total</p>
                <p className="text-2xl font-bold text-primary">
                  R$ {props.leads.reduce((sum, lead) => sum + (lead.finance?.mensalidade || 0), 0)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taxa Conversão</p>
                <p className="text-2xl font-bold text-primary">85%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="leads" className="space-y-4">
        <TabsList>
          <TabsTrigger value="leads">Leads ({props.leads.length})</TabsTrigger>
          <TabsTrigger value="clients">Clientes ({clients.length})</TabsTrigger>
        </TabsList>

        {/* Leads Tab */}
        <TabsContent value="leads">
          <div className="grid gap-4">
            {filteredLeads.map((lead) => (
              <Card key={lead._id} className="card-elevated">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-3">
                        {lead.name}
                        <Badge
                          variant="secondary"
                          // className={`${getStatusColor(lead.status)} text-white`}
                        >
                          {/* {getStatusLabel(lead.status)} */}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {lead.company?.razao_social} • {lead.company?.atividade_principal}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-primary">
                        R$ {lead.finance?.mensalidade}
                      </p>
                      <p className="text-xs text-muted-foreground">Valor estimado</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{lead.phone}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Criado: {new Date(lead.createdAt).toLocaleString("pt-BR")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Último contato: </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Ligar
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button size="sm">Atualizar Status</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Clients Tab */}
        <TabsContent value="clients">
          <div className="grid gap-4">
            {filteredClients.map((client) => (
              <Card key={client.id} className="card-elevated">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-3">
                        {client.name}
                        <Badge
                          variant="secondary"
                          className={`${getStatusColor(client.status)} text-white`}
                        >
                          {getStatusLabel(client.status)}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-1">{client.business}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-primary">R$ {client.totalValue}</p>
                      <p className="text-xs text-muted-foreground">Valor total</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {client.services.map((service, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Cliente desde: {client.joinDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Último serviço: {client.lastService}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Contatar
                    </Button>
                    <Button size="sm" variant="outline">
                      Histórico
                    </Button>

                    <Button size="sm">Novo Serviço</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CRMSystem
