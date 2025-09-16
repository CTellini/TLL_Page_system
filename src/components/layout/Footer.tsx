import React from 'react';
import Container from '../ui/Container';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-950 border-t border-dark-800/50 py-16">
      <Container>
        <div className="text-center">
          <div className="text-2xl font-display font-bold mb-4">
            <GradientText>TELLCON Systems</GradientText>
          </div>
          <p className="text-white/70 max-w-sm mx-auto">
            O futuro dos negócios começa aqui !
          </p>
        </div>

        <div className="border-t border-dark-800/50 mt-10 pt-10">
          <p className="text-white/50 text-sm text-center">
            © {new Date().getFullYear()} Tellcon Systems é uma divisão da Tellcon Business Network Ltda. 
            CNPJ: 04.918.985/0001-90 
            Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
};

const GradientText = ({ children, className = '' }) => {
  return (
    <span className={`bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};

export default Footer;
