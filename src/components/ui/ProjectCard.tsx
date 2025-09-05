import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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

type ProjectCardProps = {
  project: Project;
  index: number;
  onClick: () => void;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      } 
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 to-accent-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-dark-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-dark-700/50 hover:border-primary-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 h-full cursor-pointer">
        <div className="h-[400px] sm:h-[450px] md:h-[400px] lg:h-[450px] xl:h-[500px] relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-primary-500/20 border border-primary-500/30 rounded-full text-xs font-medium text-primary-400 backdrop-blur-sm">
              {project.category}
            </span>
          </div>
          
          {/* Tags */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 bg-dark-800/70 border border-dark-600/50 rounded-full text-xs text-white/80 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="px-2 py-1 bg-dark-800/70 border border-dark-600/50 rounded-full text-xs text-white/60 backdrop-blur-sm">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6" onClick={onClick}>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-white/70 mb-4 line-clamp-2">{project.description}</p>
          <button className="inline-flex items-center gap-2 text-primary-400 hover:text-accent-400 transition-colors group/link">
            Ver detalhes
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;