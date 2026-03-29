import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { categories, menuItems } from '../data/menuData';

export default function Menu() {
  const [activeTab, setActiveTab] = useState('coffee');

  return (
    <section id="menu" className="py-32 relative bg-white overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
      <div className="absolute -right-64 top-32 w-96 h-96 bg-orange-400/20 rounded-full blur-[100px]" />
      <div className="absolute -left-64 bottom-32 w-96 h-96 bg-purple-400/20 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-black mb-6"
          >
            Our <span className="text-gradient">Vibrant</span> Menu
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Discover our carefully curated selection of colorful beverages and artisanal treats.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeTab === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`relative px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-slate-600 hover:text-pink-500 glass'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-full -z-10 shadow-[0_0_20px_rgba(236,72,153,0.4)]"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {menuItems[activeTab as keyof typeof menuItems].map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative rounded-3xl card-border-flow transition-all duration-500"
              >
                <div className="bg-white rounded-[22px] p-6 h-full flex flex-col items-center text-center shadow-xl">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-6 shadow-lg border-4 border-white group-hover:border-pink-100 transition-colors">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-slate-800 mb-2">{item.name}</h3>
                  <p className="text-sm text-slate-500 mb-4 flex-grow">{item.desc}</p>
                  <div className="flex items-center justify-between w-full mt-auto pt-4 border-t border-slate-100">
                    <span className="text-xl font-black text-pink-500">{item.price}</span>
                    <MagneticButton className="liquid-btn w-10 h-10 rounded-full flex items-center justify-center text-slate-600 group-hover:text-pink-500 transition-colors">
                      +
                    </MagneticButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
