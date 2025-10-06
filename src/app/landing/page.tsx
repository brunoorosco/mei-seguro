'use client'

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { CheckCircle, Phone, Mail, FileText, User } from "lucide-react"
const InputMask = dynamic(() => import("react-input-mask-next"), { ssr: false })

// ✅ Schema de validação com Zod
const formSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(1, { message: "Nome é obrigatório" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
  whatsapp: z
    .string()
    .trim()
    .min(1, { message: "WhatsApp é obrigatório" })
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: "WhatsApp inválido" }),
  cnpj: z
    .string()
    .trim()
    .min(1, { message: "CNPJ é obrigatório" })
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, { message: "CNPJ inválido" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" })
    .max(255, { message: "Email deve ter no máximo 255 caracteres" }),
})

type FormData = z.infer<typeof formSchema>

const LandingPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Simula o envio
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Dados do formulário:", data)

      toast.success("Solicitação enviada com sucesso!", {
        description: "Em breve entraremos em contato via WhatsApp.",
      })

      reset()
    } catch (error) {
      toast.error("Erro ao enviar solicitação", {
        description: "Por favor, tente novamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Regularize seu MEI Hoje Mesmo
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Deixe todas as pendências e burocracias com a gente. Especialistas em regularização de MEI prontos para te ajudar.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Benefits */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-8">Por que escolher a MEI Resolve?</h2>

              <div className="space-y-4">
                {[
                  "Atendimento personalizado e ágil",
                  "Equipe especializada em legislação MEI",
                  "Processo 100% digital e seguro",
                  "Acompanhamento em tempo real",
                  "Garantia de regularização",
                  "Suporte contínuo após o serviço",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
              <h3 className="text-2xl font-bold mb-6 text-center">Solicite um Orçamento Gratuito</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="nome" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nome Completo *
                  </Label>
                  <Input
                    id="nome"
                    {...register("nome")}
                    placeholder="Digite seu nome completo"
                    className={errors.nome ? "border-destructive" : ""}
                  />
                  {errors.nome && <p className="text-sm text-destructive">{errors.nome.message}</p>}
                </div>

                {/* WhatsApp */}
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    WhatsApp *
                  </Label>
                  <Controller
                    name="whatsapp"
                    control={control}
                    render={({ field }) => (
                      <InputMask mask="(99) 99999-9999" {...field}>
                        {/* {(inputProps) => (
                          <Input
                            {...inputProps}
                            id="whatsapp"
                            placeholder="(00) 00000-0000"
                            className={errors.whatsapp ? "border-destructive" : ""}
                          />
                        )} */}
                      </InputMask>
                    )}
                  />
                  {errors.whatsapp && <p className="text-sm text-destructive">{errors.whatsapp.message}</p>}
                </div>

                {/* CNPJ */}
                <div className="space-y-2">
                  <Label htmlFor="cnpj" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    CNPJ *
                  </Label>
                  <Controller
                    name="cnpj"
                    control={control}
                    render={({ field }) => (
                      <InputMask mask="99.999.999/9999-99" {...field}>
                        {/* {(inputProps) => (
                          <Input
                            {...inputProps}
                            id="cnpj"
                            placeholder="00.000.000/0000-00"
                            className={errors.cnpj ? "border-destructive" : ""}
                          />
                        )} */}
                      </InputMask>
                    )}
                  />
                  {errors.cnpj && <p className="text-sm text-destructive">{errors.cnpj.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="seu@email.com"
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>

                <Button type="submit" className="w-full" variant="default" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Solicitar Orçamento Gratuito"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">* Campos obrigatórios</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Números que Inspiram Confiança</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-5xl font-bold text-primary mb-2">500+</p>
              <p className="text-muted-foreground">MEIs Regularizados</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary mb-2">98%</p>
              <p className="text-muted-foreground">Taxa de Sucesso</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary mb-2">5 Anos</p>
              <p className="text-muted-foreground">de Experiência</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
