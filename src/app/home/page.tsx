import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import TestimonialsSection from '@/components/TestimonialsSection'

const Home = () => {
	return (
		<div className="min-h-screen">
			<Navigation />
			<HeroSection />
			<ServicesSection />
			<TestimonialsSection />

			{/* Footer */}
			<footer className="bg-card border-t border-border py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-4 gap-8">
						<div className="md:col-span-2">
							<h3 className="text-lg font-semibold mb-4">MEI Resolve</h3>
							<p className="text-muted-foreground mb-4">
								Especialistas em regularização de MEI. Cuidamos de toda a
								burocracia para você focar no que realmente importa: seu
								negócio.
							</p>
						</div>

						<div>
							<h4 className="font-semibold mb-4">Serviços</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>Regularização de Pendências</li>
								<li>Encerramento de MEI</li>
								<li>Reativação de MEI</li>
								<li>Consultoria Especializada</li>
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4">Contato</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>WhatsApp: (11) 94937-0599</li>
								<li>Email: contato@meiresolve.com</li>
								<li>Seg-Sex: 8h às 18h</li>
							</ul>
						</div>
					</div>

					<div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
						<p>&copy; 2025 MEI Seguro. Todos os direitos reservados.</p>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default Home
