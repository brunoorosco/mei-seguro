import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import heroImage from "@/assets/hero.jpg"

const HeroSection = () => {
  return (
    <section className="section-hero py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Regularize seu MEI
              <span className="block text-[#fbc71e]"> sem complicação</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-lg">
              Resolva todas as pendências do seu MEI de forma rápida e segura. Cuidamos de toda a burocracia para você
              focar no que importa: seu negócio.
            </p>

            {/* Benefits */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-[#fbc71e] lex-shrink-0" />
                <span className="text-primary-foreground/90">Regularização completa</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-[#fbc71e] flex-shrink-0" />
                <span className="text-primary-foreground/90">Encerramento de MEI</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-[#fbc71e] flex-shrink-0" />
                <span className="text-primary-foreground/90">Suporte especializado</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-[#fbc71e] flex-shrink-0" />
                <span className="text-primary-foreground/90">Acompanhamento total</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="text-lg px-8 bg-[#fbc71e] text-black">
                Solicitar Orçamento
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
              >
                Saiba Mais
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-large">
              <img
                src={heroImage.src}
                alt="Profissional trabalhando com documentos MEI"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
