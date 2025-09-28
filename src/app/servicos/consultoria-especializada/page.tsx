import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, CheckCircle, Users, BookOpen, Phone, MessageSquare } from "lucide-react"

const ConsultoriaEspecializada = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Consultoria Especializada MEI</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Orientação completa sobre obrigações, direitos e benefícios do MEI. Consultoria personalizada para cada
            situação específica.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mb-6">Por que buscar consultoria especializada?</h2>
                <p className="text-muted-foreground mb-8">
                  O regime MEI possui diversas particularidades e mudanças frequentes na legislação. Nossa consultoria
                  especializada garante que você tome as melhores decisões para seu negócio e esteja sempre em
                  conformidade com a lei.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Áreas de consultoria:</h3>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Análise Personalizada
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Avaliação completa da sua situação atual como MEI, identificando oportunidades e riscos
                        específicos.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Orientação Jurídica
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Esclarecimentos sobre direitos, deveres e obrigações legais do microempreendedor individual.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        Suporte Contínuo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Acompanhamento permanente via WhatsApp para esclarecer dúvidas e orientar decisões importantes.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Planejamento Tributário
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Estratégias para otimizar sua carga tributária e maximizar os benefícios do regime MEI.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-2xl font-semibold mb-4">O que nossa consultoria abrange:</h3>

                <div className="space-y-6 mb-8">
                  <div className="border-l-4 border-l-primary pl-6">
                    <h4 className="font-semibold text-lg mb-2">Obrigações e Prazos</h4>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      <li>• Orientação sobre declaração anual (DASN-SIMEI)</li>
                      <li>• Calendário de pagamentos do DAS</li>
                      <li>• Controle de faturamento e limites</li>
                      <li>• Obrigações trabalhistas (quando aplicável)</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-l-accent pl-6">
                    <h4 className="font-semibold text-lg mb-2">Direitos e Benefícios</h4>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      <li>• Benefícios previdenciários disponíveis</li>
                      <li>• Auxílio-doença e aposentadoria</li>
                      <li>• Salário-maternidade para MEI</li>
                      <li>• Pensão por morte e auxílio-reclusão</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-l-secondary pl-6">
                    <h4 className="font-semibold text-lg mb-2">Crescimento do Negócio</h4>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      <li>• Quando migrar para ME ou EPP</li>
                      <li>• Contratação de funcionários</li>
                      <li>• Abertura de filiais</li>
                      <li>• Parcerias e sociedades</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-l-muted pl-6">
                    <h4 className="font-semibold text-lg mb-2">Conformidade Legal</h4>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      <li>• Atividades permitidas para MEI</li>
                      <li>• Licenças e alvarás necessários</li>
                      <li>• Emissão de notas fiscais</li>
                      <li>• Relacionamento com clientes PJ</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <Phone className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                        Consultoria Remota e Presencial
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                        Oferecemos atendimento tanto presencial quanto remoto, adaptando-se às suas necessidades:
                      </p>
                      <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                        <li>• Consultas via WhatsApp e telefone</li>
                        <li>• Reuniões virtuais por videoconferência</li>
                        <li>• Atendimento presencial agendado</li>
                        <li>• Relatórios e orientações por e-mail</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Planos de Consultoria</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Card className="border-2 border-primary">
                    <CardContent className="pt-4">
                      <div className="text-center mb-4">
                        <h4 className="font-bold text-lg">Consultoria Pontual</h4>
                        <div className="text-2xl font-bold text-primary">R$ 150</div>
                        <div className="text-sm text-muted-foreground">por consulta</div>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>1 hora de consultoria</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Relatório por escrito</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Suporte 7 dias</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center mb-4">
                        <h4 className="font-bold text-lg">Consultoria Mensal</h4>
                        <div className="text-2xl font-bold text-primary">R$ 297</div>
                        <div className="text-sm text-muted-foreground">por mês</div>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Suporte ilimitado</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>WhatsApp prioritário</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Reuniões mensais</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Relatórios mensais</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Button className="w-full" size="lg">
                    Agendar Consultoria
                  </Button>

                  <div className="text-center">
                    <Button variant="outline" size="sm">
                      Conversar no WhatsApp
                    </Button>
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

export default ConsultoriaEspecializada
