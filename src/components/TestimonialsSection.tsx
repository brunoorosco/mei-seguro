import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Maria Silva",
    business: "Loja de Roupas Online",
    content:
      "Estava com várias pendências no meu MEI e não sabia por onde começar. A equipe resolveu tudo rapidamente e com muito profissionalismo. Recomendo!",
    rating: 5,
    avatar: "MS",
  },
  {
    name: "João Santos",
    business: "Serviços de Informática",
    content:
      "Precisava encerrar meu MEI para abrir uma empresa maior. O processo foi muito mais simples do que imaginava. Excelente atendimento!",
    rating: 5,
    avatar: "JS",
  },
  {
    name: "Ana Costa",
    business: "Consultoria Freelancer",
    content:
      "O acompanhamento mensal me dá muita tranquilidade. Nunca mais esqueci de pagar o DAS ou fazer declarações. Vale muito a pena!",
    rating: 5,
    avatar: "AC",
  },
  {
    name: "Carlos Oliveira",
    business: "Food Truck",
    content:
      "Meu MEI estava cancelado há meses. Conseguiram reativar tudo certinho e agora posso trabalhar tranquilo novamente. Muito obrigado!",
    rating: 5,
    avatar: "CO",
  },
  {
    name: "Lucia Ferreira",
    business: "Estética e Beleza",
    content:
      "Atendimento nota 10! Explicaram tudo de forma clara e resolveram minhas pendências em tempo recorde. Super indico!",
    rating: 5,
    avatar: "LF",
  },
  {
    name: "Roberto Lima",
    business: "Transporte Particular",
    content:
      "Estava perdido com as obrigações do MEI. A consultoria me ajudou a entender tudo e agora sei exatamente o que preciso fazer.",
    rating: 5,
    avatar: "RL",
  },
]

const TestimonialsSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">O que nossos clientes dizem</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mais de 500 MEIs já confiam em nossos serviços para manter seus negócios regularizados.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-elevated">
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-[#fbc71e] fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.business}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-muted-foreground">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-[#fbc71e] fill-current" />
              ))}
            </div>
            <span className="text-lg font-semibold">4.9/5</span>
            <span>•</span>
            <span>500+ clientes satisfeitos</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
