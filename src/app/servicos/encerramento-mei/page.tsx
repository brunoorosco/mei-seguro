import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle, CheckCircle, FileText, AlertCircle, Clock, Users } from "lucide-react"

const EncerramentoMEI = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <XCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Encerramento de MEI</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Processo completo de baixa do MEI de forma segura e dentro dos prazos legais. Evite problemas futuros com um
            encerramento adequado.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mb-6">Quando é necessário encerrar o MEI?</h2>
                <p className="text-muted-foreground mb-8">
                  O encerramento do MEI deve ser feito quando você não deseja mais exercer atividade empresarial, mudou
                  de atividade, ultrapassou o limite de faturamento ou deseja migrar para outro regime tributário.
                </p>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-yellow-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                        Importante: Não deixe o MEI "abandonado"
                      </h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Mesmo sem atividade, o MEI continua gerando obrigações fiscais. É essencial fazer o encerramento
                        formal para evitar multas e problemas com a Receita Federal.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Nosso processo de encerramento:</h3>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Baixa na Receita Federal
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Solicitação oficial de baixa do MEI junto à Receita Federal através do Portal do Empreendedor.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-primary" />
                        Encerramento no CNPJ
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Cancelamento oficial do CNPJ junto à Receita Federal e demais órgãos competentes.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        Quitação Final
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Verificação e quitação de todos os débitos pendentes antes do encerramento definitivo.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Orientação Completa
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Orientação sobre os próximos passos e impactos do encerramento em seus benefícios
                        previdenciários.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Documentação necessária:</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-8">
                  <li>CPF e RG do titular</li>
                  <li>Comprovante de residência atualizado</li>
                  <li>Última declaração do MEI (DASN-SIMEI)</li>
                  <li>Comprovantes de quitação de débitos (se houver)</li>
                  <li>Procuração (se aplicável)</li>
                </ul>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                        Benefícios do encerramento adequado
                      </h4>
                      <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                        <li>• Evita multas e juros por inatividade</li>
                        <li>• Protege seu CPF de restrições</li>
                        <li>• Permite abertura de novo MEI no futuro</li>
                        <li>• Regulariza sua situação fiscal</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Solicite seu Encerramento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">A partir de</div>
                    <div className="text-4xl font-bold">R$ 200</div>
                    <div className="text-sm text-muted-foreground">processo completo</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Análise prévia gratuita</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Processo em até 30 dias</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Acompanhamento total</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Certificado de baixa</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Solicitar Encerramento
                  </Button>

                  <div className="text-center">
                    <Button variant="outline" size="sm">
                      Tirar Dúvidas no WhatsApp
                    </Button>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Prazo médio: 15-30 dias</span>
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

export default EncerramentoMEI
