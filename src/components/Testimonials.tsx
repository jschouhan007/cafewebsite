import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Ananya Sharma",
    role: "Digital Creator",
    content: "The vibe here is unmatched! The Pink Velvet Latte is my absolute favorite, and it's the perfect spot for some creative inspiration.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2a04?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Vikram Malhotra",
    role: "Startup Founder",
    content: "High-speed Wi-Fi and that Cold Brew Glow – exactly what I need for my marathon coding sessions. Neon Brew is easily the best co-working cafe in town.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bb8c?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Priya Iyer",
    role: "Food Enthusiast",
    content: "The Rainbow Croissant is a masterpiece! Not only does it look stunning on my feed, but the taste is also just out of this world. Highly recommended!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1614283233556-f35b0c801efc?auto=format&fit=crop&w=150&q=80"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change card every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: {
      rotateY: -90,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.4 }
    },
    center: {
      zIndex: 1,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, type: "spring" as const, bounce: 0.4 }
    },
    exit: {
      zIndex: 0,
      rotateY: 90,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className="py-32 bg-[#f8f5ff] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-br from-orange-400/20 via-pink-500/20 to-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-black text-slate-800 mb-6"
          >
            Vibes & <span className="text-gradient">Voices</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Don't just take our word for it. Hear what our community has to say.
          </motion.p>
        </div>

        <div className="relative h-[450px] md:h-[300px] max-w-4xl mx-auto flex items-center justify-center perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full px-4"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="glass rounded-[2rem] p-8 md:p-12 border-white/60 shadow-2xl flex flex-col md:flex-row items-center gap-8 bg-white/40">
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-pink-500 mix-blend-overlay opacity-50" />
                  <img src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl font-medium text-slate-800 mb-6 italic">
                    "{testimonials[currentIndex].content}"
                  </p>
                  <div>
                    <h4 className="font-display font-bold text-xl text-slate-900">{testimonials[currentIndex].name}</h4>
                    <p className="text-pink-500 font-medium">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
