import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Carousel3D from './components/Carousel3D';
import Testimonials from './components/Testimonials';
import About from './components/About';
import MapSnippet from './components/MapSnippet';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';

function App() {
  return (
    <div className="min-h-screen bg-[#f8f5ff] text-slate-800 font-sans selection:bg-pink-500 selection:text-white pb-24 md:pb-0">
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <Gallery />
        <Carousel3D />
        <Testimonials />
        <About />
        <MapSnippet />
      </main>
      <Footer />

      {/* Mobile Sticky Order Button */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm md:hidden"
      >
        <motion.button 
          onClick={() => window.open('https://zomato.com', '_blank')}
          animate={{ 
            boxShadow: [
              "0px 8px 32px rgba(236, 72, 153, 0.3)", 
              "0px 8px 32px rgba(236, 72, 153, 0.7)", 
              "0px 8px 32px rgba(236, 72, 153, 0.3)"
            ] 
          }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="relative w-full py-4 px-6 rounded-full bg-white/60 backdrop-blur-2xl saturate-150 border border-white/80 flex items-center justify-center gap-3 active:scale-95 transition-transform overflow-hidden"
        >
          {/* Animated liquid background blob */}
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-pink-400/30 blur-xl rounded-full"
          />
          
          <ShoppingBag className="w-5 h-5 text-pink-600 relative z-10" />
          <span className="relative z-10 font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent text-lg tracking-wide">
            Order Now
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}

export default App;
