import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Container from '../ui/Container';
import GradientText from '../ui/GradientText';
import ProjectCard from '../ui/ProjectCard';
import Modal from '../ui/Modal';
import { ArrowRight, Filter, Search } from 'lucide-react';

type Project = {
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  details?: {
    overview: string;
    features: string[];
    benefits: string[];
    integrations?: string[];
    examples?: {
      title: string;
      steps: string[];
    }[];
    metrics?: {
      label: string;
      value: string;
      improvement: string;
    }[];
  };
};

const projects: Project[] = [
  {
    title: "Super Agente de Clínicas e Consultórios",
    description: "Equipe completa de agentes de IA trabalhando em conjunto para maximizar resultados",
    image: "/Clinicas e consultorios.png",
    category: "Automação Avançada",
    tags: ["Multi-Agent", "Coordenação", "Produtividade"],
    details: {
      overview: "O Time de Agentes é uma solução revolucionária que permite que múltiplos agentes de IA trabalhem em conjunto, cada um com sua especialidade, para realizar tarefas complexas com precisão e eficiência incomparáveis.",
      features: [
        "Coordenação automática entre agentes especializados",
        "Distribuição inteligente de tarefas",
        "Comunicação fluida entre agentes",
        "Monitoramento em tempo real do progresso",
        "Escalabilidade dinâmica da equipe",
        "Aprendizado colaborativo contínuo"
      ],
      benefits: [
        "Aumento exponencial na produtividade e atendimento",
        "Redução significativa de erros",
        "Escalabilidade instantânea",
        "Resultados consistentes e de alta qualidade",
        "Economia de recursos humanos",
        "Disponibilidade 24/7"
      ],
      metrics: [
        { label: "Produtividade", value: "+300%", improvement: "vs. processos manuais" },
        { label: "Precisão", value: "99.7%", improvement: "taxa de acerto" },
        { label: "Velocidade", value: "10x", improvement: "mais rápido" }
      ],
      examples: [
        {
          title: "Exemplo: Agendamento de consultas por especialista",
          steps: [
            "Agente Agendamento: Agenda e faz o controle de presença",
            "Agente Relacionamento: Faz atendimento e esclarece primieras dúvidas",
            "Agente Administrativo: Cuida da cobrança e gestão dos recebimentos",
            "Agente Marketing: Garante atendimento e acompanhamentos posteriores"
          ]
        }
      ],
      integrations: [
        "Ferramentas de Gestão de Clínicas e Consultórios",
        "Integração com plataformas de planos de saúde e convênios",
        "Sistemas de Automação de Pacientes",
        "Software de Atendimentos"
      ]
    }
  },
  {
    title: "Super Analista de Marketing",
    description: "IA especializada em análise e otimização de campanhas de marketing digital",
    image: "/Super Analista_de Marketing_.png",
    category: "Marketing Intelligence",
    tags: ["Analytics", "Otimização", "ROI"],
    details: {
      overview: "Um analista virtual que utiliza IA avançada para otimizar suas campanhas de marketing e maximizar o ROI através de insights profundos e ações automatizadas.",
      features: [
        "Análise de dados em tempo real",
        "Otimização automática de campanhas",
        "Previsões de tendências",
        "Relatórios personalizados",
        "Segmentação inteligente",
        "A/B testing automatizado"
      ],
      benefits: [
        "Redução de 40% no custo por aquisição",
        "Aumento de 150% no ROI",
        "Insights acionáveis em tempo real",
        "Economia de tempo em análises",
        "Campanhas mais efetivas",
        "Decisões baseadas em dados"
      ],
      metrics: [
        { label: "ROI", value: "+150%", improvement: "aumento médio" },
        { label: "CAC", value: "-40%", improvement: "redução de custos" },
        { label: "Conversão", value: "+85%", improvement: "melhoria" }
      ],
      integrations: [
        "Google Analytics",
        "Facebook Ads",
        "Google Ads",
        "Plataformas de Email Marketing"
      ]
    }
  },
  {
    title: "Super Robô Assistente",
    description: "Assistente virtual inteligente para automação de processos e atendimento",
    image: "/Assistente pessoal IA.png",
    category: "Assistente Virtual",
    tags: ["Multimodal", "Automação", "Demonstração"],
    details: {
      overview: "A NORA Faz Tudo é uma super agente criada em n8n, que entende texto, imagem e voz — e pode fazer demonstrações automáticas do seu trabalho de automação para impressionar leads e fechar contratos com mais facilidade.",
      features: [
        "Mostra na prática como sua automação funciona",
        "Gera provas sociais para conquistar clientes",
        "Usa IA para entender as dores do lead e responder com eficiência",
        "Conexões prontas para WhatsApp, Google Calendar, Gmail e muito mais",
        "Interface multimodal (texto, voz, imagem)",
        "Demonstrações interativas em tempo real"
      ],
      benefits: [
        "Demonstrações automáticas impressionantes",
        "Maior taxa de conversão de leads",
        "Atendimento personalizado 24/7",
        "Integração perfeita com sistemas existentes",
        "Redução do ciclo de vendas",
        "Experiência do cliente aprimorada"
      ],
      metrics: [
        { label: "Conversão", value: "+200%", improvement: "de leads para clientes" },
        { label: "Tempo", value: "-60%", improvement: "ciclo de vendas" },
        { label: "Satisfação", value: "4.9/5", improvement: "rating médio" }
      ],
      integrations: [
        "WhatsApp Business",
        "Google Workspace",
        "CRM",
        "Ferramentas de Automação"
      ]
    }
  },
  {
    title: "Agente de Marketing",
    description: "Especialista em estratégias e execução de campanhas de marketing",
    image: "/Asistente_gest_processos.png",
    category: "Marketing Automation",
    tags: ["Campanhas", "Conteúdo", "Performance"],
    details: {
      overview: "Um agente especializado em analise de marketing, que automatiza e otimiza suas campanhas para máximo impacto, criando conteúdo personalizado e analisando performance continuamente.",
      features: [
        "Criação automática de conteúdo",
        "Segmentação inteligente",
        "A/B testing automático",
        "Análise de performance",
        "Otimização de budget",
        "Personalização em escala"
      ],
      benefits: [
        "Aumento de 200% no engajamento",
        "Redução de 60% no tempo de execução",
        "Maior consistência nas campanhas",
        "Otimização contínua",
        "Conteúdo sempre relevante",
        "ROI maximizado"
      ],
      metrics: [
        { label: "Engajamento", value: "+200%", improvement: "aumento médio" },
        { label: "Eficiência", value: "+60%", improvement: "tempo economizado" },
        { label: "Alcance", value: "3x", improvement: "maior audiência" }
      ],
      integrations: [
        "Redes Sociais",
        "Plataformas de Email Marketing",
        "CMS",
        "Analytics"
      ]
    }
  },
  {
    title: "Agente de Ligação com IA",
    description: "Automação inteligente de chamadas e follow-ups comerciais",
    image: "/Agente de atendimento.png",
    category: "Sales Automation",
    tags: ["Voz", "Follow-up", "Conversão"],
    details: {
      overview: "Um agente especializado em comunicação que automatiza e humaniza o processo de ligações e follow-ups, utilizando IA conversacional avançada para maximizar conversões.",
      features: [
        "Reconhecimento de voz natural",
        "Personalização dinâmica do discurso",
        "Gestão inteligente de objeções",
        "Agendamento automático",
        "Análise de sentimento em tempo real",
        "Follow-up contextual"
      ],
      benefits: [
        "Aumento de 150% na taxa de contato",
        "Redução de 80% no tempo de follow-up",
        "Maior satisfação do cliente",
        "Escalabilidade imediata",
        "Consistência na abordagem",
        "Disponibilidade total"
      ],
      metrics: [
        { label: "Taxa de Contato", value: "+150%", improvement: "melhoria" },
        { label: "Follow-up", value: "-80%", improvement: "tempo reduzido" },
        { label: "Conversão", value: "+120%", improvement: "aumento" }
      ],
      integrations: [
        "Sistema de Telefonia",
        "CRM",
        "Calendários",
        "Ferramentas de Vendas"
      ]
    }
  }
];

const Projects: React.FC = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(projectsRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];
  
  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-950 -z-10" />
      <div className="absolute top-1/2 left-1/4 w-1/2 h-1/2 bg-primary-500/20 rounded-full blur-[96px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-accent-500/20 rounded-full blur-[96px] -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <Container>
        <motion.div
          ref={projectsRef}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 mb-8 backdrop-blur-sm">
              <span className="text-sm font-medium bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Nossos Projetos
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8">
              Transformando negócios com <GradientText>IA sob medida</GradientText>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Conheça alguns dos nossos casos de sucesso em diferentes segmentos e como
              estamos revolucionando o mercado com soluções de IA personalizadas.
            </p>
          </motion.div>

          {/* Filters and Search */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } }
            }}
            className="flex flex-col md:flex-row gap-4 mb-12 justify-center items-center"
          >
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === category
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                      : 'bg-dark-800/50 text-white/70 hover:text-white border border-dark-700/50 hover:border-primary-500/30'
                  }`}
                >
                  {category === 'all' ? 'Todos' : category}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder="Buscar projetos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-dark-800/50 border border-dark-700/50 rounded-full text-white placeholder:text-white/50 focus:outline-none focus:border-primary-500/50 transition-colors"
              />
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onClick={() => handleOpenModal(project)}
              />
            ))}
          </motion.div>
        </motion.div>
      </Container>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedProject?.title || ''}
      >
        {selectedProject && (
          <ProjectDetails project={selectedProject} />
        )}
      </Modal>
    </section>
  );
};

type ProjectDetailsProps = {
  project: Project;
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  return (
    <div className="space-y-8">
      <div className="relative h-[300px] rounded-xl overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-500/20 border border-primary-500/30 rounded-full text-xs font-medium text-primary-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {project.details && (
        <>
          <div>
            <h4 className="text-lg font-semibold mb-3">Visão Geral</h4>
            <p className="text-white/80 leading-relaxed">{project.details.overview}</p>
          </div>

          {project.details.metrics && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Resultados Comprovados</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.details.metrics.map((metric, index) => (
                  <div key={index} className="bg-dark-800/50 rounded-xl p-4 border border-dark-700/50 text-center">
                    <div className="text-2xl font-bold text-primary-400 mb-1">{metric.value}</div>
                    <div className="text-sm font-medium mb-1">{metric.label}</div>
                    <div className="text-xs text-white/60">{metric.improvement}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Funcionalidades</h4>
              <div className="space-y-3">
                {project.details.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary-400" />
                    </div>
                    <p className="text-white/80">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Benefícios</h4>
              <div className="space-y-3">
                {project.details.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-500/20 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-accent-400" />
                    </div>
                    <p className="text-white/80">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {project.details.examples && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Exemplo de Fluxo de Trabalho</h4>
              {project.details.examples.map((example, index) => (
                <div key={index} className="bg-dark-800/50 rounded-xl p-6 border border-dark-700/50">
                  <h5 className="text-lg font-medium mb-4">{example.title}</h5>
                  <div className="space-y-4">
                    {example.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-sm font-bold">
                          {stepIndex + 1}
                        </div>
                        <p className="text-white/80 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {project.details.integrations && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Integrações</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.details.integrations.map((integration, index) => (
                  <div
                    key={index}
                    className="bg-dark-800/50 rounded-lg p-3 text-center text-white/80 border border-dark-700/50 hover:border-primary-500/30 transition-colors"
                  >
                    {integration}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Projects;
