import React, { useEffect, useRef } from 'react';
import Container from '../ui/Container';
import GradientText from '../ui/GradientText';
import { MessageSquare, Users, Settings, Layers, ArrowRight, Bot, BrainCircuit, Workflow, Network } from 'lucide-react';

const Services: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }
    
    return () => {
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
    };
  }, []);

  return (
    <section id="services" className="py-20 md:py-32 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-950 -z-10" />
      <div className="absolute top-1/2 right-1/4 w-1/2 h-1/2 bg-primary-500/20 rounded-full blur-[96px] -z-10" />
      <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-accent-500/20 rounded-full blur-[96px] -z-10" />
      
      <Container>
        <div 
          ref={servicesRef} 
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-out"
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 mb-8">
              <span className="text-sm font-medium bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Nossas Soluções
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Soluções completas de <GradientText>Automação 360°</GradientText>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Desenvolvemos soluções personalizadas que integram inteligência artificial
              e automação para transformar todas as áreas do seu negócio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <ServiceCard 
              icon={<Bot className="w-10 h-10" />}
              title="Atendimento automatizado com IA humanizada"
              description="Agentes de IA que conversam naturalmente com seus clientes, resolvem problemas e conduzem vendas com personalidade e empatia."
              features={[
                "Atendimento 24/7 personalizado",
                "Integração com múltiplos canais",
                "Análise de sentimento em tempo real"
              ]}
            />
            <ServiceCard 
              icon={<BrainCircuit className="w-10 h-10" />}
              title="Automação do setor comercial"
              description="Sistemas inteligentes para prospecção, qualificação de leads, follow-up e recuperação de vendas perdidas, sem perder o toque humano."
              features={[
                "Qualificação automática de leads",
                "Sequências de follow-up inteligentes",
                "Análise preditiva de conversão"
              ]}
            />
            <ServiceCard 
              icon={<Workflow className="w-10 h-10" />}
              title="Otimização de processos internos"
              description="Automatização de tarefas operacionais repetitivas, liberando sua equipe para atividades estratégicas e de alto valor."
              features={[
                "Automação de processos (RPA)",
                "Integração entre sistemas",
                "Dashboards em tempo real"
              ]}
            />
            <ServiceCard 
              icon={<Network className="w-10 h-10" />}
              title="Integração de áreas com inteligência"
              description="Soluções que conectam todos os departamentos do seu negócio com fluxos de dados inteligentes e decisões baseadas em insights."
              features={[
                "Fluxos de trabalho automatizados",
                "BI com machine learning",
                "APIs inteligentes customizadas"
              ]}
            />
          </div>
          
          <div className="flex justify-center">
            <a 
              href="#apply" 
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dark-800/50 border border-dark-700/50 hover:border-primary-500/30 transition-all duration-300"
            >
              <span className="text-white/90 group-hover:text-white transition-colors">
                Conheça todas as possibilidades para seu negócio
              </span>
              <ArrowRight className="w-4 h-4 text-primary-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
};

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features }) => {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 to-accent-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-dark-800/50 backdrop-blur-sm p-8 rounded-2xl border border-dark-700/50 hover:border-primary-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10">
        <div className="flex items-start gap-5">
          <div className="bg-gradient-to-br from-primary-500/20 to-accent-500/20 p-4 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <div className="text-primary-400 group-hover:text-accent-400 transition-colors">
              {icon}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-white/70 mb-6">{description}</p>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;