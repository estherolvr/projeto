import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { mockTickets, mockMessages, mockStudents } from '@/lib/mock-data';
import { useParams } from 'react-router-dom';
import { 
  Check, Clock, AlertTriangle, User, Paperclip, Send, BrainCircuit, 
  ThumbsDown, ChevronDown, Bot, Sparkles
} from 'lucide-react';

export default function AsaDetalheChamado() {
  const { id } = useParams();
  const ticket = mockTickets.find(t => t.id === id) || mockTickets[0];
  const student = mockStudents.find(s => s.id === ticket.studentId);
  const [messages, setMessages] = useState(mockMessages.filter(m => m.ticketId === ticket.id));
  const [replyText, setReplyText] = useState('');

  const handleSend = () => {
    if (!replyText.trim()) return;
    const newMsg = {
      id: `msg-new-${Date.now()}`,
      ticketId: ticket.id,
      sender: 'asa' as const,
      senderName: 'Fernanda Costa',
      content: replyText,
      timestamp: new Date().toISOString()
    };
    setMessages([...messages, newMsg]);
    setReplyText('');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[calc(100vh-64px)] flex flex-col md:flex-row overflow-hidden bg-gray-50 dark:bg-slate-900">
      
      {/* LEFT COLUMN: Ticket & Student Info */}
      <div className="w-full md:w-[280px] flex-shrink-0 border-r border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-y-auto p-4 flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-slate-400 mb-2">
            <span>#{ticket.number}</span>
            <span>•</span>
            <span className="capitalize">{ticket.category}</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 leading-tight mb-4">{ticket.title}</h2>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Status</label>
              <button className="w-full flex items-center justify-between px-3 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-sm font-medium">
                Em atendimento <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Prioridade</label>
              <button className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-slate-600 rounded-lg text-sm font-medium">
                Alta <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="pt-2 border-t border-gray-100 dark:border-slate-700">
              <label className="text-xs text-gray-500 mb-1 block">Responsável</label>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">F</div>
                  <span className="text-sm font-medium text-gray-900 dark:text-slate-100">Fernanda Costa</span>
                </div>
                <button className="text-xs text-brand-600 hover:underline">Reatribuir</button>
              </div>
            </div>
            <div className="pt-2">
              <label className="text-xs text-gray-500 mb-1 block">SLA</label>
              <div className="flex items-center gap-2 text-sm font-medium text-red-600">
                <Clock className="w-4 h-4" /> 02:28:15 restantes
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
          <h3 className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-3 flex items-center gap-2">
            <User className="w-4 h-4" /> Dados do Aluno
          </h3>
          {student && (
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-gray-900 dark:text-slate-100">{student.name}</p>
              <p className="text-gray-500">RA: {student.ra}</p>
              <p className="text-gray-500">{student.course} - {student.semester}º Semestre</p>
              <span className="inline-block px-2 py-1 mt-1 bg-green-50 text-green-700 text-xs rounded-full">Matriculado</span>
              <button className="block mt-3 text-brand-600 text-xs hover:underline">Ver perfil completo</button>
            </div>
          )}
        </div>
      </div>

      {/* CENTER COLUMN: Chat */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-slate-900 min-w-0">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'asa' ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-xs font-medium text-gray-700 dark:text-slate-300">
                  {msg.sender === 'ia' ? 'Assistente Virtual' : msg.senderName}
                </span>
                <span className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm ${
                msg.sender === 'asa' 
                  ? 'bg-brand-600 text-white rounded-tr-none' 
                  : msg.sender === 'ia'
                    ? 'bg-brand-50 dark:bg-brand-900/20 text-gray-800 dark:text-slate-200 border border-brand-100 dark:border-brand-800 rounded-tl-none'
                    : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 border border-gray-100 dark:border-slate-700 rounded-tl-none'
              }`}>
                {msg.sender === 'ia' && (
                  <div className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 mb-2 font-medium text-xs">
                    <Bot className="w-4 h-4" /> Resposta Automática
                  </div>
                )}
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Reply Area */}
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
          <div className="relative">
            <textarea 
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Digite sua resposta para o aluno..."
              className="w-full min-h-[100px] p-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none text-sm dark:text-slate-100"
            />
            <div className="absolute bottom-3 left-3 flex gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setReplyText(ticket.aiSuggestion?.recommendation || '')}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-brand-600 bg-brand-50 dark:bg-brand-900/30 hover:bg-brand-100 dark:hover:bg-brand-900/50 rounded-lg transition-colors"
              >
                <Sparkles className="w-4 h-4" /> Usar sugestão IA
              </button>
            </div>
            <button 
              onClick={handleSend}
              disabled={!replyText.trim()}
              className="absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Enviar <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: AI Analysis */}
      <div className="w-full md:w-[300px] flex-shrink-0 border-l border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-y-auto">
        <div className="p-4 border-b border-gray-100 dark:border-slate-700 bg-brand-50/50 dark:bg-brand-900/10">
          <div className="flex items-center gap-2 text-brand-700 dark:text-brand-400 font-semibold">
            <BrainCircuit className="w-5 h-5" />
            Análise ASAIA
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse ml-auto"></span>
          </div>
        </div>
        
        {ticket.aiSuggestion ? (
          <div className="p-4 space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Intenção Identificada</h4>
              <p className="text-sm font-medium text-gray-900 dark:text-slate-100">{ticket.aiSuggestion.intent}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-500" style={{ width: `${ticket.aiSuggestion.confidence * 100}%` }}></div>
                </div>
                <span className="text-xs font-medium text-gray-500">{Math.round(ticket.aiSuggestion.confidence * 100)}%</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Resumo</h4>
              <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">{ticket.aiSuggestion.summary}</p>
            </div>

            <div className="flex gap-2">
              <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 text-xs rounded-md">
                Cat: {ticket.aiSuggestion.category}
              </span>
              {ticket.aiSuggestion.sentiment === 'negativo' && (
                <span className="px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-md flex items-center gap-1">
                  <ThumbsDown className="w-3 h-3" /> Insatisfeito
                </span>
              )}
            </div>

            <div className="bg-brand-50 dark:bg-brand-900/20 p-3 rounded-lg border border-brand-100 dark:border-brand-800/30">
              <h4 className="text-xs font-semibold text-brand-700 dark:text-brand-400 uppercase tracking-wider mb-2">Ação Recomendada</h4>
              <p className="text-sm text-gray-700 dark:text-slate-300 mb-3">{ticket.aiSuggestion.recommendation}</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setReplyText(ticket.aiSuggestion?.recommendation || '')}
                  className="flex-1 py-1.5 bg-white dark:bg-slate-800 border border-brand-200 dark:border-brand-700 text-brand-700 dark:text-brand-400 text-xs font-medium rounded shadow-sm hover:bg-brand-50 transition-colors"
                >
                  Usar texto
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Fontes Consultadas</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">FAQ Matrícula v2.1</a></li>
                <li><a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Manual do Aluno (Cap 4)</a></li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">
            Nenhuma análise de IA disponível para este chamado.
          </div>
        )}
      </div>
    </motion.div>
  );
}
