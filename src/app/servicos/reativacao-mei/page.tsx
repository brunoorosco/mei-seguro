import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, CheckCircle, AlertTriangle, Search, FileText, Clock } from "lucide-react"

const ReativacaoMEI = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <RefreshCw className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Reativação de MEI</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Reative seu MEI cancelado e volte a operar seu negócio regularmente. Processo especializado para diferentes
            situações de cancelamento.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mb-6">Por que meu MEI foi cancelado?</h2>
                <p className="text-muted-foreground mb-8">
                  O MEI pode ser cancelado por diversos motivos: falta de entrega da declaração anual, não pagamento do
                  DAS por período prolongado, desenquadramento por faturamento excedente, ou solicitação do próprio
                  empreendedor.
                </p>

                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-red-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                        Principais motivos de cancelamento
                      </h4>
                      <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                        <li>• Não entrega da DASN-SIMEI por 2 anos consecutivos</li>
                        <li>• Faturamento superior ao limite por 3 anos</li>
                        <li>• Não pagamento do DAS por período prolongado</li>
                        <li>• Desenquadramento por atividade incompatível</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Nosso processo de reativação:</h3>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5 text-primary" />
                        Análise da Situação
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Verificamos o motivo do cancelamento e avaliamos a viabilidade de reativação do seu MEI.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <RefreshCw className="h-5 w-5 text-primary" />
                        Processo de Reativação
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Executamos todo o processo burocrático necessário para reativar seu MEI junto aos órgãos
                        competentes.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Atualização de Dados
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Atualizamos todas as informações cadastrais e regularizamos pendências existentes.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        Regularização Completa
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Deixamos seu MEI totalmente regularizado e pronto para operar novamente.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Casos especiais:</h3>

                <div className="space-y-4 mb-8">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">MEI cancelado há menos de 1 ano</h4>
                      <p className="text-sm text-muted-foreground">
                        Processo mais simples, geralmente pode ser reativado diretamente no Portal do Empreendedor após
                        regularização de pendências.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-yellow-500">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">MEI cancelado há mais de 1 ano</h4>
                      <p className="text-sm text-muted-foreground">
                        Processo mais complexo, pode necessitar de abertura de nova empresa ou procedimentos especiais
                        junto à Receita Federal.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-red-500">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">MEI com débitos em aberto</h4>
                      <p className="text-sm text-muted-foreground">
                        É necessário quitar todos os débitos antes da reativação. Auxiliamos na negociação e
                        parcelamento quando possível.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                        Vantagens de reativar seu MEI
                      </h4>
                      <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                        <li>• Mantém o mesmo CNPJ (quando possível)</li>
                        <li>• Preserva o histórico empresarial</li>
                        <li>• Acesso aos benefícios previdenciários</li>
                        <li>• Emissão de notas fiscais</li>
                        <li>• Conta bancária empresarial</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Reative seu MEI</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">A partir de</div>
                    <div className="text-4xl font-bold">R$ 250</div>
                    <div className="text-sm text-muted-foreground">processo completo</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Análise gratuita do caso</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Diagnóstico completo</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Processo personalizado</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Acompanhamento total</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Consultar Reativação
                  </Button>

                  <div className="text-center">
                    <Button variant="outline" size="sm">
                      Falar no WhatsApp
                    </Button>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Prazo: 15-45 dias úteis</span>
                    </div>
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

export default ReativacaoMEI
