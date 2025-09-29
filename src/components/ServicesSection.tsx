import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileCheck, XCircle, RefreshCw, Shield, Clock, Users } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: FileCheck,
    title: "Regularização de Pendências",
    description:
      "Resolva todas as pendências do seu MEI junto à Receita Federal, incluindo declarações em atraso e multas.",
    features: ["Declaração DASN-SIMEI", "Quitação de débitos", "Atualização cadastral"],
    link: "/servicos/regularizacao-pendencias",
  },
  {
    icon: XCircle,
    title: "Encerramento de MEI",
    description: "Processo completo de baixa do MEI de forma segura e dentro dos prazos legais.",
    features: ["Baixa na Receita Federal", "Encerramento no CNPJ", "Quitação final"],
    link: "/servicos/encerramento-mei",
  },
  {
    icon: RefreshCw,
    title: "Reativação de MEI",
    description: "Reative seu MEI cancelado e volte a operar seu negócio regularmente.",
    features: ["Análise da situação", "Processo de reativação", "Atualização de dados"],
    link: "/servicos/reativacao-mei",
  },
  {
    icon: Shield,
    title: "Consultoria Especializada",
    description: "Orientação completa sobre obrigações, direitos e benefícios do MEI.",
    features: ["Análise personalizada", "Orientação jurídica", "Suporte contínuo"],
    link: "/servicos/consultoria-especializada",
  },
  {
    icon: Clock,
    title: "Acompanhamento Mensal",
    description: "Mantenha seu MEI sempre em dia com nosso serviço de acompanhamento.",
    features: ["Lembretes de vencimentos", "Envio de DAS", "Suporte via WhatsApp"],
    link: "/servicos/acompanhamento-mensal",
  },
  {
    icon: Users,
    title: "Migração para ME/EPP",
    description: "Auxílio na migração do MEI para Microempresa quando necessário.",
    features: ["Análise de viabilidade", "Processo de migração", "Orientação contábil"],
    link: "/servicos/migracao-me-epp",
  },
]

const ServicesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Nossos Serviços</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Oferecemos soluções completas para regularizar e manter seu MEI sempre em conformidade com a legislação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="card-elevated h-full">
              <CardHeader>
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground mb-6 flex-1">{service.description}</p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href={service.link}>
                  <Button variant="outline" className="w-full mt-auto cursor-pointer border-primary-foreground">
                    Saiba Mais
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="default" className="text-lg bg-primary text-white  px-8">
            Solicite um Orçamento Gratuito
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
