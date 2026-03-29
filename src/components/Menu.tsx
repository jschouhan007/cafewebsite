import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Leaf, CakeSlice } from 'lucide-react';
import MagneticButton from './MagneticButton';

const categories = [
  { id: 'coffee', label: 'Coffee', icon: Coffee },
  { id: 'tea', label: 'Tea', icon: Leaf },
  { id: 'pastries', label: 'Pastries', icon: CakeSlice },
];

const menuItems = {
  coffee: [
    { id: 1, name: 'Neon Espresso', price: '$4.50', desc: 'Double shot of our vibrant house blend.', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80' },
    { id: 2, name: 'Pink Velvet Latte', price: '$6.00', desc: 'Smooth latte with a hint of beetroot and vanilla.', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80' },
    { id: 3, name: 'Golden Macchiato', price: '$5.50', desc: 'Caramel infused espresso with steamed milk.', img: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80' },
    { id: 4, name: 'Cold Brew Glow', price: '$5.00', desc: '24-hour steeped cold brew over crystal ice.', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80' },
  ],
  tea: [
    { id: 5, name: 'Matcha Cloud', price: '$6.50', desc: 'Ceremonial grade matcha with oat milk foam.', img: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=600&q=80' },
    { id: 6, name: 'Hibiscus Burst', price: '$5.00', desc: 'Iced hibiscus tea with fresh berries.', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80' },
    { id: 7, name: 'Lavender Earl Grey', price: '$5.50', desc: 'Classic Earl Grey infused with lavender.', img: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cbf9?auto=format&fit=crop&w=600&q=80' },
    { id: 8, name: 'Peach Oolong', price: '$6.00', desc: 'Premium oolong tea with sweet peach notes.', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80' },
  ],
  pastries: [
    { id: 9, name: 'Rainbow Croissant', price: '$5.50', desc: 'Flaky, buttery croissant with colorful layers.', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80' },
    { id: 10, name: 'Berry Tart', price: '$7.00', desc: 'Fresh seasonal berries on a crisp pastry shell.', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80' },
    { id: 11, name: 'Neon Macarons', price: '$8.00', desc: 'Box of 3 vibrant, assorted flavor macarons.', img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80' },
    { id: 12, name: 'Chocolate Lava', price: '$7.50', desc: 'Warm chocolate cake with a gooey center.', img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&q=80' },
  ]
};

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
                className="group relative rounded-3xl p-1 bg-gradient-to-br from-orange-400/20 via-pink-500/20 to-purple-600/20 hover:from-orange-400 hover:via-pink-500 hover:to-purple-600 transition-all duration-500"
              >
                <div className="bg-white rounded-[22px] p-6 h-full flex flex-col items-center text-center shadow-xl">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-6 shadow-lg border-4 border-white group-hover:border-pink-100 transition-colors">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-slate-800 mb-2">{item.name}</h3>
                  <p className="text-sm text-slate-500 mb-4 flex-grow">{item.desc}</p>
                  <div className="flex items-center justify-between w-full mt-auto pt-4 border-t border-slate-100">
                    <span className="text-xl font-black text-pink-500">{item.price}</span>
                    <MagneticButton className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-pink-500 group-hover:text-white transition-colors">
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
