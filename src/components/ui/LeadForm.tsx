import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, ArrowRight, Loader2 } from 'lucide-react';

type UTMParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
};

const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: ''
  });
  const [utmParams, setUtmParams] = useState<UTMParams>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    // Capturar UTMs da URL
    const urlParams = new URLSearchParams(window.location.search);
    const utms: UTMParams = {};
    
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        utms[param as keyof UTMParams] = value;
      }
    });
    
    setUtmParams(utms);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!/^[\d\s\(\)\-\+]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Telefone inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const formatPhone = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica máscara brasileira
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    handleInputChange('phone', formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simular envio (aqui você pode integrar com sua API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Construir URL do Typebot com parâmetros
      const typebotUrl = new URL('https://typebot.co/aplica-es-automatik-labs-e4owx7x');
      
      // Adicionar dados do formulário
      typebotUrl.searchParams.set('name', formData.name);
      typebotUrl.searchParams.set('email', formData.email);
      typebotUrl.searchParams.set('phone', formData.phone);
      
      // Adicionar UTMs capturadas
      Object.entries(utmParams).forEach(([key, value]) => {
        if (value) {
          typebotUrl.searchParams.set(key, value);
        }
      });
      
      // Redirecionar para o Typebot
      window.location.href = typebotUrl.toString();
      
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-[600px] flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <User className="w-6 h-6 text-primary-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Vamos começar!</h3>
          <p className="text-white/70 text-sm">
            Preencha seus dados para receber uma proposta personalizada
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Nome */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-1.5">
              Nome completo *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-white/50" />
              </div>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full pl-9 pr-3 py-3 bg-white/10 border rounded-lg text-white text-sm placeholder:text-white/60 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.name 
                    ? 'border-red-500 focus:ring-red-500/50' 
                    : 'border-white/20 focus:border-primary-500/50 focus:ring-primary-500/20'
                }`}
                placeholder="Digite seu nome completo"
                disabled={isSubmitting}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Campo E-mail */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1.5">
              E-mail *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-white/50" />
              </div>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-9 pr-3 py-3 bg-white/10 border rounded-lg text-white text-sm placeholder:text-white/60 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500/50' 
                    : 'border-white/20 focus:border-primary-500/50 focus:ring-primary-500/20'
                }`}
                placeholder="seu@email.com"
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Campo Telefone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-1.5">
              Telefone/WhatsApp *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-4 w-4 text-white/50" />
              </div>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className={`w-full pl-9 pr-3 py-3 bg-white/10 border rounded-lg text-white text-sm placeholder:text-white/60 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.phone 
                    ? 'border-red-500 focus:ring-red-500/50' 
                    : 'border-white/20 focus:border-primary-500/50 focus:ring-primary-500/20'
                }`}
                placeholder="(11) 99999-9999"
                disabled={isSubmitting}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
            )}
          </div>

          {/* Botão de Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 disabled:from-primary-600 disabled:to-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group disabled:cursor-not-allowed mt-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                Continuar
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Informações de segurança */}
        <div className="mt-4 text-center">
          <p className="text-xs text-white/50">
            Seus dados estão seguros e não serão compartilhados com terceiros.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;