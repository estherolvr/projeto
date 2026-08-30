import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, UploadCloud, CheckCircle2 } from 'lucide-react';
import { cn, sleep } from '../../lib/utils';

export default function NovoChamado() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const categories = ['Matrícula', 'Financeiro', 'Acadêmico', 'Documentos', 'Infraestrutura', 'Outros'];

  const handleNext = () => {
    if (step === 1 && title && category && description) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await sleep(1500); // simulate API call
    setIsLoading(false);
    setStep(3);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      {step < 3 && (
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Abrir Novo Chamado</h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">Descreva sua solicitação para a equipe do ASA.</p>
          </div>
        </div>
      )}

      {/* Stepper Indicator */}
      {step < 3 && (
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center w-full max-w-sm">
            <div className={cn("flex-1 h-1.5 rounded-full", step >= 1 ? "bg-brand-600" : "bg-gray-200 dark:bg-slate-700")} />
            <div className={cn("flex-1 h-1.5 rounded-full ml-2", step >= 2 ? "bg-brand-600" : "bg-gray-200 dark:bg-slate-700")} />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 1: Form */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm space-y-6"
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Assunto</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Problema com boleto da mensalidade"
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-brand-600 dark:bg-slate-900 dark:text-white outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-brand-600 dark:bg-slate-900 dark:text-white outline-none transition-all"
              >
                <option value="">Selecione uma categoria...</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Descrição</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Detalhe o máximo possível a sua solicitação..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-brand-600 dark:bg-slate-900 dark:text-white outline-none transition-all resize-y"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Anexos (opcional)</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
                <UploadCloud className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Clique ou arraste arquivos aqui</p>
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG até 10MB</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleNext}
                disabled={!title || !category || !description}
                className="px-6 py-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
              >
                Continuar
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Preview */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 p-4 rounded-lg text-sm">
              Confira os dados do seu chamado antes de enviar.
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                <span className="inline-block mt-2 px-2.5 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300">
                  {category}
                </span>
              </div>
              
              <div className="border-t border-gray-100 dark:border-slate-700 pt-6">
                <h4 className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-2">Descrição</h4>
                <p className="text-gray-800 dark:text-slate-200 whitespace-pre-wrap text-sm leading-relaxed">{description}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setStep(1)}
                disabled={isLoading}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-lg font-medium transition-colors"
              >
                Voltar e editar
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={cn(
                  "px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors",
                  isLoading && "opacity-80 cursor-not-allowed"
                )}
              >
                {isLoading ? 'Enviando...' : 'Confirmar e enviar'}
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Success */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <CheckCircle2 size={80} className="text-brand-500 mb-6" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Chamado criado com sucesso!</h2>
            <p className="text-lg text-gray-500 dark:text-slate-400 mb-8">
              Seu número é <strong className="text-gray-900 dark:text-white">#1058</strong>
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => navigate('/aluno/chamados')}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-lg font-medium transition-colors"
              >
                Voltar aos chamados
              </button>
              <button
                onClick={() => navigate('/aluno/chamados/ticket-new')}
                className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors"
              >
                Ver meu chamado
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
