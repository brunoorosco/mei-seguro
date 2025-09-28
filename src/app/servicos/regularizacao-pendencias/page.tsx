import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCheck, CheckCircle, AlertTriangle, Clock, Shield } from "lucide-react"

const RegularizacaoPendencias = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileCheck className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Regularização de Pendências MEI</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Resolva todas as pendências do seu MEI junto à Receita Federal de forma rápida e segura. Cuidamos de toda a
            burocracia para você.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mb-6">Por que regularizar suas pendências?</h2>
                <p className="text-muted-foreground mb-8">
                  Manter seu MEI regularizado é essencial para continuar operando legalmente e aproveitando todos os
                  benefícios que o regime oferece. Pendências podem gerar multas, juros e até o cancelamento do seu
                  CNPJ.
                </p>

                <h3 className="text-2xl font-semibold mb-4">O que incluímos no serviço:</h3>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-primary" />
                        Declaração DASN-SIMEI
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Preenchimento e envio de todas as declarações anuais em atraso, com cálculo correto do
                        faturamento.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        Quitação de Débitos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Identificação e quitação de todos os débitos pendentes, incluindo DAS em atraso com juros e
                        multas.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Atualização Cadastral
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Revisão e atualização de todos os dados cadastrais junto à Receita Federal e órgãos competentes.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        Acompanhamento
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Monitoramento completo do processo até a regularização total do seu MEI.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 mb-8">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Atenção aos Prazos</h4>
                      <p className="text-sm text-muted-foreground">
                        MEIs com pendências por mais de 12 meses podem ter seu CNPJ cancelado automaticamente. Não deixe
                        para depois - regularize agora!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Solicite seu Orçamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">A partir de</div>
                    <div className="text-4xl font-bold">R$ 150</div>
                    <div className="text-sm text-muted-foreground">por declaração em atraso</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Análise gratuita da situação</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Sem taxas ocultas</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Pagamento facilitado</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Suporte via WhatsApp</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Solicitar Orçamento
                  </Button>

                  <div className="text-center">
                    <Button variant="outline" size="sm">
                      Falar via WhatsApp
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

export default RegularizacaoPendencias
