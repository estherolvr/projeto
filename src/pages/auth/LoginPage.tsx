import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/app-store';
import { sleep } from '../../lib/utils';
import { Eye, EyeOff, Loader2, GraduationCap, HeadphonesIcon, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import FecapLogo from '../../components/ui/FecapLogo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const setActiveRole = useAppStore(state => state.setActiveRole);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await sleep(1500);
    setIsLoading(false);
    setActiveRole('aluno');
    navigate('/aluno');
  };

  const handleDemoLogin = (role: 'aluno' | 'asa' | 'admin') => {
    setActiveRole(role);
    navigate(`/${role}`);
  };

  return (
    <div className="flex min-h-screen w-full">

      {/* ── LEFT SIDE — Hero ASA ── */}
      <div
        className="hidden lg:flex w-1/2 flex-col justify-between p-12 text-white relative overflow-hidden"
        style={{ background: '#111419' }}
      >
        {/* Grade de fundo sutil */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg className="w-full h-full" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="500" height="500" fill="url(#grid)" />
          </svg>
        </div>

        {/* Orb roxo — canto superior direito */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-25 blur-3xl"
          style={{ background: '#7B3FBE' }}
        />

        {/* Orb teal — canto inferior esquerdo */}
        <div
          className="absolute -bottom-32 -left-20 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: '#00A878' }}
        />

        {/* Círculo teal decorativo (como no banner ASA) */}
        <div
          className="absolute bottom-32 right-8 w-48 h-48 rounded-full opacity-30 border-4"
          style={{ borderColor: '#00A878' }}
        />

        {/* Pontos roxos decorativos (como no banner ASA) */}
        <div className="absolute top-1/3 right-12 grid grid-cols-4 gap-2.5 opacity-40">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: '#7B3FBE' }} />
          ))}
        </div>

        {/* Arco amarelo (como no banner ASA) */}
        <div
          className="absolute bottom-16 right-20 w-32 h-32 rounded-full opacity-20"
          style={{ border: '3px solid #F5C000' }}
        />

        {/* CONTEÚDO */}
        <div className="relative z-10">
          {/* Accent bar tricolor */}
          <div className="flex gap-1 mb-10">
            <div className="h-1 w-8 rounded-full" style={{ background: '#7B3FBE' }} />
            <div className="h-1 w-8 rounded-full" style={{ background: '#F5C000' }} />
            <div className="h-1 w-8 rounded-full" style={{ background: '#00A878' }} />
          </div>

          {/* Logo */}
          <div className="flex items-center gap-3.5 mb-12">
            <FecapLogo variant="white" size={48} />
            <div>
              <span className="text-3xl font-black tracking-tight text-white">ASAIA</span>
              <p className="text-xs tracking-widest uppercase font-semibold" style={{ color: '#00A878' }}>
                Área do Sucesso do Aluno IA
              </p>
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-white max-w-sm">
            Atendimento<br />
            <span style={{ color: '#00A878' }}>inteligente</span><br />
            para você.
          </h1>

          <p className="mt-5 text-base max-w-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Tire dúvidas, abra chamados e acompanhe seu histórico — tudo em um só lugar.
          </p>

          {/* Feature pills */}
          <div className="mt-8 flex flex-col gap-2.5">
            {[
              { dot: '#00A878', label: 'Agente de IA 24/7' },
              { dot: '#7B3FBE', label: 'Chamados rastreáveis' },
              { dot: '#F5C000', label: 'Atendimento humano integrado' },
            ].map(({ dot, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dot }} />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.35)' }}>FECAP</span>
            <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.25)' }} />
            <span className="text-sm font-semibold" style={{ color: '#00A878' }}>ASA</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT SIDE — Formulário ── */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 sm:p-12 lg:p-20 bg-white dark:bg-slate-900 justify-center">
        <div className="w-full max-w-sm mx-auto">

          {/* Mobile Logo */}
          <div className="lg:hidden mb-8">
            <div className="flex gap-1 mb-4">
              <div className="h-1 w-6 rounded-full" style={{ background: '#7B3FBE' }} />
              <div className="h-1 w-6 rounded-full" style={{ background: '#F5C000' }} />
              <div className="h-1 w-6 rounded-full" style={{ background: '#00A878' }} />
            </div>
            <div className="flex items-center gap-2.5">
              <FecapLogo size={36} />
              <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">ASAIA</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Bem-vindo ao ASAIA
            </h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-8">
              Faça login com seu e-mail institucional.
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                  E-mail institucional
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@aluno.fecap.br"
                  className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-slate-700 rounded-lg
                             text-sm focus:ring-2 focus:ring-brand-600 focus:border-brand-600
                             dark:bg-slate-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-500
                             transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-slate-700 rounded-lg
                               text-sm focus:ring-2 focus:ring-brand-600 focus:border-brand-600
                               dark:bg-slate-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-500
                               transition-all outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white font-semibold py-2.5 rounded-lg
                           transition-all duration-150 flex items-center justify-center gap-2 shadow-md
                           disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #007A4D, #00A878)' }}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </button>

              <div className="text-center">
                <a href="#" className="text-sm text-gray-400 hover:text-brand-600 dark:text-slate-500 dark:hover:text-brand-400 transition-colors">
                  Esqueci minha senha
                </a>
              </div>
            </form>

            {/* Demo section */}
            <div className="mt-10 pt-6 border-t border-gray-100 dark:border-slate-800">
              <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 mb-4 text-center uppercase tracking-widest">
                Acessar como (Demo)
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { role: 'aluno' as const, icon: <GraduationCap size={18} />, label: 'Aluno', accent: '#00A878' },
                  { role: 'asa' as const, icon: <HeadphonesIcon size={18} />, label: 'ASA', accent: '#7B3FBE' },
                  { role: 'admin' as const, icon: <ShieldCheck size={18} />, label: 'Admin', accent: '#F5C000' },
                ].map(({ role, icon, label, accent }) => (
                  <button
                    key={role}
                    onClick={() => handleDemoLogin(role)}
                    className="flex flex-col items-center gap-1.5 px-3 py-3 text-xs font-medium
                               bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700/80
                               text-gray-600 dark:text-slate-400
                               border border-gray-200 dark:border-slate-700
                               rounded-xl transition-all duration-150 group"
                  >
                    <span className="transition-colors group-hover:text-current" style={{ color: accent }}>
                      {icon}
                    </span>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
