import Navigation from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileCheck, XCircle, RefreshCw, Shield, Clock, Users, CheckCircle, Star, Award } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: FileCheck,
    title: "Regularização de Pendências MEI",
    subtitle: "Resolva todas as pendências do seu MEI",
    description:
      "Cuidamos de toda a burocracia para regularizar seu MEI junto à Receita Federal. Nosso serviço inclui o preenchimento de declarações em atraso, quitação de débitos e atualização cadastral completa.",
    features: [
      "Declaração DASN-SIMEI em atraso",
      "Quitação de débitos e multas",
      "Atualização de dados cadastrais",
      "Acompanhamento do processo",
      "Suporte especializado",
    ],
    price: "A partir de R$ 129,00",
    highlight: "Mais Procurado",
    link: "/servicos/regularizacao-pendencias",
  },
  {
    icon: XCircle,
    title: "Encerramento de MEI",
    subtitle: "Baixa segura e dentro dos prazos",
    description:
      "Processo completo de encerramento do MEI de forma segura e dentro dos prazos legais. Cuidamos de toda a documentação necessária para evitar problemas futuros.",
    features: [
      "Baixa na Receita Federal",
      "Encerramento definitivo do CNPJ",
      "Quitação final de débitos",
      "Orientação sobre obrigações finais",
      "Certificado de baixa",
    ],
    price: "A partir de R$ 200",
    highlight: "",
    link: "/servicos/encerramento-mei",
  },
  {
    icon: RefreshCw,
    title: "Reativação de MEI",
    subtitle: "Volte a operar seu negócio",
    description:
      "Reative seu MEI cancelado e volte a operar seu negócio regularmente. Analisamos sua situação e executamos todo o processo de reativação necessário.",
    features: [
      "Análise completa da situação",
      "Processo de reativação",
      "Atualização de dados",
      "Regularização de pendências",
      "Orientação pós-reativação",
    ],
    price: "A partir de R$ 300",
    highlight: "",
    link: "/servicos/reativacao-mei",
  },
  {
    icon: Shield,
    title: "Consultoria Especializada",
    subtitle: "Orientação completa sobre MEI",
    description:
      "Orientação personalizada sobre todas as obrigações, direitos e benefícios do MEI. Nossa equipe especializada tira todas as suas dúvidas e orienta as melhores práticas.",
    features: [
      "Análise personalizada do seu caso",
      "Orientação jurídica especializada",
      "Planejamento tributário",
      "Suporte contínuo",
      "Relatórios personalizados",
    ],
    price: "A partir de R$ 120",
    highlight: "",
    link: "/servicos/consultoria-especializada",
  },
  {
    icon: Clock,
    title: "Acompanhamento Mensal",
    subtitle: "MEI sempre em dia",
    description:
      "Mantenha seu MEI sempre em conformidade com nosso serviço de acompanhamento mensal. Cuidamos de todos os prazos e obrigações para você.",
    features: [
      "Lembretes de vencimentos",
      "Geração e envio de DAS",
      "Acompanhamento de declarações",
      "Suporte via WhatsApp",
      "Relatórios mensais",
    ],
    price: "R$ 89/mês",
    highlight: "Melhor Custo-Benefício",
    link: "/servicos/acompanhamento-mensal",
  },
  {
    icon: Users,
    title: "Migração para ME/EPP",
    subtitle: "Crescimento do seu negócio",
    description:
      "Auxílio completo na migração do MEI para Microempresa ou Empresa de Pequeno Porte quando seu faturamento exceder os limites ou quando necessário.",
    features: [
      "Análise de viabilidade",
      "Processo completo de migração",
      "Orientação contábil",
      "Escolha do regime tributário",
      "Suporte na transição",
    ],
    price: "A partir de R$ 500",
    highlight: "",
    link: "/servicos/migracao-me-epp",
  },
]

const Servicos = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Star className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Nossos Serviços MEI</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Soluções completas para regularizar, manter e fazer crescer seu MEI. Cuidamos de toda a burocracia para você
            focar no que realmente importa: seu negócio.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Complete o que precisa para seu MEI</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cada serviço foi desenvolvido para atender necessidades específicas do microempreendedor individual
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="card-elevated relative overflow-hidden">
                {service.highlight && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="default" className="bg-accent text-accent-foreground">
                      <Award className="h-3 w-3 mr-1" />
                      {service.highlight}
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <service.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{service.title}</CardTitle>
                      <p className="text-sm text-muted-foreground font-medium">{service.subtitle}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-sm">O que está incluído:</h4>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Preço</p>
                      <p className="text-lg font-bold text-primary">{service.price}</p>
                    </div>
                    <Link href={service.link}>
                      <Button variant="outline" size="sm" className="cursor-pointer">
                        Ver Detalhes
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-muted/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Precisa de ajuda para escolher?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Nossa equipe de especialistas pode analisar sua situação específica e recomendar os melhores serviços
                para suas necessidades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="cursor-pointer">
                  Consulta Gratuita
                </Button>
                <a
                  className="cursor-pointer bg-green-600 hover:bg-green-400 "
                  href="https://wa.me/5511949370599?text=Olá bem vindo ao MEI Seguro."
                  target="_blank"
                >
                  Falar via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Servicos
