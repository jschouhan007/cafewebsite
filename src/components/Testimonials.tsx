import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import MagneticButton from './MagneticButton';

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Local Artist",
    content: "The vibrant atmosphere and the Pink Velvet Latte completely changed my morning routine. It's not just coffee, it's an experience.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Tech Entrepreneur",
    content: "Fast Wi-Fi, incredible Cold Brew Glow, and a design that keeps me inspired. Neon Brew is my new favorite workspace.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Food Blogger",
    content: "Every pastry is a work of art. The Rainbow Croissant isn't just beautiful for Instagram, it tastes absolutely divine.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + testimonials.length) % testimonials.length);
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

        <div className="relative h-[450px] md:h-[300px] max-w-4xl mx-auto flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full px-4"
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

          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between z-20 pointer-events-none px-2 md:-mx-12">
            <MagneticButton
              className="w-12 h-12 rounded-full glass bg-white/80 flex items-center justify-center text-slate-800 hover:text-pink-500 hover:scale-110 transition-all pointer-events-auto shadow-lg"
              onClick={() => paginate(-1)}
            >
              <ChevronLeft className="w-6 h-6" />
            </MagneticButton>
            <MagneticButton
              className="w-12 h-12 rounded-full glass bg-white/80 flex items-center justify-center text-slate-800 hover:text-pink-500 hover:scale-110 transition-all pointer-events-auto shadow-lg"
              onClick={() => paginate(1)}
            >
              <ChevronRight className="w-6 h-6" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
