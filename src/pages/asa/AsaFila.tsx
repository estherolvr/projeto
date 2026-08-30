import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, X, ChevronDown, ChevronUp } from 'lucide-react';
import { mockTickets, mockStudents, mockUsers } from '@/lib/mock-data';
import { Link, useNavigate } from 'react-router-dom';

export default function AsaFila() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>(['Em atendimento']);

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'aberto': return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'em_atendimento': return 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400';
      case 'aguardando_aluno': return 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
      case 'resolvido': return 'bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400';
      default: return 'bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch(priority) {
      case 'critica': return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      case 'alta': return 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
      case 'media': return 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400';
      default: return 'bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 md:p-6 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-slate-100">Fila de atendimento</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-slate-400">
            <span>Total: 156</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>Abertos: 42</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>Em atendimento: 18</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span className="text-red-500 font-medium">SLA em risco: 5</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 transition-colors">
            <Filter className="w-4 h-4" /> Filtros
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 transition-colors">
            <Download className="w-4 h-4" /> Exportar
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Buscar por chamado, aluno ou assunto..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {activeFilters.map(filter => (
              <span key={filter} className="inline-flex items-center gap-1 px-3 py-1 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 rounded-full text-sm font-medium">
                {filter}
                <button onClick={() => removeFilter(filter)} className="hover:bg-brand-100 dark:hover:bg-brand-900/40 rounded-full p-0.5">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-slate-900/50 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800"># <ChevronDown className="w-3 h-3 inline" /></th>
                <th className="px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800">Aluno</th>
                <th className="px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800">Assunto</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Prioridade</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Responsável</th>
                <th className="px-4 py-3">SLA</th>
                <th className="px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800">Atualização <ChevronDown className="w-3 h-3 inline" /></th>
              </tr>
            </thead>
            <tbody>
              {mockTickets.map(ticket => {
                const student = mockStudents.find(s => s.id === ticket.studentId);
                const assignee = mockUsers.find(u => u.id === ticket.assignedTo);
                
                return (
                  <tr 
                    key={ticket.id} 
                    onClick={() => navigate(`/asa/chamados/${ticket.id}`)}
                    className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-4 font-medium text-gray-900 dark:text-slate-100">#{ticket.number}</td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900 dark:text-slate-100">{student?.name || 'Desconhecido'}</div>
                      <div className="text-xs text-gray-500">{student?.ra}</div>
                    </td>
                    <td className="px-4 py-4 max-w-[200px] truncate text-gray-700 dark:text-slate-300">
                      {ticket.title}
                    </td>
                    <td className="px-4 py-4 text-gray-600 dark:text-slate-400 capitalize">{ticket.category}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityStyle(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusStyle(ticket.status)}`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {assignee ? (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-400 flex items-center justify-center text-xs font-bold">
                            {assignee.name.charAt(0)}
                          </div>
                          <span className="text-gray-700 dark:text-slate-300">{assignee.name.split(' ')[0]}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Não atribuído</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`flex items-center gap-1.5 text-xs font-medium ${ticket.slaStatus === 'risk' ? 'text-red-600' : ticket.slaStatus === 'breached' ? 'text-red-800' : 'text-brand-600'}`}>
                        <div className={`w-2 h-2 rounded-full ${ticket.slaStatus === 'risk' ? 'bg-red-500 animate-pulse' : ticket.slaStatus === 'breached' ? 'bg-red-800' : 'bg-brand-500'}`} />
                        {new Date(ticket.slaDeadline).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-500 text-xs">
                      {new Date(ticket.updatedAt).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center text-sm text-gray-500">
          <span>Mostrando 1 a 10 de 156 resultados</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 dark:border-slate-700 rounded hover:bg-gray-50 dark:hover:bg-slate-700" disabled>Anterior</button>
            <button className="px-3 py-1 border border-brand-600 bg-brand-600 text-white rounded">1</button>
            <button className="px-3 py-1 border border-gray-200 dark:border-slate-700 rounded hover:bg-gray-50 dark:hover:bg-slate-700">2</button>
            <button className="px-3 py-1 border border-gray-200 dark:border-slate-700 rounded hover:bg-gray-50 dark:hover:bg-slate-700">Próximo</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
