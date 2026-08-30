import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, FileText, Eye, Clock } from 'lucide-react';
import { mockKBDocuments } from '@/lib/mock-data';

export default function AsaBaseConhecimento() {
  const categories = ['Todos', 'Matrícula', 'Financeiro', 'Acadêmico', 'Documentos'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-slate-100">Base de Conhecimento</h1>
          <p className="text-gray-500 text-sm mt-1">Gerencie os documentos que alimentam a IA e auxiliam os atendentes.</p>
        </div>
        <button className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors">
          Novo Documento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
           <div><p className="text-sm text-gray-500">Total de Artigos</p><p className="text-2xl font-bold text-gray-900 dark:text-slate-100">124</p></div>
           <BookOpen className="w-8 h-8 text-blue-500 opacity-80" />
         </div>
         <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
           <div><p className="text-sm text-gray-500">Artigos Indexados (IA)</p><p className="text-2xl font-bold text-gray-900 dark:text-slate-100">118</p></div>
           <FileText className="w-8 h-8 text-brand-500 opacity-80" />
         </div>
         <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
           <div><p className="text-sm text-gray-500">Visualizações Hoje</p><p className="text-2xl font-bold text-gray-900 dark:text-slate-100">892</p></div>
           <Eye className="w-8 h-8 text-purple-500 opacity-80" />
         </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
        <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Buscar na base..." className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {categories.map((cat, i) => (
              <button key={cat} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-slate-900/50">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3">Atualização</th>
              </tr>
            </thead>
            <tbody>
              {mockKBDocuments.map(doc => (
                <tr key={doc.id} className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer">
                  <td className="px-4 py-4 font-medium text-gray-900 dark:text-slate-100">
                    {doc.title}
                    {doc.indexed && <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-brand-100 text-brand-700 rounded uppercase font-bold">Indexado</span>}
                  </td>
                  <td className="px-4 py-4 text-gray-600">{doc.category}</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">{doc.status}</span>
                  </td>
                  <td className="px-4 py-4 text-gray-600 flex items-center gap-1"><Eye className="w-3 h-3"/> {doc.views}</td>
                  <td className="px-4 py-4 text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3"/> {new Date(doc.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
