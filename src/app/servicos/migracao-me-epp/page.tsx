import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckCircle, TrendingUp, Calculator, Building, AlertTriangle } from "lucide-react"

const MigracaoMEEPP = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Migração MEI para ME/EPP</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Seu negócio cresceu? Auxílio completo na migração do MEI para Microempresa ou Empresa de Pequeno Porte.
            Processo seguro e planejado.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mb-6">Quando migrar do MEI?</h2>
                <p className="text-muted-foreground mb-8">
                  A migração do MEI para ME ou EPP é necessária quando seu faturamento ultrapassa os limites
                  estabelecidos, quando você precisa contratar funcionários ou quando seu negócio requer uma estrutura
                  empresarial mais robusta.
                </p>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                        Sinais de que é hora de migrar
                      </h4>
                      <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                        <li>• Faturamento próximo ou superior a R$ 81.000/ano</li>
                        <li>• Necessidade de contratar funcionários</li>
                        <li>• Clientes exigem notas fiscais com mais detalhes</li>
                        <li>• Necessidade de participar de licitações</li>
                        <li>• Busca por linhas de crédito empresariais maiores</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Nossos serviços de migração:</h3>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-primary" />
                        Análise de Viabilidade
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Avaliamos sua situação atual e determinamos o melhor momento e formato para a migração.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Processo de Migração
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Cuidamos de toda a burocracia do desenquadramento do MEI e abertura da nova empresa.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-primary" />
                        Orientação Contábil
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Orientação sobre as novas obrigações contábeis e fiscais da ME/EPP.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Planejamento Tributário
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Escolha do regime tributário mais vantajoso para seu novo porte empresarial.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Diferenças entre os regimes:</h3>

                <div className="space-y-6 mb-8">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        MEI (Microempreendedor Individual)
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-muted-foreground mb-2">Características:</p>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Faturamento até R$ 81.000/ano</li>
                            <li>• Máximo 1 funcionário</li>
                            <li>• Atividades específicas permitidas</li>
                            <li>• Tributação simplificada (DAS)</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground mb-2">Vantagens:</p>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Baixo custo mensal</li>
                            <li>• Poucos obrigações</li>
                            <li>• Processo simples</li>
                            <li>• Benefícios previdenciários</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Building className="h-5 w-5 text-green-600" />
                        ME (Microempresa)
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-muted-foreground mb-2">Características:</p>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Faturamento até R$ 360.000/ano</li>
                            <li>• Até 9 funcionários (comércio/serviços)</li>
                            <li>• Até 19 funcionários (indústria)</li>
                            <li>• Simples Nacional ou Lucro Presumido</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground mb-2">Vantagens:</p>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Maior flexibilidade</li>
                            <li>• Pode ter sócios</li>
                            <li>• Acesso a mais atividades</li>
                            <li>• Melhores condições de crédito</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-purple-600" />
                        EPP (Empresa de Pequeno Porte)
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-muted-foreground mb-2">Características:</p>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Faturamento até R$ 4.800.000/ano</li>
                            <li>• Até 49 funcionários (comércio/serviços)</li>
                            <li>• Até 99 funcionários (indústria)</li>
                            <li>• Simples Nacional ou Lucro Presumido/Real</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground mb-2">Vantagens:</p>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Maior capacidade de crescimento</li>
                            <li>• Acesso a licitações</li>
                            <li>• Linhas de crédito especiais</li>
                            <li>• Maior credibilidade no mercado</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Processo de migração:</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                        1
                      </div>
                      <h4 className="font-semibold mb-2">Análise</h4>
                      <p className="text-sm text-muted-foreground">
                        Avaliamos sua situação e definimos a melhor estratégia
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                        2
                      </div>
                      <h4 className="font-semibold mb-2">Desenquadramento</h4>
                      <p className="text-sm text-muted-foreground">Solicitamos o desenquadramento do MEI</p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                        3
                      </div>
                      <h4 className="font-semibold mb-2">Nova Empresa</h4>
                      <p className="text-sm text-muted-foreground">Abrimos a ME ou EPP com a estrutura adequada</p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                        4
                      </div>
                      <h4 className="font-semibold mb-2">Orientação</h4>
                      <p className="text-sm text-muted-foreground">Orientamos sobre as novas obrigações</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Solicite sua Migração</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">A partir de</div>
                    <div className="text-4xl font-bold">R$ 897</div>
                    <div className="text-sm text-muted-foreground">processo completo</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Análise gratuita</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Desenquadramento MEI</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Abertura ME/EPP</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Orientação completa</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Suporte por 90 dias</span>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h5 className="font-semibold mb-2">Inclui também:</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Alvará de funcionamento</li>
                      <li>• Inscrição estadual/municipal</li>
                      <li>• Orientação sobre contador</li>
                      <li>• Escolha do regime tributário</li>
                    </ul>
                  </div>

                  <Button className="w-full" size="lg">
                    Solicitar Migração
                  </Button>

                  <div className="text-center">
                    <Button variant="outline" size="sm">
                      Fazer Análise Gratuita
                    </Button>
                  </div>

                  <div className="text-center text-xs text-muted-foreground">Prazo médio: 30-45 dias úteis</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MigracaoMEEPP
