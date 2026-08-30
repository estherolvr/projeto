import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Plus, ArrowLeft, Bot, Book } from 'lucide-react';
import { mockConversations, ChatMessage } from '../../lib/mock-data';
import { formatRelative, cn, sleep } from '../../lib/utils';

export default function AlunoChat() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q');
  
  const [conversations] = useState(mockConversations.filter(c => c.studentId === 'aluno-01'));
  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id);
  const [messages, setMessages] = useState<ChatMessage[]>(conversations[0]?.messages || []);
  const [inputValue, setInputValue] = useState(initialQuery || '');
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false); // Mobile
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeConvId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialQuery && messages.length === conversations[0]?.messages.length) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    await sleep(1500);

    const newAiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: 'Entendo sua dúvida. Como este é um ambiente de demonstração, sugiro que abra um chamado caso seja algo urgente. Posso ajudar com mais alguma coisa?',
      timestamp: new Date().toISOString(),
      actions: [
        { label: 'Abrir chamado', action: 'novo-chamado' },
        { label: 'Falar com atendente', action: 'fila' }
      ]
    };

    setIsTyping(false);
    setMessages(prev => [...prev, newAiMsg]);
  };

  const suggestions = [
    'Como acompanho meu chamado?',
    'Como solicito um documento?',
    'Quero falar com o ASA'
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 overflow-hidden shadow-sm">
      
      {/* Sidebar - Conversas */}
      <div className={cn(
        "w-full lg:w-80 flex-shrink-0 border-r border-gray-200 dark:border-slate-800 flex flex-col transition-all absolute lg:relative z-20 bg-white dark:bg-slate-900 h-full",
        showSidebar ? "left-0" : "-left-full lg:left-0"
      )}>
        <div className="p-4 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 dark:text-white">Conversas</h2>
          <button className="lg:hidden text-gray-500 hover:text-gray-700" onClick={() => setShowSidebar(false)}>
            <ArrowLeft size={20} />
          </button>
        </div>
        <div className="p-4">
          <button className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-brand-600 text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg font-medium transition-colors">
            <Plus size={18} />
            Nova conversa
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => {
                setActiveConvId(conv.id);
                setMessages(conv.messages);
                setShowSidebar(false);
              }}
              className={cn(
                "w-full text-left p-4 border-b border-gray-100 dark:border-slate-800/50 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors",
                activeConvId === conv.id && "bg-brand-50 dark:bg-brand-900/10 border-l-4 border-l-brand-600"
              )}
            >
              <h3 className="font-medium text-gray-900 dark:text-white truncate">{conv.title}</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 line-clamp-1">{conv.lastMessage}</p>
              <p className="text-xs text-gray-400 mt-2">{formatRelative(conv.timestamp)}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative w-full">
        {/* Header */}
        <div className="h-16 border-b border-gray-200 dark:border-slate-800 px-4 flex items-center justify-between shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg" onClick={() => setShowSidebar(true)}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">{activeConv?.title || 'Nova Conversa'}</h2>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400 border border-brand-100 dark:border-brand-800">
            <Bot size={14} />
            ASAIA · IA
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex max-w-[85%] sm:max-w-[75%]", msg.role === 'user' ? "ml-auto justify-end" : "mr-auto")}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 mr-3 mt-1">
                  <Bot size={18} />
                </div>
              )}
              
              <div className="flex flex-col gap-2">
                <div className={cn(
                  "p-4",
                  msg.role === 'user' 
                    ? "bg-brand-600 text-white rounded-2xl rounded-tr-sm" 
                    : "bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-slate-200 rounded-2xl rounded-tl-sm border border-gray-100 dark:border-slate-700"
                )}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>

                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {msg.actions.map((act, i) => (
                      <button key={i} className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:border-brand-600 hover:text-brand-600 dark:hover:text-brand-400 transition-colors bg-white dark:bg-slate-900">
                        {act.label}
                      </button>
                    ))}
                  </div>
                )}

                {msg.sources && msg.sources.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500 dark:text-slate-400">
                    <Book size={12} />
                    <span>Fontes: {msg.sources.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex max-w-[75%] mr-auto">
               <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 mr-3 mt-1">
                  <Bot size={18} />
                </div>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl rounded-tl-sm border border-gray-100 dark:border-slate-700 p-4 py-5 flex items-center gap-1">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setInputValue(s)}
                  className="whitespace-nowrap px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 rounded-full transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
            
            <div className="relative flex items-end gap-2 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-2 focus-within:border-brand-600 focus-within:ring-1 focus-within:ring-brand-600 transition-all">
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl shrink-0">
                <Paperclip size={20} />
              </button>
              
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(inputValue);
                  }
                }}
                placeholder="Digite sua mensagem..."
                className="w-full max-h-32 min-h-[44px] bg-transparent border-0 focus:ring-0 resize-none py-2.5 text-gray-900 dark:text-white outline-none"
                rows={1}
              />
              
              <button
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 bg-brand-600 text-white rounded-xl shrink-0 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-[10px] text-gray-400">ASAIA pode cometer erros. Considere verificar as informações importantes.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
