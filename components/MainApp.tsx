
"use client";

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Lock, Globe, Terminal as TermIcon, Menu, X, Network, Skull, Code, Languages, Server, Send, CheckCircle, Loader2 } from 'lucide-react';
import NetworkBackground from './MatrixRain';
import Terminal from './Terminal';
import ServiceCard from './ServiceCard';
import { ServiceItem, Language } from '../types';

const ICONS = [Globe, Server, Code, Skull];

const translations = {
  es: {
    nav: { home: '~/HOME', whoami: '~/WHOAMI', modules: '~/MODULES', shell: 'root_shell' },
    mobileNav: { home: '/inicio', whoami: '/perfil', modules: '/servicios', shell: './shell' },
    hero: {
      init: './INIT_SEQUENCE.SH',
      title: 'BARRET',
      title2: 'NEGRE',
      subtitle: 'Auditoría Web & Seguridad de Servidores',
      desc: 'Tu servidor es tu fortaleza, pero cada línea de código es una posible grieta. En Barret Negre deconstruimos tus aplicaciones web y servidores antes de que un actor malicioso lo haga. Seguridad ofensiva real, sin tecnicismos vacíos.',
      ctaContact: 'Contactar_Root',
      ctaShell: 'SHELL_ACCESS'
    },
    about: {
      title: 'Operador Principal: XELJ',
      p1: 'Operamos bajo un paradigma de Zero-Trust: la seguridad por oscuridad es una ilusión. Barret Negre trasciende las auditorías de cumplimiento estándar; no nos limitamos a ejecutar escáneres automatizados, auditamos la lógica profunda de tu negocio.',
      p2: 'Como ex-Black Hat, Xelj aporta una ventaja táctica inigualable: conoce las metodologías criminales desde dentro. No nos limitamos a la teoría defensiva; apliquem ingenieria inversa a la mente del atacante. Entender cómo se rompe un sistema es el único camino real para blindarlo contra amenazas avanzadas que las auditorías estándar ignoran.',
      quote: '"We are Legion." — La seguridad colectiva empieza asegurando tu propio nodo.'
    },
    services: {
      title: 'VECTORES DE',
      highlight: 'ATAQUE',
      subtitle: 'Especialización total en seguridad web y protección de servidores. Identificamos lo que los escáneres automáticos ignoran.',
      items: [
        { title: "Auditoría Web & Pentesting", description: "Análisis exhaustivo de aplicaciones web. Detección de vulnerabilidades OWASP Top 10, inyección SQL, XSS y fallos lógicos críticos en tu plataforma online.", tags: ["Web Pentest", "API Security", "OWASP"] },
        { title: "Seguridad de Servidores", description: "Hardening profundo de infraestructura Linux y Windows. Revisión de configuraciones, permisos, servicios expuestos y prevención de escalada de privilegios.", tags: ["Linux Hardening", "Cloud Security", "SysAdmin Ops"] },
        { title: "Auditoría de Código Fuente", description: "Deconstrucción de tu software. Análisis estático y dinámico para hallar lógica corrupta, backdoors ocultos y fallos de diseño en el core de tu aplicación.", tags: ["Code Review", "White Box", "Secure Coding"] },
        { title: "Simulación de Adversario", description: "Red Teaming completo. No buscamos solo fallos técnicos, buscamos comprometer tu negocio simulando un ataque real dirigido y persistente.", tags: ["Red Team", "APT Sim", "Intrusión"] }
      ]
    },
    terminal: {
      title: 'SHELL INTERACTIVA',
      status: 'Conectado a nodo local'
    },
    pricing: {
      brand: 'BARRET NEGRE',
      sub1: 'AUDITORÍAS DE',
      sub2: 'SEGURIDAD WEB',
      test: 'TEST DE PENETRACIÓN',
      individual: 'PARA PARTICULARES',
      individualPrice: '396€',
      company: 'PARA EMPRESAS O AUTÓNOMOS',
      companyPrice: '440€',
      vat: 'IVA INCLUIDO',
      email: 'barret.negre.cyber@gmail.com'
    },
    contact: {
      title: 'CONTACTO',
      subtitle: 'Solicita una prueba de intrusión antes de que sea tarde.',
      labels: { web: 'Web', contact: 'Contacto', info: 'Información Adicional' },
      placeholders: { web: 'www.ejemplo.com', contact: 'admin@empresa.com', info: 'Detalles de la web, API o servidor a auditar...' },
      btn: '>> Pedir auditoria',
      sending: 'ENCRIPTANDO MENSAJE...',
      sent: 'PAQUETE ENVIADO [200 OK]'
    },
    footer: {
      text: '© 2025 BARRET NEGRE COOPERATIVE. WEB SEC DIVISION.',
      sub: 'Expect Us.'
    }
  },
  ca: {
    nav: { home: '~/HOME', whoami: '~/WHOAMI', modules: '~/MODULES', shell: 'root_shell' },
    mobileNav: { home: '/inici', whoami: '/perfil', modules: '/serveis', shell: './shell' },
    hero: {
      init: './INIT_SEQUENCE.SH',
      title: 'BARRET',
      title2: 'NEGRE',
      subtitle: 'Auditoria Web i Seguretat de Servidors',
      desc: 'El teu servidor és la teva fortalesa, però cada línia de codi és una possible esquerda. A Barret Negre deconstruïm les teves aplicacions web i servidors abans que un actor maliciós ho faci. Seguretat ofensiva real, sense tecnicismes buits.',
      ctaContact: 'Contactar_Root',
      ctaShell: 'ACCÉS_SHELL'
    },
    about: {
      title: 'Operador Principal: XELJ',
      p1: 'Operem sota un paradigma de Zero-Trust: la seguretat per foscor és una il·lusió. Barret Negre transcendeix les auditories de compliment estàndard; no ens limitem a executar escàners automatitzats, auditem la lògica profunda del teu negoci.',
      p2: 'Com a ex-Black Hat, Xelj aporta un avantatge tàctic inigualable: coneix les metodologies criminals des de dins. No ens limitem a la teoria defensiva; apliquem enginyeria inversa a la ment de l\'atacant. Entendre com es trenca un sistema és l\'únic camí real per blindar-lo contra amenaces avançades que les auditories estàndard ignoren.',
      quote: '"We are Legion." — La seguretat col·lectiva comença assegurant el teu propi node.'
    },
    services: {
      title: 'VECTORS',
      highlight: 'D\'ATAC',
      subtitle: 'Especialització total en seguretat web i protecció de servidors. Identifiquem el que els escàners automàtics ignoren.',
      items: [
        { title: "Auditoria Web i Pentesting", description: "Anàlisi exhaustiva d'aplicacions web. Detecció de vulnerabilitats OWASP Top 10, injecció SQL, XSS i errors lògics crítics a la teva plataforma online.", tags: ["Web Pentest", "API Security", "OWASP"] },
        { title: "Seguretat de Servidors", description: "Hardening profund d'infraestructura Linux i Windows. Revisión de configuracions, permisos, serveis exposats i prevenció d'escalada de privilegios.", tags: ["Linux Hardening", "Cloud Security", "SysAdmin Ops"] },
        { title: "Auditoria de Codi Font", description: "Deconstrucció del teu programari. Anàlisi estàtica i dinàmica per trobar lògica corrupta, backdoors ocults i errors de disseny al core de la teva aplicació.", tags: ["Code Review", "White Box", "Secure Coding"] },
        { title: "Simulació d'Adversari", description: "Red Teaming complet. No busquem només errors tècnics, busquem comprometre el teu negoci simulant un atac real dirigit i persistent.", tags: ["Red Team", "APT Sim", "Intrusió"] }
      ]
    },
    terminal: {
      title: 'SHELL INTERACTIVA',
      status: 'Connectat al node local'
    },
    pricing: {
      brand: 'BARRET NEGRE',
      sub1: 'AUDITORIES DE',
      sub2: 'SEGURETAT WEB',
      test: 'TEST DE PENETRACIÓ',
      individual: 'PER A PARTICULARS',
      individualPrice: '396€',
      company: 'PER A EMPRESES O AUTÒNOMS',
      companyPrice: '440€',
      vat: 'IVA INCLÒS',
      email: 'barret.negre.cyber@gmail.com'
    },
    contact: {
      title: 'CONTACTE',
      subtitle: 'Sol·licita una prova d\'intrusió abans que sigui massa tard.',
      labels: { web: 'Web', contact: 'Contacte', info: 'Información Adicional' },
      placeholders: { web: 'www.exemple.com', contact: 'admin@empresa.com', info: 'Detalls de la web, API o servidor a auditar...' },
      btn: '>> Demanar auditoria',
      sending: 'ENCRIPTANT MISSATGE...',
      sent: 'PAQUET ENVIAT [200 OK]'
    },
    footer: {
      text: '© 2025 COOPERATIVA BARRET NEGRE. DIVISIÓ DE SEGURETAT WEB.',
      sub: 'Expect Us.'
    }
  }
};

const MainApp: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('es');
  
  // Form State
  const [formData, setFormData] = useState({ web: '', email: '', info: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const t = translations[language];

  const currentServices: ServiceItem[] = t.services.items.map((item, index) => ({
    ...item,
    icon: ICONS[index]
  }));

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'ca' : 'es');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.web || !formData.email) return;

    setFormStatus('sending');

    // Simulate "hacking" delay and then open mail client
    setTimeout(() => {
      setFormStatus('success');
      
      const subject = `[REQUEST] Auditoría para ${formData.web}`;
      const body = `Origen: ${formData.email}\nTarget: ${formData.web}\n\nMensaje:\n${formData.info}`;
      
      window.location.href = `mailto:barret.negre.cyber@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Reset form after a bit
      setTimeout(() => {
        setFormStatus('idle');
        setFormData({ web: '', email: '', info: '' });
      }, 3000);
    }, 2000);
  };

  return (
    <div className="bg-parrot-bg min-h-screen text-gray-400 font-mono selection:bg-parrot-lime selection:text-black relative">
      <NetworkBackground />

      {/* Navigation - Minimalist & Dark */}
      <nav className="fixed top-0 w-full z-50 bg-[#020408]/90 border-b border-parrot-border/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-parrot-cyan rounded-full animate-pulse shadow-[0_0_15px_#00fdff]"></div>
              <span className="font-bold tracking-widest text-gray-200 text-xs uppercase">
                BARRET_NEGRE<span className="text-parrot-lime">.COOP</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center">
              <div className="ml-10 flex items-baseline space-x-8 text-xs font-bold text-gray-500">
                <a href="#home" className="hover:text-parrot-cyan transition-colors">{t.nav.home}</a>
                <a href="#about" className="hover:text-parrot-cyan transition-colors">{t.nav.whoami}</a>
                <a href="#services" className="hover:text-parrot-cyan transition-colors">{t.nav.modules}</a>
                <a href="#terminal" className="text-parrot-lime hover:text-white transition-colors flex items-center gap-1 bg-parrot-lime/10 px-3 py-1 rounded border border-parrot-lime/20">
                  <TermIcon size={10}/> {t.nav.shell}
                </a>
              </div>
              
              {/* Language Toggle */}
              <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-8 flex items-center gap-2 text-[10px] font-bold border border-parrot-border px-2 py-1 rounded bg-black/50 hover:border-parrot-cyan hover:text-parrot-cyan transition-all group relative overflow-hidden"
              >
                 <Languages size={12} />
                 <span className="w-4 inline-block text-center">{language.toUpperCase()}</span>
                 <div className="absolute inset-0 bg-parrot-cyan/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </motion.button>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleLanguage} className="text-xs font-bold text-parrot-cyan border border-parrot-border px-2 py-1 rounded">
                {language.toUpperCase()}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-400 hover:text-white">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
           <div className="md:hidden bg-parrot-panel border-b border-parrot-border px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-2xl">
             <a href="#home" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-300 hover:bg-parrot-border hover:text-parrot-cyan">{t.mobileNav.home}</a>
             <a href="#about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-300 hover:bg-parrot-border hover:text-parrot-cyan">{t.mobileNav.whoami}</a>
             <a href="#services" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-300 hover:bg-parrot-border hover:text-parrot-cyan">{t.mobileNav.modules}</a>
             <a href="#terminal" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-parrot-lime bg-parrot-bg/50 border-l-2 border-parrot-lime">{t.mobileNav.shell}</a>
           </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Anonymous / Legacy Tribute Background Element */}
        <div className="absolute bottom-10 right-10 opacity-5 pointer-events-none select-none">
             <div className="text-[10px] md:text-xs text-justify w-40 font-bold tracking-tighter glitch-text">
                WE ARE LEGION.<br/>
                WE DO NOT FORGIVE.<br/>
                WE DO NOT FORGET.<br/>
                EXPECT US.<br/>
                -- ANONYMOUS
             </div>
        </div>

        <motion.div 
          style={{ opacity }}
          className="w-full max-w-6xl z-10"
        >
          <div className="mb-6 text-gray-600 text-xs font-bold tracking-[0.3em] flex items-center gap-2">
             <span className="text-parrot-cyan">➜</span> {t.hero.init}
          </div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
             className="relative"
          >
             {/* Glitch Title Effect */}
             <h1 className="text-5xl md:text-9xl font-black text-white mb-2 tracking-tighter glitch-text cursor-default mix-blend-difference">
               {t.hero.title}<br/>{t.hero.title2}<span className="text-parrot-lime">_</span>
             </h1>
             
             <div className="flex items-center gap-4 mt-4 mb-8">
                <div className="h-px w-12 bg-gray-700"></div>
                <h2 className="text-sm md:text-lg text-parrot-cyan font-bold uppercase tracking-widest">
                  {t.hero.subtitle}
                </h2>
             </div>
          </motion.div>
          
          <p className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed mt-8 mb-12 text-justify pl-4 border-l-2 border-parrot-panel">
            {t.hero.desc}
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="bg-white text-black border border-white px-8 py-3 text-sm font-black hover:bg-parrot-cyan hover:border-parrot-cyan hover:shadow-[0_0_20px_rgba(0,253,255,0.6)] transition-all uppercase tracking-widest">
              {t.hero.ctaContact}
            </a>
            <a href="#terminal" className="group bg-transparent text-gray-400 border border-gray-800 px-8 py-3 text-sm transition-colors flex items-center gap-2 hover:border-parrot-lime hover:text-parrot-lime">
              <TermIcon size={16} className="group-hover:text-parrot-lime"/> {t.hero.ctaShell}
            </a>
          </div>
        </motion.div>
      </section>

      {/* About / Whoami Section */}
      <section id="about" className="py-32 px-4 border-y border-parrot-border/20 bg-[#030509]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24">
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ duration: 0.7 }}
           >
              <div className="flex items-center gap-2 mb-8 text-parrot-lime">
                 <Skull size={20} />
                 <h3 className="text-xl font-bold tracking-widest uppercase">{t.about.title}</h3>
              </div>
              <div className="space-y-6 text-sm text-gray-400 leading-loose text-justify">
                <p>
                  <span className="text-parrot-lime">root@barretnegre:~#</span>
                </p>
                <p>
                  {t.about.p1}
                </p>
                <p>
                  {t.about.p2}
                </p>
                <p className="text-xs text-gray-600 border-t border-gray-800 pt-4 mt-4 italic">
                  {t.about.quote}
                </p>
              </div>
           </motion.div>

           <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="font-mono text-xs relative"
           >
              <div className="bg-[#05080f] p-1 border border-parrot-border/40 shadow-2xl relative z-10">
                <div className="bg-[#0a0f16] p-3 flex justify-between items-center mb-1">
                   <span className="text-gray-500 uppercase font-bold">Web_Target_Scope.json</span>
                   <div className="flex gap-1">
                      <div className="w-2 h-2 bg-parrot-lime"></div>
                   </div>
                </div>
                <pre className="p-4 text-parrot-lime overflow-x-auto">
{`{
  "target_type": "WEB_APP & SERVER",
  "vulnerabilities": [
    "SQL Injection",
    "XSS (Cross-Site Scripting)",
    "Insecure Direct Object Refs",
    "Server Misconfigurations"
  ],
  "toolset": ["Burp Suite", "Nmap", "Custom Scripts"],
  "status": "READY_TO_AUDIT"
}`}
                </pre>
              </div>
              {/* Decorative grid behind */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-parrot-border/20 -z-10"></div>
           </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 px-4 bg-[#020408]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
             <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">{t.services.title} <span className="text-parrot-lime">{t.services.highlight}</span></h2>
             <p className="text-sm text-gray-600 max-w-xl mx-auto">
               {t.services.subtitle}
             </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentServices.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Terminal Section */}
      <section id="terminal" className="py-24 px-4 bg-black relative">
        {/* Clean background - No Grid */}
        <div className="absolute inset-0 bg-black pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-8">
             <div className="bg-parrot-lime/20 p-2 rounded">
                <TermIcon className="text-parrot-lime" size={24} />
             </div>
             <div>
               <h2 className="text-xl font-bold text-white">{t.terminal.title}</h2>
               <p className="text-gray-500 text-xs">{t.terminal.status}</p>
             </div>
          </div>
          <Terminal language={language} />
        </div>
      </section>

      {/* Pricing Poster Section - TRANSPARENT SECTION, OPAQUE CARD */}
      <section id="pricing" className="py-24 px-4 bg-transparent relative overflow-hidden border-t border-b border-parrot-border/10">
        {/* NOISE OVERLAY REMOVED */}

        <div className="max-w-6xl mx-auto relative z-10">
           {/* CARD WITH BACKGROUND - Opacity Reduced to match Contact */}
           {/* REMOVED shadow-[0_0_50px_rgba(0,0,0,0.9)] to fix the dark background issue */}
           <div className="border-4 border-white/90 p-2 md:p-4 bg-black/40 backdrop-blur-md transform rotate-1 md:rotate-0 transition-transform hover:rotate-0 duration-500">
             <div className="border-2 border-white/90 p-6 md:p-12 relative overflow-hidden flex flex-col items-center justify-center text-center">
               
               {/* Content - Full Width Centered */}
               <div className="relative z-20 w-full max-w-4xl">
                 <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-6 mix-blend-hard-light">
                   {t.pricing.brand.split(' ')[0]}<br/>
                   <span className="text-gray-300">{t.pricing.brand.split(' ')[1]}</span>
                 </h2>

                 <div className="space-y-1 mb-8">
                   <h3 className="text-xl md:text-2xl font-bold text-gray-400 uppercase tracking-wider">{t.pricing.sub1}</h3>
                   <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider">{t.pricing.sub2}</h3>
                 </div>

                 <div className="mb-12 transform -rotate-1 inline-block">
                   <span className="bg-white text-black px-4 py-2 text-2xl md:text-4xl font-black uppercase tracking-tighter inline-block shadow-[5px_5px_0px_rgba(50,50,50,1)]">
                     {t.pricing.test}
                   </span>
                 </div>

                 {/* Pricing Blocks - Centered Grid */}
                 <div className="grid md:grid-cols-2 gap-12 mb-12 text-left md:text-center max-w-3xl mx-auto">
                    <div className="flex flex-col items-center">
                       <p className="text-gray-400 font-bold text-xs md:text-sm tracking-[0.2em] mb-1 uppercase border-b border-gray-700 inline-block pb-1">{t.pricing.individual}</p>
                       <div className="flex items-baseline gap-2">
                          <span className="text-5xl md:text-6xl font-black text-white">{t.pricing.individualPrice}</span>
                          <span className="text-[10px] text-gray-500 font-bold uppercase">{t.pricing.vat}</span>
                       </div>
                    </div>

                    <div className="flex flex-col items-center">
                       <p className="text-gray-400 font-bold text-xs md:text-sm tracking-[0.2em] mb-1 uppercase border-b border-gray-700 inline-block pb-1">{t.pricing.company}</p>
                       <div className="flex items-baseline gap-2">
                          <span className="text-5xl md:text-6xl font-black text-white">{t.pricing.companyPrice}</span>
                          <span className="text-[10px] text-gray-500 font-bold uppercase">{t.pricing.vat}</span>
                       </div>
                    </div>
                 </div>

                 <div className="pt-8 border-t-4 border-dotted border-white/20 w-full max-w-lg mx-auto">
                    <p className="font-mono font-bold text-white/80 tracking-widest text-sm md:text-base">
                       {t.pricing.email}
                    </p>
                 </div>
               </div>

             </div>
           </div>
        </div>
      </section>

      {/* Contact - TRANSPARENT SECTION */}
      <section id="contact" className="py-24 px-4 bg-transparent border-t border-parrot-border/30 relative">
         <div className="max-w-2xl mx-auto">
            <div className="mb-12 border-l-4 border-parrot-cyan pl-6 bg-black/40 backdrop-blur-sm p-4 rounded-r">
               <h2 className="text-4xl font-bold text-white mb-2">{t.contact.title}</h2>
               <p className="text-gray-500 text-sm">{t.contact.subtitle}</p>
            </div>

            <form className="space-y-6 bg-black/40 backdrop-blur-md p-8 border border-parrot-border/20" onSubmit={handleContactSubmit}>
               <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] text-parrot-cyan uppercase font-bold tracking-widest">{t.contact.labels.web}</label>
                     <input 
                        type="text"
                        name="web"
                        value={formData.web}
                        onChange={handleInputChange}
                        className="w-full bg-black/50 border border-gray-800 p-4 text-sm text-white focus:border-parrot-cyan focus:outline-none transition-colors placeholder-gray-800" 
                        placeholder={t.contact.placeholders.web}
                        required
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] text-parrot-cyan uppercase font-bold tracking-widest">{t.contact.labels.contact}</label>
                     <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-black/50 border border-gray-800 p-4 text-sm text-white focus:border-parrot-cyan focus:outline-none transition-colors placeholder-gray-800" 
                        placeholder={t.contact.placeholders.contact} 
                        required
                     />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] text-parrot-cyan uppercase font-bold tracking-widest">{t.contact.labels.info}</label>
                  <textarea 
                    rows={6} 
                    name="info"
                    value={formData.info}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-gray-800 p-4 text-sm text-white focus:border-parrot-cyan focus:outline-none transition-colors placeholder-gray-800" 
                    placeholder={t.contact.placeholders.info}
                  ></textarea>
               </div>
               
               <button 
                 type="submit"
                 disabled={formStatus !== 'idle'}
                 className={`w-full py-4 font-bold tracking-[0.2em] text-xs transition-all uppercase flex items-center justify-center gap-2
                   ${formStatus === 'idle' ? 'bg-parrot-cyan text-black hover:bg-white' : ''}
                   ${formStatus === 'sending' ? 'bg-gray-800 text-parrot-lime cursor-wait' : ''}
                   ${formStatus === 'success' ? 'bg-parrot-lime text-black' : ''}
                 `}
               >
                 {formStatus === 'idle' && <>{t.contact.btn} <Send size={14}/></>}
                 {formStatus === 'sending' && <>{t.contact.sending} <Loader2 size={14} className="animate-spin"/></>}
                 {formStatus === 'success' && <>{t.contact.sent} <CheckCircle size={14}/></>}
               </button>
            </form>
         </div>
      </section>

      <footer className="py-12 bg-black/80 backdrop-blur-sm text-center text-[10px] text-gray-700 border-t border-gray-900 relative overflow-hidden">
         
         <div className="flex justify-center gap-8 mb-6 opacity-30 hover:opacity-100 transition-opacity duration-500">
            <Network size={16} />
            <Shield size={16} />
            <Lock size={16} />
         </div>
         <p className="mb-2">{t.footer.text}</p>
         <p className="text-gray-800">{t.footer.sub}</p>
      </footer>
    </div>
  );
};

export default MainApp;
