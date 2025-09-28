import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CheckCircle, Bell, MessageSquare, Calendar, Shield } from "lucide-react"

const AcompanhamentoMensal = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Clock className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Acompanhamento Mensal MEI</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Mantenha seu MEI sempre em dia com nosso serviço completo de acompanhamento. Nunca mais perca prazos ou
            esqueça obrigações importantes.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mb-6">Por que escolher nosso acompanhamento?</h2>
                <p className="text-muted-foreground mb-8">
                  Ser MEI vai além de apenas pagar o DAS mensalmente. Existem prazos, obrigações e oportunidades que
                  muitos empreendedores perdem por falta de acompanhamento especializado. Nosso serviço garante que você
                  esteja sempre em conformidade.
                </p>

                <h3 className="text-2xl font-semibold mb-4">O que está incluso no acompanhamento:</h3>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-primary" />
                        Lembretes de Vencimentos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Notificações automáticas sobre todos os prazos importantes: DAS, declarações e outras
                        obrigações.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Envio de DAS
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Enviamos mensalmente o boleto do DAS por WhatsApp e e-mail, com orientações de pagamento.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        Suporte via WhatsApp
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Canal direto de comunicação para esclarecer dúvidas e receber orientações imediatas.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Monitoramento Fiscal
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Acompanhamos sua situação fiscal e alertamos sobre qualquer irregularidade ou pendência.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Serviços detalhados:</h3>

                <div className="space-y-6 mb-8">
                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-green-600" />
                        Gestão de Prazos
                      </h4>
                      <ul className="text-muted-foreground space-y-2 text-sm">
                        <li>• Lembrete do DAS até o dia 20 de cada mês</li>
                        <li>• Alerta da declaração anual (DASN-SIMEI) até maio</li>
                        <li>• Notificação de mudanças na legislação</li>
                        <li>• Calendário personalizado de obrigações</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                        Suporte Especializado
                      </h4>
                      <ul className="text-muted-foreground space-y-2 text-sm">
                        <li>• Atendimento via WhatsApp em horário comercial</li>
                        <li>• Orientações sobre emissão de notas fiscais</li>
                        <li>• Esclarecimentos sobre limites de faturamento</li>
                        <li>• Dicas para crescimento do negócio</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-purple-600" />
                        Monitoramento Preventivo
                      </h4>
                      <ul className="text-muted-foreground space-y-2 text-sm">
                        <li>• Verificação mensal da situação cadastral</li>
                        <li>• Alerta sobre proximidade dos limites de faturamento</li>
                        <li>• Identificação precoce de irregularidades</li>
                        <li>• Orientação para correção de problemas</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                        Benefícios do acompanhamento regular
                      </h4>
                      <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                        <li>• Evita multas por atraso no pagamento</li>
                        <li>• Mantém regularidade fiscal sempre em dia</li>
                        <li>• Preserva benefícios previdenciários</li>
                        <li>• Facilita acesso a crédito e financiamentos</li>
                        <li>• Reduz stress e preocupações com burocracias</li>
                        <li>• Permite foco total no crescimento do negócio</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Como funciona:</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                        1
                      </div>
                      <h4 className="font-semibold mb-2">Cadastro</h4>
                      <p className="text-sm text-muted-foreground">
                        Cadastramos suas informações e configuramos os lembretes
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                        2
                      </div>
                      <h4 className="font-semibold mb-2">Monitoramento</h4>
                      <p className="text-sm text-muted-foreground">Acompanhamos sua situação fiscal mensalmente</p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                        3
                      </div>
                      <h4 className="font-semibold mb-2">Suporte</h4>
                      <p className="text-sm text-muted-foreground">Recebe lembretes e suporte quando precisar</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Planos de Acompanhamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Card className="border-2 border-primary">
                    <CardContent className="pt-4">
                      <div className="text-center mb-4">
                        <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full inline-block mb-2">
                          MAIS POPULAR
                        </div>
                        <h4 className="font-bold text-lg">Mensal</h4>
                        <div className="text-3xl font-bold text-primary">R$ 49</div>
                        <div className="text-sm text-muted-foreground">por mês</div>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Todos os lembretes</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>DAS por WhatsApp</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Suporte ilimitado</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Monitoramento fiscal</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center mb-4">
                        <h4 className="font-bold text-lg">Anual</h4>
                        <div className="text-3xl font-bold text-primary">R$ 39</div>
                        <div className="text-sm text-muted-foreground">por mês (pago anual)</div>
                        <div className="text-xs text-green-600 font-medium">Economize 20%</div>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Todos os benefícios</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Declaração anual GRÁTIS</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Consultoria mensal</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Atendimento prioritário</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Button className="w-full" size="lg">
                    Contratar Acompanhamento
                  </Button>

                  <div className="text-center">
                    <Button variant="outline" size="sm">
                      Falar no WhatsApp
                    </Button>
                  </div>

                  <div className="text-center text-xs text-muted-foreground">
                    Sem fidelidade • Cancele quando quiser
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AcompanhamentoMensal
