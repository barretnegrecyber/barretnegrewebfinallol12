import React, { useState, useEffect, useRef } from 'react';
import { Message, TerminalState, Language } from '../types';
import { motion } from 'framer-motion';

interface TerminalProps {
  language: Language;
}

const welcomeTextEs = `Barret Negre OS [Kernel 6.1.0-parrot1-amd64]
(c) 2025 Cooperative Security.

[+] Conexión segura establecida.
[*] Foco: Web Security & Server Hardening.

Escribe "help" para ver catálogo de servicios...`;

const welcomeTextCa = `Barret Negre OS [Kernel 6.1.0-parrot1-amd64]
(c) 2025 Cooperative Security.

[+] Connexió segura establerta.
[*] Focus: Web Security & Server Hardening.

Escriu "help" per veure el catàleg de serveis...`;

const Terminal: React.FC<TerminalProps> = ({ language }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: welcomeTextEs, timestamp: new Date() }
  ]);
  const [status, setStatus] = useState<TerminalState>(TerminalState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = language === 'ca' ? welcomeTextCa : welcomeTextEs;
    setMessages([{ role: 'model', text: text, timestamp: new Date() }]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || status === TerminalState.PROCESSING) return;

    const rawInput = input;
    const userMsg: Message = { role: 'user', text: rawInput, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    if (rawInput.trim().toLowerCase() === 'help') {
        const helpTextEs = `[*] BARRET NEGRE - CATÁLOGO DE SERVICIOS ACTIVOS:

[01] AUDITORÍA WEB & PENTESTING
     > Análisis OWASP Top 10, Inyecciones (SQL/NoSQL), XSS.
     > Pruebas de lógica de negocio y seguridad en APIs.

[02] SEGURIDAD DE SERVIDORES (HARDENING)
     > Blindaje de sistemas Linux/Windows.
     > Gestión de permisos, firewalling y prevención de escalada.

[03] AUDITORÍA DE CÓDIGO FUENTE
     > Revisión estática (SAST) para hallar vulnerabilidades en el core.
     > Detección de backdoors y malas prácticas de desarrollo.

[04] RED TEAMING & SIMULACIÓN
     > Emulación de adversarios reales (APT).
     > Compromiso total de infraestructura bajo reglas de engagement.

Escribe tu consulta en lenguaje natural para iniciar un módulo...`;

        const helpTextCa = `[*] BARRET NEGRE - CATÀLEG DE SERVEIS ACTIUS:

[01] AUDITORIA WEB I PENTESTING
     > Anàlisi OWASP Top 10, Injeccions (SQL/NoSQL), XSS.
     > Proves de lògica de negoci i seguretat en APIs.

[02] SEGURETAT DE SERVIDORS (HARDENING)
     > Blindatge de sistemes Linux/Windows.
     > Gestió de permisos, firewalling i prevenció d'escalada.

[03] AUDITORIA DE CODI FONT
     > Revisió estàtica (SAST) per trobar vulnerabilitats al core.
     > Detecció de backdoors i males pràctiques de desenvolupament.

[04] RED TEAMING I SIMULACIÓ
     > Emulació d'adversaris reals (APT).
     > Compromís total d'infraestructura sota regles d'engagement.

Escriu la teva consulta en llenguatge natural per iniciar un mòdul...`;
        
        const helpText = language === 'ca' ? helpTextCa : helpTextEs;

        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'model', text: helpText, timestamp: new Date() }]);
        }, 200);
        return;
    }

    setStatus(TerminalState.PROCESSING);

    const historyContext = messages.slice(-6).map(m => `${m.role.toUpperCase()}: ${m.text}`);
    
    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                history: historyContext,
                message: userMsg.text,
                language
            })
        });
        
        const data = await res.json();
        const aiMsg: Message = { role: 'model', text: data.text, timestamp: new Date() };
        setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
        const errorMsg: Message = { role: 'model', text: '[!] Connection failed.', timestamp: new Date() };
        setMessages(prev => [...prev, errorMsg]);
    } finally {
        setStatus(TerminalState.IDLE);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const ParrotPrompt = () => (
    <div className="flex flex-col w-full text-sm md:text-base font-mono">
      <div className="flex flex-wrap items-center tracking-tight">
        <span className="text-parrot-red font-bold">┌─[</span>
        <span className="text-parrot-lime font-bold">xelj</span>
        <span className="text-parrot-yellow font-bold">@</span>
        <span className="text-parrot-cyan font-bold">barretnegre</span>
        <span className="text-parrot-red font-bold">]─[</span>
        <span className="text-parrot-lime font-bold">~</span>
        <span className="text-parrot-red font-bold">]</span>
      </div>
      <div className="flex items-center mt-0.5">
        <span className="text-parrot-red font-bold">└──╼</span>
        <span className="text-parrot-yellow font-bold ml-2 mr-2">$</span>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-5xl mx-auto my-10 rounded-sm shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden border border-parrot-border/50 bg-[#000000]"
    >
      <div className="bg-[#141a23] px-4 py-2 flex items-center justify-between border-b border-parrot-border/30 select-none">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs font-bold">xelj@barretnegre: ~</span>
        </div>
        <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-parrot-border rounded-full"></div>
             <div className="w-3 h-3 bg-parrot-border rounded-full"></div>
             <div className="w-3 h-3 bg-parrot-cyan/50 rounded-full"></div>
        </div>
      </div>

      <div className="h-[500px] overflow-y-auto p-4 font-mono text-sm md:text-base bg-[#0a0a0a]/95 text-gray-300 selection:bg-parrot-lime selection:text-black scrollbar-hide" onClick={() => document.getElementById('terminal-input')?.focus()}>
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-4 break-words">
            {msg.role === 'user' ? (
              <div>
                <ParrotPrompt />
                <div className="-mt-6 ml-[4.5rem] md:ml-[5rem]">
                    <span className="text-white font-bold">{msg.text}</span>
                </div>
              </div>
            ) : (
              <div className="mt-1 text-white whitespace-pre-wrap leading-relaxed">
                {msg.text}
              </div>
            )}
          </div>
        ))}
        
        {status === TerminalState.PROCESSING && (
           <div className="mt-2">
             <span className="text-parrot-lime animate-pulse">[*] Executing payload...</span>
           </div>
        )}
        
        {status !== TerminalState.PROCESSING && (
          <div className="mt-2">
             <div className="flex flex-col w-full">
              <div className="flex flex-wrap items-center tracking-tight">
                <span className="text-parrot-red font-bold">┌─[</span>
                <span className="text-parrot-lime font-bold">xelj</span>
                <span className="text-parrot-yellow font-bold">@</span>
                <span className="text-parrot-cyan font-bold">barretnegre</span>
                <span className="text-parrot-red font-bold">]─[</span>
                <span className="text-parrot-lime font-bold">~</span>
                <span className="text-parrot-red font-bold">]</span>
              </div>
              <div className="flex items-center mt-0.5 w-full">
                <span className="text-parrot-red font-bold">└──╼</span>
                <span className="text-parrot-yellow font-bold ml-2 mr-2">$</span>
                <input 
                    id="terminal-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-white font-bold caret-parrot-lime pl-0"
                    autoComplete="off"
                    autoFocus
                  />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </motion.div>
  );
};

export default Terminal;