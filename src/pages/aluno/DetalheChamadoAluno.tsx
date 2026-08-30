import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, User, Tag, Paperclip, Send, Bot } from 'lucide-react';
import { mockTickets, mockMessages, Message } from '../../lib/mock-data';
import { formatDateTime, cn, sleep } from '../../lib/utils';
import { motion } from 'framer-motion';

const statusConfig: Record<string, { label: string; className: string }> = {
  aberto: { label: 'Aberto', className: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' },
  em_atendimento: { label: 'Em atendimento', className: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' },
  aguardando_aluno: { label: 'Aguardando você', className: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' },
  resolvido: { label: 'Resolvido', className: 'bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400' },
  fechado: { label: 'Fechado', className: 'bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-gray-400' },
};

const priorityConfig: Record<string, { label: string; className: string }> = {
  baixa: { label: 'Baixa', className: 'text-gray-500 bg-gray-100 dark:bg-slate-800' },
  media: { label: 'Média', className: 'text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20' },
  alta: { label: 'Alta', className: 'text-orange-700 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20' },
  critica: { label: 'Crítica', className: 'text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-900/20' },
};

export default function DetalheChamadoAluno() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // For demo, we just fallback to ticket-01 if not found
  const ticket = mockTickets.find(t => t.id === id) || mockTickets[0];
  const initialMessages = mockMessages.filter(m => m.ticketId === ticket.id);
  
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    setIsSending(true);

    const msg: Message = {
      id: Date.now().toString(),
      ticketId: ticket.id,
      sender: 'aluno',
      senderName: 'Esther Rodrigues', // hardcoded for demo
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, msg]);
    setNewMessage('');
    await sleep(500);
    setIsSending(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/aluno/chamados')} className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">#{ticket.number}</span>
            <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", statusConfig[ticket.status].className)}>
              {statusConfig[ticket.status].label}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{ticket.title}</h1>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 flex flex-wrap gap-y-4 gap-x-8">
        <div className="space-y-1">
          <span className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1.5"><Tag size={14}/> Categoria</span>
          <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{ticket.category}</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1.5"><Clock size={14}/> Criado em</span>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{formatDateTime(ticket.createdAt)}</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1.5"><User size={14}/> Atendente</span>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{ticket.assignedTo ? 'Equipe ASA' : 'Aguardando atribuição'}</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6 mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Histórico</h2>
        
        <div className="space-y-6">
          {messages.map((msg, idx) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-4 p-5 rounded-xl border",
                msg.sender === 'ia' ? "bg-brand-50/50 border-brand-100 dark:bg-brand-900/10 dark:border-brand-900/20" :
                msg.sender === 'aluno' ? "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 ml-4 sm:ml-12" :
                "bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 mr-4 sm:mr-12"
              )}
            >
              <div className="shrink-0 mt-1">
                {msg.sender === 'ia' ? (
                  <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center">
                    <Bot size={18} />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-300 flex items-center justify-center font-medium text-sm">
                    {msg.senderName.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-gray-900 dark:text-white flex items-center gap-2">
                    {msg.senderName}
                    {msg.sender === 'ia' && <span className="text-[10px] uppercase tracking-wider text-brand-600 font-bold">IA</span>}
                    {msg.sender === 'asa' && <span className="text-[10px] uppercase tracking-wider text-blue-600 font-bold bg-blue-100 px-1.5 py-0.5 rounded">ASA</span>}
                  </span>
                  <span className="text-xs text-gray-500">{formatDateTime(msg.timestamp)}</span>
                </div>
                <div className="text-sm text-gray-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      {ticket.status !== 'fechado' && ticket.status !== 'resolvido' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 sticky bottom-4 shadow-lg shadow-gray-200/20 dark:shadow-none">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escreva sua mensagem..."
            className="w-full bg-transparent border-0 focus:ring-0 resize-none py-2 text-gray-900 dark:text-white outline-none min-h-[80px]"
          />
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-slate-700">
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-lg">
              <Paperclip size={20} />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || isSending}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Send size={16} />
              {isSending ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
