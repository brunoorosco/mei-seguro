"use client"
import { startTransition, useEffect, useState, useTransition } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  FileText,
  MessageSquare,
  Users,
  BarChart3,
  Edit,
  Trash2,
  Plus,
} from "lucide-react"
import Navigation from "@/components/Navigation"
import { getLeadById, listLeads } from "../actions/getLeads"

// Mock data
const mockServices = [
  {
    id: 1,
    title: "Regularização de Pendências",
    description: "Resolva todas as pendências do seu MEI junto à Receita Federal",
    status: "active",
  },
  {
    id: 2,
    title: "Encerramento de MEI",
    description: "Processo completo de baixa do MEI de forma segura",
    status: "active",
  },
]

const mockTestimonials = [
  {
    id: 1,
    client: "Maria Silva",
    business: "Loja de Roupas Online",
    content: "Estava com várias pendências no meu MEI e não sabia por onde começar...",
    rating: 5,
    status: "approved",
  },
  {
    id: 2,
    client: "João Santos",
    business: "Serviços de Informática",
    content: "Precisava encerrar meu MEI para abrir uma empresa maior...",
    rating: 5,
    status: "pending",
  },
]

const Admin = () => {
  const [services, setServices] = useState(mockServices)
  const [testimonials, setTestimonials] = useState(mockTestimonials)
  const [editingService, setEditingService] = useState<any>(null)
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null)
  const [leads, setLeads] = useState([])
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      const res = await listLeads()
      //@ts-ignore
      if (res.ok) setLeads(res.data.items)
    })
  }, [])

  const handleDeleteService = (id: number) => {
    setServices(services.filter((s) => s.id !== id))
  }

  const handleDeleteTestimonial = (id: number) => {
    setTestimonials(testimonials.filter((t) => t.id !== id))
  }
  async function openLead(id: string) {
    const res = await getLeadById({ id })
    if (res.ok) {
      console.log("lead", res.data)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8 text-primary" />
            Painel Administrativo
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie conteúdo, depoimentos e acompanhe métricas do site
          </p>
        </div>

        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="services" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Serviços
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Depoimentos
            </TabsTrigger>
            <TabsTrigger value="crm" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              CRM
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Métricas
            </TabsTrigger>
          </TabsList>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Gerenciar Serviços</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Serviço
              </Button>
            </div>

            <div className="grid gap-4">
              {services.map((service) => (
                <Card key={service.id} className="card-elevated">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription className="mt-2">{service.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={service.status === "active" ? "default" : "secondary"}>
                          {service.status === "active" ? "Ativo" : "Inativo"}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Gerenciar Depoimentos</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Depoimento
              </Button>
            </div>

            <div className="grid gap-4">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="card-elevated">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{testimonial.client}</CardTitle>
                          <Badge
                            variant={testimonial.status === "approved" ? "default" : "secondary"}
                          >
                            {testimonial.status === "approved" ? "Aprovado" : "Pendente"}
                          </Badge>
                        </div>
                        <CardDescription className="mb-2">{testimonial.business}</CardDescription>
                        <p className="text-sm text-muted-foreground italic">
                          "{testimonial.content.substring(0, 100)}..."
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTestimonial(testimonial.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* CRM Tab */}
          <TabsContent value="crm" className="space-y-6">
            <div>
              {pending
                ? "Carregando..."
                : leads.map((l: any) => (
                    <button key={l.id} onClick={() => openLead(l.id)}>
                      {l.name}
                    </button>
                  ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-semibold">Métricas e Relatórios</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="card-elevated">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total de Clientes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">284</div>
                  <p className="text-xs text-muted-foreground">+12% este mês</p>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Serviços Concluídos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">156</div>
                  <p className="text-xs text-muted-foreground">+8% este mês</p>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Taxa de Satisfação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <p className="text-xs text-muted-foreground">+2% este mês</p>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Receita Mensal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">R$ 24.5k</div>
                  <p className="text-xs text-muted-foreground">+15% este mês</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Admin
