"use client"

import { useState, useTransition } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { CheckCircle, Phone, Mail, FileText, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { submitLead } from "@/app/actions/newLead"
import { leadSchema } from "@/schemas/lead"

type FormData = z.infer<typeof leadSchema>

// --- helpers de máscara (sem libs)
function maskPhone(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 11)
  const part1 = digits.slice(0, 2)
  const part2 = digits.slice(2, 7)
  const part3 = digits.slice(7, 11)
  if (digits.length <= 2) return `(${part1}`
  if (digits.length <= 7) return `(${part1}) ${part2}`
  return `(${part1}) ${part2}-${part3}`
}

function maskCNPJ(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 14)
  const p1 = d.slice(0, 2)
  const p2 = d.slice(2, 5)
  const p3 = d.slice(5, 8)
  const p4 = d.slice(8, 12)
  const p5 = d.slice(12, 14)
  let out = p1
  if (d.length > 2) out += `.${p2}`
  if (d.length > 5) out += `.${p3}`
  if (d.length > 8) out += `/${p4}`
  if (d.length > 12) out += `-${p5}`
  return out
}

const LandingPage = () => {
  const [openSuccess, setOpenSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: { nome: "", whatsapp: "", cnpj: "", email: "" },
  })

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      const res = await submitLead(data)
      if (res.ok) {
        reset()
        setOpenSuccess(true)
      } else {
        toast.error("Erro ao enviar solicitação", { description: res.error ?? "Tente novamente." })
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      {/* Modal de sucesso */}
      <Dialog open={openSuccess} onOpenChange={setOpenSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Solicitação enviada!
            </DialogTitle>
            <DialogDescription>
              Recebemos seus dados. Em breve entraremos em contato pelo WhatsApp e email informados.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpenSuccess(false)}>Ok, obrigado</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section className="relative py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Regularize seu MEI Hoje Mesmo
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Deixe todas as pendências e burocracias com a gente. Especialistas em regularização de
              MEI prontos para te ajudar.
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
              <h3 className="text-2xl font-bold mb-6 text-center">
                Solicite um Orçamento Gratuito
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
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
                    aria-invalid={!!errors.nome}
                    className={errors.nome ? "border-destructive" : ""}
                  />
                  {errors.nome && <p className="text-sm text-destructive">{errors.nome.message}</p>}
                </div>

                {/* WhatsApp (com máscara) */}
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    WhatsApp *
                  </Label>
                  <Controller
                    name="whatsapp"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="whatsapp"
                        inputMode="numeric"
                        placeholder="(00) 00000-0000"
                        value={field.value}
                        onChange={(e) => field.onChange(maskPhone(e.target.value))}
                        onBlur={field.onBlur}
                        aria-invalid={!!errors.whatsapp}
                        className={errors.whatsapp ? "border-destructive" : ""}
                      />
                    )}
                  />
                  {errors.whatsapp && (
                    <p className="text-sm text-destructive">{errors.whatsapp.message}</p>
                  )}
                </div>

                {/* CNPJ (com máscara) */}
                <div className="space-y-2">
                  <Label htmlFor="cnpj" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    CNPJ *
                  </Label>
                  <Controller
                    name="cnpj"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="cnpj"
                        inputMode="numeric"
                        placeholder="00.000.000/0000-00"
                        value={field.value}
                        onChange={(e) => field.onChange(maskCNPJ(e.target.value))}
                        onBlur={field.onBlur}
                        aria-invalid={!!errors.cnpj}
                        className={errors.cnpj ? "border-destructive" : ""}
                      />
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
                    aria-invalid={!!errors.email}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {/* Campo honeypot anti-spam (oculto) */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                  {isPending ? "Enviando..." : "Solicitar Orçamento Gratuito"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">* Campos obrigatórios</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-card/50">
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
