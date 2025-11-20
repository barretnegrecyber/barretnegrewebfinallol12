import React from 'react';
import { ServiceItem } from '../types';
import { motion } from 'framer-motion';

interface Props {
  service: ServiceItem;
  index: number;
}

const ServiceCard: React.FC<Props> = ({ service, index }) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative p-6 bg-parrot-panel border border-parrot-border hover:border-parrot-lime transition-all duration-300 rounded-sm hover:shadow-[0_0_20px_rgba(73,241,42,0.05)]"
    >
      <div className="flex items-start justify-between mb-4">
        <Icon className="text-gray-500 group-hover:text-parrot-lime transition-colors duration-300" size={32} strokeWidth={1.5} />
        <span className="text-xs text-gray-600 font-mono font-bold">/mod_0{index + 1}</span>
      </div>
      
      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-parrot-cyan transition-colors tracking-tight">
        {service.title}
      </h3>
      
      <p className="text-gray-400 mb-6 text-sm leading-relaxed font-mono text-justify">
        {service.description}
      </p>

      <div className="border-t border-parrot-border pt-4">
         <div className="flex flex-wrap gap-2">
          {service.tags.map((tag, i) => (
            <span 
              key={i} 
              className="text-[10px] font-mono uppercase text-parrot-cyan/70 px-1.5 py-0.5 bg-black/30 border border-parrot-border rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;